import {
    Search, Filter, Plus, Edit, Trash2, AlertTriangle, Package,
    ShoppingCart, Users, TrendingUp, TrendingDown, BarChart3,
    User, Mail, Lock, Eye, EyeOff
} from 'lucide-react';

const mockProducts = [
    { id: 1, name: "Laptop", category: "Electronics", price: 50000, stock: 12, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Mouse", category: "Electronics", price: 1500, stock: 45, image: "https://via.placeholder.com/150" },
    { id: 3, name: "Keyboard", category: "Electronics", price: 3000, stock: 8, image: "https://via.placeholder.com/150" },
    { id: 4, name: "Monitor", category: "Electronics", price: 25000, stock: 3, image: "https://via.placeholder.com/150" },
    { id: 5, name: "Desk Chair", category: "Furniture", price: 8000, stock: 15, image: "https://via.placeholder.com/150" },
    { id: 6, name: "Table Lamp", category: "Furniture", price: 2500, stock: 7, image: "https://via.placeholder.com/150" },
    { id: 7, name: "Headphones", category: "Electronics", price: 4500, stock: 20, image: "https://via.placeholder.com/150" },
    { id: 8, name: "Webcam", category: "Electronics", price: 6000, stock: 5, image: "https://via.placeholder.com/150" }
];

export const AdminDashboard = () => {
    return (
        <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Admin Dashboard</h2>

            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-blue-100 mb-1">Total Revenue</p>
                            <p className="text-3xl font-bold">₹12,45,000</p>
                            <p className="text-blue-100 text-sm mt-2">+25% from last month</p>
                        </div>
                        <TrendingUp className="h-12 w-12 text-blue-200" />
                    </div>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-green-100 mb-1">Total Orders</p>
                            <p className="text-3xl font-bold">2,340</p>
                            <p className="text-green-100 text-sm mt-2">+15% from last month</p>
                        </div>
                        <ShoppingCart className="h-12 w-12 text-green-200" />
                    </div>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-purple-100 mb-1">Active Users</p>
                            <p className="text-3xl font-bold">456</p>
                            <p className="text-purple-100 text-sm mt-2">+8% from last month</p>
                        </div>
                        <Users className="h-12 w-12 text-purple-200" />
                    </div>
                </div>

                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-orange-100 mb-1">Products</p>
                            <p className="text-3xl font-bold">1,234</p>
                            <p className="text-orange-100 text-sm mt-2">+12% from last month</p>
                        </div>
                        <Package className="h-12 w-12 text-orange-200" />
                    </div>
                </div>
            </div>

            {/* Charts and Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Sales Trends</h3>
                    <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                            <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500 dark:text-gray-400">Sales Chart Placeholder</p>
                            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Interactive chart would be displayed here</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Top Products</h3>
                    <div className="space-y-4">
                        {mockProducts.slice(0, 5).map((product, index) => (
                            <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className="flex items-center">
                                    <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                                        {index + 1}
                                    </span>
                                    <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg mr-3" />
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{product.category}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-gray-900 dark:text-white">₹{product.price.toLocaleString()}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{product.stock} sold</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Product Management Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Product Management</h3>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Product
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Product</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Stock</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                            {mockProducts.map(product => (
                                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg mr-4" />
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">ID: {product.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">{product.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">₹{product.price.toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${product.stock < 10
                                            ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
                                            : product.stock < 20
                                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                                                : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                                            }`}>
                                            {product.stock} units
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                                            Active
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex space-x-2">
                                            <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button className="text-red-600 hover:text-red-900 dark:text-red-400 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};