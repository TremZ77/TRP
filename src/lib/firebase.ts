import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, Firestore, collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import type { FirebaseConfig, HealthEntry, HealthEntryInput } from '../types';

let app: FirebaseApp | undefined;
let db: Firestore | undefined;
let auth: ReturnType<typeof getAuth> | undefined;

export const initFirebase = (config: FirebaseConfig) => {
    if (!getApps().length) {
        app = initializeApp(config);
    } else {
        app = getApp();
    }
    db = getFirestore(app);
    auth = getAuth(app);
    return app;
};

export const signInWithGoogle = async () => {
    if (!auth) throw new Error("Firebase not initialized");
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
};

export const logout = async () => {
    if (!auth) return;
    return signOut(auth);
};

export const getAuthInstance = () => auth;

// Data Operations
/*
  Firestore Structure:
  users/{userId}/entries/{entryId}
*/

export const saveCloudEntry = async (userId: string, entry: HealthEntryInput) => {
    if (!db) throw new Error("Firestore not initialized");

    const entriesRef = collection(db, 'users', userId, 'entries');
    // Add server timestamp
    const docRef = await addDoc(entriesRef, {
        ...entry,
        timestamp: Timestamp.now()
    });

    return {
        ...entry,
        id: docRef.id,
        timestamp: new Date().toISOString()
    } as HealthEntry;
};

export const getCloudEntries = async (userId: string): Promise<HealthEntry[]> => {
    if (!db) throw new Error("Firestore not initialized");

    const entriesRef = collection(db, 'users', userId, 'entries');
    const q = query(entriesRef, orderBy('timestamp', 'desc'));
    const snap = await getDocs(q);

    return snap.docs.map(doc => {
        const data = doc.data();
        return {
            ...data,
            id: doc.id,
            timestamp: (data.timestamp as Timestamp).toDate().toISOString()
        } as HealthEntry;
    });
};
