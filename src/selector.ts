import { selector } from 'recoil';
import { searchResult } from './atom';

export const searchPagination = selector({
  key: 'searchPagination',
  get: ({ get }) => {
    const result = get(searchResult);

    if (!result) {
      return {
        startIndex: 1,
        lastIndex: 16,
      };
    }

    const { total, currentPage, perPage, totalPages } = result;

    const getPaginationGroup = () => {
      if (currentPage < totalPages) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }
      return [];
    };

    const windowStart = Math.max(0, currentPage - 3);
    const windowEnd = Math.max(5, currentPage + 2);

    const paginationList = getPaginationGroup().slice(windowStart, windowEnd);

    return {
      startIndex: currentPage * perPage - perPage + 1,
      lastIndex: Math.min(currentPage * perPage, total),
      list: paginationList,
      total,
      currentPage,
    };
  },
});
