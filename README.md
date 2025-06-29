# Task Manager API

A simple REST API for managing tasks built with Node.js, Express, and MongoDB.

## ✨ Features

- ✅ **Complete CRUD Operations** (Create, Read, Update, Delete)
- ✅ **MongoDB Integration** with Mongoose ORM
- ✅ **Input Validation** and Error Handling
- ✅ **RESTful API Design**
- ✅ **Task Status Tracking** with real-time counts
- ✅ **Bonus Features**:
  - Status filtering (`?status=pending`)
  - Pagination (`?page=1&limit=5`)
  - Task status analytics (completed, pending, in-progress counts)
  - Enhanced validation with detailed error messages
  - Comprehensive API responses

## 🛠️ Tech Stack

- **Node.js** (v18+)
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **dotenv** - Environment variables
- **nodemon** - Development auto-reload

## 📁 Project Structure

```
task-manager/
├── models/
│   └── Task.js           # Task data model
├── routes/
│   └── tasks.js          # API routes
├── controllers/
│   └── taskController.js # Business logic
├── config/
│   └── db.js            # Database configuration
├── .env                 # Environment variables
├── server.js            # Main server file
├── package.json         # Dependencies
└── README.md           # Documentation
```

## 🚀 Quick Start

1. **Clone and Install**

   ```bash
   git clone <repository-url>
   cd task-manager
   npm install
   ```

2. **Set up Environment Variables**

   ```bash
   # Update .env file
   NODE_ENV=development
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/taskmanager
   JWT_SECRET=your_jwt_secret_key_here
   ```

3. **Start MongoDB**

   - Local: `mongod`
   - Or use MongoDB Atlas (cloud)

4. **Run the Application**

   ```bash
   # Development (auto-reload)
   npm run dev

   # Production
   npm start
   ```

5. **Test the API**
   - Server runs on: `http://localhost:3000`
   - API Base URL: `http://localhost:3000/api/tasks`

## 📋 API Endpoints

| Method | Endpoint         | Description     |
| ------ | ---------------- | --------------- |
| GET    | `/api/tasks`     | Get all tasks   |
| GET    | `/api/tasks/:id` | Get task by ID  |
| POST   | `/api/tasks`     | Create new task |
| PUT    | `/api/tasks/:id` | Update task     |
| DELETE | `/api/tasks/:id` | Delete task     |

### Query Parameters (Bonus Features)

- `?status=pending` - Filter by status
- `?page=1&limit=5` - Pagination
- `?status=done&page=2&limit=3` - Combined filtering and pagination

## 💾 Task Model

```javascript
{
  title: String (required, max 100 chars),
  description: String (optional, max 500 chars),
  status: String (enum: 'pending', 'in-progress', 'done'),
  createdAt: Date (auto-generated)
}
```

## 📊 API Response Format

### Get All Tasks Response (Enhanced with Status Counts)

```json
{
  "success": true,
  "count": 5,
  "totalTasks": 12,
  "taskCompleted": 3,
  "taskPending": 7,
  "taskInProgress": 2,
  "currentPage": 1,
  "totalPages": 3,
  "data": [
    {
      "_id": "64a1b2c3d4e5f6789abc123",
      "title": "Complete Node.js Assignment",
      "description": "Build a task manager API",
      "status": "done",
      "createdAt": "2023-07-01T10:30:00.000Z"
    }
    // ... more tasks
  ]
}
```

### Create/Update Task Response

```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "_id": "64a1b2c3d4e5f6789abc123",
    "title": "New Task",
    "description": "Task description",
    "status": "pending",
    "createdAt": "2023-07-01T10:30:00.000Z"
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Title is required and cannot be empty"
}
```

## 🧪 Testing with Postman

### 1. Create a Task

- **Method**: POST
- **URL**: `http://localhost:3000/api/tasks`
- **Headers**: `Content-Type: application/json`
- **Body**:

```json
{
  "title": "Learn Node.js",
  "description": "Complete the task manager project",
  "status": "pending"
}
```

### 2. Get All Tasks (with Status Analytics)

- **Method**: GET
- **URL**: `http://localhost:3000/api/tasks`
- **Response**: Includes `taskCompleted`, `taskPending`, and `taskInProgress` counts

### 3. Mark Task as Completed

- **Method**: PUT
- **URL**: `http://localhost:3000/api/tasks/{task_id}`
- **Headers**: `Content-Type: application/json`
- **Body**:

```json
{
  "status": "done"
}
```

### 4. Filter Tasks by Status

- **Method**: GET
- **URL**: `http://localhost:3000/api/tasks?status=done`

### 5. Get Tasks with Pagination

- **Method**: GET
- **URL**: `http://localhost:3000/api/tasks?page=1&limit=5`

## 🎯 Task Status Analytics

The API now provides real-time analytics with every GET request:

- **`taskCompleted`**: Number of tasks marked as "done"
- **`taskPending`**: Number of tasks marked as "pending"
- **`taskInProgress`**: Number of tasks marked as "in-progress"
- **`totalTasks`**: Total number of tasks (matching current filter)
- **`count`**: Number of tasks in current page

This gives you instant insights into your productivity and task distribution!

## 🔧 Advanced Features

### Status Filtering

```bash
GET /api/tasks?status=pending     # Get only pending tasks
GET /api/tasks?status=done        # Get only completed tasks
GET /api/tasks?status=in-progress # Get only in-progress tasks
```

### Pagination

```bash
GET /api/tasks?page=1&limit=10    # First 10 tasks
GET /api/tasks?page=2&limit=5     # Next 5 tasks
```

### Combined Filtering & Pagination

```bash
GET /api/tasks?status=done&page=1&limit=5  # First 5 completed tasks
```

## 🚀 Ready for Production

### Environment Setup

```bash
# Development
npm run dev

# Production
npm start
```

### Database Options

- **Local MongoDB**: `mongodb://localhost:27017/taskmanager`
- **MongoDB Atlas**: `mongodb+srv://username:password@cluster.mongodb.net/taskmanager`

**Perfect for demonstrating full-stack development skills!** 🚀
