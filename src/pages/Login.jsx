import React, { useState } from "react";
import { Lock } from "lucide-react";
import { api, setAdminToken } from "../api/client.js";

export default function Login({ onLogin }) {
  const [identifier, setIdentifier] = useState("admin@kabadfactory.com");
  const [password, setPassword] = useState("Admin@12345");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function login(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await api.post("/admin/auth/login", { identifier, password });
      setAdminToken(response.data.token);
      localStorage.setItem("kabadAdminToken", response.data.token);
      onLogin(response.data.user);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid admin credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="loginScreen">
      <form className="loginCard" onSubmit={login}>
        <div className="loginMark">
          <img src="/assets/kabad-factory-logo.png" alt="Kabad Factory" />
        </div>
        <h1>Kabad Factory Admin</h1>
        <p>Sign in with your admin email/mobile and password to manage database records.</p>

        <label>
          <span>Email or mobile</span>
          <input value={identifier} onChange={(event) => setIdentifier(event.target.value)} required />
        </label>

        <label>
          <span>Password</span>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </label>

        <div className="hintBox">
          <Lock size={16} />
          Development default: admin@kabadfactory.com / Admin@12345
        </div>

        {error && <div className="errorBox">{error}</div>}
        <button className="primaryButton" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </main>
  );
}
