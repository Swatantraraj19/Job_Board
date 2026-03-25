# 🚀 JobBoard: Next-Generation Cloud-Powered Career Platform

**JobBoard** is a sophisticated, full-stack React application designed for the modern developer seeking career opportunities. By integrating the **Hacker News API** with a robust **Firebase Backend**, JobBoard provides real-time job tracking, personalized user profiles, and seamless cloud synchronization across all devices.

---

## ✨ Key Features

### 👤 Advanced Authentication
- **Multi-Method Login:** Seamless integration with **Google OAuth** and traditional Secure Email/Password flows.
- **Dynamic Profiles:** Personalized user dashboards that automatically pull names and photos from social providers.
- **Security-First Signup:** Built-in validation for trusted domains (Gmail, Outlook) and enforced password complexity.

### ☁️ Cloud Persistence (Powered by Firestore)
- **Real-Time Sync:** Saved jobs are instantly synchronized to the **Cloud Firestore** database.
- **Cross-Device Continuity:** Start saving jobs on your desktop and view them instantly on your mobile device.
- **Secure Data Mapping:** User-specific data silos ensuring that your saved opportunities are private and protected.

### 🛠️ Professional UI/UX
- **Smooth Navigation:** Built with **React Router v6** for a seamless, SPA experience.
- **Theme Support:** Native Dark/Light mode support using Tailwind CSS.
- **Premium Aesthetics:** Modern, responsive design utilizing the Lucide icon set and glassmorphism principles.

### 🛡️ Security & Performance
- **Vulnerability Patching:** All dependencies are audited and secured via **Snyk**.
- **Pagination Engine:** High-performance data fetching from the Hacker News API with custom pagination logic.

---

## 🏗️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18+, Vite, Tailwind CSS 4 |
| **Backend** | Firebase Authentication, Cloud Firestore |
| **API** | Hacker News API |
| **Icons & Style** | Lucide React, Google Fonts (Inter/Roboto) |
| **Security** | Snyk, Firebase Security Rules |

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Swatantraraj19/Job_Board.git
cd Job_Board
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Firebase
- Create a new project in [Firebase Console](https://console.firebase.google.com/).
- Enable **Authentication** (Google & Email/Password).
- Enable **Firestore Database** in Test Mode.
- Update `src/lib/firebase.js` with your project credentials.

### 4. Run Locally
```bash
npm run dev
```

---

## 👨‍💻 Professional Summary

*"Developed a scalable React-based job board utilizing the Hacker News API. Migrated local storage to **Firebase Firestore** for real-time synchronization. Architected a robust auth system with **Google OAuth**, custom **Security Rules**, and resolved vulnerabilities using **Snyk** for a production-ready codebase."*

---
**Live Link:** https://job-board-alpha-lake.vercel.app/

---

### **Made with ❤️ by [Swatantraraj Singh](https://github.com/Swatantraraj19)**
