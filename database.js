const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const DB_PATH = path.join(__dirname, "test001.db");

/**
 * Connect to the SQLite database
 * @returns {Promise<sqlite3.Database>} Database connection
 */
function connectToDatabase() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        reject(err);
      } else {
        console.log("Connected to the SQLite database.");
        resolve(db);
      }
    });
  });
}

/**
 * Execute a query on the database
 * @param {sqlite3.Database} db - Database connection
 * @param {string} query - SQL query to execute
 * @param {Array} params - Query parameters
 * @returns {Promise<any>} Query result
 */
function executeQuery(db, query, params = []) {
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

/**
 * Close database connection safely
 * @param {sqlite3.Database} db - Database connection to close
 * @returns {Promise<void>}
 */
function closeDatabaseSafely(db) {
  return new Promise((resolve) => {
    if (db) {
      db.close((err) => {
        if (err) {
          console.error("Error closing database connection:", err.message);
        } else {
          console.log("Database connection closed successfully.");
        }
        resolve();
      });
    } else {
      resolve();
    }
  });
}

/**
 * Get user count from the database
 * @returns {Promise<number>} Total number of users
 */
async function getUserCount() {
  let db;
  try {
    db = await connectToDatabase();
    const query = "SELECT COUNT(*) as count FROM user_list";
    const result = await executeQuery(db, query);
    return result.count;
  } finally {
    if (db) {
      await closeDatabaseSafely(db);
    }
  }
}

module.exports = {
  connectToDatabase,
  executeQuery,
  closeDatabaseSafely,
  getUserCount,
  DB_PATH,
};
