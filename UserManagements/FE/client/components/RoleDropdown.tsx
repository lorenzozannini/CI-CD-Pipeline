import { useState } from "react";
import { Shield, Folder, Code, Eye, ChevronDown } from "lucide-react";
import { Role } from "./RoleBadge";

interface RoleDropdownProps {
  value: Role;
  onChange: (role: Role) => void;
}

const roles: { value: Role; icon: typeof Eye; label: string }[] = [
  { value: "Viewer", icon: Eye, label: "Viewer" },
  { value: "Developer", icon: Code, label: "Developer" },
  { value: "Project Manager", icon: Folder, label: "Project Manager" },
  { value: "Administrator", icon: Shield, label: "Administrator" },
];

export function RoleDropdown({ value, onChange }: RoleDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedRole = roles.find((r) => r.value === value) || roles[0];
  const Icon = selectedRole.icon;

  return (
    <div className="relative flex-1">
      <label className="text-sm font-inter text-[#7B7B7B] mb-5 block">
        Role
      </label>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full rounded-[15px] border border-black bg-[#F4F0F0] px-2.5 py-2.5"
      >
        <div className="flex items-center gap-2.5">
          <Icon className="w-5 h-5 text-[#1C1B1F]" strokeWidth={1.6} />
          <span className="text-sm font-inter text-black">
            {selectedRole.label}
          </span>
        </div>
        <ChevronDown className="w-5 h-5 text-[#1C1B1F]" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-1 rounded-[15px] border border-[#CDCDCD] bg-[#F4F0F0] overflow-hidden z-50 shadow-lg">
            {roles.map((role, index) => {
              const RoleIcon = role.icon;
              const isLast = index === roles.length - 1;

              return (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => {
                    onChange(role.value);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-2.5 w-full px-2.5 py-2.5 hover:bg-gray-200 transition-colors ${
                    !isLast ? "border-b border-[#CDCDCD]" : ""
                  } ${index === 0 ? "rounded-t-[15px]" : ""} ${
                    isLast ? "rounded-b-[15px]" : ""
                  }`}
                >
                  <RoleIcon className="w-5 h-5 text-black" strokeWidth={1.6} />
                  <span className="text-sm font-inter text-black">
                    {role.label}
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
