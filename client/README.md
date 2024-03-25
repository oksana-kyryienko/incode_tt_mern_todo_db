# React + TypeScript + Vite

This repository contains code for a MERN (MongoDB, Express.js, React.js, Node.js) application consisting of a server-side API and a React frontend for managing todo tasks.

Server-side API
The server-side API is built using Express.js and connects to a MongoDB database. It provides endpoints for CRUD operations on todo items.

Setup
Install dependencies:

npm install
Create a .env file in the root directory and add your MongoDB connection string:

env

MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
Start the server:

npm start

Endpoints
POST /api/item: Create a new todo item.
GET /api/items: Get all todo items.
PUT /api/item/:id: Update a todo item by ID.
DELETE /api/item/:id: Delete a todo item by ID.

Client-side React App
The client-side React app provides a user interface for managing todo tasks. It includes features for creating, listing, updating, and deleting tasks.

Setup
Install dependencies:

npm install

Start the development server:

npm run dev

Components
CreateTask: Component for creating new todo tasks.
ListTasks: Component for listing todo tasks by status (todo, in progress, closed).
TaskItem: Component representing a single todo task with options to update and delete.

Technologies Used
Backend: Node.js, Express.js, MongoDB, Mongoose
Frontend: React.js, React DnD (Drag and Drop), react-hot-toast (Notifications)