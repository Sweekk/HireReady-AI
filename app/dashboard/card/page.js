export function ProgressItem({ title }) {
  return (
    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm mb-2 hover:bg-gray-50 transition">
      <div className="w-9 h-9 rounded bg-blue-100 text-2xl font-bold" />
      {title}
    </button>
  );
}

/* ================= STAT CARD ================= */
export function StatCard({ title }) {
  return (
    <button className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition text-left">
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <div className="mt-4 h-32 rounded-lg bg-gray-100" />
    </button>
  );
}