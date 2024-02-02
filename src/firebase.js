// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDT4ehhRk98LS5bdyTnruIwDEgcp6mxfWo",
    authDomain: "netflix-clone-2f864.firebaseapp.com",
    projectId: "netflix-clone-2f864",
    storageBucket: "netflix-clone-2f864.appspot.com",
    messagingSenderId: "315539223556",
    appId: "1:315539223556:web:1ad9af4811ea7f558c3151",
    measurementId: "G-TCFR86GY2X"
  };

  //Inititalizing firebase App
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth();

  export { auth, app }
  export default db;