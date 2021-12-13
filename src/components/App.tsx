import React, { Component } from "react";

import Navbar from "./Navbar/Navbar";
import Routes from "./Routes/Routes";

class App extends Component {
	constructor(props: any) {
		super(props);
		// Don't call this.setState() here!
		this.state = { view: 0 };
		this.onSelect = this.onSelect.bind(this);
	}

	onSelect(to: string) {
		this.setState({ view: to });
	}

	render() {
		return (
			<div className="lt">
				<Navbar
					brand={{ name: "LottieFiles", to: "/" }}
					links={[{ name: "Search", to: "/search", icon: "search" }]}
					onSelect={this.onSelect}
				/>
				<Routes />
			</div>
		);
	}
}

export default App;
