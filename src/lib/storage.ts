import type { HealthEntry, HealthEntryInput } from '../types';

const STORAGE_KEY = 'health_tracker_data';

export const getEntries = (): HealthEntry[] => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        return JSON.parse(raw);
    } catch (error) {
        console.error("Failed to load entries", error);
        return [];
    }
};

export const saveEntry = (entry: HealthEntryInput): HealthEntry => {
    const entries = getEntries();
    const newEntry: HealthEntry = {
        ...entry,
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
    };

    const updatedEntries = [newEntry, ...entries];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
    return newEntry;
};

export const updateEntry = (entry: HealthEntry): HealthEntry => {
    const entries = getEntries();
    const index = entries.findIndex(e => e.id === entry.id);

    if (index !== -1) {
        entries[index] = entry;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    }

    return entry;
};

export const clearEntries = () => {
    localStorage.removeItem(STORAGE_KEY);
}
