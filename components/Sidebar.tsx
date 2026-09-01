import type { ReactNode } from "react";

const CLASS_NAME = "Language Arts 10A";

export default function Sidebar() {
  return (
    <nav className="hidden w-64 shrink-0 flex-col gap-1 border-r border-[#e8eaed] bg-white py-3 md:flex">
      <SidebarItem icon={<HomeIcon />} label="Home" />
      <SidebarItem icon={<CalendarIcon />} label="Calendar" />

      <div className="mt-1 flex items-center justify-between px-4 py-2 text-sm font-medium text-[#3c4043]">
        <span className="flex items-center gap-4">
          <CapIcon />
          Enrolled
        </span>
        <ChevronUpIcon />
      </div>

      <div className="pl-4">
        <SidebarItem
          icon={
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1967d2] text-xs font-medium text-white">
              L
            </span>
          }
          label={CLASS_NAME}
          active
        />
      </div>

      <SidebarItem icon={<ArchiveIcon />} label="Archived classes" />

      <div className="mt-auto border-t border-[#e8eaed] pt-1">
        <SidebarItem icon={<SettingsIcon />} label="Settings" />
      </div>
    </nav>
  );
}

function SidebarItem({
  icon,
  label,
  active = false,
}: {
  icon: ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={`flex w-full items-center gap-4 px-4 py-2.5 text-left text-sm ${
        active
          ? "bg-[#e8f0fe] font-medium text-[#0842a0]"
          : "text-[#3c4043] hover:bg-[#f1f3f4]"
      }`}
    >
      {icon}
      <span className="truncate">{label}</span>
    </button>
  );
}

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="shrink-0 text-[#5f6368]">
      <path d="M12 3 3 10h2v10h5v-6h4v6h5V10h2z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="1.8" aria-hidden="true" className="shrink-0">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" strokeLinecap="round" />
    </svg>
  );
}

function CapIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#5f6368" aria-hidden="true" className="shrink-0">
      <path d="M12 3 2 8l10 5 8-4v6h2V8Z" />
      <path d="M6 12.5V17c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5l-6 3Z" opacity="0.6" />
    </svg>
  );
}

function ChevronUpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2" aria-hidden="true">
      <path d="m6 15 6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArchiveIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="1.8" aria-hidden="true" className="shrink-0">
      <rect x="3" y="4" width="18" height="4" rx="1" />
      <path d="M4 8v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V8M10 13h4" strokeLinecap="round" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="1.8" aria-hidden="true" className="shrink-0">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H3a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.6V3a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9c.2.6.7 1 1.4 1H21a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.4 1Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
