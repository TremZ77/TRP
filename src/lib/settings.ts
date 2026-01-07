import type { AppSettings } from '../types';

const SETTINGS_KEY = 'health_tracker_settings';

export const DEFAULT_SETTINGS: AppSettings = {
    appTitle: "Mum's Triage Tracker",
    primaryColor: '#3b82f6', // blue-600
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
};

export const getSettings = (): AppSettings => {
    try {
        const raw = localStorage.getItem(SETTINGS_KEY);
        if (!raw) return DEFAULT_SETTINGS;
        return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    } catch (error) {
        console.error("Failed to load settings", error);
        return DEFAULT_SETTINGS;
    }
};

export const saveSettings = (settings: AppSettings) => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};
