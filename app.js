const hours = ['7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm'];
const state = {
  orgs: {
    'BOOM 1069': {
      employees: [
        { id: 1, name: 'JILL', role: 'ANNOUNCER', pin: '1111' },
        { id: 2, name: 'SHADY', role: 'DJ', pin: '2222' },
        { id: 3, name: 'DjYungSource', role: 'DJ', pin: '3333' },
        { id: 4, name: 'Domo Roberts', role: 'ANNOUNCER', pin: '4444' },
      ],
      shifts: [
        { employeeId: 1, day: 'Today', start: 0, end: 3, color: 'purple' },
        { employeeId: 2, day: 'Today', start: 0, end: 3 },
        { employeeId: 3, day: 'Today', start: 2, end: 5 },
        { employeeId: 4, day: 'Today', start: 2, end: 5, color: 'purple' },
      ],
      punches: {}
    },
    '1KTV': {
      employees: [
        { id: 11, name: 'Kay Star', role: 'HOST', pin: '8888' },
        { id: 12, name: 'VJ Flux', role: 'PRODUCER', pin: '9999' },
      ],
      shifts: [
        { employeeId: 11, day: 'Today', start: 1, end: 5 },
        { employeeId: 12, day: 'Today', start: 3, end: 8, color: 'purple' },
      ],
      punches: {}
    }
  },
  currentOrg: 'BOOM 1069',
  view: 'clock',
  pinBuffer: ''
};

const saved = localStorage.getItem('timeclock-clone-data');
if (saved) Object.assign(state, JSON.parse(saved));
const save = () => localStorage.setItem('timeclock-clone-data', JSON.stringify(state));

const orgSelect = document.getElementById('orgSelect');
const rosterGrid = document.getElementById('rosterGrid');
const scheduleGrid = document.getElementById('scheduleGrid');
const teamList = document.getElementById('teamList');
const searchTeam = document.getElementById('searchTeam');
const clockModal = document.getElementById('clockModal');
const pinInput = document.getElementById('pinInput');
const clockMessage = document.getElementById('clockMessage');

function currentData() { return state.orgs[state.currentOrg]; }
function renderOrgSelect() {
  orgSelect.innerHTML = '';
  Object.keys(state.orgs).forEach(name => {
    const opt = document.createElement('option'); opt.value = name; opt.textContent = name;
    if (name === state.currentOrg) opt.selected = true;
    orgSelect.append(opt);
  });
}

function shiftFor(empId) { return currentData().shifts.find(s => s.employeeId === empId); }
function hoursForShift(s) { return s ? s.end - s.start : 0; }
function statusFor(empId) {
  const punch = currentData().punches[empId];
  if (!punch) return '';
  return punch.clockOut ? `Out ${new Date(punch.clockOut).toLocaleTimeString([], {hour:'numeric', minute:'2-digit'})}` : `Clocked in ${new Date(punch.clockIn).toLocaleTimeString([], {hour:'numeric', minute:'2-digit'})}`;
}

function renderRoster() {
  const head = `<div class="roster-head"><div>Team</div>${hours.map(h => `<div>${h}</div>`).join('')}<div>Hours</div><div>Status</div></div>`;
  const rows = currentData().employees.map(emp => {
    const s = shiftFor(emp.id);
    const cells = Array(hours.length).fill('<div></div>');
    if (s) cells[s.start] = `<div style="grid-column: span ${s.end-s.start};"><div class="employee-block ${s.color || ''}"><div class="name">${emp.name}</div><div>${emp.role}</div></div></div>`;
    const line = cells.map((c, i) => s && i>s.start && i<s.end ? '' : c).join('');
    const status = statusFor(emp.id);
    const overtime = hoursForShift(s) > 4 ? '<div class="status badge">Overtime</div>' : `<div>${status}</div>`;
    return `<div class="roster-row"><div><strong>${emp.name}</strong><div>${emp.role}</div></div>${line}<div>${hoursForShift(s)}</div>${overtime}</div>`;
  }).join('');
  rosterGrid.innerHTML = head + rows;
}

