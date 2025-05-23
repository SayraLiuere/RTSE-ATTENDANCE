// Sample data for demonstration
const users = {
    'admin': 'admin123',
    'user': 'user123'
};

const students = {
    'RFID001': 'John Doe',
    'RFID002': 'Jane Smith',
    'RFID003': 'Mike Johnson',
    'RFID004': 'Sarah Wilson',
    'RFID005': 'David Brown',
    'RFID006': 'Emily Davis',
    'RFID007': 'Michael Lee',
    'RFID008': 'Lisa Anderson'
};

// Generate dates for the past week
const today = new Date();
const dates = Array.from({length: 7}, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
});

// Generate random time between 8:00 and 9:30
function getRandomTime() {
    const hours = 8;
    const minutes = Math.floor(Math.random() * 90); // Random minutes between 0-90
    return `${hours + Math.floor(minutes / 60)}:${(minutes % 60).toString().padStart(2, '0')}`;
}

// Generate attendance records for the past week
let attendanceRecords = [];

// Generate records for each student
Object.keys(students).forEach(id => {
    dates.forEach(date => {
        // 90% chance of attendance
        if (Math.random() < 0.9) {
            attendanceRecords.push({
                id: id,
                name: students[id],
                date: date,
                time: getRandomTime(),
                status: 'Present'
            });
        }
    });
});

// Add some specific scenarios
const specificRecords = [
    // Today's records (some already arrived, some late)
    { id: 'RFID001', name: 'John Doe', date: dates[0], time: '08:15', status: 'Present' },
    { id: 'RFID002', name: 'Jane Smith', date: dates[0], time: '08:05', status: 'Present' },
    { id: 'RFID003', name: 'Mike Johnson', date: dates[0], time: '09:20', status: 'Present' },
    { id: 'RFID004', name: 'Sarah Wilson', date: dates[0], time: '08:45', status: 'Present' },
    
    // Yesterday's records
    { id: 'RFID001', name: 'John Doe', date: dates[1], time: '08:30', status: 'Present' },
    { id: 'RFID002', name: 'Jane Smith', date: dates[1], time: '08:10', status: 'Present' },
    { id: 'RFID003', name: 'Mike Johnson', date: dates[1], time: '09:15', status: 'Present' },
    { id: 'RFID005', name: 'David Brown', date: dates[1], time: '08:20', status: 'Present' },
    { id: 'RFID006', name: 'Emily Davis', date: dates[1], time: '08:25', status: 'Present' },
    
    // Day before yesterday (some absences)
    { id: 'RFID001', name: 'John Doe', date: dates[2], time: '08:45', status: 'Present' },
    { id: 'RFID002', name: 'Jane Smith', date: dates[2], time: '08:15', status: 'Present' },
    { id: 'RFID004', name: 'Sarah Wilson', date: dates[2], time: '09:10', status: 'Present' },
    { id: 'RFID007', name: 'Michael Lee', date: dates[2], time: '08:30', status: 'Present' },
    
    // Last week's records (more varied attendance)
    { id: 'RFID001', name: 'John Doe', date: dates[3], time: '08:20', status: 'Present' },
    { id: 'RFID003', name: 'Mike Johnson', date: dates[3], time: '09:25', status: 'Present' },
    { id: 'RFID005', name: 'David Brown', date: dates[3], time: '08:35', status: 'Present' },
    { id: 'RFID008', name: 'Lisa Anderson', date: dates[3], time: '08:40', status: 'Present' },
    
    { id: 'RFID002', name: 'Jane Smith', date: dates[4], time: '08:10', status: 'Present' },
    { id: 'RFID004', name: 'Sarah Wilson', date: dates[4], time: '08:25', status: 'Present' },
    { id: 'RFID006', name: 'Emily Davis', date: dates[4], time: '09:05', status: 'Present' },
    { id: 'RFID007', name: 'Michael Lee', date: dates[4], time: '08:50', status: 'Present' },
    
    { id: 'RFID001', name: 'John Doe', date: dates[5], time: '08:30', status: 'Present' },
    { id: 'RFID003', name: 'Mike Johnson', date: dates[5], time: '08:15', status: 'Present' },
    { id: 'RFID005', name: 'David Brown', date: dates[5], time: '09:15', status: 'Present' },
    { id: 'RFID008', name: 'Lisa Anderson', date: dates[5], time: '08:45', status: 'Present' },
    
    { id: 'RFID002', name: 'Jane Smith', date: dates[6], time: '08:05', status: 'Present' },
    { id: 'RFID004', name: 'Sarah Wilson', date: dates[6], time: '08:20', status: 'Present' },
    { id: 'RFID006', name: 'Emily Davis', date: dates[6], time: '08:35', status: 'Present' },
    { id: 'RFID007', name: 'Michael Lee', date: dates[6], time: '09:10', status: 'Present' }
];

