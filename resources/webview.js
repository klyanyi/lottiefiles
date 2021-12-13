import App from "../src/components/App.tsx";
import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";

// disable the context menu (eg. the right click menu) to have a more native feel
document.addEventListener("contextmenu", (e) => {
	e.preventDefault();
});

(() => {
	ReactDOM.render(
		<RecoilRoot>
			<App />
		</RecoilRoot>,
		document.getElementById("root")
	);
})();
