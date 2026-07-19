"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FileLoadingProps {
  fileName: string;
  onComplete?: () => void;
}

export function FileLoading({
  fileName,
  onComplete = () => {},
}: FileLoadingProps) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  const [showScanLine, setShowScanLine] = useState(true);
  const onCompleteRef = useRef(onComplete);

  const stages = [
    { text: "LOCALIZANDO ARQUIVO...", icon: "◎" },
    { text: "VERIFICANDO INTEGRIDADE...", icon: "◉" },
    { text: "DESCRIPTOGRAFANDO DADOS...", icon: "⬡" },
    { text: "CARREGANDO CONTEÚDO...", icon: "▣" },
    { text: "ACESSO AUTORIZADO", icon: "✓" },
  ];

  // Generate random hex values for the terminal effect
  const hexValues = useMemo(
    () =>
      Array.from({ length: 8 }, () =>
        Math.random().toString(16).substring(2, 6).toUpperCase(),
      ),
    [],
  );

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    setProgress(0);
    setStage(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => onCompleteRef.current(), 5000);
          return 100;
        }
        return newProgress;
      });
    }, 50);

    // Scan line animation toggle
    const scanInterval = setInterval(() => {
      setShowScanLine((prev) => !prev);
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(scanInterval);
    };
  }, [fileName]);

  useEffect(() => {
    setStage(Math.floor((progress / 100) * (stages.length - 1)));
  }, [progress, stages.length]);

  const isComplete = progress === 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-3xl mx-auto border-2 border-foreground bg-background p-8 relative overflow-hidden"
    >
      {/* Scan line effect */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-foreground/20 pointer-events-none"
        animate={{
          top: showScanLine ? "0%" : "100%",
        }}
        transition={{ duration: 2, ease: "linear", repeat: Infinity }}
      />

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-foreground" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-foreground" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-foreground" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-foreground" />

      {/* Header */}
      <div className="mb-6 relative">
        <motion.div
          className="text-xs text-muted-foreground mb-2 flex items-center gap-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="inline-block w-2 h-2 bg-foreground animate-pulse" />
          ACESSANDO ARQUIVO SEGURO
        </motion.div>
        <div className="text-lg font-bold text-foreground font-mono tracking-wider">
          {fileName}
        </div>
        <div className="text-xs text-muted-foreground mt-1 font-mono">
          ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}
        </div>
      </div>

      {/* Status indicator */}
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className={`text-sm font-mono flex items-center gap-3 ${
              isComplete ? "text-green-500" : "text-foreground"
            }`}
          >
            <motion.span
              animate={{ rotate: isComplete ? 0 : 360 }}
              transition={{
                duration: 1,
                repeat: isComplete ? 0 : Infinity,
                ease: "linear",
              }}
              className="text-lg"
            >
              {stages[stage].icon}
            </motion.span>
            {stages[stage].text}
          </motion.div>
        </AnimatePresence>

        {/* Progress bar */}
        <div className="relative">
          <div className="border-2 border-foreground h-10 relative overflow-hidden bg-muted/30">
            {/* Animated background pattern */}
            <motion.div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 10px,
                  currentColor 10px,
                  currentColor 11px
                )`,
              }}
              animate={{ x: [-11, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
            />

            {/* Progress fill */}
            <motion.div
              className={`h-full relative ${
                isComplete ? "bg-green-500" : "bg-foreground"
              }`}
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            >
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Percentage text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className={`text-sm font-bold font-mono ${
                  progress > 50 ? "text-background" : "text-foreground"
                }`}
              >
                {progress}%
              </span>
            </div>
          </div>

          {/* Progress markers */}
          <div className="flex justify-between mt-1 text-[10px] font-mono text-muted-foreground">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Terminal output */}
        <div className="border-2 border-foreground bg-black/90 p-4 font-mono text-xs space-y-1 text-green-400">
          <div className="text-muted-foreground mb-2">--- SYSTEM LOG ---</div>

          <motion.div animate={{ opacity: progress > 10 ? 1 : 0.3 }}>
            <span className="text-foreground/60">{">"}</span> Protocolo:{" "}
            <span className="text-cyan-400">AES-256-GCM</span>
          </motion.div>

          <motion.div animate={{ opacity: progress > 30 ? 1 : 0.3 }}>
            <span className="text-foreground/60">{">"}</span> Verificando
            assinatura digital...{" "}
            {progress > 50 && <span className="text-green-500">[OK]</span>}
          </motion.div>

          <motion.div animate={{ opacity: progress > 50 ? 1 : 0.3 }}>
            <span className="text-foreground/60">{">"}</span> Hash SHA-256:{" "}
            <span className="text-yellow-400">
              {hexValues.slice(0, 4).join("")}
            </span>
          </motion.div>

          <motion.div animate={{ opacity: progress > 70 ? 1 : 0.3 }}>
            <span className="text-foreground/60">{">"}</span> Checksum:{" "}
            <span className="text-yellow-400">
              {hexValues.slice(4, 8).join("")}
            </span>
            {progress > 85 && (
              <span className="text-green-500 ml-2">[VÁLIDO]</span>
            )}
          </motion.div>

          {isComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-500 mt-2 font-bold"
            >
              {">"} ARQUIVO LIBERADO PARA VISUALIZAÇÃO
            </motion.div>
          )}

          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="inline-block"
          >
            {">"} _
          </motion.span>
        </div>

        {/* Security level indicator */}
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${isComplete ? "bg-green-500" : "bg-yellow-500 animate-pulse"}`}
            />
            <span className="text-muted-foreground">
              {isComplete ? "ACESSO CONCEDIDO" : "PROCESSANDO..."}
            </span>
          </div>
          <div className="text-muted-foreground">
            NÍVEL: <span className="text-foreground">CONFIDENCIAL</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
