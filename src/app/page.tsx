"use client";
import ImageLazy from "@/components/common/ImageLazy";
import ImagesContainer from "@/components/common/ImagesContainer";
import ImageWrapper from "@/components/common/ImageWrapper";
import Search from "@/components/ui/Search";
import { useDebounce } from "@/hooks/useDebounce";
import { History } from "@/types/zustand";
import { useHistoryStore } from "@/zustand/useHistoryStore";
import { useImagesStore } from "@/zustand/useImagesStore";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const { images, setImages } = useImagesStore();
  const { history, setHistory } = useHistoryStore();
  const [searchValue, setSearchValue] = useState("");
  const [visibleCount, setVisibleCount] = useState(18)
  const debounceSearch = useDebounce(searchValue);
  let length = 14
  useEffect(() => {
    if (images.length > 0) return;

    fetch("/api/images/popular/get")
      .then((res) => res.json())
      .then((data) => setImages(data.images));
  }, [images.length, setImages]);

  const filteredImges = useMemo(() => {
    if (!images) return [];
    if (!debounceSearch) return images
    return images.filter((i) =>
      (i.alt_description ?? "")
        .toLowerCase()
        .includes(debounceSearch.toLowerCase())
    );
  }, [debounceSearch, images]);

  const fetchSearch = async (query: string) => {
    if (!query) return;
    const res = await fetch("/api/images/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const data: { success: boolean; images: any[] } = await res.json();
    if (data.success) {
      const existingIds = new Set(images.map((img) => img.id));
      const newImages = [
        ...images,
        ...data.images.filter((img) => !existingIds.has(img.id)),
      ];

      setImages(newImages);
      let newHistory: History[];
      if (history?.some((h) => h.keyword === query)) {
        newHistory = history.map((h) =>
          h.keyword === query
            ? { ...h, images: data.images.map((img) => img.id) }
            : h
        );
      } else {
        newHistory = [
          ...(history ?? []),
          { keyword: query, images: data.images.map((img) => img.id) },
        ];
      }

      setHistory(newHistory);
    }
  };

  useEffect(() => {
    if (!debounceSearch) return;
    fetchSearch(debounceSearch.toLowerCase());
  }, [debounceSearch]);

  function handleScroll() {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;
    const threshold = 150;

    if (scrollTop + windowHeight >= fullHeight - threshold) {
      setVisibleCount(prev => prev + 6);
    }
  }

  function throttle(fn: () => void, wait: number) {
    let last = 0;
    return function() {
      const now = Date.now();
      if (now - last >= wait) {
        fn();
        last = now;
      }
    };
  }
  const handleScrollThrottled = throttle(handleScroll, 350);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollThrottled);
    return () => window.removeEventListener("scroll", handleScrollThrottled);
  }, [handleScrollThrottled]);

  return (
    <div className="flex flex-col gap-5 overflow-y-auto">
      <div className="flex justify-center">
        <Search
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <ImagesContainer>
        {filteredImges.length < 1 ?
          Array(length).fill("").map((_, index) => (
            <ImageLazy
              key={index}
            />
          ))
        : filteredImges.slice(0, visibleCount).map((image, index) => (
          <ImageWrapper
            key={`${image.id}-${index}`}
            img={image.urls.regular}
            title={image.alt_description}
          />
        ))}
      </ImagesContainer>
    </div>
  );
}
