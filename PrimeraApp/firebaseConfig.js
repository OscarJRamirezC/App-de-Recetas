// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCzqcvHgpXM8jjabf6a3a0ZPyaxZ0A-T3w",
  authDomain: "pruebaapp-cfb1e.firebaseapp.com",
  projectId: "pruebaapp-cfb1e",
  storageBucket: "pruebaapp-cfb1e.firebasestorage.app",
  messagingSenderId: "970572905652",
  appId: "1:970572905652:web:0059bf0704bc17ac102be1",
  measurementId: "G-MPWJHS3VCP"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
