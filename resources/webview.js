import App from "../src/components/App.tsx";
import React from "react";
import ReactDOM from "react-dom";

// disable the context menu (eg. the right click menu) to have a more native feel
document.addEventListener("contextmenu", (e) => {
	e.preventDefault();
});

(() => {
	ReactDOM.render(<App />, document.getElementById("root"));
})();
