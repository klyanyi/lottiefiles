import * as React from "react";

import { gql, useQuery } from "@apollo/client";
import { searchPageNum, searchQuery, searchResult } from "../../atom";
import { useRecoilValue, useSetRecoilState } from "recoil";

import Icon from "../Icon";
import lottie from "lottie-web";
import { searchPagination } from "../../selector";

const SearchInput = () => {
	const [inputValue, setInputValue] = React.useState("");

	const setRecoilValue = useSetRecoilState(searchQuery);

	const handleKeyPress = (event: any) => {
		setInputValue(event.target.value);
		if (event.key === "Enter") {
			setRecoilValue(inputValue ? inputValue : "");
		}
	};

	return (
		<div className="lf-input-container">
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

const Lottie = (props: { id: string; name: string; lottieUrl: string; gifUrl: string }) => {
	const { id, name, lottieUrl, gifUrl } = props;

	const lottieContainer = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		if (!lottieContainer.current?.hasChildNodes()) {
			lottie.loadAnimation({
				container: lottieContainer.current!,
				renderer: "svg",
				loop: true,
				autoplay: true,
				path: lottieUrl,
			});
		}
	});

	return (
		<div className="lf-card">
			<div className="lf-lottie" ref={lottieContainer}></div>
			<span className="lf-card-caption">
				{name} {id}
			</span>
		</div>
	);
};

const SearchResultsTitle = () => {
	const query = useRecoilValue(searchQuery);
	const pagination = useRecoilValue(searchPagination);

	return (
		<p className="font-bold py-1">
			{query
				? `Results for "${query}" (${pagination.startIndex} - ${pagination.lastIndex} of ${pagination.total})"`
				: "Discover Free Animations"}
		</p>
	);
};

const SearchResultsList = () => {
	const data = useRecoilValue(searchResult);

	return (
		<div className="lf-grid my-2">
			{data.results.map((item: { id: string; name: string; lottieUrl: string; gifUrl: string }, idx: number) => {
				const { id, name, lottieUrl, gifUrl } = item;
				return <Lottie key={idx} id={id} name={name} lottieUrl={lottieUrl} gifUrl={gifUrl} />;
			})}
		</div>
	);
};

const SearchResultsPagination = () => {
	const pagination = useRecoilValue(searchPagination);

	const setSearchPageValue = useSetRecoilState(searchPageNum);

	if (!pagination.list) return null;

	return (
		<div className="lf-pagination">
			<button className="lf-pagination-item">
				<span>...</span>
			</button>
			{pagination.list.map((item, index) => (
				<button
					key={index}
					onClick={setSearchPageValue.bind(this, item)}
					className={`lf-pagination-item ${pagination.currentPage === item ? "active" : null}`}>
					<span>{item}</span>
				</button>
			))}
			<button className="lf-pagination-item">
				<span>...</span>
			</button>
		</div>
	);
};

const SearchResults = () => {
	const query = useRecoilValue(searchQuery);
	const data = useRecoilValue(searchResult);

	if (!data) return <div>Loading...</div>;

	return (
		<div className="lf-container">
			<SearchResultsTitle />
			<SearchResultsList />
			{query ? <SearchResultsPagination /> : null}
		</div>
	);
};

const SearchResultsQuery = () => {
	const query = useRecoilValue(searchQuery);
	const pageNum = useRecoilValue(searchPageNum);

	const setSearchResults = useSetRecoilState(searchResult);

	let gplQuery = gql`
		{
			featured {
				currentPage
				perPage
				totalPages
				total
				results {
					id
					lottieUrl
					name
				}
			}
		}
	`;

	if (query) {
		gplQuery = gql`
    {
      search(query: "${query}", page: ${pageNum}) {
        currentPage,
        perPage,
        totalPages,
        total
        results {
          id
          lottieUrl
          name
        }
      }
    }
    `;
	}

	const { data, loading, error } = useQuery(gplQuery);

	React.useEffect(() => {
		setSearchResults(data?.featured || data?.search);
	}, [data]);

	if (loading) return <div>Loading...</div>;
	if (error) return <pre>{error.message}</pre>;

	return <SearchResults />;
};

const Search = () => (
	<>
		<SearchInput />
		<SearchResultsQuery />
	</>
);

export default Search;
