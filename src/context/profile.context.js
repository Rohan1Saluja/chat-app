/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase/app";
import { auth, database, messaging } from "../misc/firebase";

export const isOfflineForDatabase = {
  state: "offline",
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};
const isOnlineForDatabase = {
  state: "online",
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const ProfileContext = createContext();

// !------------------------------- Export Function Logic -------------------------------

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let userRef;
    let userStatusRef;
    let tokenRefreshUnsub;

    const authUnsub = auth.onAuthStateChanged(async (authObj) => {
      // TODO: --------------------- Conditional Rendering ---------------------
      if (authObj) {
        userStatusRef = database.ref(`/status/${authObj.uid}`);
        userRef = database.ref(`/profiles/${authObj.uid}`);
        userRef.on("value", (snap) => {
          const { name, createdAt, avatar } = snap.val();

          const data = {
            name,
            createdAt,
            avatar,
            uid: authObj.uid,
            email: authObj.email,
          };
          setProfile(data);
          setIsLoading(false);
        });

        database.ref(".info/connected").on("value", (snap) => {
          if (!!snap.val() === false) {
            return;
          }
          userStatusRef
            .onDisconnect()
            .set(isOfflineForDatabase)
            .then(() => {
              userStatusRef.set(isOnlineForDatabase);
            });
        });

        // TODO --------- for RealTime Notifications ->Retrieve Current Registration Token ---------

        if (messaging) {
          try {
            const currentToken = await messaging.getToken();
            if (currentToken) {
              await database
                .ref(`/fcm_tokens/${currentToken}`)
                .set(authObj.uid);
            }
          } catch (err) {
            console.log("An error occured while retrieving token. ", err);
          }

          tokenRefreshUnsub = messaging.onTokenRefresh(async () => {
            try {
              const currentToken = await messaging.getToken();
              if (currentToken) {
                await database
                  .ref(`/fcm_tokens/${currentToken}`)
                  .set(authObj.uid);
              }
            } catch (err) {
              console.log("An error occured while retrieving token. ", err);
            }
          });
        }

        // TODO ---------------- for RealTime Notifications ----------------
        // ?-------
        // ?-------
      } else {
        if (userRef) {
          userRef.off();
        }

        if (userStatusRef) {
          userStatusRef.off();
        }

        if (tokenRefreshUnsub) {
          tokenRefreshUnsub();
        }

        database.ref(".info/connected").off();

        setProfile(null);
        setIsLoading(false);
      }
    });
    return () => {
      authUnsub();
      database.ref(".info/connected").off();

      if (userRef) {
        userRef.off();
      }

      if (tokenRefreshUnsub) {
        tokenRefreshUnsub();
      }

      if (userStatusRef) {
        userStatusRef.off();
      }
    };
  }, []);
  // TODO: --------------------- Conditional Rendering ---------------------

  // !------------------------------- Export Function Logic -------------------------------

  return (
    <ProfileContext.Provider value={{ isLoading, profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
