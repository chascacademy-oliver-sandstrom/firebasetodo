import { initializeApp } from 'firebase/app';

import {
    getFirestore
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCD4N8hRvZMoKqUBsnM4eK5U-sIofOTx9E",
    authDomain: "react-todolist-c50ac.firebaseapp.com",
    projectId: "react-todolist-c50ac",
    storageBucket: "react-todolist-c50ac.appspot.com",
    messagingSenderId: "326228210145",
    appId: "1:326228210145:web:472f966e8ef824fea222a0",
    measurementId: "G-LX0C0BRDMP"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db