import { utils, writeFile } from 'xlsx';
import type { HealthEntry } from '../types';
import { format } from 'date-fns';

export const exportToExcel = (entries: HealthEntry[]) => {
    const data = entries.map(entry => ({
        'Date': format(new Date(entry.timestamp), 'yyyy-MM-dd'),
        'Time': format(new Date(entry.timestamp), 'HH:mm:ss'),
        'Systolic': entry.systolic_pressure,
        'Diastolic': entry.diastolic_pressure,
        'Heart Rate (BP)': entry.heart_rate_pressure,
        'Oxygen': entry.oxygen,
        'Heart Rate (O2)': entry.heart_rate_oxygen,
        'Glucose': entry.glucose,
        'Weight': entry.weight,
    }));

    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Health Data');
    writeFile(wb, 'health-tracker-export.xlsx');
};
