let mysql;
const nodemailer = require('nodemailer');

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'portfolio_contacts'
};

// Determine if database is configured for Netlify (remote) environment
const isDbConfigured = Boolean(process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME);

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'dinoja21.dr@gmail.com',
    pass: process.env.EMAIL_PASS || ''
  }
});

exports.handler = async (event, context) => {
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse request body
    const { name, email, message } = JSON.parse(event.body || '{}');

    // Validation
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          success: false, 
          error: 'All fields are required' 
        })
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          success: false, 
          error: 'Please enter a valid email address' 
        })
      };
    }

    // Optionally save to DB if configured
    if (isDbConfigured) {
      try {
        if (!mysql) mysql = require('mysql2/promise');
    const connection = await mysql.createConnection(dbConfig);
        await connection.execute(
      'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    );
    await connection.end();
      } catch (dbErr) {
        console.error('DB insert failed (continuing without DB):', dbErr);
        // Continue even if DB fails to avoid blocking user submissions on Netlify
      }
    }

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
            <p>${String(message).replace(/\n/g, '<br>')}</p>
            <hr>
            <p><em>Sent from your portfolio website</em></p>
          `
        });
      }
    } catch (emailErr) {
      console.error('Email notification failed (non-fatal):', emailErr);
      // Do not fail the request if email fails
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Thank you! Your message has been sent successfully.' 
      })
    };

  } catch (error) {
    console.error('Error processing contact form:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        success: false, 
        error: 'Failed to process your message. Please try again.' 
      })
    };
  }
};