// Add specific records to the main records array
attendanceRecords = [...specificRecords, ...attendanceRecords];

// Sort records by date (newest first) and then by time
attendanceRecords.sort((a, b) => {
    if (a.date === b.date) {
        return a.time.localeCompare(b.time);
    }
    return b.date.localeCompare(a.date);
});

// Track current user role
let currentUserRole = '';

// Login functionality
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (users[username] && users[username] === password) {
        // Set user role (admin or regular user)
        currentUserRole = username === 'admin' ? 'admin' : 'user';
        
        document.getElementById('loginPage').classList.remove('active');
        document.getElementById('mainNav').classList.remove('hidden');
        
        // Show appropriate navigation based on role
        if (currentUserRole === 'admin') {
            document.getElementById('userNav').classList.add('hidden');
            document.getElementById('adminNav').classList.remove('hidden');
            showPage('adminDashboard');
        } else {
            document.getElementById('userNav').classList.remove('hidden');
            document.getElementById('adminNav').classList.add('hidden');
            showPage('scanPage');
        }
    } else {
        showMessage('Invalid username or password', 'error');
    }
}

// Logout functionality
function logout() {
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('mainNav').classList.add('hidden');
    document.getElementById('loginPage').classList.add('active');
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
}

// Page navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    
    // Update navigation buttons
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[onclick="showPage('${pageId}')"]`).classList.add('active');

    // If showing records page, refresh the table
    if (pageId === 'recordsPage') {
        updateAttendanceTable();
    }
}

// Simulate RFID scan
function simulateScan() {
    const scanArea = document.querySelector('.scan-area');
    scanArea.style.animation = 'pulse 1s';
    
    // Simulate random RFID scan
    setTimeout(() => {
        const rfidIds = Object.keys(students);
        const randomRfid = rfidIds[Math.floor(Math.random() * rfidIds.length)];
        const studentName = students[randomRfid];
        
        // Record attendance
        const now = new Date();
        const date = now.toISOString().split('T')[0];
        const time = now.toTimeString().split(' ')[0];
        
        attendanceRecords.unshift({
            id: randomRfid,
            name: studentName,
            date: date,
            time: time,
            status: 'Present'
        });
        
        showMessage(`Attendance recorded for ${studentName}`, 'success');
        scanArea.style.animation = '';
        
        // Update records table if visible
        if (document.getElementById('recordsPage').classList.contains('active')) {
            updateAttendanceTable();
        }
    }, 1000);
}

// Update attendance records table
function updateAttendanceTable() {
    const tbody = document.getElementById('attendanceRecords');
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    // Filter records based on search term
    const filteredRecords = attendanceRecords.filter(record => 
        record.name.toLowerCase().includes(searchTerm) ||
        record.date.includes(searchTerm)
    );
    
    // Clear existing records
    tbody.innerHTML = '';
    
    // Add filtered records to table
    filteredRecords.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.name}</td>
            <td>${record.date}</td>
            <td>${record.time}</td>
            <td><span class="status-badge ${record.status.toLowerCase()}">${record.status}</span></td>
        `;
        tbody.appendChild(row);
    });
}

// Show message
function showMessage(message, type) {
    const messageDiv = document.getElementById('scanMessage');
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    
    // Clear message after 3 seconds
    setTimeout(() => {
        messageDiv.textContent = '';
        messageDiv.className = 'message';
    }, 3000);
}

// Search functionality
document.getElementById('searchInput').addEventListener('input', updateAttendanceTable);

// Add CSS animation for scan effect
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    .status-badge {
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 500;
    }
    
    .status-badge.present {
        background-color: #e8f5e9;
        color: #2e7d32;
    }
    
    .status-badge.absent {
        background-color: #ffebee;
        color: #c62828;
    }
