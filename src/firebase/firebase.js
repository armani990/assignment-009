import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLEbr84dp3h3bmRjAiCHItfVJcPrSsXXs",
  authDomain: "green-nest-ph9.firebaseapp.com",
  projectId: "green-nest-ph9",
  storageBucket: "green-nest-ph9.firebasestorage.app",
  messagingSenderId: "313412472601",
  appId: "1:313412472601:web:9e5e3483d9676020e07f88"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;