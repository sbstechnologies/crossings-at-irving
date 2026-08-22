"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ThankYouDialog({ open, onClose }: Props) {
  const router = useRouter();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-5xl rounded-[32px] bg-white shadow-2xl overflow-hidden"
            initial={{ scale: 0.85, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 40 }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 20,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Gradient Border */}
            <div className="h-[4px] w-full bg-gradient-to-r from-blue-900 to-yellow-500" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 rounded-full bg-gray-100 p-2 hover:bg-gray-200 transition"
            >
              <X size={22} />
            </button>

            <div className="px-8 py-12 md:px-20 md:py-20">
              <h1 className="font-serif text-4xl md:text-6xl leading-tight text-gray-900">
                Thank You For <br />
                Contacting Us!
              </h1>

              <div className="mt-14 md:mt-20">
                <p className="text-xl md:text-3xl font-semibold text-gray-700">
                  Our team will quickly reach back to you!
                </p>

                <p className="mt-5 text-base md:text-xl text-gray-500">
                  We respond to all inquiries within 1 business day.
                </p>
              </div>

              <button
                onClick={() => router.push("/")}
                className="mt-16 md:mt-20 w-full rounded-2xl bg-blue-900 py-4 md:py-5 text-lg md:text-xl font-semibold text-white hover:bg-blue-800 transition"
              >
                Go Back To Home
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
