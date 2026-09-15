# MERN Book CRUD

A book management app built with MongoDB Atlas, Express, React (Vite) and Node.js, with JWT login.

## Project structure

```
backend/   Express API (auth + books), Mongoose models
frontend/  React + Vite client
```

## Setup

### 1. MongoDB Atlas

1. Create a free M0 cluster at https://cloud.mongodb.com
2. **Database Access** → add a database user (username + password)
3. **Network Access** → add your IP (or `0.0.0.0/0` for lab use)
4. **Connect → Drivers** → copy the connection string

### 2. Backend

```bash
cd backend
cp .env.example .env    # then put your Atlas URI in MONGO_URI
npm install
npm run dev
```

API runs on http://localhost:8000

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

## API

| Method | Route               | Auth |
|--------|---------------------|------|
| POST   | /api/auth/register  | No   |
| POST   | /api/auth/login     | No   |
| GET    | /api/books          | Yes  |
| POST   | /api/books          | Yes  |
| PUT    | /api/books/:id      | Yes  |
| DELETE | /api/books/:id      | Yes  |

## Git workflow (collaboration)

```bash
git clone https://github.com/Arpan7125/mern-book-crud.git
git checkout -b feature/<name>
git add .
git commit -m "describe change"
git push -u origin feature/<name>
```

Then open a Pull Request into `main` on GitHub and get it reviewed before merging.

`.env` and `node_modules/` are listed in `.gitignore` and are never committed.
