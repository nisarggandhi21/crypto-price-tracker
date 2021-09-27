import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";

// MUI
import "@fontsource/roboto";

// Firebase
import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDMbZ-AcCZEgFMHe6h5XeXwJRkkvEZHn6w",
  authDomain: "crypto-price-tracker-285f7.firebaseapp.com",
  projectId: "crypto-price-tracker-285f7",
  storageBucket: "crypto-price-tracker-285f7.appspot.com",
  messagingSenderId: "615469203618",
  appId: "1:615469203618:web:fc1d5c0ed62dfac23f57fb",
};

if (!firebase.apps[0]) {
  firebase.initializeApp(firebaseConfig);
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
