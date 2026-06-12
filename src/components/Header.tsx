'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { IconFlask, IconSearch, IconBell, IconMenu2, IconUser, IconLogout } from '@tabler/icons-react';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Food Security', href: '/food-security' },
  { label: 'Climate Change', href: '/climate-change' },
  { label: 'Global Science', href: '/global-news' },
  { label: 'Workspace', href: '/dashboard' },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dateStr, setDateStr] = useState('');
  const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn } = useApp();

  useEffect(() => {
    setDateStr(new Date().toLocaleDateString('en-GB', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    }));
  }, []);

  const handleLogout = () => {
    setCurrentUser('Reader');
    setIsLoggedIn(false);
    router.push('/');
  };

  return (
    <>
      <style>{`
        .afs-header {
          width: 100%;
          background: #021D38;
          font-family: var(--font-poppins), 'Poppins', sans-serif;
          border-top: 3px solid #70C113;
        }

        /* ── Meta bar ── */
        .afs-meta {
          background: #010F1E;
          padding: 6px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .afs-meta-left { display: flex; align-items: center; gap: 14px; }
        .afs-meta span {
          font-size: 10.5px;
          color: rgba(255,255,255,0.38);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .afs-meta-dot {
          display: inline-block;
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #70C113;
          margin-right: 7px;
          animation: afsPulse 2.4s ease-in-out infinite;
        }
        .afs-meta-divider {
          width: 1px; height: 10px;
          background: rgba(255,255,255,0.12);
        }
        @keyframes afsPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }

        /* ── Brand row ── */
        .afs-brand-row {
          padding: 16px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          border-bottom: 0.5px solid rgba(255,255,255,0.07);
        }
        .afs-brand-link {
          display: flex; align-items: center; gap: 14px;
          text-decoration: none;
        }
        .afs-brand-icon {
          width: 44px; height: 44px;
          background: #70C113;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          color: #021D38;
        }
        .afs-brand-name {
          font-size: 21px; font-weight: 800;
          color: #fff; letter-spacing: -0.03em; line-height: 1;
        }
        .afs-brand-name span { color: #70C113; }
        .afs-brand-sub {
          display: block;
          font-size: 9.5px; font-weight: 500;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-top: 4px;
        }
        .afs-brand-actions { display: flex; align-items: center; gap: 10px; }

        /* ── Search pill ── */
        .afs-search-pill {
          display: flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.05);
          border: 0.5px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 8px 14px;
          cursor: pointer;
          color: rgba(255,255,255,0.35);
          font-size: 12px;
          font-family: inherit;
          white-space: nowrap;
          transition: background 0.15s, border-color 0.15s, color 0.15s;
        }
        .afs-search-pill:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.18);
          color: rgba(255,255,255,0.6);
        }

        /* ── Auth buttons ── */
        .afs-sign-in-btn {
          display: flex; align-items: center; gap: 6px;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.06em; text-transform: uppercase;
          background: #70C113; color: #021D38;
          border-radius: 8px;
          padding: 8px 18px;
          border: none; cursor: pointer;
          font-family: inherit;
          text-decoration: none;
          white-space: nowrap;
          transition: background 0.15s;
        }
        .afs-sign-in-btn:hover { background: #84d914; }

        /* ── Profile (logged-in) ── */
        .afs-profile {
          display: flex; align-items: center; gap: 10px;
        }
        .afs-avatar {
          width: 34px; height: 34px;
          border-radius: 8px;
          background: rgba(112,193,19,0.12);
          border: 1px solid rgba(112,193,19,0.28);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          color: #70C113;
        }
        .afs-user-info { display: flex; flex-direction: column; gap: 1px; }
        .afs-username {
          font-size: 11px; font-weight: 600;
          color: #fff; letter-spacing: 0.04em; line-height: 1;
        }
        .afs-user-role {
          font-size: 9.5px;
          color: rgba(255,255,255,0.38);
          letter-spacing: 0.03em;
        }
        .afs-logout-btn {
          width: 32px; height: 32px;
          border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(239,68,68,0.08);
          border: 0.5px solid rgba(239,68,68,0.22);
          cursor: pointer;
          color: #f87171;
          transition: background 0.15s, border-color 0.15s;
        }
        .afs-logout-btn:hover {
          background: rgba(239,68,68,0.18);
          border-color: rgba(239,68,68,0.4);
        }

        /* ── Nav strip ── */
        .afs-nav-strip {
          padding: 0 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .afs-nav-links { display: flex; align-items: center; }
        .afs-nav-link {
          position: relative;
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.07em; text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          padding: 14px 14px;
          border-bottom: 2px solid transparent;
          white-space: nowrap;
          transition: color 0.15s;
        }
        .afs-nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 14px; right: 14px;
          height: 2px;
          background: #70C113;
          border-radius: 2px 2px 0 0;
          opacity: 0;
          transition: opacity 0.15s;
        }
        .afs-nav-link:hover { color: rgba(255,255,255,0.8); }
        .afs-nav-link.active { color: #70C113; }
        .afs-nav-link.active::after { opacity: 1; }

        .afs-nav-right {
          display: flex; align-items: center; gap: 2px;
          padding-left: 16px;
          border-left: 0.5px solid rgba(255,255,255,0.08);
        }
        .afs-icon-btn {
          width: 32px; height: 32px;
          border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          background: transparent;
          border: none; cursor: pointer;
          color: rgba(255,255,255,0.4);
          transition: background 0.15s, color 0.15s;
        }
        .afs-icon-btn:hover {
          background: rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.75);
        }
        .afs-notif-wrap { position: relative; }
        .afs-notif-dot {
          position: absolute;
          top: 6px; right: 6px;
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #70C113;
          border: 1.5px solid #021D38;
        }

        /* ── Mobile menu ── */
        .afs-mobile-menu {
          background: #010F1E;
          border-top: 0.5px solid rgba(255,255,255,0.07);
          padding: 10px 16px 16px;
        }
        .afs-mobile-link {
          display: block;
          font-size: 11.5px; font-weight: 600;
          letter-spacing: 0.07em; text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          padding: 12px 6px;
          border-bottom: 0.5px solid rgba(255,255,255,0.06);
          transition: color 0.15s;
        }
        .afs-mobile-link:last-child { border-bottom: none; }
        .afs-mobile-link:hover { color: rgba(255,255,255,0.8); }
        .afs-mobile-link.active { color: #70C113; }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .afs-meta, .afs-brand-row, .afs-nav-strip { padding-left: 16px; padding-right: 16px; }
          .afs-meta-email { display: none; }
          .afs-search-pill { display: none; }
          .afs-nav-links { display: none; }
          .afs-mobile-toggle { display: flex !important; }
          .afs-user-info { display: none; }
        }
        .afs-mobile-toggle { display: none; }
      `}</style>

      <header className="afs-header">

        {/* Meta bar */}
        <div className="afs-meta">
          <div className="afs-meta-left">
            <span>
              <span className="afs-meta-dot" />
              Alliance for Science Rwanda
            </span>
            <div className="afs-meta-divider" />
            <span className="afs-meta-email">info@allianceforscience.rw</span>
          </div>
          <span>{dateStr}</span>
        </div>

        {/* Brand row */}
        <div className="afs-brand-row">
          <Link href="/" className="afs-brand-link">
            <div className="afs-brand-icon">
              <IconFlask size={22} stroke={1.8} />
            </div>
            <div>
              <p className="afs-brand-name">AFS <span>News</span></p>
              <span className="afs-brand-sub">Alliance for Science · Rwanda</span>
            </div>
          </Link>

          <div className="afs-brand-actions">
            <button className="afs-search-pill" aria-label="Search stories">
              <IconSearch size={14} stroke={1.8} />
              <span>Search stories…</span>
            </button>

            {isLoggedIn ? (
              <div className="afs-profile">
                <div className="afs-avatar">
                  <IconUser size={16} stroke={1.8} />
                </div>
                <div className="afs-user-info">
                  <span className="afs-username">{currentUser}</span>
                  <span className="afs-user-role">AFS Rwanda</span>
                </div>
                <button
                  className="afs-logout-btn"
                  onClick={handleLogout}
                  title="Sign out"
                  aria-label="Sign out"
                >
                  <IconLogout size={15} stroke={1.8} />
                </button>
              </div>
            ) : (
              <Link href="/login" className="afs-sign-in-btn">
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Nav strip */}
        <nav className="afs-nav-strip" aria-label="Main navigation">
          <div className="afs-nav-links">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`afs-nav-link ${pathname === link.href ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="afs-nav-right">
            <div className="afs-notif-wrap">
              <button className="afs-icon-btn" aria-label="Notifications">
                <IconBell size={16} stroke={1.8} />
              </button>
              <span className="afs-notif-dot" aria-hidden="true" />
            </div>
            <button
              className="afs-icon-btn afs-mobile-toggle"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <IconMenu2 size={16} stroke={1.8} />
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="afs-mobile-menu">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`afs-mobile-link ${pathname === link.href ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

      </header>
    </>
  );
}