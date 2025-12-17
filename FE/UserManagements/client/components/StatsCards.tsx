import { Users, Shield, Folder, Code } from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "4",
    icon: Users,
    iconColor: "#1C1B1F",
  },
  {
    title: "Administrators",
    value: "1",
    icon: Shield,
    iconColor: "#FA3939",
  },
  {
    title: "Project Managers",
    value: "1",
    icon: Folder,
    iconColor: "#0004FF",
  },
  {
    title: "Developers",
    value: "1",
    icon: Code,
    iconColor: "#A5A5A5",
  },
];

export default function StatsCards() {
  return (
    <div className="grid w-full max-w-[1220px] grid-cols-2 gap-4 px-4 py-2.5 md:grid-cols-4 md:gap-7 lg:px-0">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="flex h-[83px] flex-col items-start rounded-[10px] border border-adamantic-grey bg-white px-3.5 py-[7px]"
        >
          <div className="flex w-full items-end justify-between">
            <div className="flex flex-1 flex-col justify-center text-xs font-normal text-adamantic-grey font-inter sm:text-sm">
              {stat.title}
            </div>
            <stat.icon
              className="h-5 w-5 sm:h-6 sm:w-6"
              style={{ color: stat.iconColor }}
              strokeWidth={1.5}
            />
          </div>
          <div className="text-2xl font-normal text-black font-inter sm:text-4xl">
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
}
