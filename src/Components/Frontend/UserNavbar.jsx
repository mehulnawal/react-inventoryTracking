import { useContext, useEffect, useState } from "react";
import userDefaultProfile from '../../assets/userDefailtProfile.png'
import {
    Package, User, Moon, Sun, Bell, ChevronDown, LogOut, Settings, Menu, X
} from 'lucide-react';
import { Link, Outlet, useNavigate } from "react-router";
import { ThemeContext } from "../Global/Theme";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Firebase } from "../Global/Firebase";

export const UserNavbar = () => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { theme, setTheme } = useContext(ThemeContext)
    const [user, setUser] = useState(null);
    const navigate = useNavigate()

    // User
    useEffect(() => {
        const auth = getAuth(Firebase);
        const check = onAuthStateChanged(auth, (res) => {
            if (res) setUser(res)
            else setUser(null)
        })
        return () => check();
    }, [user])

    // User profile
    const [userProfile, setUserProfile] = useState(null);
    useEffect(() => {
        setUserProfile(user?.photoURL || userDefaultProfile)
    }, [user])

    function handleSignOut() {
        if (confirm("Do you want to sign out ?")) {
            const auth = getAuth(Firebase);
            signOut(auth).then(() => {
                alert("Successful Sign out");
                navigate('/')
            }).catch((error) => console.log(error))
        }
    }

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMobileMenuOpen && !event.target.closest('.mobile-menu')) {
                setIsMobileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMobileMenuOpen]);

    return (
        <>
            <nav className={`${theme == 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-b transition-colors duration-200`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo and Title */}
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                    <Package className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="ml-4">
                                <Link to='/userDashboard'>
                                    <h1 className={`text-xl font-bold ${theme == 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                        InventoryPro
                                    </h1>
                                </Link>
                            </div>
                        </div>

                        {/* Navigation Links - Desktop */}
                        <div className="hidden md:flex items-center space-x-8">
                            <ul className="flex items-center space-x-6">
                                <li>
                                    <Link
                                        to="/userDashboard"
                                        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${theme == 'dark'
                                            ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                                            }`}
                                    >
                                        <User className="w-4 h-4 mr-2" />
                                        User Dashboard
                                    </Link>
                                </li>

                                <li className={`${user?.email == 'admin123@gmail.com' ? 'block' : 'hidden'}`}>
                                    <Link
                                        to="/admin"
                                        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${theme == 'dark'
                                            ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                                            } `}
                                    >
                                        <Settings className="w-4 h-4 mr-2" />
                                        Admin Panel
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Right side items - Desktop */}
                        <div className="hidden md:flex items-center space-x-4">
                            {/* Theme toggle */}
                            <button
                                onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}
                                className={`p-2 rounded-lg transition-colors ${theme == 'dark'
                                    ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                            >
                                {theme == 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>

                            {/* User Menu */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${theme == 'dark'
                                        ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                                        }`}
                                >
                                    <img
                                        src={userProfile}
                                        alt={user?.displayName != null ? user.displayName : 'User'}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <div className="hidden lg:block text-left">
                                        <p className="text-sm font-medium">{user?.displayName != null ? user.displayName : 'User'}</p>
                                        <p className={`text-xs ${theme == 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                            {user?.email}
                                        </p>
                                    </div>
                                    <ChevronDown className="w-4 h-4" />
                                </button>

                                {/* Dropdown Menu */}
                                {isUserMenuOpen && (
                                    <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg border ${theme == 'dark'
                                        ? 'bg-gray-800 border-gray-700'
                                        : 'bg-white border-gray-200'
                                        } py-1 z-50`}>
                                        <hr className={`my-1 ${theme == 'dark' ? 'border-gray-700' : 'border-gray-200'}`} />
                                        <a
                                            href="#"
                                            onClick={handleSignOut}
                                            className={`flex items-center px-4 py-2 text-sm transition-colors ${theme == 'dark'
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

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center space-x-2">
                            {/* Theme toggle - Mobile */}
                            <button
                                onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}
                                className={`p-2 rounded-lg transition-colors ${theme == 'dark'
                                    ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                            >
                                {theme == 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>

                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className={`p-2 rounded-lg transition-colors ${theme == 'dark'
                                    ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                            >
                                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMobileMenuOpen && (
                    <div className={`md:hidden mobile-menu ${theme == 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border-t`}>
                        <div className="px-4 py-3 space-y-3">
                            {/* Navigation Links - Mobile */}
                            <div className="space-y-2">
                                <Link
                                    to="/userDashboard"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${theme == 'dark'
                                        ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                                        }`}
                                >
                                    <User className="w-4 h-4 mr-3" />
                                    User Dashboard
                                </Link>
                                <Link
                                    to="/admin"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${theme == 'dark'
                                        ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                                        } ${user?.email == 'admin123@gmail.com' ? 'block' : 'hidden'}`}
                                >
                                    <Settings className="w-4 h-4 mr-3" />
                                    Admin Panel
                                </Link>
                            </div>

                            {/* User info - Mobile */}
                            <div className={`border-t pt-3 ${theme == 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                                <div className="flex items-center px-3 py-2">
                                    <img
                                        src={userProfile}
                                        alt={user?.displayName != null ? user.displayName : 'User'}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <div className="ml-3">
                                        <p className={`text-sm font-medium ${theme == 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                            {user?.displayName != null ? user.displayName : 'User'}
                                        </p>
                                        <p className={`text-xs ${theme == 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                            {user?.email}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleSignOut}
                                    className={`flex items-center w-full px-3 py-2 text-sm transition-colors ${theme == 'dark'
                                        ? 'text-red-400 hover:bg-gray-700'
                                        : 'text-red-600 hover:bg-gray-100'
                                        } rounded-md`}
                                >
                                    <LogOut className="w-4 h-4 mr-3" />
                                    Sign out
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </nav >
            <Outlet />
        </>
    );
};
