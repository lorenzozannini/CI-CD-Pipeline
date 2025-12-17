import { ArrowLeft, Bell } from "lucide-react";

export function Header() {
  return (
    <header className="flex w-full max-w-[1220px] mx-auto items-center justify-center gap-2.5 px-5 py-4">
      <button className="flex-shrink-0">
        <ArrowLeft className="w-8 h-8 text-[#1E1E1E]" strokeWidth={2.5} />
      </button>

      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-4 md:gap-9">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/990ba0c2477870bfceb11451332483f5c9dd252b?width=282"
            alt="ADAMANTIC Logo"
            className="h-[38.775px] w-auto object-contain"
          />
          <h1 className="text-xl font-bold font-inter text-black hidden sm:block">
            User Management Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-4 md:gap-5.5 px-3">
          <button className="relative">
            <Bell className="w-5 h-5 text-[#1E1E1E]" strokeWidth={1.6} />
          </button>

          <div className="flex items-center gap-3.5 rounded-[18px] border border-[#BEBEBE] px-2 py-1">
            <div className="relative w-9 h-9">
              <div className="w-9 h-9 rounded-full bg-[#00AAFF] flex items-center justify-center">
                <span className="text-white font-roboto font-medium text-base">
                  JD
                </span>
              </div>
            </div>

            <div className="flex flex-col min-w-0 hidden md:flex">
              <div className="text-sm font-inter text-black truncate">
                John Doe
              </div>
              <div className="text-sm font-inter text-[#7B7B7B] truncate">
                john.doe@company.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
