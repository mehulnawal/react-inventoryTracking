import { useState } from "react";

import {
    Settings, Shield, Crown, Moon, Sun, Bell, ChevronDown, LogOut, User
} from 'lucide-react';
import { Outlet } from "react-router";

// Admin Navbar Component
export const AdminNavbar = ({ isDarkMode = false, onToggleDarkMode, user = { name: 'Admin User', email: 'admin@company.com', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face' } }) => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [notifications] = useState(5);

    return (
        <>
            <nav className={`${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-b transition-colors duration-200`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo and Title */}
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                                    <Crown className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="ml-4">
                                <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                    InventoryPro Admin
                                </h1>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    System Administration
                                </p>
                            </div>
                        </div>

                        {/* Right side items */}
                        <div className="flex items-center space-x-4">
                            {/* System Status */}
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    System Online
                                </span>
                            </div>

                            {/* Dark mode toggle */}
                            <button
                                onClick={onToggleDarkMode}
                                className={`p-2 rounded-lg transition-colors ${isDarkMode
                                    ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                            >
                                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>

                            {/* Notifications */}
                            <button className={`p-2 rounded-lg relative transition-colors ${isDarkMode
                                ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }`}>
                                <Bell className="w-5 h-5" />
                                {notifications > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                        {notifications}
                                    </span>
                                )}
                            </button>

                            {/* User Menu */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${isDarkMode
                                        ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                                        }`}
                                >
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-500"
                                    />
                                    <div className="hidden md:block text-left">
                                        <p className="text-sm font-medium flex items-center">
                                            {user.name}
                                            <Crown className="w-3 h-3 ml-1 text-purple-500" />
                                        </p>
                                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            Administrator
                                        </p>
                                    </div>
                                    <ChevronDown className="w-4 h-4" />
                                </button>

                                {/* Dropdown Menu */}
                                {isUserMenuOpen && (
                                    <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg border ${isDarkMode
                                        ? 'bg-gray-800 border-gray-700'
                                        : 'bg-white border-gray-200'
                                        } py-1 z-50`}>
                                        <a
                                            href="#"
                                            className={`flex items-center px-4 py-2 text-sm transition-colors ${isDarkMode
                                                ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                                : 'text-gray-700 hover:bg-gray-100'
                                                }`}
                                        >
                                            <User className="w-4 h-4 mr-3" />
                                            Admin Profile
                                        </a>
                                        <a
                                            href="#"
                                            className={`flex items-center px-4 py-2 text-sm transition-colors ${isDarkMode
                                                ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                                : 'text-gray-700 hover:bg-gray-100'
                                                }`}
                                        >
                                            <Settings className="w-4 h-4 mr-3" />
                                            Admin Settings
                                        </a>
                                        <a
                                            href="#"
                                            className={`flex items-center px-4 py-2 text-sm transition-colors ${isDarkMode
                                                ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                                : 'text-gray-700 hover:bg-gray-100'
                                                }`}
                                        >
                                            <Shield className="w-4 h-4 mr-3" />
                                            Security
                                        </a>
                                        <hr className={`my-1 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`} />
                                        <a
                                            href="#"
                                            className={`flex items-center px-4 py-2 text-sm transition-colors ${isDarkMode
                                                ? 'text-red-400 hover:bg-gray-700'
                                                : 'text-red-600 hover:bg-gray-100'
                                                }`}
                                        >
                                            <LogOut className="w-4 h-4 mr-3" />
                                            Sign out
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <Outlet />
        </>
    );
};