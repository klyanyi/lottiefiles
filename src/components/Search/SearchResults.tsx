import * as React from 'react';

import { gql, useQuery } from '@apollo/client';
import { searchPageNum, searchQuery, searchResult } from '../../recoil/atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import Lottie from './Lottie';
import { searchPagination } from '../../recoil/selector';

const SearchResultsTitle = function () {
  const query = useRecoilValue(searchQuery);
  const pagination = useRecoilValue(searchPagination);

  return (
    <p className="font-bold py-1">
      {query
        ? `Results for "${query}" (${pagination.startIndex} - ${pagination.lastIndex} of ${pagination.total})"`
        : 'Discover Free Animations'}
    </p>
  );
};

const SearchResultsList = function () {
  const data = useRecoilValue(searchResult);

  const ListItems = () => (
    <>
      {data.results.map(
        (
          item: { id: string; name: string; lottieUrl: string },
          idx: number
        ) => (
          <Lottie
            key={idx}
            id={item.id}
            name={item.name}
            lottieUrl={item.lottieUrl}
          />
        )
      )}
    </>
  );

  return (
    <div className="lf-grid my-2">
      <ListItems />
    </div>
  );
};

const SearchResultsPagination = function () {
  const pagination = useRecoilValue(searchPagination);

  const setSearchPageNumState = useSetRecoilState(searchPageNum);

  if (!pagination.list) return null;

  const PaginationItems = () => (
    <>
      {pagination.list.map((item, index) => (
        <button
          key={index}
          onClick={() => setSearchPageNumState(item)}
          className={`lf-pagination-item ${
            pagination.currentPage === item ? 'active' : null
          }`}
        >
          <span>{item}</span>
        </button>
      ))}
    </>
  );

  return (
    <div className="lf-pagination">
      <button className="lf-pagination-item">
        <span>...</span>
      </button>
      <PaginationItems />
      <button className="lf-pagination-item">
        <span>...</span>
      </button>
    </div>
  );
};

const SearchResultsContainer = function () {
  const query = useRecoilValue(searchQuery);
  const data = useRecoilValue(searchResult);

  if (!data) return <div>Loading...</div>;

  return (
    // TODO: make this a scrollable container
    <div className="lf-container">
      <SearchResultsTitle />
      <SearchResultsList />
      {query ? <SearchResultsPagination /> : null}
    </div>
  );
};

const SearchResultsQuery = function () {
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

  return <SearchResultsContainer />;
};

export default SearchResultsQuery;
