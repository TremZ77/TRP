import React, { useState, useEffect } from 'react';
import type { HealthEntry, HealthEntryInput } from '../types';
import { Save, Activity, Heart, Weight, Droplets, Wind, X } from 'lucide-react';

interface Props {
    onSave: (entry: HealthEntryInput) => void;
    initialData?: HealthEntry | null;
    onCancel?: () => void;
}

type FormState = Record<keyof HealthEntryInput, string>;

const DEFAULT_FORM: FormState = {
    systolic_pressure: '',
    diastolic_pressure: '',
    glucose: '',
    oxygen: '',
    heart_rate_pressure: '',
    heart_rate_oxygen: '',
    weight: '',
};

export const HealthForm: React.FC<Props> = ({ onSave, initialData, onCancel }) => {
    const [formData, setFormData] = useState<FormState>(DEFAULT_FORM);

    useEffect(() => {
        if (initialData) {
            const { id, timestamp, ...rest } = initialData;
            const stringData = Object.entries(rest).reduce((acc, [key, val]) => ({
                ...acc,
                [key]: val.toString()
            }), {} as FormState);
            setFormData(stringData);
        } else {
            setFormData(DEFAULT_FORM);
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Convert all fields to numbers, defaulting to 0 if empty (though required attribute should prevent this)
        const numericData: HealthEntryInput = {
            systolic_pressure: Number(formData.systolic_pressure) || 0,
            diastolic_pressure: Number(formData.diastolic_pressure) || 0,
            glucose: Number(formData.glucose) || 0,
            oxygen: Number(formData.oxygen) || 0,
            heart_rate_pressure: Number(formData.heart_rate_pressure) || 0,
            heart_rate_oxygen: Number(formData.heart_rate_oxygen) || 0,
            weight: Number(formData.weight) || 0,
        };

        onSave(numericData);
        if (!initialData) setFormData(DEFAULT_FORM); // Reset if it was a new entry
    };

    const handleChange = (field: keyof FormState, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const isEditing = !!initialData;

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                    <Activity className="text-blue-500" />
                    {isEditing ? 'Edit Entry' : 'New Entry'}
                </h2>
                {isEditing && onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                        title="Cancel Editing"
                    >
                        <X size={20} />
                    </button>
                )}
            </div>

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
                className={`w-full ${isEditing ? 'bg-orange-600 hover:bg-orange-700 shadow-orange-200' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'} text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg`}
            >
                <Save size={20} />
                {isEditing ? 'Update Entry' : 'Save Entry'}
            </button>
        </form>
    );
};

export default HealthForm;
