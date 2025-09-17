const mysql = require('mysql2/promise');
const nodemailer = require('nodemailer');

// Database configuration (optional in serverless)
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

// Build a flexible Nodemailer transporter
function createEmailTransporter() {
  // Prefer explicit SMTP settings if provided
  if (process.env.SMTP_HOST && process.env.SMTP_PORT) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true' || Number(process.env.SMTP_PORT) === 465,
      auth: process.env.EMAIL_USER && process.env.EMAIL_PASS ? {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      } : undefined
    });
  }

  // Fallback to known provider service (e.g., gmail)
  const service = process.env.EMAIL_SERVICE || 'gmail';
  return nodemailer.createTransport({
    service,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
}

const transporter = createEmailTransporter();

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
    const { name, email, message } = JSON.parse(event.body);

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

    // Send email first (primary requirement)
    const emailTo = process.env.EMAIL_TO || process.env.EMAIL_USER;
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !emailTo) {
      throw new Error('Email transport not configured. Set EMAIL_USER, EMAIL_PASS, and optionally EMAIL_TO.');
    }

    // Verify transporter before sending (helps catch bad creds or host)
    try {
      await transporter.verify();
    } catch (verifyErr) {
      console.error('Email transporter verify failed:', verifyErr);
      throw new Error('Email service not available');
    }

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: emailTo,
      subject: `New Contact Form Submission from ${name}`,
      replyTo: email,
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

    // Try to store in DB, but do not block or fail if unavailable
    try {
      if (dbConfig.host && dbConfig.user && dbConfig.database) {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute(
          'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
          [name, email, message]
        );
        await connection.end();
      }
    } catch (dbErr) {
      console.error('Optional DB save failed:', dbErr);
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
