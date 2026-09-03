import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDQTd4Vz3Eprm26yYZM197cFdpwL4Qss6c",
    authDomain: "online-sayuran.firebaseapp.com",
    projectId: "online-sayuran",
    storageBucket: "online-sayuran.firebasestorage.app",
    messagingSenderId: "281578821752",
    appId: "1:281578821752:web:c7aee6196ca8b1f9ed758d",
    measurementId: "G-HXC4WBL9B8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };