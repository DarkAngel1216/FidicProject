import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogInIcon, MailIcon, LockIcon, AlertCircleIcon, EyeIcon, EyeOffIcon } from 'lucide-react';

const SignIn: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }

        if (!email.includes('@')) {
            setError('Please enter a valid email address');
            return;
        }

        setIsLoading(true);

        try {
            const success = await login(email, password);

            if (success) {
                navigate('/');
            } else {
                setError('Invalid email or password');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="flex justify-center">
                        <div className="bg-blue-600 dark:bg-blue-500 p-3 rounded-full">
                            <LogInIcon size={32} className="text-white" />
                        </div>
                    </div>
                    <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
                        FIDIC Project Management
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Sign in to your account
                    </p>
                </div>

                {/* Sign In Form */}
                <div className="bg-white dark:bg-gray-800 py-8 px-6 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start">
                                <AlertCircleIcon size={20} className="text-red-600 dark:text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
                            </div>
                        )}

                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MailIcon size={20} className="text-gray-400 dark:text-gray-500" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="admin@fidic.com"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <LockIcon size={20} className="text-gray-400 dark:text-gray-500" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? (
                                        <EyeOffIcon size={20} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300" />
                                    ) : (
                                        <EyeIcon size={20} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed dark:focus:ring-offset-gray-800"
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    <LogInIcon size={20} className="mr-2" />
                                    Sign In
                                </>
                            )}
                        </button>
                    </form>

                    {/* Demo Credentials */}
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-3">
                            Demo Credentials:
                        </p>
                        <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                            <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded">
                                <p className="font-medium">Admin:</p>
                                <p>Email: admin@fidic.com</p>
                                <p>Password: admin123</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded">
                                <p className="font-medium">User:</p>
                                <p>Email: user@fidic.com</p>
                                <p>Password: user123</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                    © 2024 FIDIC Project Management System. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default SignIn;
