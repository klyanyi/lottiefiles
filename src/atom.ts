import { atom } from "recoil";

export const searchInputState = atom<string | number | readonly string[] | undefined>({
  key: 'searchInputState',
  default: ''
});