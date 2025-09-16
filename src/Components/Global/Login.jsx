import { useContext, useEffect, useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Building, Sun, Moon, Github, Chrome, ChromeIcon } from 'lucide-react';
import { ThemeContext } from './Theme';
import { NavLink, useNavigate } from 'react-router';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { Firebase } from './Firebase';

export const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { theme, setTheme } = useContext(ThemeContext)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }, [])

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        // rememberMe: false
    });

    const [error, setError] = useState({
        email: '',
        password: '',
        // rememberMe: false
    });

    const [check, setCheck] = useState({
        email: false,
        password: false,
        // rememberMe: false
    });

    const [disabled, setDisabled] = useState({
        google: false,
        github: false,
        signInButton: false
    })

    const navigate = useNavigate()

    // handle form change
    function handleChange(e) {
        const { name, value } = e.target

        setFormData((prev) => ({ ...prev, [name]: value }));

        // email validation
        if (name == 'email') {
            const emailRegex = /^[a-zA-Z0-9+-._]+@[a-zA-Z0-9+-]+\.[a-zA-Z]{1,}$/;
            if (value.trim() == '') {
                setError((prev) => ({ ...prev, email: "Enter your Email" }));
                setCheck((prev) => ({ ...prev, email: false }));
            }
            else if (!emailRegex.test(value.trim())) {
                setError((prev) => ({ ...prev, email: "Invalid Email" }));
                setCheck((prev) => ({ ...prev, email: false }));
            }
            else {
                setError((prev) => ({ ...prev, email: "" }));
                setCheck((prev) => ({ ...prev, email: true }));
            }
        }

        // password validation
        // password validation
        if (name == 'password') {
            if (value.trim() == '') {
                setError((prev) => ({ ...prev, password: 'Enter your password' }));
                setCheck((prev) => ({ ...prev, password: false }));
            }
            else if (String(value.length) < 6) {
                setError((prev) => ({
                    ...prev, password: 'Password must be of atleast 6 digits'
                }));
                setCheck((prev) => ({ ...prev, password: false }));
            }
            else {
                setError((prev) => ({ ...prev, password: '' }));
                setCheck((prev) => ({ ...prev, password: true }));
            }
        }
    }

    // Google Sign Up
    function handleGoogleSignUp() {
        setLoading(true);
        setDisabled((prev => ({ ...prev, google: true })));
        const auth = getAuth(Firebase);
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(() => {
                alert("Login Successful")
                navigate('/userDashboard');
                setLoading(false);
            }).catch((error) => {
                if (error == "auth/cancelled-popup-request") {
                    setLoading(false);
                }
                else setLoading(true);
            }).finally(() => {
                setLoading(false);
                setDisabled((prev => ({ ...prev, google: false })));
            })
    }

    // handle form submit
    function handleFormSubmit(e) {
        e.preventDefault();
        const isValid = Object.entries(check).every(v => v != true);
        if (!isValid) {
            Object.entries(check).map(v => {
                if (v[1] == false) {
                    setError((prev) => ({ ...prev, [v[0]]: `Enter ${v[0]}` }))
                }
            })
            return;
        }
        else {
            setLoading(true);
            setDisabled(prev => ({ ...prev, signInButton: true }));
            const auth = getAuth(Firebase);
            signInWithEmailAndPassword(auth, formData.email, formData.password)
                .then(() => {
                    alert("Login Successful");
                    setFormData({ email: '', password: '' });
                    navigate('/userDashboard');
                })
                .catch(() => {
                    if (error.code == 'auth/user-not-found') {
                        alert("User not found. Register yourself");
                    }
                    else if (error.code == 'auth/wrong-password') {
                        alert("Password is wrong");
                    }
                    else {
                        alert("Something went wrong", error.message);
                    }
                })
                .finally(() => {
                    setLoading(false);
                    setDisabled(prev => ({ ...prev, signInButton: false }));
                })
        }
    }

    return (
        <div className={`min-h-screen ${theme == 'dark' ? 'bg-[#212121] text-white' : 'bg-gradient-to-br from-green-50 via-blue-50 to-purple-50'} text-[#212121] flex items-center justify-center p-4`}>
            <div className="w-full max-w-md">
                <div className="rounded-2xl shadow-xl p-8 border w-fit">
                    <div className="text-center mb-8 relative">
                        <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-4 hover:from-green-700 hover:to-blue-700 focus:ring-4 focus:ring-green-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Building className="w-8 h-8 " />
                        </div>
                        <h1 className="text-2xl font-bold">Welcome Back</h1>
                        <p className="mt-2">Sign in to your inventory account</p>

                        {/* theme */}
                        <div onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')} className='absolute top-0 right-0 cursor-pointer'>
                            {theme == 'dark' ? <Sun /> : <Moon />}
                        </div>
                    </div>

                    <div className='flex justify-center space-x-3 items-center w-fit'>

                        {/* Google Sign Up */}
                        <button
                            onClick={handleGoogleSignUp}
                            disabled={loading}
                            className={`w-fit whitespace-nowrap group relative flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium transition-all duration-200 text-white ${loading == true ? 'bg-gray-500 text-white  cursor-not-allowed' : 'bg-gradient-to-r from-[#4285F4] to-[#357ae8]'}`}
                        >{
                                disabled.google == true ? <div className='flex items-center space-x-2'>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    <div>Creating account...</div>
                                </div>
                                    :
                                    <div className='flex items-center space-x-2'>
                                        <ChromeIcon className="w-5 h-5 mr-3" />
                                        <div>Sign up with Google</div>
                                    </div>
                            }
                        </button>

                        {/* Github Sign Up */}
                        <button
                            // onClick={handleGoogleSignUp}
                            // disabled={isLoading}
                            className={`w-fit whitespace-nowrap group relative flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium transition-all duration-200 bg-gradient-to-r from-gray-800 to-black text-white`}
                        >
                            <Github className="w-5 h-5 mr-3" />
                            Sign Up with Github
                            {/* {isLoading ? 'Creating account...' : 'Sign Up with Github'} */}
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="relative mt-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className={`w-full border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className={`px-2 ${theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>
                                Or register with email
                            </span>
                        </div>
                    </div>

                    <form className="space-y-6 mt-8" onSubmit={handleFormSubmit}>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${theme == 'dark' ? 'placeholder:text-gray-400' : 'placeholder:text-gray-600'} `}
                                    placeholder="Enter your email"
                                />
                            </div>
                            <span className='text-red-500'>{error && error.email}</span>
                        </div>

                        {/* password */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${theme == 'dark' ? 'placeholder:text-gray-400' : 'placeholder:text-gray-600'}`}
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                            <span className='text-red-500'>{error && error.password}</span>
                        </div>

                        {/* remember me */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                    className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer`}
                                />
                                <span className="ml-2 text-sm">Remember me</span>
                            </label>
                            <a href="#" className="text-sm text-green-600 hover:text-green-500">
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-green-700 hover:to-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 font-medium 
                            ${loading == true ? 'opacity-50 pointer-events-none' : ''}`}
                        >
                            {disabled.signInButton == true ?
                                <div className='flex items-center justify-center space-x-2'>
                                    <div className='animate-spin text-white border-l-2 py-3 px-3 rounded-full'></div>
                                    <div>Sign In</div>
                                </div>
                                : 'Sign In'
                            }
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="">
                            Don't have an account?{' '}
                            <NavLink to="/register" className="text-green-600 hover:text-green-500 font-medium">
                                Sign up
                            </NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};