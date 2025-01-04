import { TransactionSearchFormInput } from "@/app/(pages)/transactions/_components/TransactionSearchForm";
import { Expense } from "@/types/Expense";
import { create } from "zustand";

export interface BearStore { 
    bears: number;
    totalCount: number,
    searchCriteria?: TransactionSearchFormInput;
    transactions: Array<Expense> | null | undefined;
    pageCriteria: {
        page: number;
        limit: number;
      };
    increasePopulation: () => void;
    removeAllBears: () => void; 
    updateBears: (newBears: number) => void
    updatePage: (pageCriteria: {page: number, limit: number}) => void
    updatePageOnly: (page: number) => void
};

const createBearStore = create<BearStore>((set) => ({
  bears: 0,
  totalCount: 10,
  transactions: null,
  pageCriteria: {
    page: 0,
    limit: 10
  },
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears: number) => set({ bears: newBears }),
  updatePage: (pageCriteria: {page: number, limit: number}) => set({pageCriteria: pageCriteria}),
  updatePageOnly: (page: number) => set((state) => ({pageCriteria : {...state.pageCriteria, page: page} }))
}));

export default createBearStore;
