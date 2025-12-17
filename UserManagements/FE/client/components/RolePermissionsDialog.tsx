import { X, Shield, Folder, Code, Eye } from "lucide-react";
import { useEffect, useState, RefObject } from "react";

interface RolePermissionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  buttonRef: RefObject<HTMLButtonElement>;
}

const roles = [
  {
    name: "Administrator",
    icon: Shield,
    iconColor: "#FF0000",
    textColor: "#F00",
    description:
      "Full access to all features including user management, project creation, and system configuration",
  },
  {
    name: "Project Manager",
    icon: Folder,
    iconColor: "#0004FF",
    textColor: "#0004FF",
    description:
      "Can create and configure projects, modify existing configurations, and view all information",
  },
  {
    name: "Developer",
    icon: Code,
    iconColor: "#7B7B7B",
    textColor: "#7B7B7B",
    description:
      "Can modify existing project configurations and view all information",
  },
  {
    name: "Viewer",
    icon: Eye,
    iconColor: "#000",
    textColor: "#000",
    description: "Read-only access to view project information and dashboards",
  },
];

export function RolePermissionsDialog({
  open,
  onOpenChange,
  buttonRef,
}: RolePermissionsDialogProps) {
  const [position, setPosition] = useState({ top: 0, right: 0 });

  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
  }, [open, buttonRef]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={() => onOpenChange(false)} />
      <div
        className="fixed z-50 w-[545px] max-w-[90vw] rounded-[15px] border border-black bg-white p-6 shadow-xl"
        style={{
          top: `${position.top}px`,
          right: `${position.right}px`,
        }}
      >
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-6 top-6 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none"
        >
          <X className="h-6 w-6 text-[#1D1B20]" />
          <span className="sr-only">Close</span>
        </button>

        <div className="flex flex-col gap-4">
          <h2 className="text-base font-roboto font-medium text-black">
            Role Permissions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[5px]">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <div
                  key={role.name}
                  className="flex flex-col rounded-[10px] border border-[#7B7B7B] p-3 gap-2"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className="w-4 h-4"
                      style={{ color: role.iconColor }}
                      strokeWidth={1.6}
                    />
                    <span
                      className="text-sm font-inter"
                      style={{ color: role.textColor }}
                    >
                      {role.name}
                    </span>
                  </div>
                  <p className="text-sm font-inter text-black leading-normal">
                    {role.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
