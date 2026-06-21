import { db } from "./firebase.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";
 
console.log("SmartWaste Loaded ✅");
 
document.addEventListener("DOMContentLoaded", () => {
 
  // ---------------- TOAST ----------------
  function showToast(msg) {
    const toast = document.getElementById("toast");
    if (!toast) return;
 
    toast.textContent = msg;
    toast.classList.add("show");
 
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2000);
  }
 
  // ---------------- SAFE SIGN IN ----------------
  const signinForm = document.getElementById("signin-form");
 
  if (signinForm) {
    signinForm.addEventListener("submit", (e) => {
      e.preventDefault();
      window.location.href = "dashboard.html";
    });
  }
 
  // ---------------- PASSWORD TOGGLE ----------------
  const togglePw = document.getElementById("toggle-password");
 
  if (togglePw) {
    togglePw.addEventListener("click", () => {
      const pw = document.getElementById("password");
      if (!pw) return;
      pw.type = pw.type === "password" ? "text" : "password";
    });
  }
 
  // ---------------- BUTTON SELECT FIX ----------------
  function enableSelect(groupId) {
    const container = document.getElementById(groupId);
    if (!container) return;
 
    container.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
 
      container.querySelectorAll("button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  }
 
  enableSelect("report-waste-type");
  enableSelect("report-urgency");
  enableSelect("pickup-waste-type");
  enableSelect("pickup-time-slot");
 
  // ---------------- FIREBASE SAVE: REPORT ----------------
  const submitBtn = document.getElementById("submit-report-btn");
 
  if (submitBtn) {
    submitBtn.addEventListener("click", () => {
 
      const categoryBtn = document.querySelector("#report-waste-type .active");
      const urgencyBtn = document.querySelector("#report-urgency .active");
 
      const category = categoryBtn?.dataset.value || "general";
      const urgency = urgencyBtn?.dataset.value || "low";
 
      const id = Date.now().toString();
 
      set(ref(db, "reports/" + id), {
        category: category,
        urgency: urgency,
        status: "new"
      })
      .then(() => {
        showToast("Report saved ✅");
      })
      .catch((err) => {
        console.error(err);
        showToast("Firebase error ❌");
      });
 
    });
  }
 
  // ---------------- FIREBASE SAVE: PICKUP ----------------
  const confirmPickupBtn = document.getElementById("confirm-pickup-btn");
 
  if (confirmPickupBtn) {
    confirmPickupBtn.addEventListener("click", () => {
 
      const wasteTypeBtn = document.querySelector("#pickup-waste-type .active");
      const timeSlotBtn = document.querySelector("#pickup-time-slot .active");
      const dateInput = document.getElementById("pickup-date");
      const addressInput = document.getElementById("pickup-address");
 
      const wasteType = wasteTypeBtn?.dataset.value || "general";
      const timeSlot = timeSlotBtn?.dataset.value || "morning";
      const date = dateInput?.value || "";
      const address = addressInput?.value || "";
 
      const id = Date.now().toString();
 
      set(ref(db, "pickups/" + id), {
        wasteType: wasteType,
        timeSlot: timeSlot,
        date: date,
        address: address,
        status: "scheduled"
      })
      .then(() => {
        showToast("Pickup confirmed ✅");
      })
      .catch((err) => {
        console.error(err);
        showToast("Firebase error ❌");
      });
 
    });
  }
 
  // ---------------- DASHBOARD BUTTONS ----------------
  const notifBtn = document.getElementById("notif-btn");
  if (notifBtn) {
    notifBtn.addEventListener("click", () => {
      showToast("No notifications");
    });
  }
 
});