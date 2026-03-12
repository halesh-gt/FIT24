import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

// Database Connection Setup
let pool;
try {
    pool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'Root',
        database: process.env.DB_NAME || 'fit24db',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
    console.log('MySQL connection pool created.');
} catch (error) {
    console.error('Failed to create MySQL pool:', error);
}

// Ensure tables exist on startup
async function initDB() {
    try {
        const connection = await pool.getConnection();

        await connection.query('DROP TABLE IF EXISTS users');

        // Create users table
        await connection.query(`
      CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

        // Create payments table
        await connection.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_email VARCHAR(255) NOT NULL,
        plan VARCHAR(255) NOT NULL,
        amount INT NOT NULL,
        payment_method VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

        // Create member_registrations table
        await connection.query(`
      CREATE TABLE IF NOT EXISTS member_registrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address TEXT NOT NULL,
        primary_phone VARCHAR(20) NOT NULL,
        secondary_phone VARCHAR(20),
        email VARCHAR(255) NOT NULL,
        dob DATE NOT NULL,
        signature LONGTEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

        connection.release();
        console.log('Database tables verified/created successfully.');
    } catch (error) {
        console.error('Database initialization error:', error);
    }
}

initDB();

// API Routes

// Register
app.post('/api/register', async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;

        // Basic validation
        if (!username || !email || !phone || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const [existingUsers] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'Email is already registered.' });
        }

        const [result] = await pool.query(
            'INSERT INTO users (username, email, phone, password) VALUES (?, ?, ?, ?)',
            [username, email, phone, password]
        );

        res.status(201).json({ message: 'Registration successful!', userId: result.insertId });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Server error during registration.' });
    }
});

// Login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (users.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const user = users[0];

        // Note: In a real app, you should hash logic (e.g. bcrypt) for password comparison
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        res.status(200).json({ message: 'Login successful!', user: { id: user.id, username: user.username, email: user.email } });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login.' });
    }
});

// Payment
app.post('/api/payment', async (req, res) => {
    try {
        const { userEmail, plan, amount, paymentMethod } = req.body;

        if (!userEmail || !plan || !amount || !paymentMethod) {
            return res.status(400).json({ message: 'All payment details are required.' });
        }

        const [result] = await pool.query(
            'INSERT INTO payments (user_email, plan, amount, payment_method) VALUES (?, ?, ?, ?)',
            [userEmail, plan, amount, paymentMethod]
        );

        res.status(201).json({ message: 'Payment recorded successfully!', paymentId: result.insertId });
    } catch (error) {
        console.error('Payment error:', error);
        res.status(500).json({ message: 'Server error during payment processing.' });
    }
});

// Member Registration API
app.post('/api/member-register', async (req, res) => {
    try {
        const { name, address, primaryPhone, secondaryPhone, email, dob, signature } = req.body;

        if (!name || !address || !primaryPhone || !email || !dob) {
            return res.status(400).json({ message: 'Required fields are missing.' });
        }

        const [result] = await pool.query(
            'INSERT INTO member_registrations (name, address, primary_phone, secondary_phone, email, dob, signature) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, address, primaryPhone, secondaryPhone, email, dob, signature]
        );

        res.status(201).json({ message: 'Member registration successful!', registrationId: result.insertId });
    } catch (error) {
        console.error('Member Register error:', error);
        res.status(500).json({ message: 'Server error during member registration.' });
    }
});

// Serve the registration form at a specific URL
app.get('/register-form', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register_form.html'));
});

// Simple test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Server is working!', time: new Date() });
});

// Admin API to fetch all registrations
app.get('/api/member-registrations', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM member_registrations ORDER BY created_at DESC');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Fetch Registrations error:', error);
        res.status(500).json({ message: 'Server error during fetching registrations.' });
    }
});

app.get('/register-form', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register_form.html'));
});

// Simple test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Server is working!', time: new Date() });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
