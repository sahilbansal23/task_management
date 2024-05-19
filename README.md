# Task Management API

## Overview

The Task Management API is a backend service built using Express.js and MongoDB. It facilitates the management of tasks and subtasks for users, allowing CRUD operations (Create, Retrieve, Update, Delete) on tasks and their associated subtasks. The API also handles soft deletion, ensuring deleted tasks and subtasks are excluded from the GET API responses.

## Features

- User Management
  - Create and retrieve users.
- Task Management
  - Create, retrieve, update, and delete tasks.
- Subtask Management
  - Retrieve and update subtasks for specific tasks.
- Soft Deletion
  - Mark tasks and subtasks as deleted without removing them from the database.

## Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sahilbansal23/task_management.git
   cd task_management

2. Install dependencies

   ```bash
   npm install

3. Set Up Environment Variables

   Create a .env file in the root directory with the following content:
   ```bash
   PORT =5000
   mongo_str =[ MONGODB URI]

4. Start The Server:

   ```bash
    npm start
5. Create a new user:
   ```bash
     curl -X POST http://localhost:5000/createUser -H "Content-Type: application/json" -d '{"name":"Sahil Bansal","email":"bansal2210sahil@gmail.com"}'

6. Swagger link
  ```bash
  https://app.swaggerhub.com/apis-docs/BANSAL2210SAHIL/Task-Management/1.0.0-oas3#/
