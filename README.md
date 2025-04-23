# Todo App

A full-stack todo application with NestJS backend and React frontend.

## Project Structure

This repository contains:

- `Todo-App` - Frontend Next application
- `nestjs-todo` - Backend NestJS API

### Folder Convention

#### Frontend Structure (`Todo-App`)

```
Todo-App/
├── src/
│   ├── app/                # Application pages
│   │   ├── login/          # Login page
│   │   ├── register/       # Registration page
│   │   └── todos/          # Todo management pages
│   │       ├── [id]/edit/  # Edit todo page
│   │       └── create/     # Create todo page
│   ├── components/         # Reusable components
│   │   ├── auth/           # Authentication components
│   │   ├── layout/         # Layout components
│   │   └── todos/          # Todo components
│   ├── contexts/           # React contexts
│   ├── hooks/              # Custom hooks
│   ├── services/           # API services
│   ├── types/              # TypeScript types
│   └── utils/              # Utility functions
```

#### Backend Structure (`nestjs-todo`)

```
nestjs-todo/
├── src/
│   ├── auth/               # Authentication module
│   ├── database/           # Database initialization
│   ├── todo/               # Todo module
│   ├── users/              # Users module
│   ├── app.module.ts       # Root module
│   └── main.ts             # Application entry point
```

## Features

- User authentication (register/login)
- Todo management (create, read, update, delete)
- JWT-based security
- PostgreSQL database

## Getting Started

### Prerequisites

- Node.js (v16+)
- PostgreSQL
- npm or yarn

### Backend Setup (nestjs-todo)

1. Navigate to the backend directory:
   ```bash
   cd nestjs-todo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_DATABASE=todo_app
   JWT_SECRET=your-secret-key
   ```

4. Initialize the database:
   ```bash
   npm run db:init
   ```

5. Start the backend server:
   ```bash
   # Development
   npm run start:dev
   
   # Production
   npm run build
   npm run start:prod
   ```

The API will be available at `http://localhost:3001`.

### Frontend Setup (Todo-App)

1. Navigate to the frontend directory:
   ```bash
   cd Todo-App
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. For production build:
   ```bash
   npm run build
   npm run start
   ```

The application will be available at `http://localhost:3000`.

## API Endpoints

### Authentication
- `POST /auth/login` - Login with email and password
- `POST /users` - Register a new user

### Todo Management
- `GET /todo` - Get all todos for current user
- `GET /todo/:id` - Get a specific todo
- `POST /todo` - Create a new todo
- `PATCH /todo/:id` - Update a todo
- `DELETE /todo/:id` - Delete a todo

## Tech Stack

### Backend
- NestJS
- TypeORM
- PostgreSQL
- JWT Authentication

### Frontend
- NextJS
- Axios
- TailwindCSS
