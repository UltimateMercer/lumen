"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Kbd, KbdGroup } from "@/components/ui/kbd";

interface LoginScreenProps {
  onLogin: (username: string, password: string) => void;
  onOpenGovernmentLogin?: () => void;
}

export function LoginScreen({
  onLogin,
  onOpenGovernmentLogin,
}: LoginScreenProps) {
  const [username, setUsername] = useState("cidadao-7429");
  const [password, setPassword] = useState("acesso2024");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate loading
    setTimeout(() => {
      onLogin(username, password);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="scanline absolute w-full h-1 bg-foreground opacity-10" />
      </div>

      <div className="w-full max-w-md border-2 border-foreground p-8 bg-background relative">
        {/* Header */}
        <div className="mb-8 border-b-2 border-foreground pb-4">
          <div className="text-xs mb-2 text-foreground">
            SISTEMA DE ACESSO v2.4.1
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            ARQUIVO CENTRAL
          </h1>
          <div className="text-xs mt-2 text-muted-foreground">
            ACESSO PÚBLICO - CIDADÃO
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-xs mb-2 text-foreground"
            >
              IDENTIFICAÇÃO:
            </label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-2 border-foreground bg-background text-foreground font-mono rounded-xs"
              placeholder="Digite seu ID"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs mb-2 text-foreground"
            >
              SENHA DE ACESSO:
            </label>
            <Input
              id="password"
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
            className="w-full border-2 border-foreground bg-foreground text-background hover:bg-background hover:text-foreground transition-colors font-mono rounded-xs cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "AUTENTICANDO..." : "ACESSAR SISTEMA"}
          </Button>
        </form>

        {/* Footer Info */}
        <div className="mt-8 pt-4 border-t-2 border-foreground text-xs text-muted-foreground space-y-1">
          <div>
            STATUS: <span className="text-foreground">ONLINE</span>
          </div>
          <div>
            CONEXÃO: <span className="text-foreground">SEGURA</span>
          </div>
          <div className="text-xs mt-4 border-t border-foreground pt-2">
            <div className="text-destructive font-bold">
              ACESSO GOVERNAMENTAL:
            </div>
            <div className="mt-1 flex items-center gap-1 flex-wrap">
              <span>Pressione</span>
              <KbdGroup
                className="cursor-pointer hover:opacity-70 transition-opacity font-mono!"
                onClick={onOpenGovernmentLogin}
              >
                <Kbd className="font-mono!">Ctrl</Kbd>
                <span className="font-mono!">+</span>
                <Kbd className="font-mono!">G</Kbd>
              </KbdGroup>
              <span>para login governamental</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
