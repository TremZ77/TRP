import React, { useState } from 'react';
import type { FirebaseConfig } from '../types';
import { Save, Cloud, HelpCircle } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSave: (config: FirebaseConfig) => void;
    currentConfig?: FirebaseConfig;
}

export const CloudSetupModal: React.FC<Props> = ({ isOpen, onClose, onSave, currentConfig }) => {
    const [config, setConfig] = useState<FirebaseConfig>(currentConfig || {
        apiKey: '',
        authDomain: '',
        projectId: '',
        storageBucket: '',
        messagingSenderId: '',
        appId: ''
    });

    if (!isOpen) return null;

    const handleChange = (field: keyof FirebaseConfig, value: string) => {
        setConfig(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(config);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Cloud className="text-blue-500" /> Cloud Setup
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">Cancel</button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800 flex gap-2">
                        <HelpCircle className="shrink-0 mt-0.5" size={16} />
                        <p>
                            To sync across devices, create a free project at <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" className="underline font-bold">console.firebase.google.com</a> and paste the configuration here.
                            Ensure you enable "Google Auth" and "Firestore".
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500 uppercase">API Key</label>
                            <input
                                required
                                className="w-full p-2 border rounded font-mono text-sm"
                                value={config.apiKey}
                                onChange={e => handleChange('apiKey', e.target.value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500 uppercase">Auth Domain</label>
                            <input
                                required
                                className="w-full p-2 border rounded font-mono text-sm"
                                value={config.authDomain}
                                onChange={e => handleChange('authDomain', e.target.value)}
                                placeholder="project-id.firebaseapp.com"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500 uppercase">Project ID</label>
                            <input
                                required
                                className="w-full p-2 border rounded font-mono text-sm"
                                value={config.projectId}
                                onChange={e => handleChange('projectId', e.target.value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500 uppercase">Storage Bucket</label>
                            <input
                                required
                                className="w-full p-2 border rounded font-mono text-sm"
                                value={config.storageBucket}
                                onChange={e => handleChange('storageBucket', e.target.value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500 uppercase">Messaging Sender ID</label>
                            <input
                                required
                                className="w-full p-2 border rounded font-mono text-sm"
                                value={config.messagingSenderId}
                                onChange={e => handleChange('messagingSenderId', e.target.value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500 uppercase">App ID</label>
                            <input
                                required
                                className="w-full p-2 border rounded font-mono text-sm"
                                value={config.appId}
                                onChange={e => handleChange('appId', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition"
                        >
                            <Save size={18} /> Save Configuration
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