function renderSchedule() {
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  scheduleGrid.innerHTML = `<div class="schedule-head"><div>Employee</div>${days.map(d=>`<div>${d}</div>`).join('')}<div>Total</div><div>Status</div></div>` +
    currentData().employees.map(emp => {
      const s = shiftFor(emp.id);
      const dayCells = days.map((d, idx) => idx===4 && s ? `<div>${hours[s.start]}-${hours[s.end-1]}</div>` : '<div></div>').join('');
      return `<div class="schedule-row"><div>${emp.name}<div>${emp.role}</div></div>${dayCells}<div>${hoursForShift(s)}</div><div>${statusFor(emp.id) || '-'}</div></div>`;
    }).join('');
}

function renderTeam() {
  const q = searchTeam.value.toLowerCase();
  const items = currentData().employees.filter(e => e.name.toLowerCase().includes(q) || e.role.toLowerCase().includes(q));
  teamList.innerHTML = items.map(emp => `<div class="team-item"><div><strong>${emp.name}</strong> • ${emp.role}</div><div>PIN ${emp.pin}</div></div>`).join('');
}

function renderAll() { renderOrgSelect(); renderRoster(); renderSchedule(); renderTeam(); save(); }

orgSelect.addEventListener('change', e => { state.currentOrg = e.target.value; renderAll(); });
searchTeam.addEventListener('input', renderTeam);

for (const btn of document.querySelectorAll('.nav-btn')) {
  btn.addEventListener('click', () => {
    state.view = btn.dataset.view;
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b === btn));
    document.querySelectorAll('.view').forEach(v => v.classList.toggle('active', v.id === `${state.view}View`));
  });
}

document.getElementById('openClockModal').onclick = () => {
  state.pinBuffer = ''; pinInput.value = ''; clockMessage.textContent = '';
  clockModal.showModal();
};

document.getElementById('dashboardBtn').onclick = () => alert('Dashboard access granted (manager view).');
document.getElementById('signOutBtn').onclick = () => alert('Signed out.');

const keys = ['1','2','3','4','5','6','7','8','9','Clear','0','Delete'];
const keypad = document.getElementById('keypad');
keys.forEach(k => {
  const b = document.createElement('button'); b.type = 'button'; b.textContent = k;
  b.onclick = () => {
    if (k === 'Clear') state.pinBuffer = '';
    else if (k === 'Delete') state.pinBuffer = state.pinBuffer.slice(0, -1);
    else if (state.pinBuffer.length < 6) state.pinBuffer += k;
    pinInput.value = state.pinBuffer;
  };
  keypad.append(b);
});

document.getElementById('clockForm').addEventListener('submit', e => {
  e.preventDefault();
  const emp = currentData().employees.find(x => x.pin === state.pinBuffer);
  if (!emp) { clockMessage.textContent = 'Invalid PIN'; clockMessage.style.color = 'crimson'; return; }
  const punch = currentData().punches[emp.id];
  if (!punch || punch.clockOut) {
    currentData().punches[emp.id] = { clockIn: Date.now(), clockOut: null };
    clockMessage.textContent = `${emp.name} clocked in.`;
  } else {
    punch.clockOut = Date.now();
    clockMessage.textContent = `${emp.name} clocked out.`;
  }
  clockMessage.style.color = 'green';
  state.pinBuffer = ''; pinInput.value = '';
  renderAll();
});

document.getElementById('addEmployeeBtn').onclick = () => document.getElementById('employeeModal').showModal();
document.getElementById('employeeForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('empName').value.trim();
  const role = document.getElementById('empRole').value.trim();
  const pin = document.getElementById('empPin').value.trim();
  if (!name || !role || !pin) return;
  if (currentData().employees.some(e => e.pin === pin)) return alert('PIN already exists.');
  currentData().employees.push({ id: Date.now(), name, role, pin });
  document.getElementById('employeeForm').reset();
  document.getElementById('employeeModal').close();
  renderAll();
});

renderAll();
