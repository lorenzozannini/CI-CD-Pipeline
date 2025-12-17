import { Users, Shield, Folder, Code } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number;
  icon: "users" | "shield" | "folder" | "code";
}

const iconMap = {
  users: { Icon: Users, color: "#1C1B1F" },
  shield: { Icon: Shield, color: "#FA3939" },
  folder: { Icon: Folder, color: "#0004FF" },
  code: { Icon: Code, color: "#A5A5A5" },
};

export function StatsCard({ title, value, icon }: StatsCardProps) {
  const { Icon, color } = iconMap[icon];

  return (
    <div className="flex flex-col flex-1 min-w-[200px] h-[83px] rounded-[10px] border border-[#7B7B7B] bg-white px-3.5 py-[7px]">
      <div className="flex items-end justify-between">
        <div className="flex-1 text-sm font-inter text-[#7B7B7B]">{title}</div>
        <Icon
          className="w-6 h-6 flex-shrink-0"
          style={{ color }}
          strokeWidth={1.6}
        />
      </div>
      <div className="text-4xl font-inter text-black mt-1">{value}</div>
    </div>
  );
}
