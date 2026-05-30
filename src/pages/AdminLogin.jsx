import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    const savedAttempts =
      Number(localStorage.getItem("loginAttempts")) || 0;

    const blockedUntil =
      Number(localStorage.getItem("blockedUntil"));

    if (blockedUntil && Date.now() < blockedUntil) {

      alert("Too many attempts. Try again later.");

      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {

        const newAttempts = savedAttempts + 1;

        localStorage.setItem(
          "loginAttempts",
          newAttempts
        );

        if (newAttempts >= 10) {

          localStorage.setItem(
            "blockedUntil",
            Date.now() + 15 * 60 * 1000
          );

          alert(
            "Too many failed attempts. Try again in 15 minutes."
          );

        } else {

          alert(
            `Wrong password. Attempts: ${newAttempts}/10`
          );

        }

        return;
      }

      localStorage.removeItem("loginAttempts");

      localStorage.removeItem("blockedUntil");

      navigate("/admin/projects");

    } catch (err) {

      alert("Login failed");

    } finally {

      setLoading(false);

    }
  }

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-[#0b1229] border border-white/10 rounded-3xl p-8 shadow-2xl"
      >
        <h1 className="text-3xl font-black text-white mb-8 text-center">
          Admin Login
        </h1>

        <div className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-14 px-4 rounded-2xl bg-[#050816] border border-white/10 text-white outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-14 px-4 rounded-2xl bg-[#050816] border border-white/10 text-white outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition disabled:opacity-50"
          >
            {loading ? "Loading..." : "Login"}
          </button>

        </div>
      </form>
    </div>
  );
}