`;
document.head.appendChild(style);

// Admin Dashboard Functions
function updateDashboard() {
    const today = new Date().toISOString().split('T')[0];
    const dateFilter = document.getElementById('dateFilter').value;
    
    // Calculate statistics
    const totalStudents = Object.keys(students).length;
    const todayRecords = attendanceRecords.filter(record => record.date === today);
    const presentCount = todayRecords.length;
    const absentCount = totalStudents - presentCount;
    
    // Calculate average arrival time
    let avgTime = '--:--';
    if (presentCount > 0) {
        const times = todayRecords.map(record => {
            const [hours, minutes] = record.time.split(':');
            return parseInt(hours) * 60 + parseInt(minutes);
        });
        const avgMinutes = Math.round(times.reduce((a, b) => a + b, 0) / times.length);
        avgTime = `${Math.floor(avgMinutes / 60)}:${(avgMinutes % 60).toString().padStart(2, '0')}`;
    }
    
    // Update dashboard stats
    document.getElementById('totalStudents').textContent = totalStudents;
    document.getElementById('presentToday').textContent = presentCount;
    document.getElementById('absentToday').textContent = absentCount;
    document.getElementById('avgArrival').textContent = avgTime;
    
    // Update recent arrivals
    updateRecentArrivals(todayRecords);
    
    // Update late arrivals (after 9:00 AM)
    const lateArrivals = todayRecords.filter(record => {
        const [hours] = record.time.split(':');
        return parseInt(hours) >= 9;
    });
    updateLateArrivals(lateArrivals);
}

function updateRecentArrivals(records) {
    const container = document.getElementById('recentArrivals');
    container.innerHTML = '';
    
    records.slice(0, 5).forEach(record => {
        const item = document.createElement('div');
        item.className = 'arrival-item';
        item.innerHTML = `
            <span>${record.name}</span>
            <span class="arrival-time">${record.time}</span>
        `;
        container.appendChild(item);
    });
}

function updateLateArrivals(records) {
    const container = document.getElementById('lateArrivals');
    container.innerHTML = '';
    
    records.slice(0, 5).forEach(record => {
        const item = document.createElement('div');
        item.className = 'arrival-item';
        item.innerHTML = `
            <span>${record.name}</span>
            <span class="arrival-time">${record.time}</span>
        `;
        container.appendChild(item);
    });
}

// Student Status Functions
function updateStudentStatus() {
    const searchTerm = document.getElementById('studentSearch').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    const today = new Date().toISOString().split('T')[0];
    
    const tbody = document.getElementById('studentStatusRecords');
    tbody.innerHTML = '';
    
    // Get today's attendance records
    const todayRecords = attendanceRecords.filter(record => record.date === today);
    const presentIds = new Set(todayRecords.map(record => record.id));
    
    // Calculate attendance rates for each student
    const attendanceRates = {};
    Object.keys(students).forEach(id => {
        const studentRecords = attendanceRecords.filter(record => record.id === id);
        const totalDays = new Set(studentRecords.map(record => record.date)).size;
        const presentDays = studentRecords.filter(record => record.status === 'Present').length;
        attendanceRates[id] = totalDays > 0 ? (presentDays / totalDays) * 100 : 0;
    });
    
    // Filter and display students
    Object.entries(students).forEach(([id, name]) => {
        if (name.toLowerCase().includes(searchTerm)) {
            const isPresent = presentIds.has(id);
            const status = isPresent ? 'Present' : 'Absent';
            
            if (statusFilter === 'all' || 
                (statusFilter === 'present' && isPresent) || 
                (statusFilter === 'absent' && !isPresent)) {
                
                const lastRecord = attendanceRecords.find(record => record.id === id);
                const attendanceRate = attendanceRates[id];
                const rateClass = attendanceRate >= 80 ? 'high' : 
                                attendanceRate >= 60 ? 'medium' : 'low';
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${name}</td>
                    <td><span class="status-badge ${status.toLowerCase()}">${status}</span></td>
                    <td>${isPresent ? lastRecord.time : '--:--'}</td>
                    <td>${lastRecord ? `${lastRecord.date} ${lastRecord.time}` : 'Never'}</td>
                    <td><span class="attendance-rate ${rateClass}">${Math.round(attendanceRate)}%</span></td>
                `;
                tbody.appendChild(row);
            }
        }
    });
}

// Attendance History Functions
function updateAttendanceHistory() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const searchTerm = document.getElementById('historySearch').value.toLowerCase();
    
    const tbody = document.getElementById('attendanceHistoryRecords');
    tbody.innerHTML = '';
    
    let filteredRecords = attendanceRecords;
    
    // Apply date filter
    if (startDate && endDate) {
        filteredRecords = filteredRecords.filter(record => 
            record.date >= startDate && record.date <= endDate
        );
    }
    
    // Apply search filter
    if (searchTerm) {
        filteredRecords = filteredRecords.filter(record =>
            record.name.toLowerCase().includes(searchTerm)
        );
    }
    
    // Display records
    filteredRecords.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.date}</td>
            <td>${record.name}</td>
            <td>${record.time}</td>
            <td><span class="status-badge ${record.status.toLowerCase()}">${record.status}</span></td>
            <td>${record.status === 'Present' ? 'On time' : 'Not recorded'}</td>
        `;
        tbody.appendChild(row);
    });
}

// Event Listeners
document.getElementById('studentSearch').addEventListener('input', updateStudentStatus);
document.getElementById('historySearch').addEventListener('input', updateAttendanceHistory);

// Initialize date inputs with today's date
document.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('startDate').value = today;
    document.getElementById('endDate').value = today;
    
    // If admin is logged in, update dashboard
    if (currentUserRole === 'admin') {
        updateDashboard();
    }
}); 