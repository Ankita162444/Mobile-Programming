import { db } from "./firebase.js";
import { ref, push, set, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";
 
const NAV_ITEMS = [
  { icon: '🏠', label: 'Home',    screen: 'dashboard' },
  { icon: '🚛', label: 'Pickup',  screen: 'pickup'    },
  { icon: '⚠',  label: 'Report',  screen: 'report'    },
  { icon: '👤', label: 'Profile', screen: 'profile'   },
];
 
/* ── Live clock in status bar ── */
function updateClock() {
  const el = document.getElementById('status-time');
  if (!el) return;
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes().toString().padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  el.textContent = `${h12}:${m} ${ampm}`;
}
 
/* ── Toast ── */
let toastTimer = null;
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}
 
/* ── Screen navigation ── */
function navigate(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('screen-' + screenId);
  if (target) {
    target.classList.add('active');
    target.querySelector('.screen-content')?.scrollTo(0, 0);
  }
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.screen === screenId);
  });
}
 
/* ── Build bottom navs ── */
function buildNavs() {
  document.querySelectorAll('.bottom-nav').forEach(nav => {
    const activeScreen = nav.dataset.screen;
    NAV_ITEMS.forEach(item => {
      const btn = document.createElement('button');
      btn.className = 'nav-item' + (item.screen === activeScreen ? ' active' : '');
      btn.dataset.screen = item.screen;
      btn.innerHTML = `<span class="nav-icon">${item.icon}</span><span>${item.label}</span>`;
      btn.addEventListener('click', () => navigate(item.screen));
      nav.appendChild(btn);
    });
  });
}
 
/* ── Selectable card groups ── */
function enableSelect(groupId) {
  const container = document.getElementById(groupId);
  if (!container) return;
  container.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    container.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
}
 
/* ── Photo preview ── */
function initPhotoUpload() {
  const input = document.getElementById('photo-input');
  const wrap  = document.getElementById('photo-preview-wrap');
  if (!input || !wrap) return;
  input.addEventListener('change', () => {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      wrap.innerHTML = `<img src="${e.target.result}" alt="Waste photo preview" />`;
    };
    reader.readAsDataURL(file);
  });
}
 
/* ── data-nav shortcut on any element ── */
function initDataNav() {
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-nav]');
    if (el) navigate(el.dataset.nav);
  });
}
 
/* ── Dashboard buttons ── */
function initDashboard() {
  document.getElementById('notif-btn')?.addEventListener('click', () => showToast('No new notifications'));
  document.getElementById('find-bin-btn')?.addEventListener('click', () => showToast('Nearest bin: 200m away 📍'));
}
 
/* ── Pickup confirm → save to Firebase ── */
function initPickup() {
  const btn = document.getElementById('confirm-pickup-btn');
  if (!btn) return;
  btn.addEventListener('click', async () => {
    const wasteType = document.querySelector('#pickup-waste-type .active')?.dataset.value || 'general';
    const timeSlot  = document.querySelector('#pickup-time-slot .active')?.dataset.value  || 'morning';
    const date      = document.getElementById('pickup-date')?.value    || '';
    const address   = document.getElementById('pickup-address')?.value || '';
 
    btn.disabled = true;
    try {
      const newRef = push(ref(db, 'pickups'));
      await set(newRef, { wasteType, timeSlot, date, address, createdAt: serverTimestamp() });
      showToast('Pickup confirmed ✅');
      navigate('dashboard');
    } catch (err) {
      console.error('Failed to save pickup:', err);
      showToast('Could not save pickup — try again');
    } finally {
      btn.disabled = false;
    }
  });
}
 
/* ── Report submit → save to Firebase ── */
function initReport() {
  const btn = document.getElementById('submit-report-btn');
  if (!btn) return;
  btn.addEventListener('click', async () => {
    const category = document.querySelector('#report-waste-type .active')?.dataset.value || 'general';
    const urgency  = document.querySelector('#report-urgency .active')?.dataset.value    || 'low';
 
    btn.disabled = true;
    try {
      const newRef = push(ref(db, 'reports'));
      await set(newRef, { category, urgency, createdAt: serverTimestamp() });
      showToast('Report submitted ✅');
      navigate('dashboard');
    } catch (err) {
      console.error('Failed to save report:', err);
      showToast('Could not submit report — try again');
    } finally {
      btn.disabled = false;
    }
  });
}
 
/* ── Profile buttons ── */
function initProfile() {
  document.getElementById('personal-details-btn')?.addEventListener('click', () => showToast('Personal details coming soon'));
  document.getElementById('notifications-btn')?.addEventListener('click', () => showToast('Notifications coming soon'));
  document.getElementById('signout-btn')?.addEventListener('click', () => showToast('Signed out — bye, Ankita 👋'));
}
 
/* ══ INIT (single listener, fires once) ══ */
document.addEventListener('DOMContentLoaded', () => {
  buildNavs();
  initDataNav();
  initDashboard();
  initPickup();
  initReport();
  initProfile();
  initPhotoUpload();
 
  enableSelect('pickup-waste-type');
  enableSelect('pickup-time-slot');
  enableSelect('report-waste-type');
  enableSelect('report-urgency');
 
  updateClock();
  setInterval(updateClock, 30_000);
});