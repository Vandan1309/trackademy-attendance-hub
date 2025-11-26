// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const toast = document.getElementById('toast');
const logoutBtn = document.getElementById('logoutBtn');

function showToast(msg, time = 2500) {
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), time);
}

// Load saved theme
const saved = localStorage.getItem('trackadeny_theme');
if (saved === 'light') document.documentElement.classList.add('light');

themeToggle.addEventListener('click', () => {
  const isLight = document.documentElement.classList.toggle('light');
  localStorage.setItem('trackadeny_theme', isLight ? 'light' : 'dark');
  themeToggle.querySelector('.icon').textContent = isLight ? '☀️' : '🌙';
});

// Charts
new Chart(document.getElementById('daywiseChart'), {
  type: 'line',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [{
      label: 'Attendance',
      data: [90, 85, 88, 95, 92],
      borderColor: 'var(--accent)',
      backgroundColor: 'var(--accent)',
      fill: false,
      tension: 0.3
    }]
  },
  options: {
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true, max: 100 } }
  }
});

new Chart(document.getElementById('subjectwiseChart'), {
  type: 'pie',
  data: {
    labels: ['Math', 'Science', 'English', 'History', 'Art', 'PE'],
    datasets: [{
      data: [92, 88, 96, 81, 85, 89],
      backgroundColor: [
        '#0e0222ff', '#1d1139ff', '#55268eff', '#4e43aaff', '#8869d8ff', '#70a6d8ff'
      ]
    }]
  }
});

new Chart(document.getElementById('monthwiseChart'), {
  type: 'bar',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [{
      label: '% Attendance',
      data: [93, 88, 91, 87, 95],
       backgroundColor: [
        '#4e43aa', // Jan
        '#8869d8', // Feb
        '#70a6d8', // Mar
        '#1d1139', // Apr
        '#55268e'  // May
      ]
    }]
  },
  options: { scales: { y: { beginAtZero: true, max: 100 } } }
});

// Complaint form
const complaintForm = document.getElementById('complaintForm');
const complaintsList = document.getElementById('complaintsList');

complaintForm.addEventListener('submit', e => {
  e.preventDefault();
  const subject = document.getElementById('subject').value.trim();
  const description = document.getElementById('description').value.trim();
  if (!subject || !description) return showToast('Fill all fields');

  const li = document.createElement('li');
  li.textContent = `${subject}: ${description}`;
  complaintsList.appendChild(li);
  complaintForm.reset();
  showToast('Complaint submitted');
  // Supabase insert call goes here
});

// Logout
logoutBtn.addEventListener('click', () => {
  // supabase.auth.signOut() here
  window.location.href = 'index.html';
});

// Initialize icon
(function initIcon() {
  const icon = themeToggle.querySelector('.icon');
  icon.textContent = document.documentElement.classList.contains('light') ? '☀️' : '🌙';
})();
