# Rimjhim Shrivastav — Personal Portfolio

A responsive personal portfolio built with React and Vite, plus an Express/Node.js API for contact messages and MongoDB via Mongoose.

## Features

- Responsive Home, About, Skills, Projects, Journey, and Contact sections
- Mobile navigation
- Contact form connected to the backend API
- MongoDB persistence for contact messages
- Basic server security headers and contact-form rate limiting
- Git/GitHub-ready project structure

## Requirements

- Node.js LTS and npm
- Git
- A MongoDB database (MongoDB Atlas works)

## 1. Install frontend dependencies

From the project root:

```bash
npm install
```

## 2. Configure the backend

```bash
cd server
npm install
```

Copy `server/.env.example` to `server/.env`, then set your actual MongoDB connection string and credentials. Never commit `.env` or share database credentials.

Example local settings:

```env
PORT=5000
MONGODB_URI=your_real_mongodb_connection_string
CLIENT_ORIGIN=http://localhost:5173
```

## 3. Run the project locally

Open two terminals from the project root.

Terminal A — React:

```bash
npm run dev
```

Terminal B — API:

```bash
cd server
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

Check the API at `http://localhost:5000/api/health`.

The contact form stores messages only when the backend is running and MongoDB is configured.

## 4. Production deployment

- Deploy the React/Vite frontend to a static frontend host.
- Deploy the `server` folder/API to a Node.js host.
- Use MongoDB Atlas or another secured MongoDB deployment.
- Set `VITE_API_URL` in the frontend host to the deployed API base URL (without a trailing slash).
- Set `MONGODB_URI`, `CLIENT_ORIGIN`, and `PORT` in the backend host's environment settings.
- Set `CLIENT_ORIGIN` to the exact deployed frontend origin.
- Rebuild/redeploy the frontend after changing `VITE_API_URL`.
- Never publish real `.env` files, database passwords, or private keys.

## 5. Upload to GitHub

Create an empty repository on GitHub, then run these commands from the project root:

```bash
git init
git add .
git commit -m "Create personal portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

Replace the example URL with your own GitHub repository URL. If Git is already initialized or `origin` already exists, inspect with `git status` and `git remote -v` before running `git init` or `git remote add origin`.

## Personalize before publishing

- Replace placeholder email and social profile links in `src/App.jsx`.
- Replace sample project cards with your real projects and links.
- Review your education/skills descriptions so they accurately reflect your experience.
- Add your own profile image only if you want one.
