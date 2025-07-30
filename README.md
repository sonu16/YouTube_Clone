# YouTube Clone (MERN Stack)

A full-stack YouTube-like video sharing platform built with the MERN stack (MongoDB, Express.js, React, Node.js). Users can sign up, upload videos, comment, and view channels, with a responsive UI inspired by YouTube.

## Features

- User authentication (register, login, logout)
- Video upload with thumbnail and category
- Channel creation and management
- Video listing, viewing, and suggestions
- Commenting on videos
- Responsive design for desktop and mobile
- Profile pages with user videos and channel info

## Tech Stack

- **Frontend:** React, Vite, React Router, Axios, Material UI, React Icons
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt
- **Cloud Storage:** Cloudinary (for video and image uploads)

## Folder Structure

```
backend/
  controllers/
  database/
  middleware/
  models/
  public/
  routes/
  .env
  package.json
  server.js

frontend/
  public/
  src/
    Components/
    Pages/
    App.jsx
    main.jsx
    index.css
  package.json
  vite.config.js
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB Atlas or local MongoDB instance

### Backend Setup

1. Go to the `backend` directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file (see `.env` example in the repo) with your MongoDB URI and JWT secret.
4. Start the backend server:
   ```sh
   npm start
   ```
   The backend runs on `http://localhost:5000`.

### Frontend Setup

1. Go to the `frontend` directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend dev server:
   ```sh
   npm run dev
   ```
   The frontend runs on `http://localhost:5173`.

### Environment Variables

**backend/.env**
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Usage

- Register a new user and log in.
- Create a channel and upload videos.
- Browse, search, and watch videos.
- Comment on videos and view other users' channels.

## License

This project is for educational purposes.

---

## Developed by Mohd Shahid

#### Project link:- [https://github.com/sonu16/YouTube_Clone.git](https://github.com/sonu16/YouTube_Clone.git)

