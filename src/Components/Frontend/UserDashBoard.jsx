import {
    Search, AlertTriangle, Package,
    ShoppingCart, Users, TrendingUp, TrendingDown, BarChart3,
} from 'lucide-react';
import { ThemeContext } from '../Global/Theme';
import { useContext, useEffect, useState } from 'react';
import { getDatabase, onValue, push, ref, set } from 'firebase/database';
import { Firebase } from '../Global/Firebase';

export const UserDashboard = () => {

    const { theme } = useContext(ThemeContext)
    const [categoryValue, setCategoryValue] = useState({})
    const [originalData, setOriginalData] = useState([])
    const [transaction, setTransaction] = useState([]);
    const [lowStock, SetLowStock] = useState([]);

    const [formData, setFormData] = useState({
        type: '',
        category: '',
        quantity: 0,
        date: ''
    })

    const [error, setError] = useState({
        type: '',
        category: '',
        quantity: '',
        date: ''
    })

    const [check, setCheck] = useState({
        type: false,
        category: false,
        quantity: false,
        date: false,
    })

    // setting min date for transaction
    const [today, setToday] = useState(() => {
        const today = new Date();
        today.setDate(today.getDate() - 10)
        const date = today.toISOString().split("T")[0]
        return date;
    })

    // storing product category from backend
    useEffect(() => {
        const db = getDatabase(Firebase);
        const productCategoryRef = ref(db, '/productsCategory')
        onValue(productCategoryRef, (res) => {
            const data = res.val();
            setCategoryValue(data);
        })
    }, [])

    // handle form data
    function handleFormData(e) {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }));

        // type
        if (name == 'type') {
            if (value == '') {
                setError((prev) => ({ ...prev, type: 'Select Transaction type' }));
                setCheck((prev) => ({ ...prev, type: false }))
            }
            else {
                setError((prev) => ({ ...prev, type: '' }));
                setCheck((prev) => ({ ...prev, type: true }))
            }
        }



        // category
        if (name == 'category') {
            if (value == '') {
                setError((prev) => ({ ...prev, category: 'Select Category' }));
                setCheck((prev) => ({ ...prev, category: false }))
            }
            else {
                setError((prev) => ({ ...prev, category: '' }));
                setCheck((prev) => ({ ...prev, category: true }))
            }
        }


        // quantity
        if (name == 'quantity') {
            if (value == 0) {
                setError((prev) => ({ ...prev, quantity: 'Enter Quantity' }));
                setCheck((prev) => ({ ...prev, quantity: false }))
            }
            else {
                setError((prev) => ({ ...prev, quantity: '' }));
                setCheck((prev) => ({ ...prev, quantity: true }))
            }
        }


        // date
        if (name == 'date') {
            if (value.length == 0) {
                setError((prev) => ({ ...prev, date: 'Enter date' }));
                setCheck((prev) => ({ ...prev, date: false }))
            }
            else {
                setError((prev) => ({ ...prev, date: '' }));
                setCheck((prev) => ({ ...prev, date: true }))
            }
        }


    }

    // handle Form Submit
    function handleFormSubmit(e) {
        e.preventDefault();
        const isValid = Object.entries(check).every(v => v[1] == true);
        if (!isValid) {
            Object.entries(check).map((value) => {
                if (value[1] == false) {
                    setError((prev) => ({ ...prev, [value[0]]: `Enter ${value[0]}` }));
                }
            });
        }
        else {
            const db = getDatabase(Firebase);
            // const transactionId = transactionRef.key
            const productImage = Object.entries(categoryValue).filter((value) => value[0] == formData.category);


            set(push(ref(db, '/transactions')), {
                type: formData.type,
                category: formData.category,
                quantity: formData.quantity,
                date: formData.date,
                productImage: productImage[0][1]
            })
            alert("Transaction Recorded");
            setFormData({ type: '', category: '', quantity: 0, date: '' })
        }
    }

    // storing transactions from backend
    useEffect(() => {
        const db = getDatabase(Firebase);
        const transactionRef = ref(db, '/transactions');
        onValue(transactionRef, (res) => {
            const data = res.val();
            setTransaction(data);
            setOriginalData(data);

            const lowStockValues = Object.entries(data).filter(([key, value]) => {
                if (value.quantity < 10) return value
            })
            SetLowStock(lowStockValues);
        })
    }, [])

    // Handle Searching
    function handleSearching(e) {
        const searchValue = e.target.value;
        if (searchValue != '') {
            let searchedCategory = Object.entries(transaction).filter(([id, v]) => {
                return v.category.toLowerCase().includes(searchValue.toLowerCase())
                // return (v.category.toLowerCase()).includes(searchValue.toLowerCase())
            })
            const searchedObject = Object.fromEntries(searchedCategory);
            setTransaction(searchedObject)
        }
        else {
            setTransaction(originalData);
        }
    }

    useEffect(() => {
        console.log(transaction)
    }, [transaction])

    return (
        <>
            <div className={`p-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} min-h-screen`}>
                <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-8`}>Dashboard</h2>

                {/* Low Stock Alerts & Transaction Form */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Low Stock Alerts */}
                    <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-6`}>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} flex items-center`}>
                                <div className="w-2 h-2 bg-red-500 rounded-full mr-3 animate-pulse"></div>
                                Low Stock Alerts
                            </h3>
                            <span className={`text-sm ${theme === 'dark' ? 'text-gray-400 bg-red-900/20' : 'text-gray-500 bg-red-50'} px-2 py-1 rounded-full`}>
                                {Object.entries(transaction).length > 0 ? lowStock.length : 0} items
                            </span>
                        </div>

                        <div className="space-y-4">
                            {Object.entries(transaction).length > 0 ? (
                                lowStock.map(([id, value]) => (
                                    <div
                                        key={id}
                                        className={`flex items-center p-4 ${theme === 'dark' ? 'bg-gradient-to-r from-red-900/20 to-orange-900/20 border-red-800' : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200'} border rounded-lg hover:shadow-md transition-all duration-200`}
                                    >
                                        {/* Product Image */}
                                        <div className="flex-shrink-0 mr-4">
                                            <div className="relative">
                                                <img
                                                    src={value.productImage}
                                                    alt={value.category}
                                                    className={`w-16 h-16 rounded-lg object-cover border-2 ${theme === 'dark' ? 'border-red-700' : 'border-red-200'}`}
                                                />
                                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                                    !
                                                </div>
                                            </div>
                                        </div>


                                        {/* Product Details */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <h4 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} truncate`}>
                                                    {value.category}
                                                </h4>
                                                <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${theme === 'dark' ? 'bg-red-900/50 text-red-300' : 'bg-red-100 text-red-800'}`}>
                                                    {value.quantity <= 10 && value.quantity > 5 ? 'Low' : value.quantity <= 5 && value.quantity > 0 ? 'Critical' : 'Out of Stock'}


                                                </span>
                                            </div>


                                            <div className={`mt-2 flex items-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                                <svg className="w-4 h-4 mr-1 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                                </svg>
                                                <span className={`font-medium ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                                                    {value.quantity} items left
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10">
                                    <div className="flex flex-col items-center">
                                        <div className={`w-16 h-16 ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-100'} rounded-full flex items-center justify-center mb-4`}>
                                            <svg className={`w-8 h-8 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <h4 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>
                                            All Good!
                                        </h4>
                                        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
                                            No low stock alerts at this time. All inventory levels are healthy.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Transaction Form */}
                    <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-6`}>
                        <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-6`}>Record Transaction</h3>

                        <form className="space-y-4" onSubmit={handleFormSubmit}>

                            {/* Transaction type */}
                            <div>
                                <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Transaction Type</label>
                                <select
                                    className={`w-full border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-lg px-4 py-3`}
                                    name='type'
                                    value={formData.type}
                                    onChange={handleFormData}
                                >
                                    <option value=''>Select option</option>
                                    <option value='sale'>Sale</option>
                                    <option value='purchase'>Purchase</option>
                                </select>
                                <span className='text-red-500'>{error && error.type}</span>
                            </div>

                            {/* Product category */}
                            <div>
                                <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Product</label>
                                <select className={`w-full border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-lg px-4 py-3`}
                                    name='category'
                                    value={formData.category}
                                    onChange={handleFormData}
                                >
                                    <option value=''>Select option</option>
                                    {Object.keys(categoryValue).map(v => {
                                        return <>
                                            <option value={v}>{v}</option>
                                        </>
                                    })}
                                </select>
                                <span className='text-red-500'>{error && error.category}</span>
                            </div>


                            {/* Quantity & Date */}
                            <div className="grid grid-cols-2 gap-4">


                                {/* Quantity */}
                                <div>
                                    <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Quantity</label>
                                    <input
                                        type="number"
                                        name='quantity'
                                        value={formData.quantity}
                                        onChange={handleFormData}
                                        className={`w-full border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-lg px-4 py-3`}
                                        placeholder="0"
                                    />
                                    <span className='text-red-500'>{error && error.quantity}</span>
                                </div>


                                {/* Date */}
                                <div>
                                    <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Date</label>
                                    <input
                                        type="date"
                                        name='date'
                                        min={today}
                                        value={formData.date}
                                        onChange={handleFormData}
                                        className={`w-full border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-lg px-4 py-3`}
                                    />
                                    <span className='text-red-500'>{error && error.date}</span>
                                </div>
                            </div>


                            {/* Record Transaction - btn */}
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                Record Transaction
                            </button>
                        </form>
                    </div>
                </div >

                {/* Searching */}
                <div className={`mt-8 rounded-xl shadow-sm border p-6 ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white text-gray-900 border-gray-200'}`}>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                        <h3 className="text-xl font-semibold">All Transactions</h3>
                        <div className="flex flex-col sm:flex-row gap-3">

                            {/* searchings */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    onChange={handleSearching}
                                    placeholder="Search transactions..."
                                    className={`pl-10 pr-4 py-2 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-lg w-full sm:w-64`}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={`w-full ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} p-6 rounded-xl`}>
                        <div className="overflow-x-auto">
                            <table className={`w-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
                                <thead className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                    <tr>
                                        <th className={`px-6 py-4 text-left text-xs font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} uppercase tracking-wider`}>
                                            Type
                                        </th>
                                        <th className={`px-6 py-4 text-left text-xs font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} uppercase tracking-wider`}>
                                            Category
                                        </th>
                                        <th className={`px-6 py-4 text-left text-xs font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} uppercase tracking-wider`}>
                                            Quantity
                                        </th>
                                        <th className={`px-6 py-4 text-left text-xs font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} uppercase tracking-wider`}>
                                            Date
                                        </th>
                                        <th className={`px-6 py-4 text-left text-xs font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} uppercase tracking-wider`}>
                                            Product Image
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className={`${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'} divide-y`}>
                                    {(transaction) ? (
                                        <>
                                            {Object.entries(transaction).map(([id, data]) => (
                                                <tr
                                                    key={id}
                                                    className={`${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors duration-200`}
                                                >
                                                    {/* transaction type */}
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span
                                                            className={`inline-flex items-center px-3 py-1 rounded-full text-md ${data.type === 'sale'
                                                                ? theme === 'dark'
                                                                    ? 'bg-green-900 text-green-300 border border-green-700'
                                                                    : 'bg-green-100 text-green-800 border border-green-200'
                                                                : theme === 'dark'
                                                                    ? 'bg-blue-900 text-blue-300 border border-blue-700'
                                                                    : 'bg-blue-100 text-blue-800 border border-blue-200'
                                                                }`}
                                                        >
                                                            {data.type === 'sale' ? '↗️' : '↙️'} {data.type}
                                                        </span>
                                                    </td>

                                                    {/* category */}
                                                    <td className={`px-6 py-4 whitespace-nowrap text-md font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                                                        {data.category}
                                                    </td>


                                                    {/* quantity */}
                                                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                                        <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                                                            {data.quantity}
                                                        </span>
                                                    </td>


                                                    {/* date */}
                                                    <td className={`px-6 py-4 whitespace-nowrap text-md ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                                        {new Date(data.date).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </td>


                                                    {/* product image */}
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex-shrink-0 h-20 w-20">
                                                            <img
                                                                className={`h-full rounded-lg object-cover border-2 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}
                                                                src={data.productImage}
                                                                alt="Product"
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className={`px-6 py-16 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                                <div className="flex flex-col items-center">
                                                    <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                                    <p className="text-lg font-medium mb-1">No Transaction Data</p>
                                                    <p className="text-sm">Transaction data will appear here when available</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
