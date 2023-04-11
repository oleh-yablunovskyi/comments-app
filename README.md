# Comments App

A single-page application (SPA) for displaying, creating, and managing comments built using React, Express.js, and PostgreSQL.

Demo-link: https://oleh-yablunovskyi.github.io/comments-app/

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Running the App](#running-the-app)

## Features

- Display top-level comments and their child comments with support for plain text and certain HTML tags
- Create new comments with support for uploading images and text files
- Express.js API for handling backend requests
- WebSockets for real-time updates
- Robust validation for comment input on both frontend and backend
- Images are automatically resized to a specified size on the server
- Sort comments by different criteria
- Pagination for efficient navigation through comments
- Google reCAPTCHA integration for form validation

## Technology Stack

- React for the frontend
- Express.js for the backend
- PostgreSQL for the database
- WebSockets for real-time updates
- Multer for handling file uploads
- Sharp for resizing uploaded images on server
- Express-validator for data validation on server
- ReactQuill for text editor
- Sanitize-html for sanitization of form message
- React Router for routing and sorting options
- Google reCAPTCHA form form validation

## Getting Started

1. Clone this repository and open it in your editor.
2. Ensure you are using Node.js v14.18.2.
3. Create `.env` file inside the `backend` directory.
4. Add DATABASE_URL environment variable to .env file with the corresponding values you obtained from your PostgreSQL service or tool in folowing format:
``` console
DATABASE_URL=postgres://username:password@host:port/database_name
```
5. Add RECAPTCHA_SECRETKEY environment variable to .env file with the actual reCAPTCHA secret key in folowing format:
``` console
RECAPTCHA_SECRETKEY=your_recaptcha_secret_key
```

## Running the App

1. Start the backend server:
   - Open a terminal or command prompt.
   - Navigate to the backend directory by running `cd backend`.
   - Install backend dependencies by running `npm install`.
   - Start the backend server by running `npm start`.
2. Start the frontend server:
   - Open a new terminal or command prompt.
   - Navigate to the frontend directory by running `cd frontend`.
   - Install frontend dependencies by running `npm install`.
   - Start the frontend server by running `npm start`.
3. Open your web browser and navigate to `http://localhost:3000` (or use the appropriate port if it is different).
