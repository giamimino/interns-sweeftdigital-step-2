import { ImagesState } from "@/types/zustand";
import { create } from "zustand";

export const useImagesStore = create<ImagesState>(set => ({
  images: [],
  setImages: (images) => set({ images })
}))