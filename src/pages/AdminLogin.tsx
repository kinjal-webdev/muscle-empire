import { useState } from "react";
import { useLocation } from "wouter";
import { login } from "@/lib/adminAuth";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const [, navigate] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      const ok = login(username.trim(), password);
      if (ok) {
        navigate("/pronectar-admin-2026/dashboard");
      } else {
        setError("Invalid username or password.");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-green-500/10 border border-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={24} className="text-green-400" />
          </div>
          <h1 className="text-xl font-black uppercase tracking-widest text-white">Admin Portal</h1>
          <p className="text-white/30 text-xs mt-1 uppercase tracking-widest">Muscle Empire Nutrition</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-[#161b22] border border-white/10 rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-1.5">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter username"
              autoComplete="username"
              className="w-full bg-[#0d1117] border border-white/10 focus:border-green-400 focus:outline-none h-11 px-3 text-white placeholder:text-white/20 text-sm rounded-lg transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
                className="w-full bg-[#0d1117] border border-white/10 focus:border-green-400 focus:outline-none h-11 px-3 pr-10 text-white placeholder:text-white/20 text-sm rounded-lg transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPass(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-xs text-center bg-red-400/10 border border-red-400/20 rounded-lg py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !username || !password}
            className="w-full bg-green-500 hover:bg-green-400 disabled:opacity-40 disabled:cursor-not-allowed text-black font-black uppercase tracking-widest py-3 rounded-xl text-sm transition-colors"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-white/15 text-xs mt-6">
          This is a private admin area.
        </p>
      </div>
    </div>
  );
}
