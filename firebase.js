// Importa as funções necessárias do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Configuração do Firebase (use a SUA, não essa de exemplo)
 const firebaseConfig = {
    apiKey: "AIzaSyB7ak6tWGgC9-fRJNY8GoHBpIB-FMPVIio",
    authDomain: "fja---plataform.firebaseapp.com",
    projectId: "fja---plataform",
    storageBucket: "fja---plataform.firebasestorage.app",
    messagingSenderId: "165691485924",
    appId: "1:165691485924:web:cfb4a4b453d53480eec6f1"
  };

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firestore
const db = getFirestore(app);

// Exporta o banco para outros arquivos usarem
export { db };
