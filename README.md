# SnapClone

SnapClone is a modern Snapchat-inspired social app built with a React + Vite frontend, Node + Express backend, MongoDB, Socket.IO, JWT auth, and Cloudinary media uploads.

## Project structure

- `frontend/` — React application
- `backend/` — Express API and Socket server

## Phase 1 implementation

This first delivery includes the project foundation and production-ready auth flow:

- Vite + React + Tailwind frontend shell
- Protected routing with JWT-based auth state
- Signup and login pages with validation and error handling
- Express API with MongoDB connection
- User model and bcrypt password hashing
- JWT middleware and secure API routes
- Environment-based configuration
- Testing foundation for auth endpoints

## Local setup

1. Copy `.env.example` to `.env` and update values.
2. Install dependencies from the repository root:

```bash
npm install
```

3. Start the full app:

```bash
npm run dev
```

4. Access the app:

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Backend scripts

```bash
npm run dev --workspace backend
npm run start --workspace backend
npm run test --workspace backend
```

## Frontend scripts

```bash
npm run dev --workspace frontend
npm run build --workspace frontend
npm run lint --workspace frontend
```

## Notes

- MongoDB must be running locally or use a cloud MongoDB URI.
- Cloudinary variables are included for future media integration.
- This project is intentionally structured to support later phases: stories, friend requests, real-time chat, media generation, and Snap delivery.
