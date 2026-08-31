import TopBar from "@/components/TopBar";
import SearchBar from "@/components/SearchBar";
import { LogoMark } from "@/components/Logo";

export default function Homepage({
  name,
  image,
}: {
  name: string;
  image: string | null | undefined;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <TopBar name={name} image={image} />

      <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4">
        <div className="flex items-center gap-3">
          <LogoMark size={56} />
          <span className="text-4xl font-normal text-[#5f6368]">
            Classroom
          </span>
        </div>
        <SearchBar />
      </main>
    </div>
  );
}
