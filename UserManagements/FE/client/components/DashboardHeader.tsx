import { ArrowLeft, Bell } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="flex w-full max-w-[1220px] items-center justify-center gap-2.5 px-4 py-4 lg:px-5">
      <button className="hidden flex-shrink-0 lg:block">
        <ArrowLeft className="h-8 w-8 text-[#1E1E1E]" strokeWidth={3} />
      </button>

      <div className="flex w-full flex-1 flex-col items-center gap-4 lg:flex-row lg:justify-between">
        <div className="flex w-full items-center justify-between gap-4 lg:w-auto lg:gap-9">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/990ba0c2477870bfceb11451332483f5c9dd252b?width=282"
            alt="Adamantic Logo"
            className="h-[39px] w-[100px] flex-shrink-0 sm:w-[141px]"
          />
          <h1 className="text-base font-bold text-black font-inter sm:text-xl lg:ml-0">
            User Management Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3 rounded-2xl px-2 lg:gap-5 lg:px-3">
          <Bell
            className="h-5 w-5 flex-shrink-0 text-[#1E1E1E]"
            strokeWidth={1.6}
          />

          <div className="flex items-center gap-2 rounded-[18px] border border-[#BEBEBE] lg:gap-3.5">
            <div className="relative h-9 w-9">
              <svg className="h-9 w-9" viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="18" r="18" fill="#00AAFF" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-base font-medium text-white font-roboto">
                JD
              </div>
            </div>
            <div className="hidden flex-col pr-3 sm:flex">
              <div className="text-sm font-normal text-black font-inter">
                John Doe
              </div>
              <div className="text-sm font-normal text-adamantic-grey font-inter">
                john.doe@company.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
