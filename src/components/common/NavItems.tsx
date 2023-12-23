"use client";
import { PRODUCT_CATEGORIES } from "@/config";
import React, { useState, useEffect, useRef } from "react";
import NavItem from "./NavItem";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

export default function NavItems() {
  //States
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  //Derived States
  const isAnyOpen = activeIndex !== null;
  // Refs
  const navRef = useRef<HTMLDivElement | null>(null);
  //Other hooks:
  useOnClickOutside(navRef, () => setActiveIndex(null));
  // Effect Hooks:
  // Detect ESC key down to reset active Index
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      }
    };
    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  });
  return (
    <div className="flex gap-4 h-full" ref={navRef}>
      {PRODUCT_CATEGORIES.map((category, i) => {
        const handleOpen = () => {
          if (activeIndex === i) {
            setActiveIndex(null);
          } else {
            setActiveIndex(i);
          }
        };
        const close = () => setActiveIndex(null);
        const isOpen = i === activeIndex;
        return (
          <NavItem
            key={category.value}
            category={category}
            handleOpen={handleOpen}
            isOpen={isOpen}
            isAnyOpen={isAnyOpen}
            close={close}
          />
        );
      })}
    </div>
  );
}
