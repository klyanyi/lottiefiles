import React, { Component } from "react";

import Navbar from "./Navbar/Navbar";
import Routes from "./Routes/Routes";

class App extends Component {
	render() {
		return (
			<div>
				{/* <Navbar
					brand={{ name: "Login", to: "/" }}
					links={[
						{ name: "Convert", to: "/convert", icon: "convert" }, // dummy
						{ name: "Preview", to: "/preview", icon: "preview" }, // dummy
						{ name: "Search", to: "/search", icon: "search" },
					]}
				/> */}
				<Routes />
			</div>
		);
	}
}

export default App;
