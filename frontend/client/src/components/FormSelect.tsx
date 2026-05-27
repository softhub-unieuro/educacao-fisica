import { AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";

interface FormSelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: FormSelectOption[];
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

export default function FormSelect({
  label,
  name,
  value,
  onChange,
  options,
  error,
  disabled = false,
  required = false,
}: FormSelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-semibold text-gray-900">
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </Label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full h-12 px-4 text-base border rounded-lg focus:outline-none focus:ring-2 transition-all ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500"
        } ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
      >
        <option value="">Selecione uma opção</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-xs text-red-600 flex gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  );
}
