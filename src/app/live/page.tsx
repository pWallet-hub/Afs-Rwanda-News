'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// ── LIVE FEED DATA ────────────────────────────────────────────────────────────

const PINNED = {
  id: 'p1',
  time: '12:47',
  label: 'BREAKING',
  title: 'EAC Water Summit Reaches Landmark Cross-Border Agreement on Kagera Basin Irrigation Rights',
  body: 'After three days of negotiations in Kigali, ministers from Rwanda, Uganda, Tanzania and Burundi have signed a binding framework that governs dry-season water allocation across the Kagera basin — a watershed moment for regional food security.',
  author: 'Jean de Dieu Kabera',
  tags: ['Water Policy', 'EAC', 'Food Security'],
};

const FEED_ITEMS = [
  {
    id: 'f1', time: '12:51', type: 'update',
    title: 'Rwanda Meteorological Agency issues amber drought advisory for Eastern Province through August.',
    detail: 'Farmers urged to activate supplementary irrigation protocols.',
  },
  {
    id: 'f2', time: '12:38', type: 'quote',
    title: '"This agreement will protect 2.4 million smallholders who depend on Kagera water in the dry season."',
    detail: '— Minister of Agriculture, Rwanda',
  },
  {
    id: 'f3', time: '12:22', type: 'data',
    title: 'Soil moisture index across Bugesera district drops to 31% — lowest reading since March 2023.',
    detail: 'AgriWire sensor network · 47 active nodes reporting.',
  },
  {
    id: 'f4', time: '12:09', type: 'update',
    title: 'Kigali Innovation Center deploys 12 new IoT soil sensors across Nyanza agri-corridor.',
    detail: 'Real-time data now feeding into national food security dashboard.',
  },
  {
    id: 'f5', time: '11:54', type: 'quote',
    title: '"Biotechnology is not the future — it is the present. Rwanda must lead."',
    detail: '— Dr. Amara Diallo, EAC Biotech Advisory Council',
  },
  {
    id: 'f6', time: '11:40', type: 'update',
    title: 'Drought-resistant maize variant RW-DX4 clears final biosafety review — commercial rollout expected Q3 2026.',
    detail: 'Developed by Kigali Innovation Center in partnership with CGIAR.',
  },
  {
    id: 'f7', time: '11:22', type: 'data',
    title: 'Seed bank deployment reaches 87% capacity — 3 provinces fully covered.',
    detail: 'Eastern, Northern and Southern provinces now fully integrated.',
  },
  {
    id: 'f8', time: '11:05', type: 'update',
    title: 'Ministry of Environment confirms new urban agro-tech testing zones near Kigali will open July 14.',
    detail: '3 pilot sites covering 40 hectares of peri-urban farmland.',
  },
];

const TRENDING = [
  { id: 't1', rank: 1, title: 'Kagera Basin Water Agreement — full text analysis', views: '14.2k' },
  { id: 't2', rank: 2, title: 'RW-DX4 Maize: What farmers need to know', views: '9.8k' },
  { id: 't3', rank: 3, title: 'Drought advisory: Eastern Province action plan', views: '7.1k' },
  { id: 't4', rank: 4, title: 'Biosafety framework: 2026 amendments explained', views: '5.4k' },
];

const TOPICS = ['All', 'Water', 'Biotech', 'Climate', 'Policy', 'Data'];

// ── ICONS (inline SVG, no lucide brand icons) ─────────────────────────────────

