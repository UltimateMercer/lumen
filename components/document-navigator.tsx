"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DocumentViewer } from "@/components/document-viewer";

interface Document {
  title: string;
  classification: string;
  department: string;
  date: string;
  signedBy: string;
  content: React.ReactNode;
}

interface DocumentNavigatorProps {
  documents: Document[];
  onBack: () => void;
  initialIndex?: number;
}

export function DocumentNavigator({
  documents,
  onBack,
  initialIndex = 0,
}: DocumentNavigatorProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(
    null
  );

  const handleNext = () => {
    if (currentIndex < documents.length - 1) {
      setSlideDirection("left");
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setSlideDirection(null);
      }, 150);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setSlideDirection("right");
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
        setSlideDirection(null);
      }, 150);
    }
  };

  const currentDoc = documents[currentIndex];

  return (
    <div className="">
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-4 border dark:border-[#eaeaea] border-[#252525] rounded-xs p-4">
        <Button
          onClick={onBack}
          variant="outline"
          size="sm"
          className="rounded-xs border dark:border-[#eaeaea] border-[#252525] bg-transparent"
        >
          ← VOLTAR
        </Button>

        <div className="flex items-center gap-4">
          <div className="text-xs font-mono text-muted-foreground">
            DOCUMENTO {currentIndex + 1} DE {documents.length}
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              variant="outline"
              size="sm"
              className="rounded-xs border dark:border-[#eaeaea] border-[#252525] disabled:opacity-30 bg-transparent"
            >
              ← ANTERIOR
            </Button>
            <Button
              onClick={handleNext}
              disabled={currentIndex === documents.length - 1}
              variant="outline"
              size="sm"
              className="rounded-xs border dark:border-[#eaeaea] border-[#252525] disabled:opacity-30 bg-transparent"
            >
              PRÓXIMO →
            </Button>
          </div>
        </div>
      </div>

      {/* Document Content with Slide Animation */}
      <div className="overflow-hidden px-6 max-w-3xl mx-auto no-overlay">
        <div
          className={`transition-transform duration-150 ${
            slideDirection === "left"
              ? "-translate-x-full opacity-0"
              : slideDirection === "right"
              ? "translate-x-full opacity-0"
              : "translate-x-0 opacity-100"
          }`}
        >
          <DocumentViewer
            title={currentDoc.title}
            classification={currentDoc.classification}
            department={currentDoc.department}
            date={currentDoc.date}
            signedBy={currentDoc.signedBy}
            content={currentDoc.content}
          />
        </div>
      </div>

      {/* Document Index Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {documents.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (index !== currentIndex) {
                setSlideDirection(index > currentIndex ? "left" : "right");
                setTimeout(() => {
                  setCurrentIndex(index);
                  setSlideDirection(null);
                }, 150);
              }
            }}
            className={`w-2 h-2 border border-foreground transition-colors ${
              index === currentIndex
                ? "bg-foreground"
                : "bg-background hover:bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
