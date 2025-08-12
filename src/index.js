import * as atatus from "atatus-spa";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

atatus.config('b57fc901dee94403823ef107858d734f').install();

serviceWorkerRegistration.unregister();

reportWebVitals();
