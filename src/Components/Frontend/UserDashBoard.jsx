import {
    Search, AlertTriangle, Package,
    ShoppingCart, Users, TrendingUp, TrendingDown, BarChart3,
} from 'lucide-react';

// Mock Data
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

export const UserDashboard = () => {
    return (
        <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Dashboard</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Products</p>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">1,234</p>
                            <div className="flex items-center mt-2">
                                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                                <span className="text-sm text-green-600">+12%</span>
                            </div>
                        </div>
                        <Package className="h-12 w-12 text-blue-500" />
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Low Stock Items</p>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">23</p>
                            <div className="flex items-center mt-2">
                                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                                <span className="text-sm text-red-600">+5 new</span>
                            </div>
                        </div>
                        <AlertTriangle className="h-12 w-12 text-red-500" />
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Recent Sales</p>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">₹2,45,000</p>
                            <div className="flex items-center mt-2">
                                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                                <span className="text-sm text-green-600">+18%</span>
                            </div>
                        </div>
                        <ShoppingCart className="h-12 w-12 text-green-500" />
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active Users</p>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">156</p>
                            <div className="flex items-center mt-2">
                                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                                <span className="text-sm text-green-600">+8%</span>
                            </div>
                        </div>
                        <Users className="h-12 w-12 text-purple-500" />
                    </div>
                </div>
            </div>

            {/* Low Stock Alerts & Transaction Form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Low Stock Alerts */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Low Stock Alerts</h3>
                    <div className="space-y-4">
                        {mockProducts.filter(p => p.stock < 10).map(product => (
                            <div key={product.id} className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                                <div className="flex items-center">
                                    <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg mr-4" />
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-white">{product.name}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{product.category}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300">
                                        {product.stock} left
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Transaction Form */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Record Transaction</h3>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Transaction Type</label>
                            <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                                <option>Sale</option>
                                <option>Purchase</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Product</label>
                            <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                                {mockProducts.map(product => (
                                    <option key={product.id}>{product.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quantity</label>
                                <input
                                    type="number"
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    placeholder="0"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date</label>
                                <input
                                    type="date"
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            Record Transaction
                        </button>
                    </form>
                </div>
            </div>

            {/* Search, Filter, Sort Controls */}
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search transactions..."
                                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-full sm:w-64"
                            />
                        </div>
                        <select className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                            <option>All Types</option>
                            <option>Sales</option>
                            <option>Purchases</option>
                        </select>
                        <select className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                            <option>Sort by Date</option>
                            <option>Sort by Amount</option>
                            <option>Sort by Product</option>
                        </select>
                    </div>
                </div>

                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Transaction data will appear here</p>
                </div>
            </div>
        </div>
    );
};