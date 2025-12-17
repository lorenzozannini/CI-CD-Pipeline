import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface ScopeDropdownProps {
  value: string;
  onChange: (scope: string) => void;
}

const scopes = [
  { value: "System", label: "System" },
  { value: "Project Area", label: "Project Area" },
  { value: "Specific Project", label: "Specifc Project" },
];

export function ScopeDropdown({ value, onChange }: ScopeDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedScope = scopes.find((s) => s.value === value) || scopes[0];

  return (
    <div className="relative flex-1">
      <label className="text-sm font-inter text-[#7B7B7B] mb-5 block">
        Scope
      </label>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full rounded-[15px] border border-black px-4 py-2.5"
      >
        <span className="text-sm font-inter text-black">
          {selectedScope.label}
        </span>
        <ChevronDown className="w-5 h-5 text-[#1E1E1E]" strokeWidth={2} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-1 rounded-[15px] border border-[#CDCDCD] bg-white overflow-hidden z-50 shadow-lg">
            {scopes.map((scope, index) => {
              const isLast = index === scopes.length - 1;

              return (
                <button
                  key={scope.value}
                  type="button"
                  onClick={() => {
                    onChange(scope.value);
                    setIsOpen(false);
                  }}
                  className={`flex items-center w-full px-4 py-2.5 hover:bg-gray-100 transition-colors ${
                    !isLast ? "border-b border-[#CDCDCD]" : ""
                  }`}
                >
                  <span className="text-sm font-inter text-black">
                    {scope.label}
                  </span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
