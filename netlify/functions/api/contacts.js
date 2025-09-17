// Defer mysql import until needed
let mysql;

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'portfolio_contacts'
};

// Determine if database is configured for Netlify (remote) environment
const isDbConfigured = Boolean(process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME);

exports.handler = async (event, context) => {
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      },
      body: ''
    };
  }

  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
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
    // If DB is not configured (public deployment), return empty list gracefully
    if (!isDbConfigured) {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([])
      };
    }

    if (!mysql) mysql = require('mysql2/promise');

    // Connect to database
    const connection = await mysql.createConnection(dbConfig);

    // Get all contacts
    const [rows] = await connection.execute(
      'SELECT * FROM contacts ORDER BY created_at DESC'
    );

    await connection.end();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rows)
    };

  } catch (error) {
    console.error('Error fetching contacts:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Failed to fetch contacts' })
    };
  }
};
