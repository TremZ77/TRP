import { useState, useEffect } from 'react';
import type { HealthEntry, HealthEntryInput, AppSettings, FirebaseConfig } from './types';
import { getEntries, saveEntry, updateEntry } from './lib/storage';
import { getSettings, saveSettings, DEFAULT_SETTINGS } from './lib/settings';
import { exportToExcel } from './lib/excelExport';
import { HealthForm } from './components/HealthForm';
import { Dashboard } from './components/Dashboard';
import { SettingsModal } from './components/SettingsModal';
import { CloudSetupModal } from './components/CloudSetupModal';
import { AuthButton } from './components/AuthButton';
import { Settings as SettingsIcon } from 'lucide-react';
import { initFirebase, signInWithGoogle, logout, getAuthInstance, saveCloudEntry, getCloudEntries, updateCloudEntry } from './lib/firebase';
import { onAuthStateChanged, type User } from 'firebase/auth';

const FIREBASE_CONFIG_KEY = 'health_tracker_firebase_config';

function App() {
  const [entries, setEntries] = useState<HealthEntry[]>([]);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Cloud Sync State
  const [firebaseConfig, setFirebaseConfig] = useState<FirebaseConfig | undefined>();
  const [isCloudSetupOpen, setIsCloudSetupOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editingEntry, setEditingEntry] = useState<HealthEntry | null>(null);

  // Initialize
  useEffect(() => {
    // Load Settings
    setSettings(getSettings());
    setEntries(getEntries()); // Always load local first

    // Initialize Firebase with baked-in config (from environment variables)
    const config: FirebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY?.replace(/"/g, '').trim(),
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN?.replace(/"/g, '').trim(),
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID?.replace(/"/g, '').trim(),
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET?.replace(/"/g, '').trim(),
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID?.replace(/"/g, '').trim(),
      appId: import.meta.env.VITE_FIREBASE_APP_ID?.replace(/"/g, '').trim()
    };

    if (config.apiKey && config.projectId) {
      try {
        console.log("Initializing Firebase with environment variables...");
        initFirebase(config);
        setFirebaseConfig(config);

        const auth = getAuthInstance();
        if (auth) {
          onAuthStateChanged(auth, (u) => {
            setUser(u);
            if (u) loadCloudData(u.uid);
          });
        }
      } catch (e) {
        console.error("Firebase Initialization Failed:", e);
      }
    } else {
      console.warn("Firebase configuration is missing! Check your GitHub Secrets.");
      console.log("Config State:", {
        hasApiKey: !!config.apiKey,
        hasProjectId: !!config.projectId
      });
    }
  }, []);

  // Update document title
  useEffect(() => {
    document.title = settings.appTitle;
  }, [settings.appTitle]);

  const loadCloudData = async (userId: string) => {
    setIsLoading(true);
    try {
      const cloudEntries = await getCloudEntries(userId);
      setEntries(cloudEntries);
    } catch (e) {
      console.error("Load Cloud Error", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveEntry = async (input: HealthEntryInput) => {
    setIsLoading(true);
    try {
      if (editingEntry) {
        // Update existing
        const updatedEntry: HealthEntry = {
          ...input,
          id: editingEntry.id,
          timestamp: editingEntry.timestamp
        };

        // 1. Update Local
        updateEntry(updatedEntry);

        // 2. Update Cloud
        if (user) {
          await updateCloudEntry(user.uid, updatedEntry);
        }

        // 3. Update State
        setEntries(prev => prev.map(e => e.id === updatedEntry.id ? updatedEntry : e));
        setEditingEntry(null);
      } else {
        // Create new
        const localEntry = saveEntry(input);

        if (user) {
          const cloudEntry = await saveCloudEntry(user.uid, input);
          setEntries(prev => [cloudEntry, ...prev]);
        } else {
          setEntries(prev => [localEntry, ...prev]);
        }
      }
    } catch (e) {
      console.error("Save Error", e);
      alert("Failed to save entry. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteEntry = (id: string) => {
    // For now just local delete logic as it was before
    const updatedEntries = entries.filter(e => e.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem('health_tracker_data', JSON.stringify(updatedEntries));
  };


  const handleExport = () => {
    exportToExcel(entries);
  };

  const handleSaveSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const handleSaveCloudConfig = (config: FirebaseConfig) => {
    setFirebaseConfig(config);
    localStorage.setItem(FIREBASE_CONFIG_KEY, JSON.stringify(config));
    try {
      initFirebase(config);
      // Re-bind auth listener
      const auth = getAuthInstance();
      if (auth) {
        onAuthStateChanged(auth, (u) => {
          setUser(u);
          if (u) loadCloudData(u.uid);
        });
      }
    } catch (e) {
      alert("Invalid Firebase Configuration");
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (e) {
      alert("Login Failed: " + (e as Error).message);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setEntries(getEntries()); // Revert to local data on logout
  };

  return (
    <div
      className="min-h-screen pb-20 transition-colors duration-300"
      style={{
        fontFamily: settings.fontFamily,
        backgroundColor: '#f8fafc'
      }}
    >
      <header
        className="shadow-sm sticky top-0 z-10 transition-colors duration-300"
        style={{ backgroundColor: 'white' }}
      >
        <div className="max-w-md mx-auto px-4 py-4 flex justify-between items-center">
          <h1
            className="text-2xl font-bold bg-clip-text text-transparent truncate max-w-[50%]"
            style={{
              backgroundImage: `linear-gradient(to right, ${settings.primaryColor}, #06b6d4)`
            }}
          >
            {settings.appTitle}
          </h1>

          <div className="flex items-center gap-3">
            <AuthButton
              user={user}
              isConfigured={!!firebaseConfig}
              onLogin={handleLogin}
              onLogout={handleLogout}
              onConfigure={() => setIsCloudSetupOpen(true)}
            />
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-600"
            >
              <SettingsIcon size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-8">
        {isLoading && (
          <div className="text-center py-4 text-blue-600 animate-pulse">Syncing data...</div>
        )}
        <HealthForm
          onSave={handleSaveEntry}
          initialData={editingEntry}
          onCancel={() => setEditingEntry(null)}
        />
        <Dashboard
          entries={entries}
          onExport={handleExport}
          onDelete={handleDeleteEntry}
          onEdit={setEditingEntry}
        />
      </main>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentSettings={settings}
        onSave={handleSaveSettings}
      />

      <CloudSetupModal
        isOpen={isCloudSetupOpen}
        onClose={() => setIsCloudSetupOpen(false)}
        onSave={handleSaveCloudConfig}
        currentConfig={firebaseConfig}
      />
    </div>
  );
}

export default App;
