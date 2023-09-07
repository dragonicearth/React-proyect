import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAwAoAsn8FEyTQkMlZU24Wbu2JTHqevHv0",
    authDomain: "coffeeshop-5fa77.firebaseapp.com",
    projectId: "coffeeshop-5fa77",
    storageBucket: "coffeeshop-5fa77.appspot.com",
    messagingSenderId: "649489354524",
    appId: "1:649489354524:web:7083908daf5a6ffec734d9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);