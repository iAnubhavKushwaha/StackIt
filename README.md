# StackIt – A Minimal Q&A Forum Platform

StackIt is a minimal question-and-answer platform designed to promote collaborative learning and structured knowledge sharing. It offers a clean and simple UI focused on the core features of community-driven Q&A — allowing users to ask questions, post answers, and interact meaningfully.

---

## 🌟 Features

### 👥 User Roles

| Role   | Permissions                                             |
|--------|---------------------------------------------------------|
| Guest  | View all questions and answers                          |
| User   | Register, log in, post questions/answers, vote          |
| Admin  | Moderate content                                        |

---

### ✅ Core Functionality

- **Ask Questions**  
  Submit questions with:
  - Title (short & descriptive)
  - Description (rich text editor)
  - Tags (multi-select input: e.g., `React`, `JWT`)

- **Rich Text Editor**  
  For both questions & answers:
  - Bold, Italic, Strikethrough
  - Numbered & bullet lists
  - Emojis, hyperlinks, image uploads
  - Text alignment (left, center, right)

- **Answer Questions**  
  Logged-in users can answer any question using the same rich text editor.

- **Voting & Answer Acceptance**  
  - Upvote/downvote answers  
  - Question owners can mark an answer as "accepted"

- **Tagging System**  
  - Questions must include relevant topic tags for better discoverability

- **Notification System**  
  - Users receive alerts for:
    - New answers to their questions
    - Comments on their answers
    - Mentions via `@username`
  - Bell icon in header with unread badge and dropdown list

---

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, Vite  
- **Backend**: Node.js, Express.js, MongoDB  
- **Auth**: JWT-based authentication  
- **Rich Text Editor**: TipTap / Draft.js (depending on implementation)

---

## 🧑‍💻 Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/iAnubhavKushwaha/StackIt.git
cd StackIt
```

---

### 2. Install dependencies

#### Backend:
```bash
cd server
npm install
```

#### Frontend:
```bash
cd client
npm install
```

---

### 3. Setup Environment Variables

Create a `.env` file inside the `server/` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/stackit
JWT_SECRET=your_secret_key
```

> ⚠️ Make sure MongoDB is running locally.

---

### 4. Run the project

From the root folder, run both servers in parallel:

```bash
# Terminal 1: Run backend
cd server
npm run dev

# Terminal 2: Run frontend
cd client
npm run dev
```

The app will be live on:  
Frontend → `http://localhost:5173`  
Backend  → `http://localhost:5000`

---

## 🧪 Folder Structure Overview

```
StackIt/
├── client/         # React Frontend
│   ├── components/
│   ├── pages/
│   └── ...
├── server/         # Express Backend
│   ├── routes/
│   ├── models/
│   └── ...
```

---

## 🤝 Contribution

Pull requests are welcome. If you find bugs or want to request a feature, feel free to open an issue.

---

## 📄 License

This project is open-source and available under the MIT License.

---

© 2025 StackIt. All rights reserved.