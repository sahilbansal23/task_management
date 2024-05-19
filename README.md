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
   git clone https://github.com
   cd task-management-api
