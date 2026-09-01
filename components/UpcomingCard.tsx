export default function UpcomingCard() {
  return (
    <div className="h-fit rounded-lg border border-[#dadce0] p-5">
      <h2 className="text-base font-medium text-[#202124]">Upcoming</h2>
      <p className="mt-3 text-sm text-[#5f6368]">Woohoo, no work due soon!</p>
      <button
        type="button"
        className="mt-4 text-sm font-medium text-[#1967d2] hover:underline"
      >
        View all
      </button>
    </div>
  );
}
