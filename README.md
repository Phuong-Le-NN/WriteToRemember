# Write To Remember

![Website Interface](/frontend/images/Screenshot_2025-07-06_at_11.31.53_AM_optimized.png)

## Overview

Write To Remember is a full-stack web application built with React TypeScript frontend and Node.js Express backend. The application features note-taking capabilities and an AI chatbot ("Chatty") designed as a supportive big sibling for children aged 4-8, focused on early childhood development. This AI feature is specifically for young users (with supervision of adult).

## Features

- User authentication and registration
- Note creation, editing, and management
- AI chatbot integration using Groq SDK
- Real-time chat functionality
- Responsive design with TailwindCSS
- End-to-end testing with Playwright

## Tech Stack

**Frontend:**
- React 18 with TypeScript
- Vite build tool
- TailwindCSS for styling
- React Router for navigation
- React Query for state management
- Axios for API requests

**Backend:**
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JWT authentication
- Groq SDK for AI integration
- bcryptjs for password hashing

**Testing:**
- Playwright for E2E testing

## Project Structure

```
WriteToRemember/
├── frontend/                    # React TypeScript frontend
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── SignOutButton.tsx
│   │   ├── pages/               # Page components
│   │   │   ├── Homepage.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── SignIn.tsx
│   │   │   ├── CreateNote.tsx
│   │   │   ├── AllNotes.tsx
│   │   │   ├── UpdateNote.tsx
│   │   │   └── Chatty.tsx
│   │   ├── contexts/            # React context providers
│   │   │   └── AppContext.tsx
│   │   ├── layouts/             # Layout components
│   │   │   └── Layout.tsx
│   │   ├── api-client.ts        # API service functions
│   │   ├── App.tsx              # Main app component
│   │   └── main.tsx             # Entry point
│   ├── public/                  # Static assets
│   ├── images/                  # Image assets
│   ├── Dockerfile               # Frontend container config
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
├── backend/                     # Node.js Express backend
│   ├── src/
│   │   ├── models/              # MongoDB schemas
│   │   │   ├── user.ts
│   │   │   ├── note.ts
│   │   │   ├── chat.ts
│   │   │   └── message.ts
│   │   ├── routes/              # API route handlers
│   │   │   ├── auth.ts
│   │   │   ├── users.ts
│   │   │   ├── notes.ts
│   │   │   └── chats.ts
│   │   ├── middleware/          # Custom middleware
│   │   │   └── auth.ts
│   │   ├── types/               # Type definitions
│   │   │   └── groq-sdk.d.ts
│   │   └── index.ts             # Server entry point
│   ├── Dockerfile               # Backend container config
│   ├── package.json
│   └── tsconfig.json
├── e2e-tests/                   # Playwright E2E tests
│   ├── tests/
│   │   └── auth.spec.ts
│   ├── tests-examples/
│   │   └── demo-todo-app.spec.ts
│   ├── package.json
│   └── playwright.config.ts
├── docker-compose.yml           # Docker orchestration
└── README.md
```

## Environment Variables

Create the following `.env` files:

### Backend `.env` file (`/backend/.env`):
```env
MONGODB_CONNECTION_STRING=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
GROQ_API_KEY=your_groq_api_key
```

### Frontend `.env` file (`/frontend/.env`):
```env
VITE_API_BASE_URL=http://localhost:7000
```

## Local Development Setup

### Prerequisites
- Node.js 18+
- MongoDB database
- Groq API key

### Option 1: Docker (Recommended)

1. **Clone the repository**
```bash
git clone <repository-url>
cd WriteToRemember
```

2. **Set up environment files**
```bash
# Create backend .env file
cp backend/.env.example backend/.env
# Edit backend/.env with your credentials

# Create frontend .env file  
cp frontend/.env.example frontend/.env
# Edit frontend/.env with your API URL
```

3. **Run with Docker Compose**
```bash
docker-compose up --build
```

4. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:7000

### Option 2: Manual Setup

1. **Install dependencies**
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

# E2E Tests
cd ../e2e-tests
npm install
```

2. **Start development servers**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

3. **Run tests**
```bash
# E2E tests
cd e2e-tests
npx playwright test
```

## API Endpoints

- `POST /api/users/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/validate-token` - Validate JWT token
- `GET /api/notes/allNotes` - Get all user notes
- `POST /api/notes/addNote` - Create new note
- `PATCH /api/notes/updateNote/:id` - Update note
- `GET /api/notes/noteDetails/:id` - Get specific note
- `POST /api/chats` - Send chat message
- `GET /api/chats/messages` - Get chat history

## Docker Commands

```bash
# Build and run all services
docker-compose up --build

# Run in detached mode
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs

# Rebuild specific service
docker-compose build frontend
docker-compose build backend
```