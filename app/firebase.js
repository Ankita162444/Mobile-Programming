import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";
 
const firebaseConfig = {
  apiKey: "AIzaSyD9wqPiyLcMv1Y3Bb9Yp2aBqcBNebyvUtk",
  authDomain: "smartwaste-d3e25.firebaseapp.com",
  databaseURL: "https://smartwaste-d3e25-default-rtdb.firebaseio.com",
  projectId: "smartwaste-d3e25",
  storageBucket: "smartwaste-d3e25.appspot.com",
  messagingSenderId: "530407595004",
  appId: "1:530407595004:web:045bec8cf9134f23e03079"
};
 
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
 
/** Save a pickup request to /pickups */
function savePickup(data) {
  return push(ref(db, "pickups"), { ...data, createdAt: serverTimestamp() });
}
 
/** Save a waste report to /reports */
function saveReport(data) {
  return push(ref(db, "reports"), { ...data, createdAt: serverTimestamp() });
}
 
export { db, savePickup, saveReport };