const IconRadio = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
    <line x1="12" y1="20" x2="12.01" y2="20"/>
  </svg>
);
const IconPin = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z"/></svg>
);
const IconQuote = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>
);
const IconChart = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);
const IconClock = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconTrending = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
  </svg>
);
const IconShare = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function LivePage() {
  const [activeTopic, setActiveTopic] = useState('All');
  const [liveTime, setLiveTime] = useState('');
  const [pulseCount, setPulseCount] = useState(247);
  const [newItems, setNewItems] = useState<string[]>([]);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setLiveTime(now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setPulseCount(c => c + Math.floor(Math.random() * 3));
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const typeIcon = (type: string) => {
    if (type === 'quote') return <span style={{ color: 'var(--green)' }}><IconQuote /></span>;
    if (type === 'data') return <span style={{ color: '#3B82F6' }}><IconChart /></span>;
    return <span style={{ color: '#F59E0B' }}>●</span>;
  };

  const typeLabel = (type: string) => {
    if (type === 'quote') return { label: 'QUOTE', bg: 'rgba(112,193,19,.12)', color: 'var(--green-dk)' };
    if (type === 'data') return { label: 'DATA', bg: 'rgba(59,130,246,.1)', color: '#1D4ED8' };
    return { label: 'UPDATE', bg: 'rgba(245,158,11,.1)', color: '#92400E' };
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,400&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --navy: #021D38;
          --green: #70C113;
          --green-dk: #3B6D11;
          --cream: #F5F4F0;
          --border: rgba(2,29,56,.1);
          --red: #DC2626;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .lv { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--navy); font-size: 13px; min-height: 100vh; }

        /* NAV BAR (matches main site) */
        .lv-topbar { background: var(--navy); padding: 7px 20px; display: flex; align-items: center; justify-content: space-between; }
        .lv-topbar-logo { font-family: 'Fraunces',serif; font-size: 18px; font-weight: 700; color: #fff; text-decoration: none; letter-spacing: -.01em; }
        .lv-topbar-logo span { color: var(--green); }
        .lv-topbar-right { display: flex; align-items: center; gap: 16px; }
        .lv-topbar-link { font-family: 'Syne',sans-serif; font-size: 9px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; color: rgba(255,255,255,.45); text-decoration: none; transition: color .2s; }
        .lv-topbar-link:hover { color: var(--green); }
        .lv-topbar-time { font-family: 'Syne',sans-serif; font-size: 10px; color: rgba(255,255,255,.3); letter-spacing: .04em; font-variant-numeric: tabular-nums; min-width: 70px; text-align: right; }

        /* LIVE HERO BANNER */
        .lv-hero { background: var(--navy); padding: 28px 20px 24px; position: relative; overflow: hidden; }
        .lv-hero::before { content: ''; position: absolute; top: -40px; right: -60px; width: 300px; height: 300px; border-radius: 50%; background: radial-gradient(circle, rgba(112,193,19,.08) 0%, transparent 70%); pointer-events: none; }
        .lv-hero-inner { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px; }
        .lv-hero-left { display: flex; flex-direction: column; gap: 6px; }
        .lv-badge-row { display: flex; align-items: center; gap: 10px; }
        .lv-live-badge { display: flex; align-items: center; gap: 6px; background: var(--red); color: #fff; font-family: 'Syne',sans-serif; font-size: 10px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; padding: 5px 12px; border-radius: 5px; }
        .lv-live-dot { width: 7px; height: 7px; border-radius: 50%; background: #fff; animation: livepulse 1.2s ease-in-out infinite; }
        @keyframes livepulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }
        .lv-live-title { font-family: 'Fraunces',serif; font-size: 22px; font-weight: 700; color: #fff; letter-spacing: -.01em; }
        .lv-live-sub { font-size: 12px; color: rgba(255,255,255,.45); }
        .lv-hero-stats { display: flex; gap: 20px; }
        .lv-stat { text-align: right; }
        .lv-stat-num { font-family: 'Syne',sans-serif; font-size: 22px; font-weight: 800; color: var(--green); line-height: 1; }
        .lv-stat-label { font-size: 10px; color: rgba(255,255,255,.35); margin-top: 3px; font-family: 'Syne',sans-serif; letter-spacing: .06em; text-transform: uppercase; }

        /* TOPIC FILTER BAR */
        .lv-filterbar { background: #fff; border-bottom: .5px solid var(--border); padding: 0 20px; display: flex; align-items: center; gap: 0; overflow-x: auto; }
        .lv-filter-item { font-family: 'Syne',sans-serif; font-size: 10px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; padding: 11px 14px; color: #888; cursor: pointer; border-bottom: 2px solid transparent; white-space: nowrap; transition: all .2s; background: none; border-left: none; border-right: none; border-top: none; }
        .lv-filter-item:hover { color: var(--navy); }
        .lv-filter-item.active { color: var(--navy); border-bottom: 2px solid var(--green); }
        .lv-filter-right { margin-left: auto; display: flex; align-items: center; gap: 6px; padding: 8px 0; flex-shrink: 0; }
        .lv-filter-count { font-family: 'Syne',sans-serif; font-size: 10px; color: #aaa; }
        .lv-filter-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--red); animation: livepulse 1.2s ease-in-out infinite; }

        /* MAIN LAYOUT */
        .lv-inner { max-width: 1200px; margin: 0 auto; padding: 22px 20px; }
        .lv-layout { display: grid; grid-template-columns: minmax(0,1fr) 260px; gap: 24px; }
        @media (max-width: 900px) { .lv-layout { grid-template-columns: 1fr; } }

        /* SECTION HEADER */
        .lv-section-hd { display: flex; align-items: center; gap: 8px; margin-bottom: 16px; padding-bottom: 10px; border-bottom: 2px solid var(--navy); }
        .lv-section-dot { width: 7px; height: 7px; background: var(--green); border-radius: 2px; flex-shrink: 0; }
        .lv-section-title { font-family: 'Syne',sans-serif; font-size: 10px; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; color: var(--navy); }
        .lv-section-meta { margin-left: auto; font-size: 10px; color: #aaa; font-family: 'Syne',sans-serif; display: flex; align-items: center; gap: 4px; }

        /* PINNED STORY */
        .lv-pinned { background: var(--navy); border-radius: 12px; padding: 22px; margin-bottom: 20px; position: relative; overflow: hidden; }
        .lv-pinned::after { content: ''; position: absolute; bottom: -30px; right: -30px; width: 160px; height: 160px; border-radius: 50%; background: rgba(112,193,19,.06); pointer-events: none; }
        .lv-pinned-top { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
        .lv-pinned-badge { background: var(--red); color: #fff; font-family: 'Syne',sans-serif; font-size: 9px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; padding: 4px 10px; border-radius: 4px; }
        .lv-pinned-pin { display: flex; align-items: center; gap: 4px; font-family: 'Syne',sans-serif; font-size: 9px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: rgba(255,255,255,.3); }
        .lv-pinned-time { margin-left: auto; font-family: 'Syne',sans-serif; font-size: 10px; color: rgba(255,255,255,.3); display: flex; align-items: center; gap: 4px; }
        .lv-pinned-title { font-family: 'Fraunces',serif; font-size: 18px; line-height: 1.3; color: #fff; margin-bottom: 12px; }
        .lv-pinned-body { font-size: 12.5px; color: rgba(255,255,255,.55); line-height: 1.7; margin-bottom: 16px; }
        .lv-pinned-foot { display: flex; align-items: center; justify-content: space-between; padding-top: 14px; border-top: .5px solid rgba(255,255,255,.08); }
        .lv-pinned-author { font-size: 11px; color: rgba(255,255,255,.35); }
        .lv-pinned-tags { display: flex; gap: 6px; flex-wrap: wrap; }
        .lv-tag { font-family: 'Syne',sans-serif; font-size: 8.5px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; padding: 3px 9px; border-radius: 20px; border: .5px solid rgba(112,193,19,.3); color: var(--green); }

        /* FEED */
        .lv-feed { display: flex; flex-direction: column; gap: 0; }
        .lv-feed-item { display: grid; grid-template-columns: 52px 1fr; gap: 0; border-bottom: .5px solid var(--border); padding: 14px 0; animation: fadeInUp .35s ease both; }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .lv-feed-item:first-child { padding-top: 0; }
        .lv-feed-item:last-child { border-bottom: none; }
        .lv-feed-time-col { display: flex; flex-direction: column; align-items: center; gap: 8px; padding-top: 2px; }
        .lv-feed-time { font-family: 'Syne',sans-serif; font-size: 10px; font-weight: 800; color: #aaa; letter-spacing: .03em; font-variant-numeric: tabular-nums; }
        .lv-feed-line { flex: 1; width: 1px; background: var(--border); min-height: 20px; }
        .lv-feed-content { padding-left: 4px; }
        .lv-feed-type-row { display: flex; align-items: center; gap: 6px; margin-bottom: 6px; }
        .lv-type-badge { font-family: 'Syne',sans-serif; font-size: 8px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; padding: 2px 8px; border-radius: 3px; }
        .lv-feed-title { font-family: 'Fraunces',serif; font-size: 14px; line-height: 1.4; color: var(--navy); margin-bottom: 5px; cursor: pointer; transition: color .2s; }
        .lv-feed-title:hover { color: var(--green-dk); }
        .lv-feed-detail { font-size: 11px; color: #888; line-height: 1.55; }
        .lv-feed-actions { display: flex; gap: 10px; margin-top: 8px; }
        .lv-feed-action { font-family: 'Syne',sans-serif; font-size: 9px; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; color: #aaa; display: flex; align-items: center; gap: 4px; cursor: pointer; transition: color .2s; background: none; border: none; padding: 0; }
        .lv-feed-action:hover { color: var(--navy); }

        /* SIDEBAR */
        .lv-sidebar { display: flex; flex-direction: column; gap: 20px; }

        /* Viewer count widget */
        .lv-viewers { background: #fff; border-radius: 12px; padding: 16px; border: .5px solid var(--border); }
        .lv-viewers-num { font-family: 'Syne',sans-serif; font-size: 32px; font-weight: 800; color: var(--navy); line-height: 1; }
        .lv-viewers-label { font-size: 11px; color: #aaa; margin-top: 4px; margin-bottom: 14px; }
        .lv-viewers-bar { height: 4px; background: var(--border); border-radius: 2px; overflow: hidden; margin-bottom: 12px; }
        .lv-viewers-fill { height: 100%; background: var(--green); border-radius: 2px; animation: barfill 2s ease-out forwards; }
        @keyframes barfill { from{width:0} to{width:73%} }
        .lv-viewers-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .lv-viewers-stat { background: var(--cream); border-radius: 8px; padding: 10px 12px; }
        .lv-viewers-stat-num { font-family: 'Syne',sans-serif; font-size: 14px; font-weight: 800; color: var(--navy); }
        .lv-viewers-stat-label { font-size: 10px; color: #aaa; margin-top: 2px; }

        /* Trending */
        .lv-trending { background: #fff; border-radius: 12px; padding: 16px; border: .5px solid var(--border); }
        .lv-trend-item { display: flex; align-items: flex-start; gap: 12px; padding: 10px 0; border-bottom: .5px solid #f5f5f5; }
        .lv-trend-item:last-child { border-bottom: none; padding-bottom: 0; }
        .lv-trend-rank { font-family: 'Syne',sans-serif; font-size: 18px; font-weight: 800; color: var(--border); line-height: 1; flex-shrink: 0; width: 20px; }
        .lv-trend-rank.top { color: var(--green); }
        .lv-trend-title { font-family: 'Fraunces',serif; font-size: 12.5px; line-height: 1.35; color: var(--navy); cursor: pointer; transition: color .2s; flex: 1; }
        .lv-trend-title:hover { color: var(--green-dk); }
        .lv-trend-views { font-size: 10px; color: #aaa; margin-top: 3px; }

        /* Alert box */
        .lv-alert { background: #FEF3C7; border-radius: 12px; padding: 16px; border: .5px solid #FCD34D; }
        .lv-alert-label { font-family: 'Syne',sans-serif; font-size: 9px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; color: #92400E; margin-bottom: 8px; display: flex; align-items: center; gap: 5px; }
        .lv-alert-title { font-family: 'Fraunces',serif; font-size: 13.5px; line-height: 1.35; color: #78350F; margin-bottom: 6px; }
        .lv-alert-body { font-size: 11px; color: #92400E; line-height: 1.6; }

        /* Newsletter */
        .lv-cta { background: var(--navy); border-radius: 12px; padding: 18px; }
        .lv-cta-label { font-family: 'Syne',sans-serif; font-size: 9px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; color: var(--green); margin-bottom: 8px; }
        .lv-cta-title { font-family: 'Fraunces',serif; font-size: 15px; line-height: 1.3; color: #fff; margin-bottom: 8px; }
        .lv-cta-desc { font-size: 11px; color: rgba(255,255,255,.4); line-height: 1.6; margin-bottom: 14px; }
        .lv-cta-input { width: 100%; background: rgba(255,255,255,.07); border: .5px solid rgba(255,255,255,.12); border-radius: 7px; padding: 9px 12px; font-size: 12px; color: #fff; font-family: 'DM Sans',sans-serif; outline: none; margin-bottom: 8px; }
        .lv-cta-input::placeholder { color: rgba(255,255,255,.28); }
        .lv-cta-input:focus { border-color: var(--green); }
        .lv-cta-btn { width: 100%; background: var(--green); color: var(--navy); font-family: 'Syne',sans-serif; font-size: 10px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; border: none; border-radius: 7px; padding: 11px; cursor: pointer; transition: opacity .2s; }
        .lv-cta-btn:hover { opacity: .85; }
      `}</style>

      <div className="lv">

        {/* TOP NAV */}
        <div className="lv-topbar">
          <Link href="/" className="lv-topbar-logo">AGRI<span>WIRE</span></Link>
          <div className="lv-topbar-right">
            <Link href="/" className="lv-topbar-link">← Back to Home</Link>
            <Link href="/live" className="lv-topbar-link" style={{ color: 'var(--green)' }}>Live</Link>
            <Link href="/research" className="lv-topbar-link">Research</Link>
            <span className="lv-topbar-time">{liveTime}</span>
          </div>
        </div>

        {/* LIVE HERO */}
        <div className="lv-hero">
          <div className="lv-hero-inner">
            <div className="lv-hero-left">
              <div className="lv-badge-row">
                <div className="lv-live-badge">
                  <span className="lv-live-dot" />
                  <IconRadio /> Live Updates
                </div>
                <span style={{ fontFamily: 'Syne,sans-serif', fontSize: 10, color: 'rgba(255,255,255,.3)', letterSpacing: '.04em' }}>
                  WEDNESDAY, JUNE 3, 2026
                </span>
              </div>
              <h1 className="lv-live-title">Rwanda Science & Policy Feed</h1>
              <p className="lv-live-sub">Real-time coverage of food security, environment & biotechnology events</p>
            </div>
            <div className="lv-hero-stats">
              <div className="lv-stat">
                <div className="lv-stat-num">{pulseCount}</div>
                <div className="lv-stat-label">Reading Now</div>
              </div>
              <div className="lv-stat">
                <div className="lv-stat-num">8</div>
                <div className="lv-stat-label">Updates Today</div>
              </div>
              <div className="lv-stat">
                <div className="lv-stat-num">3</div>
                <div className="lv-stat-label">Live Events</div>
              </div>
            </div>
          </div>
        </div>

        {/* TOPIC FILTER */}
        <div className="lv-filterbar">
          {TOPICS.map(t => (
            <button
              key={t}
              className={`lv-filter-item${activeTopic === t ? ' active' : ''}`}
              onClick={() => setActiveTopic(t)}
            >{t}</button>
          ))}
          <div className="lv-filter-right">
            <span className="lv-filter-dot" />
            <span className="lv-filter-count">Live · {FEED_ITEMS.length} updates</span>
          </div>
        </div>

        <div className="lv-inner">
          <div className="lv-layout">

            {/* MAIN FEED */}
            <div>
              {/* PINNED */}
              <div className="lv-section-hd">
                <span className="lv-section-dot" />
                <span className="lv-section-title">Pinned Story</span>
                <div className="lv-section-meta">
                  <IconClock /> Last updated {PINNED.time}
                </div>
              </div>

              <div className="lv-pinned">
                <div className="lv-pinned-top">
                  <span className="lv-pinned-badge">{PINNED.label}</span>
                  <span className="lv-pinned-pin"><IconPin /> Pinned</span>
                  <span className="lv-pinned-time"><IconClock /> {PINNED.time}</span>
                </div>
                <h2 className="lv-pinned-title">{PINNED.title}</h2>
                <p className="lv-pinned-body">{PINNED.body}</p>
                <div className="lv-pinned-foot">
                  <span className="lv-pinned-author">By {PINNED.author}</span>
                  <div className="lv-pinned-tags">
                    {PINNED.tags.map(tag => <span key={tag} className="lv-tag">{tag}</span>)}
                  </div>
                </div>
              </div>

              {/* LIVE FEED */}
              <div className="lv-section-hd" style={{ marginTop: 24 }}>
                <span className="lv-section-dot" style={{ background: 'var(--red)', animation: 'livepulse 1.2s ease-in-out infinite' }} />
                <span className="lv-section-title">Live Feed</span>
                <div className="lv-section-meta">
                  <span style={{ color: 'var(--red)', fontWeight: 800 }}>● LIVE</span>&nbsp;· Updating continuously
                </div>
              </div>

              <div className="lv-feed">
                {FEED_ITEMS.map((item, i) => {
                  const tb = typeLabel(item.type);
                  return (
                    <div key={item.id} className="lv-feed-item" style={{ animationDelay: `${i * 0.05}s` }}>
                      <div className="lv-feed-time-col">
                        <span className="lv-feed-time">{item.time}</span>
                        {i < FEED_ITEMS.length - 1 && <span className="lv-feed-line" />}
                      </div>
                      <div className="lv-feed-content">
                        <div className="lv-feed-type-row">
                          {typeIcon(item.type)}
                          <span
                            className="lv-type-badge"
                            style={{ background: tb.bg, color: tb.color }}
                          >{tb.label}</span>
                        </div>
                        <p className="lv-feed-title">{item.title}</p>
                        <p className="lv-feed-detail">{item.detail}</p>
                        <div className="lv-feed-actions">
                          <button className="lv-feed-action">Read more</button>
                          <button className="lv-feed-action"><IconShare /> Share</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="lv-sidebar">

              {/* Viewer widget */}
              <div className="lv-viewers">
                <div className="lv-section-hd" style={{ marginBottom: 12 }}>
                  <span className="lv-section-dot" />
                  <span className="lv-section-title">Live Audience</span>
                </div>
                <div className="lv-viewers-num">{pulseCount.toLocaleString()}</div>
                <div className="lv-viewers-label">people reading right now</div>
                <div className="lv-viewers-bar"><div className="lv-viewers-fill" /></div>
                <div className="lv-viewers-stats">
                  <div className="lv-viewers-stat">
                    <div className="lv-viewers-stat-num">1,842</div>
                    <div className="lv-viewers-stat-label">Unique today</div>
                  </div>
                  <div className="lv-viewers-stat">
                    <div className="lv-viewers-stat-num">4:32</div>
                    <div className="lv-viewers-stat-label">Avg. read time</div>
                  </div>
                </div>
              </div>

              {/* Alert */}
              <div className="lv-alert">
                <div className="lv-alert-label">⚠ Active Advisory</div>
                <p className="lv-alert-title">Amber Drought Warning — Eastern Province</p>
                <p className="lv-alert-body">Rwanda Met Agency advises farmers to activate supplementary irrigation. Advisory valid through August 15, 2026.</p>
              </div>

              {/* Trending */}
              <div className="lv-trending">
                <div className="lv-section-hd" style={{ marginBottom: 12 }}>
                  <IconTrending />
                  <span className="lv-section-title">Trending Now</span>
                </div>
                {TRENDING.map(t => (
                  <div key={t.id} className="lv-trend-item">
                    <span className={`lv-trend-rank${t.rank === 1 ? ' top' : ''}`}>0{t.rank}</span>
                    <div>
                      <p className="lv-trend-title">{t.title}</p>
                      <p className="lv-trend-views">{t.views} views</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Newsletter */}
              <div className="lv-cta">
                <p className="lv-cta-label">Live Alerts</p>
                <h4 className="lv-cta-title">Get Breaking Updates by Email</h4>
                <p className="lv-cta-desc">Be first to know when major policy decisions, biosafety rulings, or field alerts are published.</p>
                <input type="email" placeholder="professional@email.rw" className="lv-cta-input" />
                <button className="lv-cta-btn">Subscribe to Alerts</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}