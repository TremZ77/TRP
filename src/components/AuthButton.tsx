import React from 'react';
import { LogIn, LogOut, CloudOff } from 'lucide-react';
import type { User } from 'firebase/auth';

interface Props {
    user: User | null;
    onLogin: () => void;
    onLogout: () => void;
    isConfigured: boolean;
    onConfigure: () => void;
}

export const AuthButton: React.FC<Props> = ({ user, onLogin, onLogout, isConfigured, onConfigure }) => {
    if (!isConfigured) {
        return (
            <button
                onClick={onConfigure}
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 px-3 py-1.5 rounded-full transition-colors"
                title="Configure Cloud Sync"
            >
                <CloudOff size={16} /> Setup Cloud
            </button>
        );
    }

    if (user) {
        return (
            <div className="flex items-center gap-2">
                <img
                    src={user.photoURL || ''}
                    alt={user.displayName || 'User'}
                    className="w-8 h-8 rounded-full border border-slate-200"
                />
                <button
                    onClick={onLogout}
                    className="text-slate-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-colors"
                    title="Sign Out"
                >
                    <LogOut size={18} />
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={onLogin}
            className="flex items-center gap-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-full transition-colors shadow-sm"
        >
            <LogIn size={16} /> Sign In
        </button>
    );
}
