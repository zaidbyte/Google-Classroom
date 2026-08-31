import Image from "next/image";
import { LogoMark, Wordmark } from "@/components/Logo";

export default function TopBar({
  name,
  image,
}: {
  name: string;
  image: string | null | undefined;
}) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-[#e8eaed] bg-white px-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Menu"
          className="rounded-full p-2 text-[#5f6368] hover:bg-[#f1f3f4]"
        >
          <MenuIcon />
        </button>
        <LogoMark size={32} />
        <Wordmark />
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Google apps"
          className="rounded-full p-2 text-[#5f6368] hover:bg-[#f1f3f4]"
        >
          <AppsIcon />
        </button>
        <div
          title={name}
          className="ml-1 h-8 w-8 overflow-hidden rounded-full ring-1 ring-[#dadce0]"
        >
          {image ? (
            <Image
              src={image}
              alt={name}
              width={32}
              height={32}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#1B7C43] text-xs font-medium text-white">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
    </svg>
  );
}

function AppsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {[0, 1, 2].flatMap((row) =>
        [0, 1, 2].map((col) => (
          <circle key={`${row}-${col}`} cx={5 + col * 7} cy={5 + row * 7} r="1.6" />
        ))
      )}
    </svg>
  );
}
