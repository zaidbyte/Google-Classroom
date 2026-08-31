export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="9" fill="#1B7C43" />
      <path
        d="M20 10 L32 15.5 L20 21 L8 15.5 Z"
        fill="#EAF6EE"
      />
      <path
        d="M13 18.2 V24.3 C13 25.8 16 27.5 20 27.5 C24 27.5 27 25.8 27 24.3 V18.2 L20 21.3 Z"
        fill="#EAF6EE"
        opacity="0.9"
      />
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="text-[22px] leading-none text-[#5f6368] select-none">
      Classroom
    </span>
  );
}
