'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Install: npm install @tabler/icons-react
import {
  IconFlask,
  IconSearch,
  IconBell,
  IconMenu2,
} from '@tabler/icons-react';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Live updates', href: '/live' },
  { label: 'Food security', href: '/food-security' },
  { label: 'Climate change', href: '/climate-change' },
  { label: 'Global science', href: '/global-news' },
  { label: 'Research', href: '/research' },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .afs-header {
          width: 100%;
          background: #021D38;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Meta bar ── */
        .afs-meta {
          background: #010F1E;
          padding: 7px 28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 0.5px solid rgba(112, 193, 19, 0.15);
        }
        .afs-meta span {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.45);
          letter-spacing: 0.04em;
        }
        .afs-meta-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #70C113;
          display: inline-block;
          margin-right: 7px;
          animation: afsPulse 2s infinite;
        }
        @keyframes afsPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }

        /* ── Brand row ── */
        .afs-brand-row {
          padding: 18px 28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .afs-brand-link {
          display: flex;
          align-items: center;
          gap: 14px;
          text-decoration: none;
        }
        .afs-brand-icon {
          width: 46px;
          height: 46px;
          background: #70C113;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #021D38;
        }
        .afs-brand-name {
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.02em;
          line-height: 1;
        }
        .afs-brand-name span { color: #70C113; }
        .afs-brand-sub {
          font-size: 10px;
          letter-spacing: 0.18em;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
          margin-top: 4px;
          display: block;
        }

        /* ── Brand actions ── */
        .afs-brand-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .afs-search-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.06);
          border: 0.5px solid rgba(255, 255, 255, 0.1);
          border-radius: 100px;
          padding: 8px 16px;
          cursor: pointer;
          transition: background 0.2s;
          color: rgba(255, 255, 255, 0.4);
        }
        .afs-search-pill:hover { background: rgba(255, 255, 255, 0.1); }
        .afs-search-pill span {
          font-size: 12px;
          white-space: nowrap;
        }
        .afs-subscribe-btn {
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: #70C113;
          color: #021D38;
          border: none;
          border-radius: 100px;
          padding: 10px 22px;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
          white-space: nowrap;
        }
        .afs-subscribe-btn:hover {
          opacity: 0.88;
          transform: translateY(-1px);
        }

        /* ── Nav strip ── */
        .afs-nav-strip {
          background: rgba(0, 0, 0, 0.35);
          border-top: 0.5px solid rgba(255, 255, 255, 0.07);
          padding: 0 28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .afs-nav-links {
          display: flex;
          align-items: center;
          gap: 2px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .afs-nav-links::-webkit-scrollbar { display: none; }
        .afs-nav-link {
          font-family: 'Syne', sans-serif;
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.55);
          text-decoration: none;
          padding: 14px 13px;
          border-bottom: 2px solid transparent;
          transition: color 0.2s, border-color 0.2s;
          white-space: nowrap;
        }
        .afs-nav-link:hover { color: #fff; }
        .afs-nav-link.active {
          color: #70C113;
          border-bottom-color: #70C113;
        }

        /* ── Nav right ── */
        .afs-nav-right {
          display: flex;
          align-items: center;
          gap: 6px;
          border-left: 0.5px solid rgba(255, 255, 255, 0.08);
          padding-left: 16px;
          flex-shrink: 0;
        }
        .afs-lang-badge {
          font-family: 'Syne', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: rgba(255, 255, 255, 0.4);
          border: 0.5px solid rgba(255, 255, 255, 0.12);
          border-radius: 5px;
          padding: 4px 8px;
          cursor: pointer;
          background: transparent;
          transition: color 0.2s, border-color 0.2s;
        }
        .afs-lang-badge:hover {
          color: #fff;
          border-color: rgba(255, 255, 255, 0.3);
        }
        .afs-icon-btn {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
          border: none;
          background: transparent;
          color: rgba(255, 255, 255, 0.5);
        }
        .afs-icon-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.9);
        }

        /* ── Mobile menu ── */
        .afs-mobile-menu {
          background: #010F1E;
          border-top: 0.5px solid rgba(255, 255, 255, 0.07);
          padding: 8px 16px 16px;
        }
        .afs-mobile-link {
          display: block;
          font-family: 'Syne', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.55);
          text-decoration: none;
          padding: 12px 4px;
          border-bottom: 0.5px solid rgba(255, 255, 255, 0.06);
          transition: color 0.2s;
        }
        .afs-mobile-link:last-child { border-bottom: none; }
        .afs-mobile-link:hover,
        .afs-mobile-link.active { color: #70C113; }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .afs-meta { padding: 6px 16px; }
          .afs-meta-email { display: none; }
          .afs-brand-row { padding: 14px 16px; }
          .afs-search-pill { display: none; }
          .afs-nav-strip { padding: 0 16px; }
          .afs-nav-links { display: none; }
        }
      `}</style>

      <header className="afs-header">
        {/* Meta bar */}
        <div className="afs-meta">
          <span>
            <span className="afs-meta-dot" />
            Alliance for Science Regional Network — Rwanda
          </span>
          <span className="afs-meta-email">info@allianceforscience.rw</span>
        </div>

        {/* Brand row */}
        <div className="afs-brand-row">
          <Link href="/" className="afs-brand-link">
            <div className="afs-brand-icon" aria-hidden="true">
              <IconFlask size={22} stroke={1.8} />
            </div>
            <div>
              <p className="afs-brand-name">
                AFS <span>News</span>
              </p>
              <span className="afs-brand-sub">Alliance for Science</span>
            </div>
          </Link>

          <div className="afs-brand-actions">
            <div className="afs-search-pill" role="search" tabIndex={0} aria-label="Search">
              <IconSearch size={14} stroke={1.8} />
              <span>Search stories…</span>
            </div>
            <button className="afs-subscribe-btn">Subscribe</button>
          </div>
        </div>

        {/* Nav strip */}
        <nav className="afs-nav-strip" aria-label="Primary navigation">
          <div className="afs-nav-links">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`afs-nav-link${pathname === link.href ? ' active' : ''}`}
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="afs-nav-right">
            <button className="afs-lang-badge" aria-label="Switch language">EN</button>
            <button className="afs-icon-btn" aria-label="Notifications">
              <IconBell size={16} stroke={1.8} />
            </button>
            <button
              className="afs-icon-btn"
              aria-label="Toggle mobile menu"
              onClick={() => setMobileOpen((o) => !o)}
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
                className={`afs-mobile-link${pathname === link.href ? ' active' : ''}`}
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