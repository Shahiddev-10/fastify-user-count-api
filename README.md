# Fastify User Count API

A RESTful API built with Fastify that connects to a SQLite database and returns the total count of users from the `user_list` table.

## Features

- Fast and lightweight API using Fastify framework
- SQLite database for easy setup and portability
- Modular architecture with separated concerns
- RESTful endpoint to get user count
- Basic error handling
- CORS support
- Comprehensive testing suite
- Detailed logging

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

## Installation

1. **Clone or navigate to the project directory:**

   ```bash
   cd fastify-user-count-api
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up the database:**
   ```bash
   npm run setup-db
   ```
   This will create a SQLite database file `test001.db` with a `user_list` table and sample data.

## Usage

### Starting the Server

**Development mode (with auto-restart):**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

The server will start on port **6776** by default. You can access it at:

```
http://localhost:6776
```

## API Endpoints

### 1. Health Check

- **URL:** `GET /`
- **Description:** Returns API information and available endpoints
- **Response:**
  ```json
  {
    "message": "Fastify User Count API is running!",
    "version": "1.0.0",
    "endpoints": {
      "userCount": "/api/usercount",
      "health": "/"
    }
  }
  ```

### 2. Get User Count

- **URL:** `GET /api/usercount`
- **Description:** Returns the total number of users in the database
- **Response (Success):**
  ```json
  {
    "totalUsers": 10
  }
  ```
- **Response (Error):**
  ```json
  {
    "error": "Internal Server Error",
    "message": "Failed to retrieve user count from database",
    "details": "Error details here"
  }
  ```

## Testing the API

### Using the Test Suite:

```bash
# Run comprehensive API tests
npm run test

# Test error handling features
npm run test-error-handling
```

### Using a web browser:

Navigate to `http://localhost:6776/api/usercount` in your browser.

## Database Schema

The application uses a SQLite database named `test001.db` with the following table structure:

```sql
CREATE TABLE user_list (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Project Structure

```
fastify-user-count-api/
├── package.json             # Project dependencies and scripts
├── server.js                # Main Fastify server application
├── database.js              # Database connection and query logic
├── routes.js                # API route definitions
├── setup-database.js        # Database initialization script
├── test-api.js              # Comprehensive API testing script
├── test-error-handling.js   # Error handling verification script
├── test001.db              # SQLite database file (created after setup)
└── README.md               # This file
```

### Adding More Sample Data

To add more users to the database, you can run the setup script again:

```bash
npm run setup-db
```

## Scripts

Available npm scripts:

- `npm start` - Start the server in production mode
- `npm run dev` - Start the server with auto-restart (requires nodemon)
- `npm run setup-db` - Initialize database with sample data
- `npm test` - Run API tests
- `npm run test-error-handling` - Run error handling tests
