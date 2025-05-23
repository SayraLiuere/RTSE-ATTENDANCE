// Sample data for demonstration
const users = {
    'admin': 'admin123',
    'user': 'user123'
};

const students = {
    'RFID001': 'John Doe',
    'RFID002': 'Jane Smith',
    'RFID003': 'Mike Johnson'
};

let attendanceRecords = [
    { id: 'RFID001', name: 'John Doe', date: '2024-03-15', time: '09:00', status: 'Present' },
    { id: 'RFID002', name: 'Jane Smith', date: '2024-03-15', time: '09:05', status: 'Present' },
    { id: 'RFID003', name: 'Mike Johnson', date: '2024-03-15', time: '09:10', status: 'Present' }
];

// Login functionality
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (users[username] && users[username] === password) {
        document.getElementById('loginPage').classList.remove('active');
        document.getElementById('mainNav').classList.remove('hidden');
        showPage('scanPage');
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