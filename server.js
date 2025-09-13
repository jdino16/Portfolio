const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('.'));

// MySQL Database Connection
const dbConfig = process.env.DATABASE_URL 
  ? {
      // Production database (from Vercel environment variable)
      uri: process.env.DATABASE_URL
    }
  : {
      // Local development database
      host: 'localhost',
      user: 'root',
      password: '', // WAMP usually has no password for root
      database: 'portfolio_contacts'
    };

const db = mysql.createConnection(dbConfig);

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    // Create database if it doesn't exist
    createDatabase();
  } else {
    console.log('✅ Connected to MySQL database (WAMP Server)');
    createTable();
  }
});

// Create database if it doesn't exist
function createDatabase() {
  const createDbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '' // WAMP root user usually has no password
  });

  createDbConnection.query('CREATE DATABASE IF NOT EXISTS portfolio_contacts', (err) => {
    if (err) {
      console.error('Error creating database:', err);
    } else {
      console.log('✅ Database created/verified');
      // Reconnect with database
      db.changeUser({ database: 'portfolio_contacts' }, (err) => {
        if (err) {
          console.error('Error switching to database:', err);
        } else {
          console.log('✅ Connected to portfolio_contacts database');
          createTable();
        }
      });
    }
  });
}

// Create contacts table
function createTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS contacts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      status ENUM('new', 'read', 'replied') DEFAULT 'new'
    )
  `;

  db.query(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('✅ Contacts table ready');
    }
  });
}

// Email configuration (optional - for sending notifications)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'dinoja21.dr@gmail.com',
    pass: process.env.EMAIL_PASS || ''
  }
});

// API Routes

// Get all contacts (admin route)
app.get('/api/contacts', (req, res) => {
  const query = 'SELECT * FROM contacts ORDER BY created_at DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching contacts:', err);
      res.status(500).json({ error: 'Failed to fetch contacts' });
    } else {
      res.json(results);
    }
  });
});

// Submit contact form
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      error: 'All fields are required' 
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      error: 'Please enter a valid email address' 
    });
  }

  // Insert into database
  const insertQuery = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
  db.query(insertQuery, [name, email, message], async (err, result) => {
    if (err) {
      console.error('Error inserting contact:', err);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to save message. Please try again.' 
      });
    } else {
      console.log('✅ New contact saved:', { name, email, message: message.substring(0, 50) + '...' });

      // Send email notification (optional)
      try {
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
          await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: 'dinoja21.dr@gmail.com',
            subject: `New Contact Form Submission from ${name}`,
            html: `
              <h3>New Contact Form Submission</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, '<br>')}</p>
              <hr>
              <p><em>Sent from your portfolio website</em></p>
            `
          });
          console.log('✅ Email notification sent');
        }
      } catch (emailErr) {
        console.error('Email notification failed:', emailErr);
        // Don't fail the request if email fails
      }

      res.json({ 
        success: true, 
        message: 'Thank you! Your message has been sent successfully.' 
      });
    }
  });
});

// Update contact status (admin route)
app.put('/api/contacts/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const updateQuery = 'UPDATE contacts SET status = ? WHERE id = ?';
  db.query(updateQuery, [status, id], (err, result) => {
    if (err) {
      console.error('Error updating contact status:', err);
      res.status(500).json({ error: 'Failed to update status' });
    } else {
      res.json({ success: true, message: 'Status updated successfully' });
    }
  });
});

// Delete contact (admin route)
app.delete('/api/contacts/:id', (req, res) => {
  const { id } = req.params;
  const deleteQuery = 'DELETE FROM contacts WHERE id = ?';
  
  db.query(deleteQuery, [id], (err, result) => {
    if (err) {
      console.error('Error deleting contact:', err);
      res.status(500).json({ error: 'Failed to delete contact' });
    } else {
      res.json({ success: true, message: 'Contact deleted successfully' });
    }
  });
});

// Serve the main website
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Serve admin panel
app.get('/admin', (req, res) => {
  res.sendFile(__dirname + '/admin.html');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📧 Contact form API: http://localhost:${PORT}/api/contact`);
  console.log(`📊 Admin panel: http://localhost:${PORT}/admin`);
  console.log(`🗄️  Database: localhost MySQL (WAMP Server)`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  db.end();
  process.exit(0);
});