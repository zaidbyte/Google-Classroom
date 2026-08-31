export default function SearchBar() {
  return (
    <form
      action="https://www.google.com/search"
      method="GET"
      className="flex w-full max-w-xl items-center gap-3 rounded-full border border-[#dfe1e5] bg-white px-5 py-3 shadow-sm transition-shadow hover:shadow-md focus-within:shadow-md"
    >
      <SearchIcon />
      <input
        type="text"
        name="q"
        autoComplete="off"
        placeholder="Search"
        aria-label="Search"
        className="w-full text-base text-[#202124] outline-none placeholder:text-[#5f6368]"
      />
    </form>
  );
}

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#5f6368"
      strokeWidth="2"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}
