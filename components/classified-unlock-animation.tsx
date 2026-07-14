"use client";

import { useEffect, useState, useRef } from "react";
import {
  Lock,
  Unlock,
  Shield,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";

interface ClassifiedUnlockAnimationProps {
  fileName: string;
  classification?: string;
  onComplete?: () => void;
}

export function ClassifiedUnlockAnimation({
  fileName,
  classification = "ULTRA-SECRETO",
  onComplete = () => {},
}: ClassifiedUnlockAnimationProps) {
  const [stage, setStage] = useState(0);
  const [sealsBroken, setSealsBroken] = useState<number[]>([]);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Stages:
  // 0 - Initial state with envelope sealed
  // 1 - Breaking seal 1
  // 2 - Breaking seal 2
  // 3 - Breaking seal 3
  // 4 - Document unlocking
  // 5 - Access granted animation
  // 6 - Complete

  useEffect(() => {
    const timings = [
      500, // Stage 0 -> 1 (show first seal breaking)
      400, // Stage 1 -> 2 (break seal 2)
      400, // Stage 2 -> 3 (break seal 3)
      600, // Stage 3 -> 4 (start unlock)
      800, // Stage 4 -> 5 (access granted)
      500, // Stage 5 -> 6 (complete)
    ];

    let timeoutId: NodeJS.Timeout;

    const advanceStage = (currentStage: number) => {
      if (currentStage < 6) {
        timeoutId = setTimeout(() => {
          setStage(currentStage + 1);
          if (currentStage < 3) {
            setSealsBroken((prev) => [...prev, currentStage]);
          }
          advanceStage(currentStage + 1);
        }, timings[currentStage]);
      } else {
        // Animation complete
        setTimeout(() => onCompleteRef.current(), 200);
      }
    };

    advanceStage(0);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const getClassificationColor = () => {
    switch (classification) {
      case "ULTRA-SECRETO":
        return "text-red-500 border-red-500";
      case "SECRETO":
        return "text-orange-500 border-orange-500";
      case "CONFIDENCIAL":
        return "text-yellow-500 border-yellow-500";
      default:
        return "text-foreground border-foreground";
    }
  };

  return (
    <div className="border-2 border-foreground bg-background p-8 relative overflow-hidden">
      {/* Scanlines effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, currentColor 2px, currentColor 3px)",
          }}
        />
      </div>

      {/* Header */}
      <div className="mb-6 relative z-10">
        <div className={`text-xs mb-2 ${getClassificationColor()}`}>
          DOCUMENTO CLASSIFICADO - {classification}
        </div>
        <div className="text-lg font-bold text-foreground font-mono">
          {fileName}
        </div>
      </div>

      {/* Main animation area */}
      <div className="relative z-10">
        {/* Envelope/Document visualization */}
        <div className="flex justify-center mb-6">
          <div
            className={`
            relative w-48 h-32 border-2 transition-all duration-500
            ${stage >= 4 ? "border-green-500" : getClassificationColor()}
          `}
          >
            {/* Seals */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-4">
              {[0, 1, 2].map((sealIndex) => (
                <div
                  key={sealIndex}
                  className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center
                    transition-all duration-300
                    ${
                      sealsBroken.includes(sealIndex)
                        ? "bg-background border-green-500 scale-110"
                        : `bg-background ${getClassificationColor()}`
                    }
                  `}
                >
                  {sealsBroken.includes(sealIndex) ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <Lock className="w-3 h-3" />
                  )}
                </div>
              ))}
            </div>

            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              {stage < 4 ? (
                <Shield
                  className={`w-12 h-12 transition-all duration-300 ${getClassificationColor()}`}
                />
              ) : stage < 5 ? (
                <Unlock className="w-12 h-12 text-green-500 animate-pulse" />
              ) : (
                <ShieldCheck className="w-12 h-12 text-green-500" />
              )}
            </div>

            {/* Corner stamps */}
            <div
              className={`absolute top-1 left-1 text-[8px] font-mono ${getClassificationColor()}`}
            >
              SEC
            </div>
            <div
              className={`absolute top-1 right-1 text-[8px] font-mono ${getClassificationColor()}`}
            >
              CLS
            </div>
            <div
              className={`absolute bottom-1 left-1 text-[8px] font-mono ${getClassificationColor()}`}
            >
              REG
            </div>
            <div
              className={`absolute bottom-1 right-1 text-[8px] font-mono ${getClassificationColor()}`}
            >
              AUT
            </div>
          </div>
        </div>

        {/* Status messages */}
        <div className="space-y-2 font-mono text-xs">
          <div
            className={`flex items-center gap-2 transition-opacity duration-300 ${stage >= 1 ? "opacity-100" : "opacity-30"}`}
          >
            <span className={sealsBroken.includes(0) ? "text-green-500" : ""}>
              {sealsBroken.includes(0) ? "[OK]" : "[--]"}
            </span>
            <span>Removendo selo de segurança primário...</span>
          </div>

          <div
            className={`flex items-center gap-2 transition-opacity duration-300 ${stage >= 2 ? "opacity-100" : "opacity-30"}`}
          >
            <span className={sealsBroken.includes(1) ? "text-green-500" : ""}>
              {sealsBroken.includes(1) ? "[OK]" : "[--]"}
            </span>
            <span>Validando credenciais de acesso...</span>
          </div>

          <div
            className={`flex items-center gap-2 transition-opacity duration-300 ${stage >= 3 ? "opacity-100" : "opacity-30"}`}
          >
            <span className={sealsBroken.includes(2) ? "text-green-500" : ""}>
              {sealsBroken.includes(2) ? "[OK]" : "[--]"}
            </span>
            <span>Verificando autorização de clearance...</span>
          </div>

          <div
            className={`flex items-center gap-2 transition-opacity duration-300 ${stage >= 4 ? "opacity-100" : "opacity-30"}`}
          >
            <span className={stage >= 5 ? "text-green-500" : ""}>
              {stage >= 5 ? "[OK]" : "[--]"}
            </span>
            <span>Desbloqueando documento...</span>
          </div>
        </div>

        {/* Access granted banner */}
        {stage >= 5 && (
          <div className="mt-6 border-2 border-green-500 bg-green-500/10 p-4 animate-pulse">
            <div className="flex items-center justify-center gap-3">
              <ShieldCheck className="w-6 h-6 text-green-500" />
              <span className="text-green-500 font-bold font-mono text-lg">
                ACESSO AUTORIZADO
              </span>
              <ShieldCheck className="w-6 h-6 text-green-500" />
            </div>
            <div className="text-center text-xs text-green-500/70 mt-1 font-mono">
              Documento liberado para visualização
            </div>
          </div>
        )}

        {/* Security info footer */}
        <div className="mt-6 border-t border-foreground/30 pt-4">
          <div className="text-[10px] text-muted-foreground font-mono space-y-1">
            <div>PROTOCOLO: SIGMA-7 / NÍVEL DE ACESSO: AUTORIZADO</div>
            <div>
              REGISTRO:{" "}
              {Math.random().toString(36).substring(2, 10).toUpperCase()}-
              {Date.now()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
