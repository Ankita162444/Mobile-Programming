
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
  import {getDatabase} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyANlJ96jUmnPSrvdAP-TTYRVFYNWIY4Tuo",
    authDomain: "mobile-program-7d016.firebaseapp.com",
    projectId: "mobile-program-7d016",
    storageBucket: "mobile-program-7d016.firebasestorage.app",
    messagingSenderId: "425333695809",
    appId: "1:425333695809:web:5f32c791f6b836a11fadc0"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app)

  console.log(db)
 nn 