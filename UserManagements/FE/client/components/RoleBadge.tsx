import { Shield, Folder, Code, Eye } from "lucide-react";

export type Role = "Administrator" | "Project Manager" | "Developer" | "Viewer";

interface RoleBadgeProps {
  role: Role;
}

const roleConfig = {
  Administrator: {
    bg: "#FA3939",
    text: "#FFF",
    Icon: Shield,
    iconColor: "#FFF",
  },
  "Project Manager": {
    bg: "#0004FF",
    text: "#FFF",
    Icon: Folder,
    iconColor: "#FFF",
  },
  Developer: {
    bg: "#7B7B7B",
    text: "#FFF",
    Icon: Code,
    iconColor: "#FFF",
  },
  Viewer: {
    bg: "#FFF",
    text: "#000",
    Icon: Eye,
    iconColor: "#1C1B1F",
    border: "1px solid #000",
  },
};

export function RoleBadge({ role }: RoleBadgeProps) {
  const config = roleConfig[role];
  const { Icon } = config;

  return (
    <div
      className="flex items-center justify-center gap-2.5 rounded-[15px] px-2.5 py-2.5 w-fit"
      style={{
        backgroundColor: config.bg,
        border: config.border,
      }}
    >
      <Icon
        className="w-5 h-5"
        style={{ color: config.iconColor }}
        strokeWidth={1.6}
      />
      <span
        className="text-sm font-inter whitespace-nowrap"
        style={{ color: config.text }}
      >
        {role}
      </span>
    </div>
  );
}
