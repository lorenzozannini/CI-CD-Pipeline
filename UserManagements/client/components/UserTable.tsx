import { Settings, Shield, Folder, Code, Eye } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  initials: string;
  avatarColor: string;
  role: "admin" | "pm" | "dev" | "viewer";
  assignments: string;
}

const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@company.com",
    initials: "JD",
    avatarColor: "#00AAFF",
    role: "admin",
    assignments: "1 areas, 1 project",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@company.com",
    initials: "JS",
    avatarColor: "#E6780A",
    role: "pm",
    assignments: "1 area, 1 project",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob.johnson@company.com",
    initials: "BJ",
    avatarColor: "#FF0004",
    role: "dev",
    assignments: "1 area, 0 project",
  },
  {
    id: "4",
    name: "Alice Williams",
    email: "alice.williams@company.com",
    initials: "AW",
    avatarColor: "#00FF44",
    role: "viewer",
    assignments: "0 area, 0 project",
  },
];

const RoleBadge = ({ role }: { role: User["role"] }) => {
  const configs = {
    admin: {
      label: "Administrator",
      bg: "#FA3939",
      icon: Shield,
    },
    pm: {
      label: "Project Manager",
      bg: "#0004FF",
      icon: Folder,
    },
    dev: {
      label: "Developer",
      bg: "#7B7B7B",
      icon: Code,
    },
    viewer: {
      label: "Viewer",
      bg: "#FFF",
      icon: Eye,
      border: true,
    },
  };

  const config = configs[role];
  const Icon = config.icon;

  return (
    <div
      className={`flex items-center justify-center gap-2.5 rounded-2xl px-2.5 py-2.5 ${
        config.border ? "border border-black" : ""
      }`}
      style={{ backgroundColor: config.bg }}
    >
      <Icon
        className="h-5 w-5"
        style={{ color: config.border ? "#1C1B1F" : "#FFF" }}
        strokeWidth={1.5}
      />
      <div
        className={`text-sm font-normal font-inter ${
          config.border ? "text-black" : "text-white"
        }`}
      >
        {config.label}
      </div>
    </div>
  );
};

export default function UserTable() {
  return (
    <div className="flex w-full flex-col items-start px-4 lg:px-0">
      <div className="flex h-[54px] w-full max-w-[1220px] items-center justify-between px-2.5 py-[3px]">
        <div className="text-lg font-normal text-black font-inter sm:text-xl">
          User Role Assignments
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="flex flex-col items-start rounded-2xl border border-black">
            <div className="flex w-full min-w-[1220px] items-center justify-between border-b border-black px-[30px] py-2.5 pr-[50px]">
              <div className="flex w-[450px] flex-shrink-0 items-center">
                <div className="flex-1 text-base font-medium text-black font-roboto">
                  User
                </div>
                <div className="flex-1 text-base font-medium text-black font-roboto">
                  Email
                </div>
              </div>
              <div className="text-center text-base font-medium text-black font-roboto">
                Highest Role
              </div>
              <div className="flex w-[356.5px] flex-shrink-0 items-center justify-between">
                <div className="text-center text-base font-medium text-black font-roboto">
                  Assignments
                </div>
                <div className="text-base font-medium text-black font-roboto">
                  Actions
                </div>
              </div>
            </div>

            {users.map((user, index) => (
              <div
                key={user.id}
                className={`flex h-16 w-full min-w-[1220px] items-center justify-between px-[30px] py-2.5 ${
                  index !== users.length - 1
                    ? "border-b border-adamantic-grey"
                    : ""
                }`}
              >
                <div className="flex w-[460px] flex-shrink-0 items-center">
                  <div className="flex flex-1 items-center gap-2.5">
                    <div className="relative h-9 w-9">
                      <svg className="h-9 w-9" viewBox="0 0 36 36" fill="none">
                        <circle
                          cx="18"
                          cy="18"
                          r="18"
                          fill={user.avatarColor}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-base font-medium text-white font-roboto">
                        {user.initials}
                      </div>
                    </div>
                    <div className="text-base font-medium text-black font-roboto">
                      {user.name}
                    </div>
                  </div>
                  <div className="flex-1 text-base font-medium text-[#A5A5A5] font-roboto">
                    {user.email}
                  </div>
                </div>

                <RoleBadge role={user.role} />

                <div className="flex w-[380.5px] flex-shrink-0 items-center justify-between">
                  <div className="text-center text-base font-medium text-black font-roboto">
                    {user.assignments}
                  </div>
                  <button className="flex flex-col items-center justify-center rounded-xl border border-adamantic-grey bg-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
                    <div className="flex items-center justify-center gap-2 px-3 py-2">
                      <Settings
                        className="h-5 w-5 text-[#1C1B1F]"
                        strokeWidth={1.5}
                      />
                      <div className="text-sm font-medium text-black font-roboto">
                        Manage
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
