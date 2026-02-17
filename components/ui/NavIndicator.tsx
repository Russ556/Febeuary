"use client";

import { ArrowRight } from "lucide-react";

type NavIndicatorProps = {
  items: string[];
  activeIndex: number;
};

export function NavIndicator({ items, activeIndex }: NavIndicatorProps) {
  return (
    <nav
      aria-label="Section navigation indicator"
      className="absolute right-6 top-1/2 z-20 -translate-y-1/2 md:right-10"
    >
      <ul className="space-y-4">
        {items.map((item, index) => {
          const active = activeIndex === index;

          return (
            <li key={item}>
              <div className="flex items-center justify-end gap-2">
                <ArrowRight
                  className={`h-4 w-4 transition-all duration-200 ${
                    active
                      ? "translate-x-0 text-neutral-0 opacity-100"
                      : "-translate-x-2 text-neutral-500 opacity-0"
                  }`}
                />
                <div
                  className={`flex h-9 min-w-[7.5rem] items-center rounded-full border px-4 text-xs uppercase tracking-[0.24em] transition-all duration-300 md:text-sm ${
                    active
                      ? "border-neutral-0 bg-neutral-0/15 text-neutral-0 shadow-md"
                      : "border-neutral-500/50 bg-transparent text-neutral-300"
                  }`}
                >
                  {item}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
