// import { Mail, User, Building, AlertCircle } from 'lucide-react';

// export const ErrorPage = () => {
//     return (
//         <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
//             <div className="text-center">
//                 <div className="mb-8">
//                     <div className="w-32 h-32 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-8">
//                         <AlertCircle className="w-16 h-16 text-white" />
//                     </div>
//                     <h1 className="text-9xl font-bold text-gray-300 mb-4">404</h1>
//                     <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Page Not Found</h2>
//                     <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
//                         Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
//                     </p>
//                 </div>

//                 <div className="space-y-4">
//                     <button className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-3 rounded-lg hover:from-red-700 hover:to-orange-700 transition-all duration-200 font-medium">
//                         Go Back Home
//                     </button>
//                     <div className="text-sm text-gray-600">
//                         <p>Need help? <a href="#" className="text-red-600 hover:text-red-500">Contact Support</a></p>
//                     </div>
//                 </div>

//                 <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
//                     <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
//                         <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
//                             <Building className="w-6 h-6 text-blue-600" />
//                         </div>
//                         <h3 className="font-semibold text-gray-900 mb-2">Dashboard</h3>
//                         <p className="text-gray-600 text-sm">Return to your main dashboard</p>
//                     </div>
//                     <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
//                         <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
//                             <User className="w-6 h-6 text-green-600" />
//                         </div>
//                         <h3 className="font-semibold text-gray-900 mb-2">Profile</h3>
//                         <p className="text-gray-600 text-sm">Manage your account settings</p>
//                     </div>
//                     <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
//                         <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
//                             <Mail className="w-6 h-6 text-purple-600" />
//                         </div>
//                         <h3 className="font-semibold text-gray-900 mb-2">Support</h3>
//                         <p className="text-gray-600 text-sm">Get help from our team</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

import { Mail, User, Building, AlertCircle, Lock } from 'lucide-react';

export const ErrorPage = ({ type }) => {
    // Default content for "404"
    let title = "Page Not Found";
    let description =
        "Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.";
    let icon = <AlertCircle className="w-16 h-16 text-white" />;
    let gradient = "from-red-500 to-orange-500";
    let mainCode = "404";

    // If type is "access-denied"
    if (type === "access-denied") {
        title = "Access Denied";
        description =
            "You don’t have permission to view this page. Please contact your administrator or return to the dashboard.";
        icon = <Lock className="w-16 h-16 text-white" />;
        gradient = "from-purple-500 to-indigo-500";
        mainCode = "403";
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
            <div className="text-center">
                <div className="mb-8">
                    <div
                        className={`w-32 h-32 bg-gradient-to-r ${gradient} rounded-full flex items-center justify-center mx-auto mb-8`}
                    >
                        {icon}
                    </div>
                    <h1 className="text-9xl font-bold text-gray-300 mb-4">{mainCode}</h1>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                        {description}
                    </p>
                </div>

                <div className="space-y-4">
                    <button className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-3 rounded-lg hover:from-red-700 hover:to-orange-700 transition-all duration-200 font-medium">
                        Go Back Home
                    </button>
                    <div className="text-sm text-gray-600">
                        <p>
                            Need help?{" "}
                            <a href="#" className="text-red-600 hover:text-red-500">
                                Contact Support
                            </a>
                        </p>
                    </div>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <Building className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Dashboard</h3>
                        <p className="text-gray-600 text-sm">Return to your main dashboard</p>
                    </div>
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <User className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Profile</h3>
                        <p className="text-gray-600 text-sm">Manage your account settings</p>
                    </div>
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <Mail className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Support</h3>
                        <p className="text-gray-600 text-sm">Get help from our team</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
