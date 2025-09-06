import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Theme (choose one from node_modules/primereact/resources/themes/)
import "primereact/resources/themes/saga-blue/theme.css"; // or vela, arya, etc.

// Core CSS (required)
import "primereact/resources/primereact.min.css";

// Icons (required for button icons, etc.)
import "primeicons/primeicons.css";

import "primeflex/primeflex.css";

import { PrimeReactProvider } from "primereact/api";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <BrowserRouter>
    <PrimeReactProvider value={{ ripple: true }}>
      <App />
    </PrimeReactProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
