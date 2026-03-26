# 🚀 ExamNotesAI — AI-Powered Smart Study Platform

<div align="center">

<img src="https://img.shields.io/badge/ExamNotesAI-AI%20Study%20Platform-0A66C2?style=for-the-badge&logo=bookstack&logoColor=white" />

<h3>📚 Turn Hours of Studying into Minutes with AI</h3>

<p>
An intelligent, full-stack platform that helps students generate high-quality, exam-ready notes instantly using AI.
</p>

<br/>

<a href="https://examnotesaifrontrend.onrender.com">🌐 Live Demo</a> • <a href="https://github.com/shubhamk-io/ExamNotesAI/issues">🐛 Report Bug</a> • <a href="https://github.com/shubhamk-io/ExamNotesAI/issues">✨ Request Feature</a>

<br/><br/>

<img src="https://img.shields.io/github/stars/shubhamk-io/ExamNotesAI?style=social" />
<img src="https://img.shields.io/github/forks/shubhamk-io/ExamNotesAI?style=social" />

</div>

---

## 🧠 What is ExamNotesAI?

**ExamNotesAI** is a next-generation AI-powered study assistant designed for students who want to learn faster and smarter.

Instead of spending hours making notes, simply enter your topic — and let AI generate:

* 📘 Structured notes
* 📊 Visual diagrams
* 📂 Project documentation
* 📄 Clean downloadable PDFs

> ⚡ Built to maximize productivity, minimize effort.

---

## ✨ Key Features

### 🔐 Authentication

* Google Sign-In via Firebase
* Secure JWT-based sessions

### 🤖 AI Capabilities

* High-quality exam-focused notes
* Project documentation generator
* Auto-generated charts & diagrams

### 📦 Productivity Tools

* PDF export (print-ready format)
* Notes history tracking
* Smooth UI animations

### 💳 Monetization System

* Free credits on signup 🎁
* Stripe-powered payments
* Scalable credit system

---

## 🛠️ Tech Stack

### 🎨 Frontend

* React 18
* Redux Toolkit
* Tailwind CSS
* Framer Motion
* Firebase Auth

### ⚙️ Backend

* Node.js + Express
* MongoDB Atlas
* JWT Authentication
* Google Gemini API
* Stripe Payments
* PDFKit

---

## 🏗️ Architecture Overview

```bash
Client (React) → API (Express) → Database (MongoDB)
                     ↓
               Gemini AI API
                     ↓
                PDF Generator
```

---

## 🚀 Quick Start

### 1️⃣ Clone Repository

```bash
git clone https://github.com/shubhamk-io/ExamNotesAI.git
cd ExamNotesAI
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create `.env`:

```env
PORT=5000
MONGODB_URI=
JWT_SECRET=
GEMINI_API_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NODE_ENV=development
```

Run:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

Create `.env`:

```env
VITE_SERVER_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
```

Run:

```bash
npm run dev
```

---

## 📁 Folder Structure

```
ExamNotesAI/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   ├── services/
│   └── utils/
│
└── server/
    ├── config/
    ├── controllers/
    ├── models/
    ├── routes/
    └── utils/
```

---

## 🔌 API Overview

### Auth

* `POST /api/auth/google`
* `GET /api/auth/logout`

### Notes

* `POST /api/notes/generate`
* `GET /api/notes/history`

### PDF

* `POST /api/pdf/generate`

### Credits

* `POST /api/credit/purchase`
* `POST /api/credit/webhook`

---

## 💳 Credit System

| Action        | Cost |
| ------------- | ---- |
| Exam Notes    | 10   |
| Project Notes | 10   |
| Charts        | 15   |
| PDF           | 5    |

🎁 New users get **50 free credits**

---

## 🌍 Deployment

* Frontend: Render
* Backend: Render
* Database: MongoDB Atlas
* Auth: Firebase

---

## 🔒 Security Highlights

* HttpOnly Cookies (JWT)
* Secure CORS setup
* Stripe webhook verification
* Production-safe authentication

---

## 📸 Screenshots

> Add your UI screenshots here for better engagement

---

## 🤝 Contributing

We welcome contributions!

```bash
fork → clone → commit → push → PR 🚀
```

---

## 👨‍💻 Author

**Shubham Kumar**

* GitHub: https://github.com/shubhamk-io

---

## ⭐ Support

If you like this project:

👉 Give it a **star**
👉 Share it with others

---

<div align="center">

💡 *Built with passion to simplify student life*

</div>
