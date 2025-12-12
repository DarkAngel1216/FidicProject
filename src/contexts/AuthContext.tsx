import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
    id: string;
    email: string;
    name: string;
    role: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Check for existing authentication on mount
    useEffect(() => {
        const storedAuth = localStorage.getItem('fidic_auth');
        if (storedAuth) {
            try {
                const authData = JSON.parse(storedAuth);
                setUser(authData.user);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Failed to parse auth data:', error);
                localStorage.removeItem('fidic_auth');
            }
        }
        setLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        setLoading(true);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock authentication - replace with real API call
        const validCredentials = [
            { email: 'admin@fidic.com', password: 'admin123', name: 'Admin User', role: 'Admin' },
            { email: 'user@fidic.com', password: 'user123', name: 'Regular User', role: 'User' },
        ];

        const matchedUser = validCredentials.find(
            cred => cred.email === email && cred.password === password
        );

        if (matchedUser) {
            const userData: User = {
                id: Math.random().toString(36).substr(2, 9),
                email: matchedUser.email,
                name: matchedUser.name,
                role: matchedUser.role,
            };

            setUser(userData);
            setIsAuthenticated(true);

            // Store authentication in localStorage
            localStorage.setItem('fidic_auth', JSON.stringify({ user: userData }));

            setLoading(false);
            return true;
        }

        setLoading(false);
        return false;
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('fidic_auth');
        navigate('/signin');
    };

    const updateProfile = (updates: Partial<User>) => {
        if (!user) return;

        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);

        // Update localStorage
        localStorage.setItem('fidic_auth', JSON.stringify({ user: updatedUser }));
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};
