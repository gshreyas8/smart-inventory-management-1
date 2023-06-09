import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { FirebaseAppProvider } from "reactfire";
import "bootstrap/dist/css/bootstrap.min.css";
import GodownProvider from "./contexts/GodownProvider";
import { Provider } from "react-redux";

import store from "./Redux";
const firebaseConfig = {
  apiKey: "AIzaSyCdyXuoTZyqaTovj5kZlbz9cYh-OYg1v9Q",
  authDomain: "react-auth-c5aeb.firebaseapp.com",
  projectId: "react-auth-c5aeb",
  storageBucket: "react-auth-c5aeb.appspot.com",
  messagingSenderId: "768820425713",
  appId: "1:768820425713:web:11ae25a75b01d1a2e08a50",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <BrowserRouter>
        <NextUIProvider>
          <GodownProvider>
            <App />
          </GodownProvider>
        </NextUIProvider>
      </BrowserRouter>
    </FirebaseAppProvider>
  </Provider>
);
