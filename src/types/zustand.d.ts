export interface ImagesState {
  images: any[];
  setImages: (users: any[]) => void;
}

interface History {
  keyword: string;
  images: string[];
}
export interface historyState {
  history: History[];
  setHistory: (history: History[]) => void;
}
