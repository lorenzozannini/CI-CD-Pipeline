import { Header } from "@/components/Header";
import { StatsCard } from "@/components/StatsCard";
import { RoleBadge, Role } from "@/components/RoleBadge";
import { UserAvatar } from "@/components/UserAvatar";
import { ManageAssignmentsDialog } from "@/components/ManageAssignmentsDialog";
import { RolePermissionsDialog } from "@/components/RolePermissionsDialog";
import { Info, Settings } from "lucide-react";
import { useState, useRef } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  initials: string;
  avatarColor: string;
  role: Role;
  assignments: string;
  currentAssignments: Array<{ role: Role; scope: string }>;
}

const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@company.com",
    initials: "JD",
    avatarColor: "#00AAFF",
    role: "Administrator",
    assignments: "1 areas, 1 project",
    currentAssignments: [{ role: "Administrator", scope: "System-wide" }],
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@company.com",
    initials: "JS",
    avatarColor: "#E6780A",
    role: "Project Manager",
    assignments: "1 area, 1 project",
    currentAssignments: [{ role: "Project Manager", scope: "Area: Marketing" }],
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob.johnson@company.com",
    initials: "BJ",
    avatarColor: "#FF0004",
    role: "Developer",
    assignments: "1 area, 0 project",
    currentAssignments: [{ role: "Developer", scope: "Area: IoT" }],
  },
  {
    id: "4",
    name: "Alice Williams",
    email: "alice.williams@company.com",
    initials: "AW",
    avatarColor: "#00FF44",
    role: "Viewer",
    assignments: "0 area, 0 project",
    currentAssignments: [{ role: "Viewer", scope: "System-wide" }],
  },
];

