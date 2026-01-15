// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB7ak6tWGgC9-fRJNY8GoHBpIB-FMPVIio",
  authDomain: "fja---plataform.firebaseapp.com",
  projectId: "fja---plataform",
  storageBucket: "fja---plataform.appspot.com",
  messagingSenderId: "165691485924",
  appId: "1:165691485924:web:cfb4a4b453d53480eec6f1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
