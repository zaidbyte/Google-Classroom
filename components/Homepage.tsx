import TopBar from "@/components/TopBar";
import ClassTabs from "@/components/ClassTabs";
import Sidebar from "@/components/Sidebar";
import ClassBanner from "@/components/ClassBanner";
import UpcomingCard from "@/components/UpcomingCard";
import SearchBar from "@/components/SearchBar";

const CLASS_NAME = "Language Arts 10A";

export default function Homepage({
  name,
  image,
}: {
  name: string;
  image: string | null | undefined;
}) {
  return (
    <div className="flex h-screen flex-col bg-white">
      <TopBar name={name} image={image} breadcrumb={CLASS_NAME} />
      <ClassTabs />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto">
          <ClassBanner title={CLASS_NAME} />

          <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-[340px_1fr]">
            <UpcomingCard />

            <div className="flex min-h-[260px] items-center justify-center rounded-lg border border-[#dadce0] p-10">
              <SearchBar />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
