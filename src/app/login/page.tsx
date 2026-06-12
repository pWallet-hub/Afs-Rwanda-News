"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp, Role } from "@/context/AppContext";
import { IconFlask } from "@tabler/icons-react";

export default function LoginPage() {
  const router = useRouter();
  const { setCurrentUser, setIsLoggedIn } = useApp();

  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role>("Journalist");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return alert("Please enter your email and password.");
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);

      if (isLoginView) {
        if (email === "admin@afs.rw" && password === "admin123") {
          setCurrentUser("Admin");
          setIsLoggedIn(true);
          router.push("/dashboard");
        } else if (email === "editor@afs.rw" && password === "editor123") {
          setCurrentUser("Editor");
          setIsLoggedIn(true);
          router.push("/");
        } else if (email === "journalist@afs.rw" && password === "journalist123") {
          setCurrentUser("Journalist");
          setIsLoggedIn(true);
          router.push("/");
        } else {
          setCurrentUser("Reader");
          setIsLoggedIn(true);
          router.push("/");
        }
      } else {
        setCurrentUser(selectedRole);
        setIsLoggedIn(true);
        alert(`Account created as: ${selectedRole}`);
        if (selectedRole === "Admin") {
          router.push("/dashboard");
        } else {
          router.push("/");
        }
      }
    }, 800);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .login-root {
          min-height: 100vh;
          display: flex;
          font-family: 'Inter', system-ui, sans-serif;
          background: #F5F7FA;
        }

        /* ── LEFT PANEL ── */
        .login-panel-left {
          display: none;
          flex: 1;
          background: #021D38;
          padding: 48px 52px;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }
        @media (min-width: 1024px) {
          .login-panel-left { display: flex; }
        }

        .login-panel-left::before {
          content: '';
          position: absolute;
          bottom: -120px;
          right: -80px;
          width: 440px;
          height: 440px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(112,193,19,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .left-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .left-logo-icon {
          width: 36px;
          height: 36px;
          background: #70C113;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .left-logo-text {
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .left-logo-sub {
          font-size: 11px;
          font-weight: 400;
          color: rgba(255,255,255,0.45);
          letter-spacing: 0.02em;
          text-transform: none;
        }

        .left-headline {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .left-headline-eyebrow {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #70C113;
          margin-bottom: 20px;
        }
        .left-headline-title {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: clamp(36px, 3.2vw, 52px);
          line-height: 1.12;
          color: #fff;
          margin: 0 0 24px;
        }
        .left-headline-title em {
          font-style: italic;
          color: #70C113;
        }
        .left-headline-body {
          font-size: 14px;
          line-height: 1.7;
          color: rgba(255,255,255,0.5);
          max-width: 340px;
        }

        .left-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 32px;
        }
        .left-pill {
          font-size: 11px;
          font-weight: 500;
          color: rgba(255,255,255,0.6);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 100px;
          padding: 5px 12px;
        }

        .left-footer {
          font-size: 11px;
          color: rgba(255,255,255,0.25);
        }

        /* ── RIGHT PANEL ── */
        .login-panel-right {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
        }
        @media (min-width: 1024px) {
          .login-panel-right {
            width: 460px;
            flex-shrink: 0;
            background: #fff;
            box-shadow: -1px 0 0 rgba(0,0,0,0.06);
          }
        }

        .login-form-wrap {
          width: 100%;
          max-width: 380px;
        }

        /* Mobile logo */
        .mobile-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 32px;
        }
        @media (min-width: 1024px) {
          .mobile-logo { display: none; }
        }
        .mobile-logo-icon {
          width: 36px;
          height: 36px;
          background: #021D38;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mobile-logo-name {
          font-size: 14px;
          font-weight: 700;
          color: #021D38;
          letter-spacing: 0.04em;
        }

        .form-heading {
          margin-bottom: 28px;
        }
        .form-heading h1 {
          font-size: 22px;
          font-weight: 700;
          color: #0F172A;
          margin: 0 0 6px;
          letter-spacing: -0.01em;
        }
        .form-heading p {
          font-size: 13px;
          color: #64748B;
          margin: 0;
        }

        .field {
          margin-bottom: 16px;
        }
        .field label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 6px;
          letter-spacing: 0.01em;
        }
        .field input,
        .field select {
          width: 100%;
          padding: 11px 14px;
          border: 1.5px solid #E2E8F0;
          border-radius: 8px;
          font-size: 14px;
          font-family: inherit;
          color: #0F172A;
          background: #fff;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
          box-sizing: border-box;
        }
        .field input::placeholder { color: #94A3B8; }
        .field input:focus,
        .field select:focus {
          border-color: #021D38;
          box-shadow: 0 0 0 3px rgba(2,29,56,0.08);
        }
        .field select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2394A3B8' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 36px;
          cursor: pointer;
        }

        .submit-btn {
          width: 100%;
          padding: 12px;
          background: #021D38;
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          font-family: inherit;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          margin-top: 8px;
          transition: background 0.15s, transform 0.1s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          letter-spacing: 0.01em;
        }
        .submit-btn:hover { background: #0a2d52; }
        .submit-btn:active { transform: scale(0.99); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 20px 0;
          color: #CBD5E1;
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .divider::before,
        .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #E2E8F0;
        }

        .demo-box {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          padding: 14px 16px;
        }
        .demo-box-title {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #94A3B8;
          margin-bottom: 10px;
        }
        .demo-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 7px 0;
          border-bottom: 1px solid #F1F5F9;
        }
        .demo-row:last-child { border-bottom: none; padding-bottom: 0; }
        .demo-role {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .demo-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .demo-role-name {
          font-size: 12px;
          font-weight: 600;
          color: #334155;
        }
        .demo-creds {
          font-size: 11px;
          color: #94A3B8;
          font-family: 'Courier New', monospace;
        }
        .demo-fill-btn {
          font-size: 10px;
          font-weight: 600;
          color: #70C113;
          background: none;
          border: none;
          cursor: pointer;
          padding: 2px 0;
          font-family: inherit;
          letter-spacing: 0.02em;
          transition: opacity 0.15s;
        }
        .demo-fill-btn:hover { opacity: 0.7; }

        .toggle-view {
          text-align: center;
          margin-top: 24px;
          font-size: 13px;
          color: #64748B;
        }
        .toggle-view button {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          color: #021D38;
          font-family: inherit;
          padding: 0;
          margin-left: 4px;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .toggle-view button:hover { color: #70C113; }
      `}</style>

      <div className="login-root">
        {/* LEFT PANEL */}
        <div className="login-panel-left">
          <div className="left-logo">
            <div className="left-logo-icon">
              <IconFlask size={20} stroke={2} color="#021D38" />
            </div>
            <div>
              <div className="left-logo-text">Alliance for Science</div>
              <div className="left-logo-sub">Regional Portal — Rwanda</div>
            </div>
          </div>

          <div className="left-headline">
            <div className="left-headline-eyebrow">Science Journalism Network</div>
            <h2 className="left-headline-title">
              Reporting that&nbsp;<em>informs.</em><br />
              Science that&nbsp;<em>matters.</em>
            </h2>
            <p className="left-headline-body">
              A trusted platform for evidence-based science journalism across
              East Africa. Write, review, and publish with confidence.
            </p>
            <div className="left-pills">
              {["Fact-checked", "Peer-reviewed", "Open access", "East Africa"].map((t) => (
                <span key={t} className="left-pill">{t}</span>
              ))}
            </div>
          </div>

          <div className="left-footer">
            © {new Date().getFullYear()} Alliance for Science · Rwanda Node
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="login-panel-right">
          <div className="login-form-wrap">
            {/* Mobile logo */}
            <div className="mobile-logo">
              <div className="mobile-logo-icon">
                <IconFlask size={20} stroke={2} color="#70C113" />
              </div>
              <span className="mobile-logo-name">Alliance for Science</span>
            </div>

            <div className="form-heading">
              <h1>{isLoginView ? "Welcome back" : "Create an account"}</h1>
              <p>
                {isLoginView
                  ? "Sign in to access the editorial platform."
                  : "Join the AFS Rwanda science journalism network."}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="field">
                <label>Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@allianceforscience.rw"
                  autoComplete="email"
                />
              </div>

              <div className="field">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete={isLoginView ? "current-password" : "new-password"}
                />
              </div>

              {!isLoginView && (
                <div className="field">
                  <label>Role</label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value as Role)}
                  >
                    <option value="Journalist">Journalist — Write articles</option>
                    <option value="Editor">Editor — Review &amp; approve</option>
                    <option value="Admin">Admin — Full access</option>
                  </select>
                </div>
              )}

              <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading ? (
                  <><div className="spinner" /> Signing in…</>
                ) : (
                  isLoginView ? "Sign in" : "Create account"
                )}
              </button>
            </form>

            {isLoginView && (
              <>
                <div className="divider">Demo accounts</div>
                <div className="demo-box">
                  <div className="demo-box-title">Quick access — click to fill</div>
                  {[
                    { role: "Admin", color: "#EF4444", email: "admin@afs.rw", pass: "admin123" },
                    { role: "Editor", color: "#F59E0B", email: "editor@afs.rw", pass: "editor123" },
                    { role: "Journalist", color: "#70C113", email: "journalist@afs.rw", pass: "journalist123" },
                  ].map(({ role, color, email: e, pass }) => (
                    <div className="demo-row" key={role}>
                      <div className="demo-role">
                        <div className="demo-dot" style={{ background: color }} />
                        <span className="demo-role-name">{role}</span>
                      </div>
                      <span className="demo-creds">{e}</span>
                      <button
                        className="demo-fill-btn"
                        type="button"
                        onClick={() => { setEmail(e); setPassword(pass); }}
                      >
                        Fill ↗
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="toggle-view">
              {isLoginView ? "Don't have an account?" : "Already have an account?"}
              <button type="button" onClick={() => setIsLoginView(!isLoginView)}>
                {isLoginView ? "Sign up" : "Sign in"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}