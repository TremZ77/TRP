import React, { useState } from 'react';
import type { HealthEntryInput } from '../types';
import { Save, Activity, Heart, Weight, Droplets, Wind } from 'lucide-react';

interface Props {
    onSave: (entry: HealthEntryInput) => void;
}

export const HealthForm: React.FC<Props> = ({ onSave }) => {
    const [formData, setFormData] = useState<HealthEntryInput>({
        systolic_pressure: 120,
        diastolic_pressure: 80,
        glucose: 90,
        oxygen: 98,
        heart_rate_pressure: 70,
        heart_rate_oxygen: 70,
        weight: 70,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    const handleChange = (field: keyof HealthEntryInput, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: Number(value)
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 space-y-6">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                <Activity className="text-blue-500" />
                New Entry
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Blood Pressure */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-600 flex items-center gap-2">
                        <Heart size={16} className="text-red-500" /> Blood Pressure (mmHg)
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            value={formData.systolic_pressure}
                            onChange={e => handleChange('systolic_pressure', e.target.value)}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Systolic"
                            required
                        />
                        <span className="self-center text-slate-400">/</span>
                        <input
                            type="number"
                            value={formData.diastolic_pressure}
                            onChange={e => handleChange('diastolic_pressure', e.target.value)}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Diastolic"
                            required
                        />
                    </div>
                </div>

                {/* Heart Rate (Pressure) */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-600 flex items-center gap-2">
                        <Activity size={16} className="text-orange-500" /> Heart Rate (bpm)
                    </label>
                    <input
                        type="number"
                        value={formData.heart_rate_pressure}
                        onChange={e => handleChange('heart_rate_pressure', e.target.value)}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                    />
                </div>

                {/* Oxygen */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-600 flex items-center gap-2">
                        <Wind size={16} className="text-cyan-500" /> Oxygen (SpO2 %)
                    </label>
                    <input
                        type="number"
                        value={formData.oxygen}
                        onChange={e => handleChange('oxygen', e.target.value)}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                    />
                </div>

                {/* Heart Rate (Oxygen) */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-600 flex items-center gap-2">
                        <Activity size={16} className="text-orange-500" /> Heart Rate (bpm)
                    </label>
                    <input
                        type="number"
                        value={formData.heart_rate_oxygen}
                        onChange={e => handleChange('heart_rate_oxygen', e.target.value)}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                    />
                </div>

                {/* Glucose */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-600 flex items-center gap-2">
                        <Droplets size={16} className="text-pink-500" /> Glucose
                    </label>
                    <input
                        type="number"
                        value={formData.glucose}
                        onChange={e => handleChange('glucose', e.target.value)}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                    />
                </div>

                {/* Weight */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-600 flex items-center gap-2">
                        <Weight size={16} className="text-indigo-500" /> Weight
                    </label>
                    <input
                        type="number"
                        value={formData.weight}
                        onChange={e => handleChange('weight', e.target.value)}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                    />
                </div>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-200"
            >
                <Save size={20} />
                Save Entry
            </button>
        </form>
    );
};
