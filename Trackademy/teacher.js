// Theme toggle and toast
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

// Charts placeholders (class-level)
new Chart(document.getElementById('classDaywiseChart'), {
  type: 'line',
  data: {
    labels: ['Mon','Tue','Wed','Thu','Fri'],
    datasets: [{
      label: 'Avg Attendance %',
      data: [85,90,87,88,92],
      borderColor: 'var(--accent)',
      backgroundColor: 'var(--accent)',
      fill: false,
      tension: 0.3
    }]
  }
});
new Chart(document.getElementById('classSubjectwiseChart'), {
  type: 'bar',
  data: {
    labels: ['Math','Science','English','History','Art','PE'],
    datasets: [{
      label: 'Avg Attendance %',
      data: [88,91,86,80,89,93],
      backgroundColor: 'var(--accent)'
    }]
  }
});
new Chart(document.getElementById('classMonthwiseChart'), {
  type: 'bar',
  data: {
    labels: ['Jan','Feb','Mar','Apr','May'],
    datasets: [{
      label: 'Attendance %',
      data: [90,87,88,92,91],
      backgroundColor: 'var(--accent)'
    }]
  }
});

// Individual student charts placeholders
let studentDayChart = new Chart(document.getElementById('studentDaywiseChart'), {
  type: 'line',
  data: { labels:['Mon','Tue','Wed','Thu','Fri'], datasets:[{label:'Attendance',data:[0,0,0,0,0],borderColor:'var(--accent)'}]}
});
let studentSubChart = new Chart(document.getElementById('studentSubjectwiseChart'), {
  type: 'pie',
  data: { labels:['Math','Science','English','History','Art','PE'], datasets:[{data:[0,0,0,0,0,0],backgroundColor:['#0ea5ff','#00b0ff','#0284c7','#0369a1','#38bdf8','#7dd3fc']}]}
});
let studentMonthChart = new Chart(document.getElementById('studentMonthwiseChart'), {
  type: 'bar',
  data: { labels:['Jan','Feb','Mar','Apr','May'], datasets:[{label:'Attendance',data:[0,0,0,0,0],backgroundColor:'var(--accent)'}]}
});

// Populate student dropdown (demo)
const studentSelect = document.getElementById('studentSelect');
['John Doe','Jane Smith','Mark Lee'].forEach(name=>{
  let opt=document.createElement('option');
  opt.value=name; opt.textContent=name; studentSelect.appendChild(opt);
});

// Load student data on selection (placeholder)
studentSelect.addEventListener('change',()=>{
  showToast('Loading data for '+studentSelect.value);
  // fetch from Supabase here
  studentDayChart.data.datasets[0].data=[90,88,92,85,87];
  studentSubChart.data.datasets[0].data=[95,85,90,80,88,93];
  studentMonthChart.data.datasets[0].data=[91,89,92,85,87];
  studentDayChart.update();
  studentSubChart.update();
  studentMonthChart.update();
});

// Edit attendance form
const editForm=document.getElementById('editAttendanceForm');
editForm.addEventListener('submit',e=>{
  e.preventDefault();
  const date=document.getElementById('editDate').value;
  const subject=document.getElementById('editSubject').value.trim();
  const status=document.getElementById('editStatus').value;
  if(!date||!subject||!status)return showToast('Fill all fields');
  // Call Supabase update here
  showToast(`Attendance updated for ${studentSelect.value} on ${date} (${subject}: ${status})`);
  editForm.reset();
});

// Logout
logoutBtn.addEventListener('click', () => {
  // supabase.auth.signOut() here
  window.location.href='index.html';
});

// Initialize icon
(function initIcon() {
  const icon = themeToggle.querySelector('.icon');
  icon.textContent = document.documentElement.classList.contains('light') ? '☀️' : '🌙';
})();
