import React, { useState } from "react";
import { api, setAdminToken } from "../api/client.js";

export default function Login({ onLogin }) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function login(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await api.post("/admin/auth/login/", { identifier, password });
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
          <input
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
            placeholder="Enter email or username"
            autoComplete="username"
            required
          />
        </label>

        <label>
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
            autoComplete="current-password"
            required
          />
        </label>

        {error && <div className="errorBox">{error}</div>}
        <button className="primaryButton" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </main>
  );
}
