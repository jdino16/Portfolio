const mysql = require('mysql2');

// Database connection (same as server.js)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // WAMP default
  database: 'portfolio_contacts'
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  } else {
    console.log('✅ Connected to portfolio_contacts database');
    console.log('📊 Ready to run SQL queries...\n');
  }
});

// Function to run SQL queries
function runQuery(query, description = '') {
  console.log(`🔍 ${description || 'Running query:'}`);
  console.log(`📝 SQL: ${query}\n`);
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('❌ Query Error:', err.message);
    } else {
      console.log('✅ Query Results:');
      console.table(results);
      console.log(`📊 Total rows: ${results.length}\n`);
    }
  });
}

// Example queries you can run
console.log('🚀 SQL Query Tool for portfolio_contacts database\n');

// 1. Show all tables
runQuery('SHOW TABLES', 'Show all tables in database');

// 2. Describe contacts table structure
runQuery('DESCRIBE contacts', 'Show contacts table structure');

// 3. Count total contacts
runQuery('SELECT COUNT(*) as total_contacts FROM contacts', 'Count total contacts');

// 4. Show all contacts (if any exist)
runQuery('SELECT * FROM contacts ORDER BY created_at DESC', 'Show all contacts');

// 5. Show contacts by status
runQuery('SELECT status, COUNT(*) as count FROM contacts GROUP BY status', 'Contacts by status');

// 6. Show recent contacts (last 7 days)
runQuery(`
  SELECT name, email, created_at, status 
  FROM contacts 
  WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
  ORDER BY created_at DESC
`, 'Recent contacts (last 7 days)');

// 7. Show contacts with specific email domain
runQuery(`
  SELECT name, email, created_at 
  FROM contacts 
  WHERE email LIKE '%@gmail.com'
  ORDER BY created_at DESC
`, 'Gmail contacts');

// 8. Show longest messages
runQuery(`
  SELECT name, email, LENGTH(message) as message_length, created_at
  FROM contacts 
  ORDER BY message_length DESC 
  LIMIT 5
`, 'Longest messages');

// 9. Show contacts by hour of day
runQuery(`
  SELECT HOUR(created_at) as hour, COUNT(*) as count
  FROM contacts 
  GROUP BY HOUR(created_at)
  ORDER BY hour
`, 'Contacts by hour of day');

// 10. Show contacts by day of week
runQuery(`
  SELECT DAYNAME(created_at) as day, COUNT(*) as count
  FROM contacts 
  GROUP BY DAYNAME(created_at)
  ORDER BY FIELD(DAYNAME(created_at), 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')
`, 'Contacts by day of week');

// Keep connection open for a few seconds to see results
setTimeout(() => {
  console.log('🔚 Closing database connection...');
  db.end();
  process.exit(0);
}, 5000);
