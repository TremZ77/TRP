import React from 'react';
import type { HealthEntry } from '../types';
import { format } from 'date-fns';
import { Download, Droplets, Heart, Wind, Weight, Activity, Trash2, Edit2 } from 'lucide-react';

interface Props {
    entries: HealthEntry[];
    onDelete: (id: string) => void;
    onEdit?: (entry: HealthEntry) => void;
    onExport: () => void;
}

export const Dashboard: React.FC<Props> = ({ entries, onDelete, onEdit, onExport }) => {
    if (entries.length === 0) {
        return (
            <div className="text-center py-10 text-slate-500">
                No entries yet. Start by adding one above!
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-slate-800">History</h2>
                <button
                    onClick={onExport}
                    className="flex items-center gap-2 text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg hover:bg-emerald-100 transition-colors"
                >
                    <Download size={16} />
                    Export to Excel
                </button>
            </div>

            <div className="grid gap-3">
                {entries.map((entry) => (
                    <div key={entry.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col gap-3">
                        <div className="flex justify-between items-center border-b border-slate-50 pb-2 group">
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-slate-500">
                                    {format(new Date(entry.timestamp), 'MMM d, yyyy')}
                                </span>
                                <span className="text-sm font-bold text-slate-700">
                                    {format(new Date(entry.timestamp), 'h:mm a')}
                                </span>
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => onEdit?.(entry)}
                                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    title="Edit Entry"
                                >
                                    <Edit2 size={16} />
                                </button>
                                <button
                                    onClick={() => onDelete(entry.id)}
                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Delete Entry"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-2 text-sm">
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-400 flex items-center gap-1"><Heart size={12} /> BP</span>
                                <span className="font-semibold">{entry.systolic_pressure}/{entry.diastolic_pressure}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-400 flex items-center gap-1"><Activity size={12} /> HR (BP)</span>
                                <span className="font-semibold">{entry.heart_rate_pressure} <span className="text-xs font-normal">bpm</span></span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-400 flex items-center gap-1"><Wind size={12} /> SpO2</span>
                                <span className="font-semibold">{entry.oxygen}%</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-400 flex items-center gap-1"><Activity size={12} /> HR (O2)</span>
                                <span className="font-semibold">{entry.heart_rate_oxygen} <span className="text-xs font-normal">bpm</span></span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-400 flex items-center gap-1"><Droplets size={12} /> Gluc</span>
                                <span className="font-semibold">{entry.glucose}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-400 flex items-center gap-1"><Weight size={12} /> Wgt</span>
                                <span className="font-semibold">{entry.weight}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
