import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import store from "./store";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GOOGLE_CLIENT_ID } from "./config";

const root = ReactDOM.createRoot(document.getElementById("root"));

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

root.render(
  GOOGLE_CLIENT_ID ? (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>{app}</GoogleOAuthProvider>
  ) : (
    app
  )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
