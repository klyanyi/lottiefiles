import BrowserWindow from "sketch-module-web-view";
import UI from "sketch/ui";
import { getWebview } from "sketch-module-web-view/remote";

const webviewIdentifier = "lottiefiles.webview";

export default function () {
	const options = {
		identifier: webviewIdentifier,
		width: 320,
		height: 480,
		show: false,
	};

	const browserWindow = new BrowserWindow(options);

	// only show the window when the page has loaded to avoid a white flash
	browserWindow.once("ready-to-show", () => {
		browserWindow.show();
	});

	const webContents = browserWindow.webContents;

	// print a message when the page loads
	webContents.on("did-finish-load", () => {
		UI.message("UI loaded!");
	});

	// add a handler for a call from web content's javascript
	webContents.on("nativeLog", (s) => {
		UI.message(s);
		webContents.executeJavaScript(`setRandomNumber(${Math.random()})`).catch(console.error);
	});

	browserWindow.loadURL(require("../resources/webview.html"));
}

// When the plugin is shutdown by Sketch (for example when the user disable the plugin)
// we need to close the webview if it's open
export function onShutdown() {
	const existingWebview = getWebview(webviewIdentifier);
	if (existingWebview) {
		existingWebview.close();
	}
}
