import { create } from "zustand";
import { TransactionSearchFormInput } from "../../app/(pages)/transactions/_components/TransactionSearchForm";
import { Expense } from "@/types/Expense";
import { immer } from "zustand/middleware/immer";

export type StoreType = {
  transactions: Array<Expense> | null | undefined;
  totalCount: number | null | undefined;
  searchCriteria?: TransactionSearchFormInput;
  pageCriteria: {
    page: number;
    limit: number;
  },
  setPageNumber: (page: number) => void;
  setLimit: (limit: number) => void;
  setTotalCount: (totalCount: number) => void;
  setSearchCriteria: (searchCriteria: TransactionSearchFormInput) => void
  setTransactions: (transactions: Array<Expense>) => void
};


const useTransactionsStore = create<StoreType>((set) => ({
  transactions: null,
  totalCount: 0,
  pageCriteria: {
    page: 0,
    limit: 10,
  },
  setPageNumber: (page: number) => set((state) => ({pageCriteria : {...state.pageCriteria, page: page} })),
  setLimit: (limit: number) => set((state) => ({pageCriteria: { ...state.pageCriteria, limit } })),
  setSearchCriteria: (searchCriteria: TransactionSearchFormInput) => set((state) => ({searchCriteria})),
  setTransactions: (transactions: Array<Expense>) => set((state) => ({transactions})),
  setTotalCount: (totalCount: number) => set((state) => ({totalCount: totalCount}))
}));

export default useTransactionsStore