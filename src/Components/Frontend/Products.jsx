import { useState } from 'react';
import {
    Search, Edit, Trash2
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

export const ProductComponent = () => {
    const [viewMode, setViewMode] = useState('grid');

    return (
        <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Products</h2>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-full sm:w-64"
                        />
                    </div>

                    <select className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                        <option>All Categories</option>
                        <option>Electronics</option>
                        <option>Furniture</option>
                    </select>

                    <select className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                        <option>Sort by Name</option>
                        <option>Sort by Price</option>
                        <option>Sort by Stock</option>
                    </select>

                    <div className="flex rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`px-3 py-2 text-sm ${viewMode === 'grid'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                }`}
                        >
                            Grid
                        </button>
                        <button
                            onClick={() => setViewMode('table')}
                            className={`px-3 py-2 text-sm ${viewMode === 'table'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                }`}
                        >
                            Table
                        </button>
                    </div>
                </div>
            </div>

            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {mockProducts.map(product => (
                        <div key={product.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{product.name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{product.category}</p>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-lg font-bold text-gray-900 dark:text-white">₹{product.price.toLocaleString()}</span>
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${product.stock < 10
                                        ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
                                        : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                                        }`}>
                                        {product.stock} in stock
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                                        View Details
                                    </button>
                                    <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <Edit className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Product</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Stock</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                                {mockProducts.map(product => (
                                    <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg mr-4" />
                                                <span className="font-medium text-gray-900 dark:text-white">{product.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">{product.category}</td>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">₹{product.price.toLocaleString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${product.stock < 10
                                                ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
                                                : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                                                }`}>
                                                {product.stock} units
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex space-x-2">
                                                <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 p-1">
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button className="text-red-600 hover:text-red-900 dark:text-red-400 p-1">
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
            )}
        </div>
    );
};