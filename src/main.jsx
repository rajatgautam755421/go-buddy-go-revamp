import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { FlightProvider } from "./components/context/FormContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FlightProvider>
      <App />
    </FlightProvider>
  </React.StrictMode>
);
