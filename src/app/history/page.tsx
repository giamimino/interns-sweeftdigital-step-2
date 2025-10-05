"use client";
import HistoryCard from "@/components/common/HistoryCard";
import HistoryCardsContainer from "@/components/common/HistoryCardsContainer";
import ImageWrapper from "@/components/common/ImageWrapper";
import InfiniteScroll from "@/components/InfiniteScroll";
import { useHistoryStore } from "@/zustand/useHistoryStore";
import { useImagesStore } from "@/zustand/useImagesStore";
import React, { useState } from "react";

export default function HistoryPage() {
  const { history } = useHistoryStore();
  const { images } = useImagesStore();
  const [show, setShow] = useState<string[]>([]);

  return (
    <div className="p-5 flex flex-col gap-2.5">
      <h1 className="font-semibold text-lg">Search history</h1>
      <HistoryCardsContainer>
        {history.map((h) =>
          show.includes(h.keyword) ? (
            <div key={h.keyword}>
              <InfiniteScroll>
                {images
                  .filter((img) => h.images.includes(img.id))
                  .map((image) => (
                    <ImageWrapper
                      key={image.id}
                      title={image.alt_description}
                      img={image.urls.regular}
                    />
                  ))}
              </InfiniteScroll>
              <button
                className="px-3 py-2 rounded-sm bg-black text-white cursor-pointer"
                onClick={() => setShow(prev => prev.filter((p) =>  h.keyword !== p))}
              >
                close
              </button>
            </div>
          ) : (
            <HistoryCard
              key={h.keyword}
              keyword={h.keyword}
              onShow={(keyword: string) =>
                setShow((prev) => [...prev, keyword])
              }
            />
          )
        )}
        {history.length < 1 && <p>Your search history is empty</p>}
      </HistoryCardsContainer>
    </div>
  );
}
