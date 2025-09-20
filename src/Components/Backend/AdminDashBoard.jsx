import {
    Search, Filter, Plus, Edit, Trash2, AlertTriangle, Package,
    ShoppingCart, Users, TrendingUp, TrendingDown, BarChart3,
    User, Mail, Lock, Eye, EyeOff
} from 'lucide-react';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { ThemeContext } from '../Global/Theme';
import { get, getDatabase, onValue, push, ref, remove, set, update } from 'firebase/database';
import { Firebase } from '../Global/Firebase';


export const AdminDashboard = () => {

    const [categoryValue, setCategoryValue] = useState({})
    const [products, setProducts] = useState({})
    const { theme } = useContext(ThemeContext)
    const [formData, setFormData] = useState({
        name: '',
        quantity: 0,
        category: '',
        image: ''
    })
    const [productImage, setProductImage] = useState({
        keyboard1: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK2KxRfURBKuQDBRDOygqGCdLjl65gzLzwcg&s',
        keyboard2: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpaljPhicwyg-NlLTMsYWZPHPUclYpVpcPwA&s',
        laptop1: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeFpsJF8rkFCxCltNQl96YLDqbjGIBhwRk0Q&s',
        laptop2: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRswDVM2T6P6VadgpKtPKLmUblovA2wAj8v2Q&s',
    })

    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);

    // storing product category from backend
    useEffect(() => {
        const db = getDatabase(Firebase);
        const productCategoryRef = ref(db, '/productsCategory')
        onValue(productCategoryRef, (res) => {
            const data = res.val();
            setCategoryValue(data);
        })
    }, [])

    function handleFormData(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // add product
    async function handleFormSubmit(e) {
        e.preventDefault();
        const db = getDatabase(Firebase);
        const productImage2 = Object.entries(productImage).filter(v => v[0] == formData.category);

        if (isEdit == false) {
            await set(push(ref(db, '/products')), {
                name: formData.name,
                quantity: formData.quantity,
                category: formData.category,
                image: productImage2[0][1],
            })
            alert("Product Added")
            setFormData({ name: '', category: '', quantity: '' });
        }
        else {
            const productRef = ref(db, `/products/${editId}`)
            update(productRef, {
                name: formData.name,
                quantity: formData.quantity,
                category: formData.category,
                image: productImage2[0][1]
            })
            alert("Product Edited")
            setIsEdit(false)
            setFormData({ name: '', category: '', quantity: '' });
        }
    }

    const productsList = () => {
        const db = getDatabase(Firebase);
        const productRef = ref(db, '/products');
        onValue(productRef, (res) => {
            const data = res.val();
            setProducts(data);
        })
    }
    useEffect(() => {
        return productsList();
    }, [])

    // Handle delete function
    function handleDelete(id) {
        if (confirm("Do you want to delete the product")) {
            const db = getDatabase(Firebase);
            const productRef = ref(db, `/products/${id}`);
            remove(productRef);
            alert("Product Deleted");
            productsList();
        }
    }

    // Handle edit
    async function handleEdit(id) {
        setIsEdit(true);
        setEditId(id);
        const db = getDatabase(Firebase);
        const productRef = ref(db, `/products/${id}`)
        const value = await get(productRef)
        const data = value.val();
        setFormData({ category: data.category, name: data.name, quantity: data.quantity });
    }

    return (
        <div className={`p-4 sm:p-6 max-w-screen-xl mx-auto ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} min-h-screen`}>
            <h2 className={`text-2xl sm:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-8`}>Admin Dashboard</h2>

            {/* Add Product Form */}
            <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-4 sm:p-6 mb-8`}>
                <h3 className={`text-lg sm:text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-6`}>
                    {isEdit ? 'Edit product' : 'Add New Product'}
                </h3>

                <form className="space-y-6" onSubmit={handleFormSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

                        {/* Product Name */}
                        <div>
                            <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                                Product Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleFormData}
                                placeholder="Enter product name"
                                className={`w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                            />
                        </div>

                        {/* Units */}
                        <div>
                            <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                                Units
                            </label>
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleFormData}
                                placeholder="Enter number of units"
                                className={`w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                            />
                        </div>
                    </div>

                    {/* Category Dropdown */}
                    <div>
                        <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                            Category
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleFormData}
                            className={`w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                        >
                            <option value="">Select Option</option>
                            {Object.keys(categoryValue).map((v) => (
                                <option key={v} value={v}>{v}</option>
                            ))}
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-5 py-2.5 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium flex items-center"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            {isEdit ? 'Edit product' : 'Add New Product'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Product Management Section */}
            <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-4 sm:p-6`}>
                <div className="flex items-center justify-between mb-6">
                    <h3 className={`text-lg sm:text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Product Management</h3>
                </div>

                {/* Table Scroll container */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px] sm:min-w-full table-auto">
                        <thead className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <tr>
                                <th className={`px-3 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Product Image</th>
                                <th className={`px-3 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Category</th>
                                <th className={`px-3 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Stock</th>
                                <th className={`px-3 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className={`${theme === 'dark' ? 'divide-gray-600' : 'divide-gray-200'} divide-y`}>
                            {Object.entries(products).length > 0 && products != null && products != undefined ? (
                                Object.entries(products).map(([id, product]) => (
                                    <tr key={id} className={`${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                                        {/* Image */}
                                        <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <img src={product.image} alt={product.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg mr-3 sm:mr-4" />
                                                <div>
                                                    <p className={`font-medium text-sm sm:text-base ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{product.name}</p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Category */}
                                        <td className={`px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm sm:text-base ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                            {product.category}
                                        </td>

                                        {/* Stock */}
                                        <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm sm:text-base">
                                            <span className={`inline-flex px-2.5 py-1.5 text-xs sm:text-sm font-semibold rounded-full ${product.quantity < 10
                                                ? theme === 'dark' ? 'bg-red-900/50 text-red-300' : 'bg-red-100 text-red-800'
                                                : product.quantity < 20
                                                    ? theme === 'dark' ? 'bg-yellow-900/50 text-yellow-300' : 'bg-yellow-100 text-yellow-800'
                                                    : theme === 'dark' ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-800'
                                                }`}
                                            >
                                                {product.quantity} units
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                                            <div className="flex space-x-1 sm:space-x-2">
                                                <button
                                                    className={`${theme === 'dark' ? 'text-blue-400 hover:bg-blue-900/20' : 'text-blue-600 hover:bg-blue-50'} hover:text-blue-900 p-1.5 sm:p-2 rounded-lg transition-colors`}
                                                    onClick={() => handleEdit(id)}
                                                    aria-label="Edit product"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </button>

                                                <button
                                                    className={`${theme === 'dark' ? 'text-red-400 hover:bg-red-900/20' : 'text-red-600 hover:bg-red-50'} hover:text-red-900 p-1.5 sm:p-2 rounded-lg transition-colors`}
                                                    onClick={() => handleDelete(id)}
                                                    aria-label="Delete product"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className={`px-6 py-16 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                        <div className="flex flex-col items-center">
                                            <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                            <p className="text-lg font-medium mb-1">No Products Found</p>
                                            <p className="text-sm">Add your first product to get started</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