export default function Index() {
  const [manageDialogOpen, setManageDialogOpen] = useState(false);
  const [permissionsDialogOpen, setPermissionsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const infoButtonRef = useRef<HTMLButtonElement>(null);

  const openManageDialog = (user: User) => {
    setSelectedUser(user);
    setManageDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col items-center gap-5 px-4 py-5 max-w-[1280px] mx-auto">
        <Header />

        <div className="h-px w-full max-w-[1220px] bg-gray-200" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full max-w-[1220px] gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center">
              <svg
                width="37"
                height="27"
                viewBox="0 0 37 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 26.1388L0 21.9721C0 21.009 0.247639 20.1317 0.742917 19.34C1.23819 18.5483 1.91639 17.9535 2.7775 17.5554C4.70361 16.6757 6.50458 16.0344 8.18042 15.6317C9.85625 15.2289 11.5739 15.0275 13.3333 15.0275C15.0925 15.0275 16.8054 15.2289 18.4721 15.6317C20.1388 16.0344 21.935 16.6757 23.8608 17.5554C24.7219 17.9535 25.4049 18.5483 25.9096 19.34C26.4143 20.1317 26.6667 21.009 26.6667 21.9721V26.1388H0ZM29.4442 26.1388V21.8608C29.4442 20.2869 29.0344 18.9375 28.215 17.8125C27.3956 16.6875 26.2961 15.7592 24.9167 15.0275C26.6667 15.2314 28.3147 15.5439 29.8608 15.965C31.4072 16.3864 32.7128 16.8794 33.7775 17.4442C34.7219 17.9814 35.4581 18.6226 35.9858 19.3679C36.5136 20.1132 36.7775 20.9442 36.7775 21.8608V26.1388H29.4442ZM13.3333 12.7775C11.5 12.7775 9.97681 12.1711 8.76375 10.9583C7.55069 9.74528 6.94417 8.22208 6.94417 6.38875C6.94417 4.55542 7.55069 3.03222 8.76375 1.81917C9.97681 0.60639 11.5 0 13.3333 0C15.1667 0 16.6897 0.60639 17.9025 1.81917C19.1156 3.03222 19.7221 4.55542 19.7221 6.38875C19.7221 8.22208 19.1156 9.74528 17.9025 10.9583C16.6897 12.1711 15.1667 12.7775 13.3333 12.7775ZM28.8888 6.38875C28.8888 8.22208 28.2822 9.74528 27.0692 10.9583C25.8564 12.1711 24.3333 12.7775 22.5 12.7775C22.1944 12.7775 21.8379 12.7521 21.4304 12.7013C21.0229 12.6504 20.6664 12.574 20.3608 12.4721C21.0553 11.7129 21.5854 10.8147 21.9513 9.7775C22.3171 8.74056 22.5 7.61097 22.5 6.38875C22.5 5.16653 22.3171 4.05542 21.9513 3.05542C21.5854 2.05542 21.0553 1.13875 20.3608 0.305417C20.6942 0.203473 21.0507 0.127084 21.4304 0.0762507C21.8101 0.0254174 22.1667 0 22.5 0C24.3333 0 25.8564 0.60639 27.0692 1.81917C28.2822 3.03222 28.8888 4.55542 28.8888 6.38875ZM2.7775 23.3608H23.8888V21.9721C23.8888 21.574 23.7753 21.1944 23.5483 20.8333C23.3217 20.4722 23.0369 20.2129 22.6942 20.0554C20.8608 19.2129 19.2358 18.6272 17.8192 18.2983C16.4025 17.9697 14.9072 17.8054 13.3333 17.8054C11.7592 17.8054 10.2592 17.9697 8.83333 18.2983C7.40722 18.6272 5.7775 19.2129 3.94417 20.0554C3.60167 20.2129 3.32167 20.4722 3.10417 20.8333C2.88639 21.1944 2.7775 21.574 2.7775 21.9721V23.3608ZM13.3333 10C14.3611 10 15.2199 9.655 15.9096 8.965C16.5993 8.27528 16.9442 7.41653 16.9442 6.38875C16.9442 5.36097 16.5993 4.50222 15.9096 3.8125C15.2199 3.1225 14.3611 2.7775 13.3333 2.7775C12.3056 2.7775 11.4467 3.1225 10.7567 3.8125C10.0669 4.50222 9.72208 5.36097 9.72208 6.38875C9.72208 7.41653 10.0669 8.27528 10.7567 8.965C11.4467 9.655 12.3056 10 13.3333 10Z"
                  fill="#E6780A"
                />
              </svg>
            </div>
            <h2 className="text-xl font-inter text-black">User Management</h2>
          </div>

          <div className="relative">
            <button
              ref={infoButtonRef}
              onClick={() => setPermissionsDialogOpen(!permissionsDialogOpen)}
              className="w-[30px] h-[30px] flex items-center justify-center"
            >
              <Info className="w-[25px] h-[25px] text-[#1C1B1F]" />
            </button>

            {permissionsDialogOpen && (
              <RolePermissionsDialog
                open={permissionsDialogOpen}
                onOpenChange={setPermissionsDialogOpen}
                buttonRef={infoButtonRef}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-[27px] w-full max-w-[1220px] py-2.5">
          <StatsCard title="Total Users" value={4} icon="users" />
          <StatsCard title="Administrators" value={1} icon="shield" />
          <StatsCard title="Project Managers" value={1} icon="folder" />
          <StatsCard title="Developers" value={1} icon="code" />
        </div>

        <div className="flex flex-col w-full max-w-[1220px]">
          <div className="flex items-center justify-between px-2.5 py-[3px] h-[54px]">
            <h3 className="text-xl font-inter text-black">
              User Role Assignments
            </h3>
          </div>

          <div className="rounded-[15px] border border-black overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-black">
                    <th className="text-left px-4 md:px-[30px] py-2.5 font-roboto font-medium text-base text-black">
                      User
                    </th>
                    <th className="text-left px-4 md:px-[30px] py-2.5 font-roboto font-medium text-base text-black hidden sm:table-cell">
                      Email
                    </th>
                    <th className="text-center px-4 md:px-[30px] py-2.5 font-roboto font-medium text-base text-black">
                      Highest Role
                    </th>
                    <th className="text-center px-4 md:px-[30px] py-2.5 font-roboto font-medium text-base text-black hidden lg:table-cell">
                      Assignments
                    </th>
                    <th className="text-left px-4 md:px-[30px] py-2.5 font-roboto font-medium text-sm text-black">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={user.id}
                      className={
                        index !== users.length - 1
                          ? "border-b border-[#7B7B7B]"
                          : ""
                      }
                    >
                      <td className="px-4 md:px-[30px] py-2.5">
                        <div className="flex items-center gap-3">
                          <UserAvatar
                            initials={user.initials}
                            color={user.avatarColor}
                          />
                          <span className="font-roboto font-medium text-base text-black">
                            {user.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 md:px-[30px] py-2.5 hidden sm:table-cell">
                        <span className="font-roboto font-medium text-base text-[#A5A5A5]">
                          {user.email}
                        </span>
                      </td>
                      <td className="px-4 md:px-[30px] py-2.5">
                        <div className="flex justify-center">
                          <RoleBadge role={user.role} />
                        </div>
                      </td>
                      <td className="px-4 md:px-[30px] py-2.5 text-center hidden lg:table-cell">
                        <span className="font-roboto font-medium text-base text-black">
                          {user.assignments}
                        </span>
                      </td>
                      <td className="px-4 md:px-[30px] py-2.5">
                        <button
                          onClick={() => openManageDialog(user)}
                          className="flex items-center gap-2 rounded-xl border border-[#7B7B7B] bg-white px-3 py-2 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] hover:bg-gray-50 transition-colors"
                        >
                          <Settings className="w-5 h-5 text-[#1C1B1F]" />
                          <span className="font-roboto font-medium text-sm text-black">
                            Manage
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {selectedUser && (
        <ManageAssignmentsDialog
          open={manageDialogOpen}
          onOpenChange={setManageDialogOpen}
          userName={selectedUser.name}
          currentAssignments={selectedUser.currentAssignments}
        />
      )}
    </div>
  );
}
