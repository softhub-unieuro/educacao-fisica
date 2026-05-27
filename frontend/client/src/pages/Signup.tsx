/**
 * Página de Cadastro - EuroHealth360
 * 
 * Design: Minimalismo Médico Contemporâneo
 * - Formulário centralizado com múltiplas etapas (opcional)
 * - Validação em tempo real com feedback visual
 * - Campos condicionais conforme o perfil selecionado
 * - Responsivo para mobile-first
 * 
 * Perfis suportados:
 * - Professor: com registro profissional e especialidade
 * - Beneficiário: com data de nascimento e número de beneficiário
 * - Aluno: com matrícula e curso
 */

import { useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";

interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  profileType: string;
  cpf: string;
  dateOfBirth: string;
  beneficiaryNumber: string;
  professionalRegistration: string;
  specialty: string;
  studentId: string;
  course: string;
  termsAccepted: boolean;
}

interface ValidationError {
  field: string;
  message: string;
}

const PROFILE_OPTIONS = [
  { value: "professor", label: "Professor" },
  { value: "beneficiary", label: "Beneficiário" },
  { value: "student", label: "Aluno" },
];

export default function Signup() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState<SignupFormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileType: "",
    cpf: "",
    dateOfBirth: "",
    beneficiaryNumber: "",
    professionalRegistration: "",
    specialty: "",
    studentId: "",
    course: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [generalError, setGeneralError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Validações
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const validateCPF = (cpf: string): boolean => {
    const cleanCPF = cpf.replace(/\D/g, "");
    return cleanCPF.length === 11;
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationError[] = [];

    if (!formData.fullName.trim()) {
      newErrors.push({ field: "fullName", message: "Nome completo é obrigatório." });
    } else if (formData.fullName.trim().length < 5) {
      newErrors.push({ field: "fullName", message: "Nome deve ter no mínimo 5 caracteres." });
    }

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

    if (!formData.confirmPassword.trim()) {
      newErrors.push({ field: "confirmPassword", message: "Confirmação de senha é obrigatória." });
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.push({ field: "confirmPassword", message: "Senhas não correspondem." });
    }

    if (!formData.profileType) {
      newErrors.push({ field: "profileType", message: "Selecione um tipo de perfil." });
    }

    if (!formData.cpf.trim()) {
      newErrors.push({ field: "cpf", message: "CPF é obrigatório." });
    } else if (!validateCPF(formData.cpf)) {
      newErrors.push({ field: "cpf", message: "CPF inválido (deve ter 11 dígitos)." });
    }

    if (formData.profileType === "professor") {
      if (!formData.professionalRegistration.trim()) {
        newErrors.push({ field: "professionalRegistration", message: "Registro profissional é obrigatório." });
      }
      if (!formData.specialty.trim()) {
        newErrors.push({ field: "specialty", message: "Especialidade é obrigatória." });
      }
    }

    if (formData.profileType === "beneficiary") {
      if (!formData.dateOfBirth.trim()) {
        newErrors.push({ field: "dateOfBirth", message: "Data de nascimento é obrigatória." });
      }
      if (!formData.beneficiaryNumber.trim()) {
        newErrors.push({ field: "beneficiaryNumber", message: "Número de beneficiário é obrigatório." });
      }
    }

    if (formData.profileType === "student") {
      if (!formData.studentId.trim()) {
        newErrors.push({ field: "studentId", message: "Matrícula é obrigatória." });
      }
      if (!formData.course.trim()) {
        newErrors.push({ field: "course", message: "Curso é obrigatório." });
      }
    }

    if (!formData.termsAccepted) {
      newErrors.push({ field: "termsAccepted", message: "Você deve aceitar os termos de serviço." });
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const finalValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));

    setErrors((prev) => prev.filter((error) => error.field !== name));
    setGeneralError("");
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setGeneralError("Preencha todos os campos obrigatórios corretamente.");
      return;
    }

    setIsLoading(true);
    setGeneralError("");
    setSuccessMessage("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSuccessMessage("Cadastro realizado com sucesso! Redirecionando para login...");
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        profileType: "",
        cpf: "",
        dateOfBirth: "",
        beneficiaryNumber: "",
        professionalRegistration: "",
        specialty: "",
        studentId: "",
        course: "",
        termsAccepted: false,
      });

      setTimeout(() => {
        setLocation("/");
      }, 2000);
    } catch (error) {
      setGeneralError("Erro ao cadastrar. Tente novamente.");
      console.error("Erro no cadastro:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getFieldError = (fieldName: string): string | undefined => {
    return errors.find((error) => error.field === fieldName)?.message;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="mb-8 flex flex-col items-center">
            <img
              src="/unieuro-logo.png"
              alt="Logo UniEuro"
              className="h-20 w-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-blue-900 mb-2 text-center">
              Criar Conta
            </h1>
            <p className="text-sm text-gray-600 text-center">
              Cadastre-se para acessar o EuroHealth360
            </p>
          </div>

          {successMessage && (
            <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-700">{successMessage}</p>
            </div>
          )}

          {generalError && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md flex gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{generalError}</p>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-5">
            <FormInput
              label="Nome Completo"
              name="fullName"
              type="text"
              placeholder="João Silva"
              value={formData.fullName}
              onChange={handleInputChange}
              error={getFieldError("fullName")}
              disabled={isLoading}
              required
            />

            <FormInput
              label="E-mail"
              name="email"
              type="email"
              placeholder="seu.email@example.com"
              value={formData.email}
              onChange={handleInputChange}
              error={getFieldError("email")}
              disabled={isLoading}
              required
            />

            <FormInput
              label="Senha"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              error={getFieldError("password")}
              disabled={isLoading}
              required
            />

            <FormInput
              label="Confirmar Senha"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={getFieldError("confirmPassword")}
              disabled={isLoading}
              required
            />

            <FormSelect
              label="Tipo de Perfil"
              name="profileType"
              value={formData.profileType}
              onChange={handleInputChange}
              options={PROFILE_OPTIONS}
              error={getFieldError("profileType")}
              disabled={isLoading}
              required
            />

            <FormInput
              label="CPF"
              name="cpf"
              type="text"
              placeholder="000.000.000-00"
              value={formData.cpf}
              onChange={handleInputChange}
              error={getFieldError("cpf")}
              disabled={isLoading}
              required
              maxLength={14}
            />

            {formData.profileType === "professor" && (
              <>
                <FormInput
                  label="Número de Registro Profissional"
                  name="professionalRegistration"
                  type="text"
                  placeholder="Ex: CRM123456"
                  value={formData.professionalRegistration}
                  onChange={handleInputChange}
                  error={getFieldError("professionalRegistration")}
                  disabled={isLoading}
                  required
                />
                <FormInput
                  label="Especialidade"
                  name="specialty"
                  type="text"
                  placeholder="Ex: Cardiologia"
                  value={formData.specialty}
                  onChange={handleInputChange}
                  error={getFieldError("specialty")}
                  disabled={isLoading}
                  required
                />
              </>
            )}

            {formData.profileType === "beneficiary" && (
              <>
                <FormInput
                  label="Data de Nascimento"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  error={getFieldError("dateOfBirth")}
                  disabled={isLoading}
                  required
                />
                <FormInput
                  label="Número de Beneficiário"
                  name="beneficiaryNumber"
                  type="text"
                  placeholder="Ex: 123456789"
                  value={formData.beneficiaryNumber}
                  onChange={handleInputChange}
                  error={getFieldError("beneficiaryNumber")}
                  disabled={isLoading}
                  required
                />
              </>
            )}

            {formData.profileType === "student" && (
              <>
                <FormInput
                  label="Matrícula"
                  name="studentId"
                  type="text"
                  placeholder="Ex: 2024001234"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  error={getFieldError("studentId")}
                  disabled={isLoading}
                  required
                />
                <FormInput
                  label="Curso"
                  name="course"
                  type="text"
                  placeholder="Ex: Medicina"
                  value={formData.course}
                  onChange={handleInputChange}
                  error={getFieldError("course")}
                  disabled={isLoading}
                  required
                />
              </>
            )}

            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                id="termsAccepted"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-4 h-4 mt-1 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="termsAccepted" className="text-sm text-gray-600">
                Aceito os{" "}
                <a href="#" className="text-blue-900 font-semibold hover:underline">
                  termos de serviço
                </a>{" "}
                e a{" "}
                <a href="#" className="text-blue-900 font-semibold hover:underline">
                  política de privacidade
                </a>
              </label>
            </div>
            {getFieldError("termsAccepted") && (
              <p className="text-xs text-red-600 flex gap-1">
                <AlertCircle className="w-3 h-3" />
                {getFieldError("termsAccepted")}
              </p>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-blue-900 hover:bg-blue-800 text-white font-semibold text-base rounded-lg transition-colors duration-200 mt-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Cadastrando...
                </>
              ) : (
                "Cadastrar"
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              Já tem conta?{" "}
              <button
                onClick={() => setLocation("/")}
                className="text-blue-900 font-semibold hover:underline"
              >
                Fazer login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
