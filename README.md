# Kalaafi - College Arts Score Publication Website

A full-stack web application for publishing and managing college arts festival scores, programs, and gallery.

## Project Structure

```
kalaafi/
├── frontend/          # React + Vite frontend application
│   ├── src/          # React components and pages
│   ├── public/       # Static assets
│   └── package.json  # Frontend dependencies
│
├── backend/          # Node.js + Express backend server
│   ├── server.js     # Main server file
│   ├── data/         # Data files (TOML/JSON)
│   └── package.json  # Backend dependencies
│
└── README.md         # This file
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kalaafi
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

#### Development Mode

1. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   # Backend runs on http://localhost:3001
   ```

2. **Start the Frontend Development Server** (in a new terminal)
   ```bash
   cd frontend
   npm run dev
   # Frontend runs on http://localhost:5173
   ```

3. **Open your browser** and navigate to `http://localhost:5173`

#### Production Build

1. **Build the Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Preview Production Build** (optional)
   ```bash
   npm run preview
   ```

## Features

- 📊 **Scoreboard**: Display group and individual performance scores
- 🎭 **Programs**: View offstage and onstage programs
- 📢 **Notice Board**: Program announcements and updates
- 🖼️ **Gallery**: Image upload and display functionality
- 🔐 **Admin Dashboard**: Manage content and scores

## Tech Stack

### Frontend
- React 18
- React Router v7
- Vite
- Three.js / Vanta.js (for visual effects)

### Backend
- Node.js
- Express
- Multer (file uploads)
- CORS
- TOML/JSON data storage

## API Endpoints

The backend provides the following API endpoints:

- `GET /api/programs` - Get all programs
- `GET /api/scores` - Get all scores
- `GET /api/notices` - Get all notices
- `GET /api/gallery` - Get gallery images
- `POST /api/gallery/upload` - Upload gallery image (admin)
- And more...

## Configuration

### Frontend
The frontend API configuration can be found in `frontend/src/config.js`. Update the API base URL for different environments.

### Backend
The backend server configuration is in `backend/server.js`. Default port is 3001.

## License

This project is private and proprietary.
