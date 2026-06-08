import React, { createContext, useContext, useEffect, useState } from 'react';
import { pb } from '../lib/pocketbase';

interface AuthContextType {
    user: any; // Type according to your PocketBase schema
    isValid: boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isValid: false,
    logout: () => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(pb.authStore.model);
    const [isValid, setIsValid] = useState<boolean>(pb.authStore.isValid);

    useEffect(() => {
        // Escuta mudanças de autenticação no PocketBase
        const unsubscribe = pb.authStore.onChange((token, model) => {
            setUser(model);
            setIsValid(!!token && !!model);
        }, true);

        return () => {
            // Limpa listener no unmount
            unsubscribe();
        };
    }, []);

    const logout = () => {
        pb.authStore.clear();
    };

    return (
        <AuthContext.Provider value={{ user, isValid, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
