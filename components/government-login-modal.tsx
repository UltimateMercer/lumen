"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Square, SquareCheck, X } from "lucide-react";

interface GovernmentLoginModalProps {
  onLogin: (username: string, password: string) => void;
  onClose: () => void;
}

export function GovernmentLoginModal({
  onLogin,
  onClose,
}: GovernmentLoginModalProps) {
  const [username, setUsername] = useState("GOV-ARCANUM-7429");
  const [password, setPassword] = useState("defesa#2024");
  const [isLoading, setIsLoading] = useState(false);

  const [isValidating, setIsValidating] = useState(true);
  const [validationStep, setValidationStep] = useState(0);

  const validationSteps = [
    "Validando assinatura energética...",
    "Assinatura energética confirmada...",
    "Criptografando conexão...",
    "Acesso liberado",
  ];

  useEffect(() => {
    if (isValidating) {
      const timer = setInterval(() => {
        setValidationStep((prev) => {
          if (prev >= validationSteps.length - 1) {
            clearInterval(timer);
            setTimeout(() => setIsValidating(false), 500);
            return prev;
          }
          return prev + 1;
        });
      }, 1200);

      return () => clearInterval(timer);
    }
  }, [isValidating]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      onLogin(username, password);
      setIsLoading(false);
    }, 1500);
  };

  if (isValidating) {
    return (
      <div className="fixed inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="w-full max-w-md border-2 border-destructive p-8 bg-background relative">
          <div className="space-y-6">
            <div className="border-b-2 border-destructive pb-4">
              <div className="text-xs mb-2 text-destructive font-bold blink">
                ● VERIFICAÇÃO DE SEGURANÇA
              </div>
              <h1 className="text-xl font-bold text-foreground">
                PROTOCOLO DE AUTENTICAÇÃO
              </h1>
            </div>

            <div className="space-y-4 py-8">
              {validationSteps.map((step, index) => (
                <div
                  key={index}
                  className={`text-sm font-mono transition-all duration-300 flex items-center gap-2 ${
                    index <= validationStep
                      ? "text-foreground opacity-100"
                      : "text-muted-foreground opacity-30"
                  }`}
                >
                  {index < validationStep && (
                    <SquareCheck className="w-4 h-4" />
                  )}
                  {index === validationStep && <Square className="w-4 h-4" />}
                  {step}
                </div>
              ))}
            </div>

            <div className="h-1 bg-border overflow-hidden">
              <div
                className="h-full bg-destructive transition-all duration-300"
                style={{
                  width: `${
                    ((validationStep + 1) / validationSteps.length) * 100
                  }%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md border-2 border-foreground p-8 bg-background relative animate-in fade-in duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-foreground hover:text-destructive transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-8 border-b-2 border-destructive pb-4">
          <div className="text-xs mb-2 text-destructive font-bold animate-pulse">
            ● ACESSO RESTRITO
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            PORTAL GOVERNAMENTAL
          </h1>
          <div className="text-xs mt-2 text-muted-foreground">
            REPÚBLICA DE ARCANUM - DEPARTAMENTO DE DEFESA
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="gov-username"
              className="block text-xs mb-2 text-foreground"
            >
              CREDENCIAL GOVERNAMENTAL:
            </label>
            <Input
              id="gov-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-2 border-foreground bg-background text-foreground font-mono rounded-xs"
              placeholder="GOV-XXXX"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label
              htmlFor="gov-password"
              className="block text-xs mb-2 text-foreground"
            >
              CÓDIGO DE SEGURANÇA:
            </label>
            <Input
              id="gov-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-foreground bg-background text-foreground font-mono rounded-xs"
              placeholder="••••••••"
              required
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            className="w-full border-2 border-destructive bg-destructive text-background hover:bg-background hover:text-destructive transition-colors font-mono rounded-xs cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "VERIFICANDO CREDENCIAIS..." : "ACESSO AUTORIZADO"}
          </Button>
        </form>

        {/* Footer Info */}
        <div className="mt-8 pt-4 border-t-2 border-destructive text-xs text-muted-foreground space-y-1">
          <div className="text-destructive font-bold">
            ⚠️ AVISO DE SEGURANÇA
          </div>
          <div className="text-xs mt-2 leading-relaxed">
            Este sistema é de uso exclusivo de pessoal autorizado. Tentativas de
            acesso não autorizado serão registradas e investigadas.
          </div>
        </div>
      </div>
    </div>
  );
}
