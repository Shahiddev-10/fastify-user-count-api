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

### Environment Variables

You can customize the server configuration using environment variables:

- `PORT`: Server port (default: 6776)
- `HOST`: Server host (default: 0.0.0.0)

Example:

```bash
PORT=8080 HOST=localhost npm start
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

### Using curl:

```bash
# Health check
curl http://localhost:6776/

# Get user count
curl http://localhost:6776/api/usercount
```

### Using PowerShell (Windows):

```powershell
# Health check
Invoke-RestMethod -Uri "http://localhost:6776/" -Method Get

# Get user count
Invoke-RestMethod -Uri "http://localhost:6776/api/usercount" -Method Get
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

## Error Handling

The API includes basic error handling for:

- Database connection failures
- SQL query errors
- Server startup issues
- Invalid requests

All errors return appropriate HTTP status codes and descriptive error messages.

### HTTP Status Codes

- `200` - Success
- `404` - Not Found (invalid endpoints)
- `500` - Internal Server Error (database issues, unexpected errors)

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

## Development

### Modular Architecture

The project follows a modular architecture:

- **`server.js`**: Main application entry point, server configuration
- **`database.js`**: Database connection logic and query functions
- **`routes.js`**: API route definitions and handlers
- **`setup-database.js`**: Database initialization and sample data creation

### Adding More Sample Data

To add more users to the database, you can run the setup script again:

```bash
npm run setup-db
```

### Modifying the Database

If you want to use a different database system (MySQL, PostgreSQL), you'll need to:

1. Install the appropriate database driver
2. Modify the connection logic in `database.js`
3. Update the setup script accordingly

### Adding New Endpoints

To add new API endpoints, add them to `routes.js`:

```javascript
// In routes.js
fastify.get("/api/new-endpoint", async (request, reply) => {
  // Your endpoint logic here
});
```

## Testing

The project includes comprehensive testing:

### API Testing (`test-api.js`)

- Tests all API endpoints
- Validates response structure and status codes
- Includes 404 error testing
- Provides detailed test reports

### Error Handling Testing (`test-error-handling.js`)

- Verifies error handling implementation
- Checks code structure and features
- Validates project setup

## Scripts

Available npm scripts:

- `npm start` - Start the server in production mode
- `npm run dev` - Start the server with auto-restart (requires nodemon)
- `npm run setup-db` - Initialize database with sample data
- `npm test` - Run API tests
- `npm run test-error-handling` - Run error handling tests

## Security Considerations

For production use, consider implementing:

- Authentication and authorization
- Rate limiting
- Input validation and sanitization
- HTTPS/TLS encryption
- Database connection pooling
- Environment-based configuration

## Troubleshooting

### Common Issues:

1. **Port already in use:**

   - Change the port using the PORT environment variable
   - Kill any existing processes using port 6776

2. **Database not found:**

   - Run the setup script: `npm run setup-db`
   - Ensure the `test001.db` file exists in the project directory

3. **Permission errors:**

   - Ensure you have write permissions in the project directory
   - Run the commands with appropriate permissions

4. **Module not found errors:**
   - Make sure all dependencies are installed: `npm install`
   - Check that all required files exist in the project directory

### Logs

The application uses Fastify's built-in logger. Check the console output for detailed error information and request logs.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests to ensure everything works
5. Submit a pull request

## License

MIT License - feel free to use this project as a starting point for your own applications.

## Changelog

### v1.0.0

- Initial release with modular architecture
- Basic CRUD operations for user count
- Comprehensive testing suite
- Error handling implementation
- Documentation and setup scripts
