// lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDZM39MjrtisbqJ8lRCd2c-gqApp-_Vnxo",
  authDomain: "porto-zan.firebaseapp.com",
  projectId: "porto-zan",
  storageBucket: "porto-zan.firebasestorage.app",
  messagingSenderId: "1004175958249",
  appId: "1:1004175958249:web:1d47da7bd967273c39d078"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
