import { useContext, useEffect, useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, Building, Sun, Moon, Chrome, Github } from 'lucide-react';
import { ThemeContext } from './Theme';
import { NavLink, useNavigate } from 'react-router';
import { Firebase } from './Firebase';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database'

// Registration Component
export const Registration = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        companyName: '',
        password: '',
        confirmPassword: '',
        terms: false
    });

    const [error, setError] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        companyName: '',
        password: '',
        confirmPassword: '',
        terms: ''
    });

    const [check, setCheck] = useState({
        firstName: false,
        lastName: false,
        email: false,
        phoneNumber: false,
        companyName: false,
        password: false,
        confirmPassword: false,
        terms: false
    });
    const navigate = useNavigate()

    function handleChange(e) {
        const { name, type, value, checked } = e.target;

        setFormData((prev) => ({ ...prev, [name]: type == 'checkbox' ? checked : value }));

        // first name validation
        if (name == 'firstName') {
            const nameRegex = /^[a-zA-Z]+$/
            if (value.trim() == '') {
                setError((prev) => ({ ...prev, firstName: 'Enter your First name' }));
                setCheck((prev) => ({ ...prev, firstName: false }));
            }
            else if (!nameRegex.test(value.trim())) {
                setError((prev) => ({ ...prev, firstName: 'Names can only have letters' }));
                setCheck((prev) => ({ ...prev, firstName: false }));
            }
            else {
                setError((prev) => ({ ...prev, firstName: '' }));
                setCheck((prev) => ({ ...prev, firstName: true }));
            }
        }

        // last name validation
        if (name == 'lastName') {
            const nameRegex = /^[a-zA-Z]+$/
            if (value.trim() == '') {
                setError((prev) => ({ ...prev, lastName: 'Enter your last name' }));
                setCheck((prev) => ({ ...prev, lastName: false }));
            }
            else if (!nameRegex.test(value.trim())) {
                setError((prev) => ({ ...prev, lastName: 'Names can only have letters' }));
                setCheck((prev) => ({ ...prev, lastName: false }));
            }
            else {
                setError((prev) => ({ ...prev, lastName: '' }));
                setCheck((prev) => ({ ...prev, lastName: true }));
            }
        }

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

        // Phone number
        if (name == 'phoneNumber') {
            const phoneNumberRegex = /^[0-9]{10}$/;
            if (value.trim() == '') {
                setError((prev) => ({ ...prev, phoneNumber: "Enter your phone number" }));
                setCheck((prev) => ({ ...prev, phoneNumber: false }));
            }
            else if (!phoneNumberRegex.test(value.trim())) {
                setError((prev) => ({ ...prev, phoneNumber: "Enter 10 digits number" }));
                setCheck((prev) => ({ ...prev, phoneNumber: false }));
            }
            else {
                setError((prev) => ({ ...prev, phoneNumber: "" }));
                setCheck((prev) => ({ ...prev, phoneNumber: true }));
            }
        }

        // company validation
        if (name == 'companyName') {
            if (value.trim() == '') {
                setError((prev) => ({ ...prev, companyName: 'Enter your company name' }));
                setCheck((prev) => ({ ...prev, companyName: false }));
            }
            else {
                setError((prev) => ({ ...prev, companyName: '' }));
                setCheck((prev) => ({ ...prev, companyName: true }));
            }
        }

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

            if (value != formData.confirmPassword) {
                setError((prev) => ({ ...prev, confirmPassword: 'Confirm password should match password' }));
                setCheck((prev) => ({ ...prev, confirmPassword: false }));
            }
        }

        // confirm password validation
        if (name == 'confirmPassword') {
            if (value != formData.password) {
                setError((prev) => ({ ...prev, confirmPassword: 'Confirm password should match password' }));
                setCheck((prev) => ({ ...prev, confirmPassword: false }));
            }
            else {
                setError((prev) => ({ ...prev, confirmPassword: '' }));
                setCheck((prev) => ({ ...prev, confirmPassword: true }));
            }
        }

        // terms validation
        if (name == 'terms') {
            if (!checked) {
                setError((prev) => ({ ...prev, terms: 'Accept terms & Condition' }));
                setCheck((prev) => ({ ...prev, terms: false }));
            }
            else {
                setError((prev) => ({ ...prev, terms: '' }));
                setCheck((prev) => ({ ...prev, terms: true }));
            }
        }
    }

    function handleFormSubmit(e) {
        e.preventDefault();

        const checkEvery = Object.entries(check).every((v) => v[1] === true);
        if (!checkEvery) {
            Object.entries(check).map((v) => {
                if (v[1] == false) {
                    if (v[0] == 'terms') setError((prev) => ({ ...prev, [v[0]]: `Accept ${v[0]}` }));
                    else setError((prev) => ({ ...prev, [v[0]]: `Enter your ${v[0]}` }));
                }
            })
            return;
        } else {
            setLoading(true);
            const auth = getAuth(Firebase);
            createUserWithEmailAndPassword(auth, formData.email, formData.password)
                .then((userCredential, res) => {
                    console.log(res)
                    const user = userCredential.user
                    const additionalUserData = {
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        phoneNumber: formData.phoneNumber,
                        companyName: formData.companyName,
                        email: formData.email,
                    }
                    const db = getDatabase(Firebase)
                    set(ref(db, `user/${user.uid}`), additionalUserData)
                    alert("Account Created Successfully")
                    navigate('/userDashboard');
                    setFormData({
                        firstName: '', lastName: '', email: '', phoneNumber: '', companyName: '', password: '', confirmPassword: '', terms: false
                    })
                })
                .catch((error) => {
                    if (error.code == 'auth/email-already-in-use') {
                        alert("Account already present. Login to proceed");
                        navigate('/');
                    }
                    else {
                        console.log(error)
                    }
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }

    return (
        <>
            <div className={`min-h-screen  flex items-center justify-center p-4 ${theme == 'dark' ? 'bg-[#212121] text-white' : 'bg-gradient-to-br from-green-50 via-blue-50 to-purple-50'} text-[#212121]`}>

                <div className="w-full max-w-2xl">
                    <div className="rounded-2xl shadow-xl p-8 border">

                        {/* title */}
                        <div className="text-center mb-8 relative">
                            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <User className="w-8 h-8" />
                            </div>
                            <h1 className="text-2xl font-bold ">Create Account</h1>
                            <p className="mt-2">Join us to manage your inventory efficiently</p>

                            {/* theme */}
                            <div onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')} className='absolute top-0 right-0 cursor-pointer'>
                                {theme == 'dark' ? <Sun /> : <Moon />}
                            </div>
                        </div>

                        {/* form */}
                        <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>

                            {/* First and Last name */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* first name */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${theme == 'dark' ? 'placeholder:text-gray-400' : 'placeholder:text-gray-600'} `}
                                        placeholder="John"
                                    />
                                    <span className='text-red-500'>{error && error.firstName}</span>
                                </div>

                                {/* last name */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${theme == 'dark' ? 'placeholder:text-gray-400' : 'placeholder:text-gray-600'} `}
                                        placeholder="Doe"
                                    />
                                    <span className='text-red-500'>{error && error.lastName}</span>
                                </div>
                            </div>

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
                                        className={`w-full pl-10 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${theme == 'dark' ? 'placeholder:text-gray-400' : 'placeholder:text-gray-600'} `}
                                        placeholder="john@company.com"
                                    />
                                </div>
                                <span className='text-red-500'>{error && error.email}</span>
                            </div>

                            {/* Phone Number & Company */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* phone number */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Phone className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            className={`w-full pl-10 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${theme == 'dark' ? 'placeholder:text-gray-400' : 'placeholder:text-gray-600'} `}
                                            placeholder="XXXXXXXXXX"
                                        />
                                    </div>
                                    <span className='text-red-500'>{error && error.phoneNumber}</span>
                                </div>

                                {/* company */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Company</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Building className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="companyName"
                                            value={formData.companyName}
                                            onChange={handleChange}
                                            className={`w-full pl-10 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${theme == 'dark' ? 'placeholder:text-gray-400' : 'placeholder:text-gray-600'} `}
                                            placeholder="Your Company"
                                        />
                                    </div>
                                    <span className='text-red-500'>{error && error.companyName}</span>
                                </div>
                            </div>

                            {/* Password and Confirm Password */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                            className={`w-full pl-10 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${theme == 'dark' ? 'placeholder:text-gray-400' : 'placeholder:text-gray-600'} `}
                                            placeholder="Create password"
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

                                {/* Confirm password */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Confirm Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className={`w-full pl-10 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${theme == 'dark' ? 'placeholder:text-gray-400' : 'placeholder:text-gray-600'} `}
                                            placeholder="Confirm password"
                                        />
                                        <button
                                            type="button"
                                            className={`absolute inset-y-0 right-0 pr-3 flex items-center ${theme == 'dark' ? 'placeholder:text-gray-400' : 'placeholder:text-gray-600'}`}
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                            ) : (
                                                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                            )}
                                        </button>
                                    </div>
                                    <span className='text-red-500'>{error && error.confirmPassword}</span>
                                </div>
                            </div>

                            {/* Terms & Conditions */}
                            <div className="flex items-center">
                                <input type="checkbox"
                                    name="terms"
                                    checked={formData.terms}
                                    onChange={handleChange}
                                    className="h-4 w-4 rounded cursor-pointer"
                                />
                                <span className="ml-2 text-sm">
                                    <div>I agree to the <span className="text-green-600 hover:text-green-500">Terms of Service </span> and
                                        <span className="text-green-600 hover:text-green-500 ml-1">Privacy Policy</span>
                                    </div>
                                </span>
                                <span className='text-red-500 ml-5'>{error && error.terms}</span>
                            </div>

                            {/* submit button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-3 px-4 rounded-lg hover:from-green-700 hover:to-blue-700 focus:ring-4 focus:ring-green-200 transition-all duration-200 font-medium cursor-pointer bg-gradient-to-r from-green-600 to-blue-600 text-white ${loading ? 'opacity-50 pointer-events-none' : ''}`}
                            >
                                {loading ?

                                    <div className='flex items-center justify-center space-x-2'>
                                        <div className='animate-spin text-white border-l-2 py-3 px-3 rounded-full'></div>
                                        <div>Submit</div>
                                    </div> : 'Submit'
                                }
                            </button>
                        </form>

                        {/*  */}
                        <div className="mt-8 text-center">
                            <p className="text-gray-600">
                                Already have an account?{' '}
                                <NavLink to="/" className="text-green-600 hover:text-green-500 font-medium">
                                    Sign in
                                </NavLink>
                            </p>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
};