import React, { useState, useEffect } from 'react';
import type { AppSettings } from '../types';
import { X, Save, RotateCcw } from 'lucide-react';
import { DEFAULT_SETTINGS } from '../lib/settings';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    currentSettings: AppSettings;
    onSave: (settings: AppSettings) => void;
}

export const SettingsModal: React.FC<Props> = ({ isOpen, onClose, currentSettings, onSave }) => {
    const [settings, setSettings] = useState<AppSettings>(currentSettings);

    useEffect(() => {
        setSettings(currentSettings);
    }, [currentSettings, isOpen]);

    if (!isOpen) return null;

    const handleChange = (field: keyof AppSettings, value: string) => {
        setSettings(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        onSave(settings);
        onClose();
    };

    const handleReset = () => {
        setSettings(DEFAULT_SETTINGS);
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b border-slate-100">
                    <h2 className="text-lg font-semibold text-slate-800">App Settings</h2>
                    <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full text-slate-500">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* App Title */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700">App Title</label>
                        <input
                            type="text"
                            value={settings.appTitle}
                            onChange={(e) => handleChange('appTitle', e.target.value)}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-slate-400 outline-none"
                        />
                    </div>

                    {/* Primary Color */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700">Primary Color</label>
                        <div className="flex gap-3 items-center">
                            <input
                                type="color"
                                value={settings.primaryColor}
                                onChange={(e) => handleChange('primaryColor', e.target.value)}
                                className="h-10 w-20 p-1 rounded cursor-pointer border"
                            />
                            <span className="text-sm text-slate-500 font-mono">{settings.primaryColor}</span>
                        </div>
                    </div>

                    {/* Font Family */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700">Font Style</label>
                        <select
                            value={settings.fontFamily}
                            onChange={(e) => handleChange('fontFamily', e.target.value)}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-slate-400 outline-none bg-white"
                        >
                            <option value="Inter, system-ui, sans-serif">Modern Sans (Inter)</option>
                            <option value="'Times New Roman', serif">Classic Serif</option>
                            <option value="'Courier New', monospace">Monospace</option>
                            <option value="'Comic Sans MS', 'Chalkboard SE', sans-serif">Playful</option>
                        </select>
                    </div>
                </div>

                <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-between">
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-800 font-medium text-sm"
                    >
                        <RotateCcw size={16} /> Reset
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-medium text-sm shadow-sm"
                    >
                        <Save size={16} /> Apply Changes
                    </button>
                </div>
            </div>
        </div>
    );
};
