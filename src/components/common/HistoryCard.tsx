import { HistoryCardProps } from "@/types/props";
import React from "react";

export default function HistoryCard({ keyword, onShow }: HistoryCardProps) {
  return (
    <div className="flex w-full flex-col gap-2.5 border-1 border-black p-4 rounded-sm">
      <h1 className="text-lg">keyword: {keyword}</h1>
      <button
        className="w-fit px-3 py-2 bg-black rounded-sm 
      cursor-pointer text-white hover:bg-black/80"
        onClick={() => onShow(keyword)}
      >
        Show Results
      </button>
    </div>
  );
}
