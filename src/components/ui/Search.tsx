import { SearchProps } from "@/types/props";
import React from "react";

export default function Search({ value, onChange }: SearchProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="w-fit focus:outline-none p-1 border-1 border-black rounded-sm
      focus:ring-2 focus:ring-black focus:ring-offset-3 transition focus:ring-offset-white "
    />
  );
}
