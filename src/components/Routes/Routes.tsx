import * as React from "react";

import Icon from "../Icon";
import { searchInputState } from "../../atom";
import { useRecoilState } from "recoil";

const Search = () => {
	const [inputValue, setValue] = useRecoilState(searchInputState);

	const handleKeyPress = (event: any) => {
		setValue(event.target.value);
		if (event.key === "Enter") {
			window.postMessage("nativeLog", `Called from the recol ${event.target.value}`);
			// call API
		}
	};

	return (
		<div className="lt-input-container">
			<Icon icon="search" />
			<input
				type="text"
				placeholder="Search..."
				value={inputValue}
				onKeyPress={handleKeyPress}
				onChange={handleKeyPress}
			/>
		</div>
	);
};

export default Search;
