WhatsApp Clone

A real-time messaging application built with React and Firebase, replicating the core features of WhatsApp.

Features

Real-time Messaging: Instant chat functionality with WebSocket support.

User Authentication: Secure sign-up and login using Firebase Authentication.

Chat Rooms: Create and join multiple chat rooms.

Media Sharing: Send images, videos, and documents.

Push Notifications: Real-time notifications for new messages.

Tech Stack

Frontend: React, Redux, React Router

Backend: Firebase Firestore, Firebase Authentication

Styling: CSS Modules, Material-UI

Installation

Clone the repository:

git clone https://github.com/Divyansh2412/whatsapp-clone.git
cd whatsapp-clone


Install dependencies:

npm install


Start the development server:

npm start

Firebase Setup

Create a Firebase project at Firebase Console
.

Enable Firestore and Firebase Authentication (Email/Password).

Obtain your Firebase config object and replace the placeholder in src/firebase.js:

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

Contributing

Fork the repository.

Create a new branch (git checkout -b feature-name).

Make your changes.

Commit your changes (git commit -am 'Add new feature').

Push to the branch (git push origin feature-name).

Create a new Pull Request.

License

This project is licensed under the MIT License - see the LICENSE
 file for details.
