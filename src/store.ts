import { create } from 'zustand';

type Store = {
  searchBar: string;
  setSearchBar: (search: string) => void;
};

export const useStore = create<Store>()((set) => ({
  searchBar: '',
  setSearchBar: (search) => set(() => ({ searchBar: search })),
}));
