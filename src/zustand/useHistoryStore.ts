import { historyState } from "@/types/zustand";
import { create } from "zustand";

export const useHistoryStore = create<historyState>((set) => ({
  history: [],
  setHistory: (history) => set({ history }) 
}));