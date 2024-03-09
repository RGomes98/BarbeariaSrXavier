import { generateDatabase } from '@/helpers/generateDatabase';
import { type User } from '@/mock/users';
import { create } from 'zustand';

type Store = {
  database: User[];
  searchBar: string;
  setSearchBar: (search: string) => void;
  updateDatabase: (database: User[]) => void;
};

export const useStore = create<Store>()((set) => ({
  searchBar: '',
  setSearchBar: (search) => set(() => ({ searchBar: search })),
  database: generateDatabase(),
  updateDatabase: (databaseToUpdate) =>
    set(() => {
      localStorage.setItem('database', JSON.stringify(databaseToUpdate));
      return { database: [...databaseToUpdate] };
    }),
}));
