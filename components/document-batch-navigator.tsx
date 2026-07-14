"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { DocumentViewer } from "@/components/document-viewer";
import { ChevronDown, ChevronUp, List } from "lucide-react";

interface DocumentPart {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface Document {
  title: string;
  classification: string;
  department: string;
  date: string;
  signedBy: string;
  content: React.ReactNode;
  // Batch: se definido, o documento tem múltiplas partes
  parts?: DocumentPart[];
}

interface DocumentBatchNavigatorProps {
  documents: Document[];
  onBack: () => void;
  initialIndex?: number;
  initialPartIndex?: number;
}

export function DocumentBatchNavigator({
  documents,
  onBack,
  initialIndex = 0,
  initialPartIndex = 0,
}: DocumentBatchNavigatorProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [currentPartIndex, setCurrentPartIndex] = useState(initialPartIndex);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(
    null,
  );
  const [verticalSlideDirection, setVerticalSlideDirection] = useState<
    "up" | "down" | null
  >(null);
  const [showTableOfContents, setShowTableOfContents] = useState(false);

  const partRefs = useRef<(HTMLDivElement | null)[]>([]);

  const currentDoc = documents[currentIndex];
  const hasParts = currentDoc?.parts && currentDoc.parts.length > 0;

  // Reset part index quando muda de documento
  useEffect(() => {
    setCurrentPartIndex(0);
    setShowTableOfContents(false);
  }, [currentIndex]);

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

  const handleNextPart = () => {
    if (hasParts && currentPartIndex < currentDoc.parts!.length - 1) {
      setVerticalSlideDirection("up");
      setTimeout(() => {
        setCurrentPartIndex(currentPartIndex + 1);
        setVerticalSlideDirection(null);
      }, 150);
    }
  };

  const handlePreviousPart = () => {
    if (hasParts && currentPartIndex > 0) {
      setVerticalSlideDirection("down");
      setTimeout(() => {
        setCurrentPartIndex(currentPartIndex - 1);
        setVerticalSlideDirection(null);
      }, 150);
    }
  };

  const handlePartClick = (index: number) => {
    if (index !== currentPartIndex) {
      setVerticalSlideDirection(index > currentPartIndex ? "up" : "down");
      setTimeout(() => {
        setCurrentPartIndex(index);
        setVerticalSlideDirection(null);
        setShowTableOfContents(false);
      }, 150);
    } else {
      setShowTableOfContents(false);
    }
  };

  const renderContent = () => {
    if (hasParts) {
      const currentPart = currentDoc.parts![currentPartIndex];
      return currentPart.content;
    }
    return currentDoc.content;
  };

  const getTitle = () => {
    if (hasParts) {
      return `${currentDoc.title} - ${currentDoc.parts![currentPartIndex].title}`;
    }
    return currentDoc.title;
  };

  return (
    <div className="">
      {/* Navigation Header - Horizontal */}
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

      {/* Vertical Navigation - Table of Contents (só aparece se documento tem parts) */}
      {hasParts && (
        <div className="mb-4 border dark:border-[#eaeaea] border-[#252525] rounded-xs">
          <button
            onClick={() => setShowTableOfContents(!showTableOfContents)}
            className="w-full flex items-center justify-between p-3 hover:bg-muted transition-colors"
          >
            <div className="flex items-center gap-2">
              <List className="w-4 h-4" />
              <span className="text-xs font-mono font-bold">
                ÍNDICE DO DOCUMENTO
              </span>
              <span className="text-xs font-mono text-muted-foreground">
                (PARTE {currentPartIndex + 1} DE {currentDoc.parts!.length})
              </span>
            </div>
            {showTableOfContents ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {showTableOfContents && (
            <div className="border-t dark:border-[#eaeaea] border-[#252525] p-2 space-y-1">
              {currentDoc.parts!.map((part, index) => (
                <button
                  key={part.id}
                  onClick={() => handlePartClick(index)}
                  className={`w-full text-left px-3 py-2 text-xs font-mono transition-colors flex items-center gap-2 ${
                    index === currentPartIndex
                      ? "bg-foreground text-background"
                      : "hover:bg-muted"
                  }`}
                >
                  <span className="opacity-50">
                    {String(index + 1).padStart(2, "0")}.
                  </span>
                  <span>{part.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Vertical Navigation Buttons (só aparece se documento tem parts) */}
      {hasParts && (
        <div className="flex justify-center gap-2 mb-4">
          <Button
            onClick={handlePreviousPart}
            disabled={currentPartIndex === 0}
            variant="outline"
            size="sm"
            className="rounded-xs border dark:border-[#eaeaea] border-[#252525] disabled:opacity-30 bg-transparent"
          >
            <ChevronUp className="w-4 h-4 mr-1" /> PARTE ANTERIOR
          </Button>
          <Button
            onClick={handleNextPart}
            disabled={currentPartIndex === currentDoc.parts!.length - 1}
            variant="outline"
            size="sm"
            className="rounded-xs border dark:border-[#eaeaea] border-[#252525] disabled:opacity-30 bg-transparent"
          >
            PRÓXIMA PARTE <ChevronDown className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}

      {/* Document Content with Slide Animation */}
      <div className="overflow-hidden px-6 max-w-3xl mx-auto no-overlay">
        <div
          className={`transition-transform duration-150 ${
            slideDirection === "left"
              ? "-translate-x-full opacity-0"
              : slideDirection === "right"
                ? "translate-x-full opacity-0"
                : verticalSlideDirection === "up"
                  ? "-translate-y-8 opacity-0"
                  : verticalSlideDirection === "down"
                    ? "translate-y-8 opacity-0"
                    : "translate-x-0 translate-y-0 opacity-100"
          }`}
        >
          <DocumentViewer
            title={getTitle()}
            classification={currentDoc.classification}
            department={currentDoc.department}
            date={currentDoc.date}
            signedBy={currentDoc.signedBy}
            content={renderContent()}
          />
        </div>
      </div>

      {/* Vertical Part Indicators (se tem parts) */}
      {hasParts && (
        <div className="flex justify-center gap-1 mt-4 mb-2">
          {currentDoc.parts!.map((_, index) => (
            <button
              key={index}
              onClick={() => handlePartClick(index)}
              className={`w-6 h-1.5 border border-foreground transition-colors ${
                index === currentPartIndex
                  ? "bg-foreground"
                  : "bg-background hover:bg-muted"
              }`}
              title={`Parte ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Document Index Indicators (horizontal) */}
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
