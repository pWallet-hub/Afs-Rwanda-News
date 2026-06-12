"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import {
  IconLayoutDashboard,
  IconArticle,
  IconUsers,
  IconChartBar,
  IconSettings,
  IconFlask,
  IconLogout,
  IconMenu2,
  IconX,
  IconBell,
  IconChevronRight,
} from "@tabler/icons-react";

const NAV_ITEMS = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: IconLayoutDashboard,
  },
  {
    label: "Articles",
    href: "/dashboard/articles",
    icon: IconArticle,
    badge: 4,
  },
  {
    label: "Users",
    href: "/dashboard/users",
    icon: IconUsers,
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: IconChartBar,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: IconSettings,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, setIsLoggedIn, setCurrentUser } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
      setCurrentUser("Reader");
      localStorage.removeItem("news_system_user");
    router.push("/login");
  };

  const SidebarContent = () => (
    <div className="dash-sidebar-inner">
      {/* Logo */}
      <div className="dash-logo">
        <div className="dash-logo-icon">
          <IconFlask size={18} stroke={2} color="#021D38" />
        </div>
        <div>
          <div className="dash-logo-name">AFS Rwanda</div>
          <div className="dash-logo-role">Admin Panel</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="dash-nav">
        <div className="dash-nav-label">Main</div>
        {NAV_ITEMS.map(({ label, href, icon: Icon, badge }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`dash-nav-item ${active ? "active" : ""}`}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon size={17} stroke={1.8} />
              <span>{label}</span>
              {badge && <span className="dash-nav-badge">{badge}</span>}
              {active && <IconChevronRight size={14} className="dash-nav-arrow" />}
            </Link>
          );
        })}
      </nav>

      {/* User card */}
      <div className="dash-user-card">
        <div className="dash-user-avatar">
          {String(currentUser || "A")[0].toUpperCase()}
        </div>
        <div className="dash-user-info">
          <div className="dash-user-name">{currentUser || "Admin"}</div>
          <div className="dash-user-email">admin@afs.rw</div>
        </div>
        <button
          className="dash-logout-btn"
          onClick={handleLogout}
          title="Sign out"
        >
          <IconLogout size={15} stroke={1.8} />
        </button>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .dash-root {
          display: flex;
          min-height: 100vh;
          background: #F1F5F9;
          font-family: 'Inter', system-ui, sans-serif;
        }

        /* ── SIDEBAR ── */
        .dash-sidebar {
          width: 228px;
          flex-shrink: 0;
          background: #021D38;
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0; left: 0; bottom: 0;
          z-index: 50;
          transition: transform 0.25s ease;
        }
        @media (max-width: 1023px) {
          .dash-sidebar {
            transform: translateX(-100%);
          }
          .dash-sidebar.open {
            transform: translateX(0);
            box-shadow: 4px 0 32px rgba(0,0,0,0.3);
          }
        }

        .dash-sidebar-inner {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 24px 16px;
        }

        .dash-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 4px 28px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          margin-bottom: 24px;
        }
        .dash-logo-icon {
          width: 34px; height: 34px;
          background: #70C113;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .dash-logo-name {
          font-size: 13px; font-weight: 700;
          color: #fff; letter-spacing: 0.02em;
        }
        .dash-logo-role {
          font-size: 10px; font-weight: 500;
          color: rgba(255,255,255,0.38);
          text-transform: uppercase; letter-spacing: 0.08em;
          margin-top: 1px;
        }

        .dash-nav { flex: 1; display: flex; flex-direction: column; gap: 2px; }
        .dash-nav-label {
          font-size: 9px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.12em;
          color: rgba(255,255,255,0.25);
          padding: 0 8px 10px;
        }
        .dash-nav-item {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 10px;
          border-radius: 8px;
          font-size: 13px; font-weight: 500;
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          transition: background 0.12s, color 0.12s;
          position: relative;
        }
        .dash-nav-item:hover {
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.85);
        }
        .dash-nav-item.active {
          background: rgba(112,193,19,0.15);
          color: #70C113;
        }
        .dash-nav-badge {
          margin-left: auto;
          background: #70C113;
          color: #021D38;
          font-size: 10px; font-weight: 700;
          padding: 1px 6px; border-radius: 100px;
        }
        .dash-nav-arrow { margin-left: auto; opacity: 0.4; }

        .dash-user-card {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 10px;
          border-top: 1px solid rgba(255,255,255,0.08);
          margin-top: 24px;
        }
        .dash-user-avatar {
          width: 32px; height: 32px;
          background: rgba(112,193,19,0.2);
          border: 1.5px solid rgba(112,193,19,0.4);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 700;
          color: #70C113; flex-shrink: 0;
        }
        .dash-user-name {
          font-size: 12px; font-weight: 600; color: #fff;
        }
        .dash-user-email {
          font-size: 10px; color: rgba(255,255,255,0.35);
          margin-top: 1px;
        }
        .dash-logout-btn {
          margin-left: auto;
          background: none; border: none; cursor: pointer;
          color: rgba(255,255,255,0.3);
          padding: 4px; border-radius: 6px;
          display: flex; align-items: center;
          transition: color 0.12s, background 0.12s;
        }
        .dash-logout-btn:hover {
          color: #ef4444;
          background: rgba(239,68,68,0.1);
        }

        /* ── MAIN ── */
        .dash-main {
          flex: 1;
          margin-left: 228px;
          display: flex; flex-direction: column;
          min-height: 100vh;
        }
        @media (max-width: 1023px) {
          .dash-main { margin-left: 0; }
        }

        /* Topbar */
        .dash-topbar {
          height: 60px;
          background: #fff;
          border-bottom: 1px solid #E2E8F0;
          display: flex; align-items: center;
          padding: 0 24px;
          gap: 12px;
          position: sticky; top: 0; z-index: 40;
        }
        .dash-menu-btn {
          display: none; background: none; border: none;
          cursor: pointer; padding: 6px; border-radius: 6px;
          color: #64748B;
        }
        @media (max-width: 1023px) {
          .dash-menu-btn { display: flex; align-items: center; }
        }
        .dash-breadcrumb {
          font-size: 13px; font-weight: 600; color: #0F172A;
          flex: 1;
        }
        .dash-topbar-actions {
          display: flex; align-items: center; gap: 8px;
        }
        .dash-notif-btn {
          position: relative;
          background: none; border: none; cursor: pointer;
          padding: 6px; border-radius: 8px; color: #64748B;
          transition: background 0.12s;
        }
        .dash-notif-btn:hover { background: #F1F5F9; }
        .dash-notif-dot {
          position: absolute; top: 5px; right: 5px;
          width: 7px; height: 7px;
          background: #70C113; border-radius: 50%;
          border: 1.5px solid #fff;
        }
        .dash-topbar-avatar {
          width: 32px; height: 32px;
          background: #021D38;
          border-radius: 50%;
          font-size: 12px; font-weight: 700; color: #fff;
          display: flex; align-items: center; justify-content: center;
        }

        /* Content */
        .dash-content {
          flex: 1;
          padding: 28px 24px;
          max-width: 1200px;
          width: 100%;
        }

        /* Overlay */
        .dash-overlay {
          display: none;
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.4);
          z-index: 49;
        }
        .dash-overlay.visible { display: block; }
      `}</style>

      <div className="dash-root">
        {/* Sidebar */}
        <aside className={`dash-sidebar ${sidebarOpen ? "open" : ""}`}>
          <SidebarContent />
        </aside>

        {/* Mobile overlay */}
        <div
          className={`dash-overlay ${sidebarOpen ? "visible" : ""}`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* Main */}
        <div className="dash-main">
          <header className="dash-topbar">
            <button className="dash-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
            </button>
            <div className="dash-breadcrumb">
              {NAV_ITEMS.find((n) => n.href === pathname)?.label ?? "Dashboard"}
            </div>
            <div className="dash-topbar-actions">
              <button className="dash-notif-btn">
                <IconBell size={18} stroke={1.8} />
                <div className="dash-notif-dot" />
              </button>
              <div className="dash-topbar-avatar">
                {String(currentUser || "A")[0].toUpperCase()}
              </div>
            </div>
          </header>

          <main className="dash-content">{children}</main>
        </div>
      </div>
    </>
  );
}