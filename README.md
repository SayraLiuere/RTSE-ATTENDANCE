# RFID Smart Attendance System - Web GUI

A modern, responsive web interface for an RFID-based attendance system. This is a frontend prototype that simulates RFID scanning functionality.

## Features

- Clean and modern user interface
- Login system with authentication
- RFID scan simulation
- Real-time attendance recording
- Attendance records management with search functionality
- Responsive design for all devices
- Success/error message notifications

## Demo Credentials

For testing purposes, you can use the following credentials:

- Username: `admin`, Password: `admin123`
- Username: `user`, Password: `user123`

## Sample RFID Cards

The system comes with sample RFID cards for demonstration:

- RFID001: John Doe
- RFID002: Jane Smith
- RFID003: Mike Johnson

## How to Run

1. Simply open the `index.html` file in a modern web browser (Chrome, Firefox, Safari, or Edge)
2. No server or additional setup is required as this is a frontend-only prototype

## Usage

1. **Login**
   - Enter your username and password
   - Click the login button

2. **Scan RFID**
   - Click the scan area to simulate an RFID card scan
   - A success message will appear when attendance is recorded
   - The scan area will show a visual feedback animation

3. **View Records**
   - Navigate to the Records page using the top navigation
   - Use the search bar to filter records by student name or date
   - Records are displayed in a table format with status indicators

4. **Logout**
   - Click the logout button in the navigation bar to return to the login screen

## Technical Details

- Built with vanilla HTML, CSS, and JavaScript
- No external dependencies required
- Uses modern CSS features for responsive design
- Includes animations and visual feedback
- Implements a clean and intuitive user interface

## Browser Support

The application works best in modern browsers that support ES6+ JavaScript features:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Note

This is a prototype version that simulates RFID scanning. In a real implementation, you would need to:
1. Connect to actual RFID hardware
2. Implement a backend server
3. Use a database for storing records
4. Add proper security measures
5. Implement user management 