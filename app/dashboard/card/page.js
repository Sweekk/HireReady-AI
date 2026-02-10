export function ProgressItem({ title }) {
  return (
    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm mb-2 hover:bg-gray-50 transition">
      <div className="w-9 h-9 rounded bg-blue-100 text-2xl font-bold" />
      {title}
    </button>
  );
}

export function StatCard({ title }) {
  return (
    <button className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition text-left">
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <div className="mt-4 h-32 rounded-lg bg-gray-100" />
    </button>
  );
}

/* ================= PAGE ================= */

export default function CardPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">
        Dashboard Cards
      </h1>

      <div className="space-y-3">
        <ProgressItem title="Resume Completion" />
        <ProgressItem title="Interview Preparation" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard title="ATS Score" />
        <StatCard title="Applications Sent" />
      </div>
    </div>
  );
}
