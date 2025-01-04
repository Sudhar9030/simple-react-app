import { create } from 'zustand';

// Define the type for the store
interface CounterState {
  count: number;
  increase: () => void;
  decrease: () => void;
}

// Create the Zustand store with types
const useGptStore = create<CounterState>((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
}));

export default useGptStore;