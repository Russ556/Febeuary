"use client";

import { useEffect } from "react";

type KeyboardDirection = "next" | "prev";

type UseKeyboardNavOptions = {
  onNavigate: (direction: KeyboardDirection) => void;
  disabled?: boolean;
};

export function useKeyboardNav({ onNavigate, disabled = false }: UseKeyboardNavOptions) {
  useEffect(() => {
    if (disabled) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        onNavigate("next");
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        onNavigate("prev");
      }
    };

    window.addEventListener("keydown", onKeyDown, { passive: false });
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [disabled, onNavigate]);
}
