import React, { Component } from "react";

import SearchBar from "./Components/SearchBar.tsx";

class App extends Component {
	render() {
		return (
			<div className="lt">
				<h1 className="font-bold">Hello from React</h1>
				<SearchBar />
			</div>
		);
	}
}

export default App;
