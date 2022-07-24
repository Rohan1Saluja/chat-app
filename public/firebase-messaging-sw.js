/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyAwLrEufpRMHseovDFsmKkT5g2MAL8LZq4",
  authDomain: "chat-web-app-eba78.firebaseapp.com",
  databaseURL: "https://chat-web-app-eba78-default-rtdb.firebaseio.com/",
  projectId: "chat-web-app-eba78",
  storageBucket: "chat-web-app-eba78.appspot.com",
  messagingSenderId: "963290275136",
  appId: "1:963290275136:web:793e50100b8b77cbbc2ea5",
});

firebase.messaging();
