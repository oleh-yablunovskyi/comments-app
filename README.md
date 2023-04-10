# Comments App

A single-page application (SPA) for displaying, creating, and managing comments built using React, Express.js, and PostgreSQL.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Running the App](#running-the-app)
- [Technology Stack](#technology-stack)

## Features

- Display top-level comments and their child comments with support for plain text and certain HTML tags
- Create new comments with support for uploading images and text files
- Robust validation for comment input on both frontend and backend
- Images are automatically resized to a specified size on the server
- WebSockets for real-time updates
- Express.js API for handling backend requests
- Google reCAPTCHA integration for form validation
- Sort comments by different criteria
- Pagination for efficient navigation through comments

## Getting Started

1. Clone this repository.
2. Ensure you are using Node.js v14.18.2.
3. Install dependencies by running `npm install` in both the frontend and backend directories.

## Running the App

1. Create a `.env` file in the `frontend` directory with the following content:
``` console
REACT_APP_BASE_URL=http://localhost:5000
```
2. Start the backend server by running `npm start` in the `backend` directory.
3. Start the frontend server by running `npm start` in the `frontend` directory.
4. Open your browser and navigate to `http://localhost:3000` (or the appropriate port if different).

## Technology Stack

- React for the frontend
- Express.js for the backend
- PostgreSQL for the database
- Multer for handling file uploads
- Sharp for resizing uploaded images on server
- Google reCAPTCHA for form validation
- WebSockets for real-time updates
- React Router for routing and sorting options
