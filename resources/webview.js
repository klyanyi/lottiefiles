import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import App from "../src/components/App.tsx";
import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";

// disable the context menu (eg. the right click menu) to have a more native feel
document.addEventListener("contextmenu", (e) => {
	e.preventDefault();
});

const client = new ApolloClient({
	uri: "https://graphql.lottiefiles.com/",
	cache: new InMemoryCache(),
});

(() => {
	ReactDOM.render(
		<ApolloProvider client={client}>
			<RecoilRoot>
				<App />
			</RecoilRoot>
		</ApolloProvider>,
		document.getElementById("root")
	);
})();
