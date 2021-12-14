import { atom } from 'recoil';

export const searchQuery = atom<
  string | number | readonly string[] | undefined
>({
  key: 'searchQuery',
  default: undefined,
});

export const searchResult = atom<{
  total: number;
  currentPage: number;
  perPage: number;
  totalPages: number;
  results: [];
}>({
  key: 'searchResult',
  default: {
    total: 100,
    currentPage: 1,
    perPage: 16,
    totalPages: 2,
    results: [],
  },
});

export const searchPageNum = atom<number>({
  key: 'searchPageNum',
  default: 1,
});
