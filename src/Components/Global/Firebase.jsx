import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyBc-nENHpERIfqAx73kWUMHxrguFQ8RGho",
    authDomain: "inventoryapp-12092025.firebaseapp.com",
    projectId: "inventoryapp-12092025",
    storageBucket: "inventoryapp-12092025.firebasestorage.app",
    messagingSenderId: "473170950947",
    appId: "1:473170950947:web:f5bab4af52dff55053ea96",
    databaseURL: 'https://inventoryapp-12092025-default-rtdb.firebaseio.com/',
};

// Initialize Firebase
export const Firebase = initializeApp(firebaseConfig);