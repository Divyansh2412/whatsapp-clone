---

# WhatsApp Clone

A real-time messaging application built with **React** and **Firebase**, replicating core features of WhatsApp. Perfect for learning real-time chat implementation, authentication, and modern web development practices.

---

## 🚀 Features

* **Real-time Messaging** – Instant chat with Firestore database.
* **User Authentication** – Sign up and login securely using Firebase Authentication.
* **Chat Rooms** – Create and join chat rooms.
* **Media Sharing** – Send images, videos, and files.
* **Push Notifications** – Get notified of new messages.

---

## 🛠 Tech Stack

* **Frontend**: React, Redux, React Router
* **Backend**: Firebase Firestore, Firebase Authentication
* **Styling**: CSS Modules, Material-UI

---

## ⚡ Installation

1. **Clone the repository**

```bash
git clone https://github.com/Divyansh2412/whatsapp-clone.git
cd whatsapp-clone
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm start
```

Your app will run at `http://localhost:3000`.

---

## 🔧 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Enable **Firestore** and **Authentication** (Email/Password).
3. Replace the Firebase config in `src/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes
4. Commit your changes: `git commit -m "Add new feature"`
5. Push to your branch: `git push origin feature-name`
6. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---
