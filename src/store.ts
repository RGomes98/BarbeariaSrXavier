import { create } from 'zustand';

type Store = {
  searchBar: string;
  isCreateHaircutActive: boolean;
  setSearchBar: (search: string) => void;
  setIsCreateHaircutActive: (state: boolean) => void;
};

export const useStore = create<Store>()((set) => ({
  searchBar: '',
  isCreateHaircutActive: false,
  setSearchBar: (search) => set(() => ({ searchBar: search })),
  setIsCreateHaircutActive: (state) => set(() => ({ isCreateHaircutActive: state })),
}));
