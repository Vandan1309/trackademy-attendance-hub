
// script.js — handles theme toggle, simple form behavior and a basic face-scan UI stub
const root = document.documentElement;
const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const yearEl = document.getElementById('year');
const toast = document.getElementById('toast');

// set year
yearEl.textContent = new Date().getFullYear();

// load theme from localStorage
const saved = localStorage.getItem('trackadeny_theme');
if (saved === 'light') document.documentElement.classList.add('light');

function showToast(msg, time = 2500){
  toast.textContent = msg; toast.classList.add('show');
  setTimeout(()=> toast.classList.remove('show'), time);
}

// Theme toggle


// Login form: basic validation + demo
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const pass = document.getElementById('password').value.trim();
  if (!email || !pass){ showToast('Please fill all fields'); return; }
  // Demo success
  showToast('Signed in — demo only');
  // In production: send credentials to your server via fetch()
});



// small progressive enhancement: set initial theme icon
(function initIcon(){
  const icon = themeToggle.querySelector('.icon');
  icon.textContent = document.documentElement.classList.contains('light') ? '☀️' : '🌙';
})();
