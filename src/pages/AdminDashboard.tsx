import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { fetchSubmissions, type AssessmentData } from "@/lib/sheets";
import { Search, RefreshCw, Users, Clock, CheckCircle2, AlertCircle, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import AdminGuard from "@/components/AdminGuard";
import { logout } from "@/lib/adminAuth";

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    New: "bg-yellow-400/15 text-yellow-400 border-yellow-400/30",
    "In Progress": "bg-blue-400/15 text-blue-400 border-blue-400/30",
    Completed: "bg-green-400/15 text-green-400 border-green-400/30",
  };
  return (
    <span
      className={`px-2 py-0.5 text-xs font-bold uppercase tracking-wider border rounded-full ${
        colors[status] || "bg-white/10 text-white border-white/20"
      }`}
    >
      {status}
    </span>
  );
}

export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const [data, setData] = useState<AssessmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterFood, setFilterFood] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const load = async () => {
    setLoading(true);
    const items = await fetchSubmissions();
    setData(items);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = data.filter((d) => {
    const s = search.toLowerCase();
    const matchSearch =
      !s ||
      d.name?.toLowerCase().includes(s) ||
      d.phone?.includes(s);
    const matchFood = !filterFood || d.foodPref === filterFood;
    const matchStatus = !filterStatus || d.status === filterStatus;
    return matchSearch && matchFood && matchStatus;
  });

  const counts = {
    total: data.length,
    new: data.filter((d) => d.status === "New").length,
    inProgress: data.filter((d) => d.status === "In Progress").length,
    completed: data.filter((d) => d.status === "Completed").length,
  };

  return (
    <AdminGuard>
    <div className="min-h-screen bg-[#0d1117] text-white">
      {/* Header */}
      <div className="bg-[#161b22] border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black uppercase tracking-wider text-green-400">
            Muscle Empire
          </h1>
          <p className="text-xs text-white/40 uppercase tracking-widest">
            Nutrition Admin Dashboard
          </p>
        </div>
        <div className="flex items-center gap-4">
        <button
          onClick={load}
          className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors"
        >
          <RefreshCw size={14} />
          Refresh
        </button>
        <button
          onClick={() => { logout(); navigate("/pronectar-admin-2026"); }}
          className="flex items-center gap-2 text-red-400/60 hover:text-red-400 text-sm transition-colors"
        >
          <LogOut size={14} />
          Logout
        </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total", value: counts.total, icon: Users, color: "text-white" },
            { label: "New", value: counts.new, icon: AlertCircle, color: "text-yellow-400" },
            { label: "In Progress", value: counts.inProgress, icon: Clock, color: "text-blue-400" },
            { label: "Completed", value: counts.completed, icon: CheckCircle2, color: "text-green-400" },
          ].map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#161b22] border border-white/10 p-4 rounded-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-white/40 uppercase tracking-widest">
                  {s.label}
                </span>
                <s.icon size={16} className={s.color} />
              </div>
              <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-2 bg-[#161b22] border border-white/10 rounded-lg px-3 py-2 flex-1 min-w-[200px]">
            <Search size={14} className="text-white/40" />
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-white text-sm flex-1 focus:outline-none placeholder:text-white/25"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-[#161b22] border border-white/10 text-sm text-white rounded-lg px-3 py-2 focus:outline-none focus:border-green-400"
          >
            <option value="">All Status</option>
            {["New", "In Progress", "Completed"].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
          <select
            value={filterFood}
            onChange={(e) => setFilterFood(e.target.value)}
            className="bg-[#161b22] border border-white/10 text-sm text-white rounded-lg px-3 py-2 focus:outline-none focus:border-green-400"
          >
            <option value="">All Food</option>
            {["Vegetarian", "Non-Vegetarian", "Eggitarian"].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-20 text-white/40">
            Loading assessments...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-white/40">
            No submissions found.
          </div>
        ) : (
          <div className="bg-[#161b22] border border-white/10 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-[#1c2128]">
                    {[
                      "Customer Name",
                      "Mobile",
                      "Date",
                      "BMI",
                      "Goal",
                      "Food Pref",
                      "Status",
                      "",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-white/40"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row, i) => (
                    <tr
                      key={row.id ?? i}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                      onClick={() =>
                        navigate(
                          `/pronectar-admin-2026/customer/${row._rowIndex ?? i}`
                        )
                      }
                    >
                      <td className="px-4 py-3 font-bold text-white">
                        {row.name}
                      </td>
                      <td className="px-4 py-3 text-white/60">{row.phone}</td>
                      <td className="px-4 py-3 text-white/60">{row.date}</td>
                      <td className="px-4 py-3 text-white/60">{row.bmi}</td>
                      <td className="px-4 py-3 text-white/60 max-w-[150px] truncate">
                        {row.goals}
                      </td>
                      <td className="px-4 py-3 text-white/60">{row.foodPref}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={row.status} />
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-green-400 hover:text-green-300 text-xs font-bold uppercase tracking-wider">
                          Open →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
    </AdminGuard>
  );
}
