"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Marker, MarkerContent } from "@/components/ui/marker";
import { Message, MessageContent, MessageHeader } from "@/components/ui/message";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { commThreads } from "@/data/comms";
import { parseLumenDate, formatDate } from "@/lib/in-universe-rules/calendar";

export default function CommsThreadPage() {
  const params = useParams();
  const slug = params.slug as string;
  const thread = commThreads.find((t) => t.slug === slug);
  const [visibleCount, setVisibleCount] = useState(0);
  const [phase, setPhase] = useState<"idle" | "typing">("idle");
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!thread || visibleCount >= thread.messages.length) return;
    const nextMessage = thread.messages[visibleCount];

    const pauseBeforeTyping = 300 + Math.random() * 300;
    const typingDuration = Math.min(2200, Math.max(600, nextMessage.text.length * 35));

    setPhase("idle");
    const pauseTimer = setTimeout(() => setPhase("typing"), pauseBeforeTyping);
    const revealTimer = setTimeout(() => {
      setPhase("idle");
      setVisibleCount((c) => c + 1);
    }, pauseBeforeTyping + typingDuration);

    return () => {
      clearTimeout(pauseTimer);
      clearTimeout(revealTimer);
    };
  }, [visibleCount, thread]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [visibleCount, phase]);

  if (!thread) {
    return (
      <div className="p-8 text-center opacity-50">
        TRANSMISSÃO NÃO ENCONTRADA
      </div>
    );
  }

  const formattedTimestamp = formatDate(
    parseLumenDate(thread.timestamp, {
      fallbackHemisphere: "S",
      fallbackEra: "N.E.C.",
    }),
    "official-abbr",
  );

  const visibleMessages = thread.messages.slice(0, visibleCount);
  const nextMsg = thread.messages[visibleCount];

  return (
    <div className="max-w-3xl mx-auto space-y-4 p-4">
      <Link
        href="/government/comms"
        className="inline-block rounded-xs border border-comms-crt/40 bg-transparent px-3 py-1.5 text-xs font-mono uppercase tracking-wide text-comms-crt transition-colors hover:bg-comms-crt/10"
      >
        ← voltar
      </Link>

      <div className="border border-comms-crt/40 bg-chrome scanlines p-8">
        <Marker variant="border" className="flex-wrap gap-2 border-comms-crt/30 pb-3 text-[10px] uppercase tracking-[0.3em] text-comms-crt">
          <MarkerContent>canal seguro estabelecido</MarkerContent>
          <MarkerContent>{thread.protocol} · {thread.channel}</MarkerContent>
          <MarkerContent>{formattedTimestamp}</MarkerContent>
        </Marker>

        <div className="mt-6 space-y-4">
          {visibleMessages.map((msg, index) => (
            <div
              key={msg.id}
              ref={index === visibleMessages.length - 1 ? lastMessageRef : undefined}
            >
              <Message align={msg.role === "self" ? "end" : "start"}>
                <MessageContent>
                  <MessageHeader className="text-[10px] uppercase tracking-widest text-comms-crt/70">
                    [{msg.sender}]
                  </MessageHeader>
                  <Bubble variant="ghost">
                    <BubbleContent
                      className={`rounded-xs border px-3 py-2 text-sm text-comms-crt crt-glow ${
                        msg.role === "self"
                          ? "border-comms-crt/50 bg-comms-crt/5"
                          : "border-comms-crt/25 bg-transparent"
                      }`}
                    >
                      {msg.text}
                    </BubbleContent>
                  </Bubble>
                </MessageContent>
              </Message>
            </div>
          ))}

          {phase === "typing" && nextMsg && (
            <div ref={lastMessageRef}>
              <Message align={nextMsg.role === "self" ? "end" : "start"}>
                <MessageContent>
                  <Bubble variant="ghost">
                    <BubbleContent className="rounded-xs border border-comms-crt/25 px-3 py-2 text-comms-crt">
                      <span className="blink-caret-mono text-sm">▌</span>
                    </BubbleContent>
                  </Bubble>
                </MessageContent>
              </Message>
            </div>
          )}
        </div>

        {visibleCount >= thread.messages.length && (
          <div className="mt-8 border-t border-comms-crt/30 pt-3 text-[10px] uppercase tracking-[0.3em] text-comms-crt/70">
            <span className="blink-caret-mono">transmissão encerrada</span>
          </div>
        )}
      </div>
    </div>
  );
}
