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
        className="inline-block rounded-xs border dark:border-[#eaeaea] border-[#252525] bg-transparent px-3 py-1.5 text-xs font-mono hover:bg-muted transition-colors"
      >
        ← VOLTAR
      </Link>

      <Marker variant="border">
        <MarkerContent>
          CANAL SEGURO ESTABELECIDO · {thread.protocol} · {thread.channel} · {formattedTimestamp}
        </MarkerContent>
      </Marker>

      <div className="space-y-4">
        {visibleMessages.map((msg, index) => (
          <div
            key={msg.id}
            ref={index === visibleMessages.length - 1 ? lastMessageRef : undefined}
          >
            <Message align={msg.role === "self" ? "end" : "start"}>
              <MessageContent>
                <MessageHeader>{msg.sender}</MessageHeader>
                <Bubble
                  variant={
                    msg.role === "system"
                      ? "ghost"
                      : msg.role === "self"
                        ? "muted"
                        : "default"
                  }
                >
                  <BubbleContent>{msg.text}</BubbleContent>
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
                  <BubbleContent>
                    <span className="inline-flex gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-current animate-bounce [animation-delay:-0.3s]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-current animate-bounce [animation-delay:-0.15s]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-current animate-bounce" />
                    </span>
                  </BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
          </div>
        )}
      </div>

      {visibleCount >= thread.messages.length && (
        <Marker variant="border">
          <MarkerContent>TRANSMISSÃO ENCERRADA</MarkerContent>
        </Marker>
      )}
    </div>
  );
}
