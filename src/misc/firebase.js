import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import "firebase/messaging";

const config = {
  apiKey: "AIzaSyAwLrEufpRMHseovDFsmKkT5g2MAL8LZq4",
  authDomain: "chat-web-app-eba78.firebaseapp.com",
  databaseURL: "https://chat-web-app-eba78-default-rtdb.firebaseio.com/",
  projectId: "chat-web-app-eba78",
  storageBucket: "chat-web-app-eba78.appspot.com",
  messagingSenderId: "963290275136",
  appId: "1:963290275136:web:793e50100b8b77cbbc2ea5",
};

const app = firebase.initializeApp(config);

export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();

export const messaging = firebase.messaging.isSupported()
  ? app.messaging()
  : null;

if (messaging) {
  messaging.usePublicVapidKey(
    "BIdYv60QLO444Rf-K1d8iK28-_FfQutAsIG4MlXfc17HHL4A8UE4nbOj4sQNCsFjRE1iMu5_SPtCNyvtSWG4t-U"
  );
  messaging.onMessage((data) => {
    console.log(data);
  });
}
