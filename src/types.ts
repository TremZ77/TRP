export interface HealthEntry {
    id: string;
    timestamp: string; // ISO string
    systolic_pressure: number;
    diastolic_pressure: number;
    glucose: number; // mg/dL or mmol/L? Assuming user knows their unit, just visual number for now.
    oxygen: number; // %
    heart_rate_pressure: number; // bpm - measured with blood pressure
    heart_rate_oxygen: number; // bpm - measured with oxygen
    weight: number; // kg or lbs
}

export type HealthEntryInput = Omit<HealthEntry, 'id' | 'timestamp'>;

export interface AppSettings {
    appTitle: string;
    primaryColor: string; // hex code
    fontFamily: string; // css font-family value
}

export interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
}

