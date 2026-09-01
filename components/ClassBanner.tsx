export default function ClassBanner({ title }: { title: string }) {
  return (
    <div className="relative flex h-44 items-center overflow-hidden rounded-b-lg bg-[#1967d2] px-8">
      <h1 className="text-3xl font-normal text-white">{title}</h1>
      <div className="pointer-events-none absolute right-8 bottom-0 top-0 hidden items-center sm:flex">
        <Doodle />
      </div>
    </div>
  );
}

function Doodle() {
  return (
    <svg width="160" height="120" viewBox="0 0 160 120" fill="none" aria-hidden="true">
      <circle cx="120" cy="40" r="34" fill="#ffffff" opacity="0.12" />
      <rect x="30" y="60" width="70" height="46" rx="6" fill="#ffffff" opacity="0.14" />
      <path
        d="M40 92 96 92"
        stroke="#ffffff"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M40 78 80 78"
        stroke="#ffffff"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M118 18 90 84"
        stroke="#ffffff"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path d="m84 86 6 12 12-6Z" fill="#ffffff" opacity="0.85" />
    </svg>
  );
}
