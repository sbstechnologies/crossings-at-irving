"use client";

import { useEffect } from "react";

export default function DisableInspect() {
  useEffect(() => {
    import("disable-devtool").then((module) => {
      module.default();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl + U
      if (event.ctrlKey && event.key.toLowerCase() === "u") {
        event.preventDefault();
      }

      // F12
      if (event.key === "F12") {
        event.preventDefault();
      }

      // Ctrl + Shift + I
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "i") {
        event.preventDefault();
      }

      // Ctrl + Shift + J
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "j") {
        event.preventDefault();
      }

      // Ctrl + Shift + C
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "c") {
        event.preventDefault();
      }

      // Ctrl + C
      if (event.ctrlKey && event.key.toLowerCase() === "c") {
        event.preventDefault();
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    document.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && ["+", "-", "=", "0"].includes(event.key)) {
        event.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
}
