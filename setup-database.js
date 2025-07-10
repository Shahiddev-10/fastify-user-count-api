/**
 * Database Setup Script
 * Creates the SQLite database and populates it with sample data
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database configuration
const DB_PATH = path.join(__dirname, 'test001.db');

console.log('Setting up database...');

// Create database connection
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error creating database:', err.message);
    process.exit(1);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create the user_list table
const createTableSQL = `
  CREATE TABLE IF NOT EXISTS user_list (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`;

db.run(createTableSQL, (err) => {
  if (err) {
    console.error('Error creating table:', err.message);
    process.exit(1);
  } else {
    console.log('Table "user_list" created successfully.');
  }
});

// Sample user data
const sampleUsers = [
  { username: 'john_doe', email: 'john.doe@example.com' },
  { username: 'jane_smith', email: 'jane.smith@example.com' },
  { username: 'bob_johnson', email: 'bob.johnson@example.com' },
  { username: 'alice_williams', email: 'alice.williams@example.com' },
  { username: 'charlie_brown', email: 'charlie.brown@example.com' },
  { username: 'diana_davis', email: 'diana.davis@example.com' },
  { username: 'evan_miller', email: 'evan.miller@example.com' },
  { username: 'fiona_wilson', email: 'fiona.wilson@example.com' },
  { username: 'george_moore', email: 'george.moore@example.com' },
  { username: 'helen_taylor', email: 'helen.taylor@example.com' }
];

// Clear existing data and insert sample users
db.run('DELETE FROM user_list', (err) => {
  if (err) {
    console.error('Error clearing existing data:', err.message);
  }
  
  // Insert sample users
  const insertSQL = 'INSERT INTO user_list (username, email) VALUES (?, ?)';
  const stmt = db.prepare(insertSQL);
  
  let insertedCount = 0;
  
  sampleUsers.forEach((user, index) => {
    stmt.run([user.username, user.email], function(err) {
      if (err) {
        console.error(`Error inserting user ${user.username}:`, err.message);
      } else {
        insertedCount++;
        
        // Check if all users have been inserted
        if (insertedCount === sampleUsers.length) {
          stmt.finalize();
          
          // Verify the data
          db.get('SELECT COUNT(*) as count FROM user_list', (err, row) => {
            if (err) {
              console.error('Error counting users:', err.message);
            } else {
              console.log(`Inserted ${insertedCount} sample users.`);
              console.log(`Total users in database: ${row.count}`);
            }
            
            // Close the database connection
            db.close((err) => {
              if (err) {
                console.error('Error closing database:', err.message);
              } else {
                console.log('Database setup completed and connection closed.');
                console.log('You can now start the server with: npm start');
              }
            });
          });
        }
      }
    });
  });
});

// Handle database errors
db.on('error', (err) => {
  console.error('Database error:', err);
  process.exit(1);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\nReceived SIGINT. Closing database connection...');
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    }
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('\nReceived SIGTERM. Closing database connection...');
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    }
    process.exit(0);
  });
});
