/**
 * Página de Login - EuroHealth360
 * 
 * Design: Minimalismo Médico Contemporâneo
 * - Formulário centralizado, máximo 400px de largura
 * - Cores: Azul primário #1E3A8A, fundo cinza #F3F4F6, branco
 * - Tipografia: Inter em diferentes pesos para hierarquia clara
 * - Validação em tempo real com feedback visual
 * - Responsivo para mobile-first
 * 
 * Comportamento esperado (Cenários de Aceitação):
 * - Sucesso: Credenciais válidas → redirecionamento para dashboard
 * - Erro: Credenciais inválidas → mensagem "E-mail ou senha incorretos."
 * - Bloqueio: 5 tentativas inválidas → "Muitas tentativas. Tente novamente mais tarde."
 * - Validação: Campos obrigatórios → "Preencha os campos obrigatórios."
 */

import { useState } from "react";
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoginFormData {
  email: string;
  password: string;
}

interface ValidationError {
  field: string;
  message: string;
}

export default function Login() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [generalError, setGeneralError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [attemptCount, setAttemptCount] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);

  // Validação de e-mail (conforme Dicionário de Dados)
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validação de senha (conforme Dicionário de Dados: mínimo 8 caracteres, letras e números)
  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  // Validar formulário
  const validateForm = (): boolean => {
    const newErrors: ValidationError[] = [];

    if (!formData.email.trim()) {
      newErrors.push({ field: "email", message: "E-mail é obrigatório." });
    } else if (!validateEmail(formData.email)) {
      newErrors.push({ field: "email", message: "E-mail inválido." });
    }

    if (!formData.password.trim()) {
      newErrors.push({ field: "password", message: "Senha é obrigatória." });
    } else if (!validatePassword(formData.password)) {
      newErrors.push({
        field: "password",
        message: "Senha deve ter mínimo 8 caracteres, com letras e números.",
      });
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  // Lidar com mudanças nos campos
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpar erro do campo ao começar a digitar
    setErrors((prev) =>
      prev.filter((error) => error.field !== name)
    );
    setGeneralError("");
  };

  // Simular login (futura integração com API)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verificar se está bloqueado
    if (isBlocked) {
      setGeneralError("Muitas tentativas. Tente novamente mais tarde.");
      return;
    }

    // Validar formulário
    if (!validateForm()) {
      setGeneralError("Preencha os campos obrigatórios.");
      return;
    }

    setIsLoading(true);
    setGeneralError("");
    setSuccessMessage("");

    // Simular chamada à API (substituir com chamada real depois)
    try {
      // Simular delay de rede
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simular validação: aceitar email "teste@eurohealth.com" com senha "Senha123"
      if (
        formData.email === "teste@eurohealth.com" &&
        formData.password === "Senha123"
      ) {
        setSuccessMessage("Login realizado com sucesso!");
        setFormData({ email: "", password: "" });
        setAttemptCount(0);

        // Simular redirecionamento após sucesso
        setTimeout(() => {
          // Aqui seria o redirecionamento real para o dashboard
          console.log("Redirecionando para dashboard...");
        }, 1500);
      } else {
        // Incrementar tentativas inválidas
        const newAttemptCount = attemptCount + 1;
        setAttemptCount(newAttemptCount);

        // Bloquear após 5 tentativas (conforme Dicionário de Dados)
        if (newAttemptCount >= 5) {
          setIsBlocked(true);
          setGeneralError("Muitas tentativas. Tente novamente mais tarde.");
        } else {
          setGeneralError("E-mail ou senha incorretos.");
        }
      }
    } catch (error) {
      setGeneralError("Erro ao conectar com o servidor. Tente novamente.");
      console.error("Erro no login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Obter erro específico do campo
  const getFieldError = (fieldName: string): string | undefined => {
    return errors.find((error) => error.field === fieldName)?.message;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex items-center justify-center px-4 py-8">
      {/* Container principal */}
      <div className="w-full max-w-md">
        {/* Card do formulário */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Cabeçalho com Logo */}
          <div className="mb-8 flex flex-col items-center">
            {/* Logo da UniEuro */}
            <img
              src="/unieuro-logo.png"
              alt="Logo UniEuro"
              className="h-20 w-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-blue-900 mb-2 text-center">
              EuroHealth360
            </h1>
            <p className="text-sm text-gray-600 text-center">
              Acesse sua conta para continuar
            </p>
          </div>

          {/* Mensagem de sucesso */}
          {successMessage && (
            <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-700">{successMessage}</p>
            </div>
          )}

          {/* Mensagem de erro geral */}
          {generalError && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md flex gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{generalError}</p>
            </div>
          )}

          {/* Formulário */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Campo de E-mail */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-semibold text-gray-900"
              >
                E-mail
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu.email@example.com"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoading || isBlocked}
                className={`h-12 text-base ${
                  getFieldError("email")
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {getFieldError("email") && (
                <p className="text-xs text-red-600 flex gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {getFieldError("email")}
                </p>
              )}
            </div>

            {/* Campo de Senha */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-semibold text-gray-900"
              >
                Senha
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading || isBlocked}
                  className={`h-12 text-base pr-10 ${
                    getFieldError("password")
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading || isBlocked}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {getFieldError("password") && (
                <p className="text-xs text-red-600 flex gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {getFieldError("password")}
                </p>
              )}
            </div>

            {/* Botão Entrar */}
            <Button
              type="submit"
              disabled={isLoading || isBlocked}
              className="w-full h-12 bg-blue-900 hover:bg-blue-800 text-white font-semibold text-base rounded-lg transition-colors duration-200"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>

          {/* Links adicionais */}
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              Não tem conta?{" "}
              <a
               href="/cadastro"
                className="text-blue-900 font-semibold hover:underline"
              >
                Criar conta
              </a>
            </p>
          </div>

          {/* Contador de tentativas (apenas para debug) */}
          {attemptCount > 0 && !isBlocked && (
            <p className="mt-4 text-xs text-gray-500 text-center">
              Tentativas: {attemptCount}/5
            </p>
          )}
        </div>

        {/* Dica para teste */}
        <p className="mt-6 text-xs text-gray-500 text-center">
          Para testar: teste@eurohealth.com / Senha123
        </p>
      </div>
    </div>
  );
}
