"use client";

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
}

export default function Toggle({
  checked,
  onChange,
}: ToggleProps) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={checked}
      className={`relative flex h-10 w-20 items-center rounded-full border-2 transition-all duration-300 ${
        checked
          ? "border-[#E29A24] bg-white"
          : "border-gray-500 bg-white"
      }`}
    >
      <span
        className={`absolute h-8 w-8 rounded-full transition-all duration-300 ${
          checked
            ? "translate-x-10 bg-[#E29A24]"
            : "translate-x-1 bg-[#4A4A4A]"
        }`}
      />
    </button>
  );
}