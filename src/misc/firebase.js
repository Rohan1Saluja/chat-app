import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyAwLrEufpRMHseovDFsmKkT5g2MAL8LZq4",
  authDomain: "chat-web-app-eba78.firebaseapp.com",
  projectId: "chat-web-app-eba78",
  storageBucket: "chat-web-app-eba78.appspot.com",
  messagingSenderId: "963290275136",
  appId: "1:963290275136:web:793e50100b8b77cbbc2ea5",
};

const app = firebase.initializeApp(config);

export const auth = app.auth();
export const database = app.database();
