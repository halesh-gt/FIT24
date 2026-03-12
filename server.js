import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Database Connection Setup
let pool;

async function setupDatabase() {
    try {
        // First, connect without specifying a database to ensure the database exists
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || 'Rohan@23'
        });

        const dbName = process.env.DB_NAME || 'fit24db';
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
        await connection.end();

        // Now create the pool with the database specified
        pool = mysql.createPool({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || 'Rohan@23',
            database: dbName,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        console.log(`MySQL connection pool created for database: ${dbName}`);

        // Initialize tables after pool is ready
        initDB();
    } catch (error) {
        console.error('Failed to setup database:', error);
    }
}

setupDatabase();

// Ensure tables exist on startup
async function initDB() {
    try {
        const connection = await pool.getConnection();

        // Create users table (don't drop it if it exists, to preserve data)
        await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20) NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
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

        // Create plans table
        await connection.query(`
      CREATE TABLE IF NOT EXISTS plans (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price INT NOT NULL,
        period VARCHAR(255) NOT NULL,
        features TEXT NOT NULL,
        is_featured BOOLEAN DEFAULT FALSE
      )
    `);

        // Create trainers table
        await connection.query(`
      CREATE TABLE IF NOT EXISTS trainers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        specialization VARCHAR(255) NOT NULL,
        experience VARCHAR(255) NOT NULL,
        certifications TEXT NOT NULL,
        image_url VARCHAR(255) DEFAULT '../public/img/trainer_1.png'
      )
    `);

        // Seed initial data if tables are empty
        const [plans] = await connection.query('SELECT COUNT(*) as count FROM plans');
        if (plans[0].count === 0) {
            await connection.query(`
                INSERT INTO plans (name, price, period, features, is_featured) VALUES 
                ('1 Month', 4999, 'Monthly Package', 'Gym Floor Access,Locker Room & Showers,FIT24 App Access,24/7 Gym Entry', FALSE),
                ('3 Months', 12000, 'Quarterly Package', 'Gym Floor Access,Locker Room & Showers,2 Group Classes/Month,FIT24 App Access,24/7 Gym Entry', FALSE),
                ('6 Months', 22999, 'Semi-Annual Package', 'Unlimited Group Classes,1 PT Session/Month,Nutrition Consultation,Guest Pass (2/month),Priority Class Booking', TRUE),
                ('1 Year', 39999, 'Annual Package', '4 PT Sessions/Month,Custom Training Plan,Body Composition Analysis,Recovery Suite Access,Unlimited Guest Passes', FALSE)
            `);
        }

        const [trainers] = await connection.query('SELECT COUNT(*) as count FROM trainers');
        if (trainers[0].count === 0) {
            await connection.query(`
                INSERT INTO trainers (name, specialization, experience, certifications, image_url) VALUES 
                ('Rahul Sharma', 'Bodybuilding & Weight Loss', '10+ YEARS EXP', 'ACE Certified Personal Trainer,Precision Nutrition Level 1,Strength & Conditioning Specialist', '../public/img/trainer_1.png'),
                ('Priya Desai', 'Yoga & Functional Mobility', '7 YEARS EXP', 'RYT 500 Certified Yoga Instructor,FMS Certified Level 2,Holistic Wellness Coach', '../public/img/trainer_2.png'),
                ('Vikram Singh', 'CrossFit & Powerlifting', '12 YEARS EXP', 'CrossFit Level 3 Coach,USAW Sports Performance Coach,Advanced First Aid / CPR', '../public/img/trainer_3.png')
            `);
        }

        connection.release();
        console.log('Database tables verified/created successfully.');
    } catch (error) {
        console.error('Database initialization error:', error);
    }
}

// API Routes

// Register
app.post('/api/register', async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;

        if (!username || !email || !phone || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const [existingUsers] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'Email is already registered.' });
        }

        const [userCount] = await pool.query('SELECT COUNT(*) as count FROM users');
        const role = userCount[0].count === 0 ? 'admin' : 'user';

        const [result] = await pool.query(
            'INSERT INTO users (username, email, phone, password, role) VALUES (?, ?, ?, ?, ?)',
            [username, email, phone, password, role]
        );

        res.status(201).json({ message: 'Registration successful!', userId: result.insertId, isAdmin: role === 'admin' });
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

        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        res.status(200).json({ message: 'Login successful!', user: { id: user.id, username: user.username, email: user.email, role: user.role } });
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

// Admin API Endpoints

// Get all users
app.get('/api/admin/users', async (req, res) => {
    try {
        const [users] = await pool.query('SELECT id, username, email, phone, role, created_at FROM users');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});

// Get all payments
app.get('/api/admin/payments', async (req, res) => {
    try {
        const [payments] = await pool.query('SELECT * FROM payments ORDER BY created_at DESC');
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching payments' });
    }
});

// Plans Management
app.get('/api/plans', async (req, res) => {
    try {
        const [plans] = await pool.query('SELECT * FROM plans');
        res.json(plans);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching plans' });
    }
});

app.put('/api/admin/plans/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { price, features, name, period } = req.body;
        await pool.query(
            'UPDATE plans SET price = ?, features = ?, name = ?, period = ? WHERE id = ?',
            [price, features, name, period, id]
        );
        res.json({ message: 'Plan updated' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating plan' });
    }
});

// Trainers Management
app.get('/api/trainers', async (req, res) => {
    try {
        const [trainers] = await pool.query('SELECT * FROM trainers');
        res.json(trainers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching trainers' });
    }
});

app.post('/api/admin/trainers', async (req, res) => {
    try {
        const { name, specialization, experience, certifications, image_url } = req.body;
        await pool.query(
            'INSERT INTO trainers (name, specialization, experience, certifications, image_url) VALUES (?, ?, ?, ?, ?)',
            [name, specialization, experience, certifications, image_url]
        );
        res.status(201).json({ message: 'Trainer added' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding trainer' });
    }
});

app.delete('/api/admin/trainers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM trainers WHERE id = ?', [id]);
        res.json({ message: 'Trainer deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting trainer' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
