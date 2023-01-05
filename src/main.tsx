import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "tw-elements";
import "react-toastify/dist/ReactToastify.css";

import App from "./app";

// import Observer from 'tailwindcss-intersect';
// Observer.start()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
