// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getDatabase, ref, set, update } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBwn2flcrmt1O4BfTQzJI1IphczR9QyIq8",
    authDomain: "contact-us-19947.firebaseapp.com",
    databaseURL: "https://contact-us-19947-default-rtdb.firebaseio.com",
    projectId: "contact-us-19947",
    storageBucket: "contact-us-19947.firebasestorage.app",
    messagingSenderId: "289973320794",
    appId: "1:289973320794:web:595ce5c34086ba92c8ec63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

console.log(db);

let currentId = null;

// Submit Data
window.submitData = function () {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const contact = document.getElementById("contact").value;
    const address = document.getElementById("address").value;
    const message = document.getElementById("message").value;

    currentId = Date.now().toString();

    set(ref(db, "contacts/" + currentId), {
        id: currentId,
        name: name,
        email: email,
        contact: contact,
        address: address,
        message: message
    })
    .then(() => {

        document.getElementById("details-name").value = name;
        document.getElementById("details-email").value = email;
        document.getElementById("details-contact").value = contact;
        document.getElementById("details-address").value = address;
        document.getElementById("details-message").value = message;

        alert("Data Submitted Successfully!");
    })
    .catch((error) => {
        console.log(error);
    });
};

// Edit Data
window.editData = function () {

    document.getElementById("name").value =
        document.getElementById("details-name").value;

    document.getElementById("email").value =
        document.getElementById("details-email").value;

    document.getElementById("contact").value =
        document.getElementById("details-contact").value;

    document.getElementById("address").value =
        document.getElementById("details-address").value;

    document.getElementById("message").value =
        document.getElementById("details-message").value;
};

// Update Data
window.updateData = function () {

    if (!currentId) {
        alert("Please submit data first.");
        return;
    }

    const email = document.getElementById("email").value;
    const contact = document.getElementById("contact").value;
    const address = document.getElementById("address").value;
    const message = document.getElementById("message").value;

    update(ref(db, "contacts/" + currentId), {
        name: name,
        email: email,
        contact: contact,
        address: address,
        message: message
    })
    .then(() => {

        document.getElementById("details-name").value = name;
        document.getElementById("details-email").value = email;
        document.getElementById("details-contact").value = contact;
        document.getElementById("details-address").value = address;
        document.getElementById("details-message").value = message;

        alert("Data Updated Successfully!");
    })
    .catch((error) => {
        console.log(error);
    });
};