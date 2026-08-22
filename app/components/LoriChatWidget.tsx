"use client";
import { units, tourSlots } from "@/app//config/content";

import { useState } from "react";
import {
  MessageCircle,
  X,
  RotateCcw,
  Sparkles,
  DollarSign,
  CalendarDays,
  CalendarCheck,
  PawPrint,
  ParkingCircle,
  LayoutPanelTop,
  CreditCard,
  Send,
} from "lucide-react";

type Message = {
  id: number;
  sender: "bot" | "user";
  text: string;
};
const tourText = tourSlots.join("\n");
const pricingText = units
  .map((unit) => `🏠 ${unit.name} · ${unit.type} · ${unit.price}`)
  .join("\n");

const availabilityText = units
  .map((unit) => `🏠 ${unit.name} · ${unit.area} · ${unit.available}`)
  .join("\n");

const plansText = units
  .map((unit) => `🏠 ${unit.name} · ${unit.type} · ${unit.area}`)
  .join("\n");

const defaultMessages: Message[] = [
  {
    id: 1,
    sender: "bot",
    text: "Hi there! 👋 I'm Lori, your Crossings at Irving AI assistant. What can I help you with today?",
  },
];

export default function LoriChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(defaultMessages);
  const [input, setInput] = useState("");

  const addMessage = (user: string, bot: string) => {
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, sender: "user", text: user },
      { id: prev.length + 2, sender: "bot", text: bot },
    ]);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    let reply =
      "Thanks for reaching out! Our leasing team will have the best answer for that. Is there anything else I can help with?";

    if (input.toLowerCase().includes("location")) {
      reply = "Crossings at Irving is located in Sherman, TX.";
    } else if (input.toLowerCase().includes("pricing")) {
      reply = pricingText;
    }

    addMessage(input, reply);
    setInput("");
  };

  const handleQuick = (label: string, response: string) => {
    addMessage(label, response);
  };

  const resetChat = () => {
    setMessages(defaultMessages);
  };

  return (
    <>
      {open && (
        <div
          className="
            fixed bottom-20 right-3 z-50
            w-[290px] h-[420px]
            overflow-hidden rounded-[18px]
            border border-[#17306b]
            bg-[#031344]
            shadow-[0_20px_50px_rgba(0,0,0,0.35)]

            sm:right-4 sm:w-[340px] sm:h-[460px]
            md:w-[380px] md:h-[520px]
          "
        >
          <div className="flex h-full flex-col">
            {/* HEADER */}
            <div className="flex items-center justify-between border-b border-[#1d3670] bg-[#183472] px-3 py-2.5">
              <div className="flex min-w-0 items-center gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#163068]">
                  <Sparkles size={14} className="text-white" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">
                    Ask Lori
                  </p>
                  <p className="text-[11px] text-green-400">● Online</p>
                </div>
              </div>

              <div className="flex shrink-0 gap-2">
                <button
                  onClick={resetChat}
                  className="rounded-md bg-white/10 p-1.5 text-white transition hover:bg-white/15"
                  aria-label="Reset chat"
                >
                  <RotateCcw size={13} />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-md bg-white/10 p-1.5 text-white transition hover:bg-white/15"
                  aria-label="Close chat"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* CHAT MESSAGES - SCROLLABLE */}
            <div className="flex-1 overflow-y-auto bg-[#04103a] p-2.5 space-y-2">
              {messages.map((msg) =>
                msg.sender === "bot" ? (
                  <div key={msg.id} className="flex items-start gap-2">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#17356f]">
                      <Sparkles size={10} className="text-white" />
                    </div>

                    <div className="max-w-[210px] rounded-[14px] bg-[#1a244d] px-2.5 py-1.5 text-[12px] leading-relaxed text-white whitespace-pre-line break-words sm:max-w-[240px]">
                      {msg.text}
                    </div>
                  </div>
                ) : (
                  <div key={msg.id} className="flex justify-end">
                    <div className="max-w-[190px] rounded-[12px] bg-[#244b99] px-2.5 py-1.5 text-[12px] leading-relaxed text-white whitespace-pre-line break-words sm:max-w-[220px]">
                      {msg.text}
                    </div>
                  </div>
                ),
              )}
            </div>

            {/* QUICK ACTIONS */}
            <div className="border-t border-[#11285f] bg-[#031344] p-2.5 text-white">
              <p className="mb-2 text-center text-[10px] uppercase tracking-[0.14em] text-white/80">
                Quick Actions
              </p>

              <div className="space-y-2">
                <button
                  onClick={() => handleQuick("Pricing", pricingText)}
                  className="flex w-full items-center gap-2 rounded-[12px] border border-[#183d88] bg-[#06184d] px-2.5 py-2 text-xs"
                >
                  <DollarSign size={14} className="shrink-0" />
                  <span>Pricing</span>
                </button>

                <button
                  onClick={() => handleQuick("Schedule a Tour", tourText)}
                  className="flex w-full items-center gap-2 rounded-[12px] border border-[#183d88] bg-[#06184d] px-2.5 py-2 text-xs"
                >
                  <CalendarDays size={14} className="shrink-0" />
                  <span>Schedule a Tour</span>
                </button>

                <button
                  onClick={() =>
                    handleQuick("Check Move-in Date", availabilityText)
                  }
                  className="flex w-full items-center gap-2 rounded-[12px] border border-[#183d88] bg-[#06184d] px-2.5 py-2 text-xs"
                >
                  <CalendarCheck size={14} className="shrink-0" />
                  <span>Availability</span>
                </button>
              </div>

              <div className="mt-2 flex flex-wrap gap-1.5">
                {[
                  { label: "Pets", icon: PawPrint },
                  { label: "Parking", icon: ParkingCircle },
                  { label: "Plans", icon: LayoutPanelTop },
                  { label: "Apply", icon: CreditCard },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() =>
                      handleQuick(
                        item.label,
                        item.label === "Plans"
                          ? plansText
                          : item.label === "Pets"
                            ? "🐾 Crossings at Irving is pet friendly — cats and dogs are welcome."
                            : item.label === "Parking"
                              ? "🚗 Resident Parking is available for residents."
                              : "📝 Apply online anytime through the Crossings at Irving resident portal.",
                      )
                    }
                    className="flex items-center gap-1 rounded-full border border-[#183d88] bg-[#06184d] px-2 py-1 text-[10px]"
                  >
                    <item.icon size={10} />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* INPUT */}
            <div className="border-t border-[#17306b] bg-[#031344] p-2 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask..."
                className="h-10 flex-1 rounded-full bg-[#162453] px-3 text-xs text-white outline-none placeholder:text-white/60"
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#162453] text-white transition hover:bg-[#1c2d66]"
                aria-label="Send message"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FLOAT BUTTON */}
      {/* FLOAT BUTTON */}
      {/* FLOAT BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close chat widget" : "Open chat widget"}
        title="Chat with Lori"
        className="
    fixed bottom-5 right-5 z-50
    flex items-center justify-center
    h-[56px] w-[56px]
    rounded-full
    border-0
    shadow-[0_18px_40px_rgba(0,0,0,0.35)]
    transition-all duration-300
    active:scale-95
  "
        style={{
          background:
            "linear-gradient(135deg, rgb(30, 56, 114) 0%, rgb(22, 43, 94) 100%)",
          transform: open ? "scale(0.96)" : "scale(1)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.06)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = open ? "scale(0.96)" : "scale(1)";
        }}
      >
        {open ? (
          <X size={20} strokeWidth={2.2} className="text-[#F5F2ED]" />
        ) : (
          <div className="relative flex items-center justify-center">
            {/* Chat Icon */}
            <MessageCircle
              size={22}
              strokeWidth={2}
              className="text-[#F5F2ED]"
            />

            {/* ONLINE DOT */}
            <div className="absolute -right-[3px] -top-[3px]">
              {/* Ping */}
              <span className="absolute inset-0 rounded-full bg-[#4dff94] opacity-40 animate-ping" />

              {/* Ring */}
              <div className="flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#183a2a] shadow-md">
                {/* Dot */}
                <div className="h-[8px] w-[8px] rounded-full bg-[#49ff90]" />
              </div>
            </div>
          </div>
        )}
      </button>
    </>
  );
}
