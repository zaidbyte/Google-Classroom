export default function ClassTabs() {
  return (
    <div className="flex h-14 shrink-0 items-center justify-between border-b border-[#e8eaed] bg-white px-8">
      <div className="flex h-full items-center gap-8">
        <Tab label="Stream" active />
        <Tab label="Classwork" />
        <Tab label="People" />
      </div>
    </div>
  );
}

function Tab({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <span
      className={`flex h-full items-center text-sm font-medium ${
        active
          ? "border-b-2 border-[#1967d2] text-[#1967d2]"
          : "text-[#5f6368]"
      }`}
    >
      {label}
    </span>
  );
}
