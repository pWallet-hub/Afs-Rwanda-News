"use client";

import React, { useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_ITEMS = ["Weather", "Emissions", "Ecology", "Oceans", "Policy", "Energy", "Data Maps"];
const SUB_ITEMS = ["Extreme Events", "Emissions Data", "Biodiversity"];

const HERO = [
  {
    ph: "ph-1",
    tag: "Extreme Events",
    title: "Record-Breaking Heat Domes Now Occurring Five Times More Frequently",
    author: "Dr. Lena Marsh",
    date: "June 2, 2026",
    large: true,
  },
  {
    ph: "ph-2",
    tag: "Oceans",
    title: "Atlantic Circulation Slowdown Confirmed by New Deep-Sea Sensor Array",
    author: "Ravi Okonjo",
    date: "June 1, 2026",
    large: true,
  },
];

const SECONDARY = [
  { ph: "ph-3", tag: "Emissions", title: "Global CO₂ Hits 430 ppm — Third Consecutive Record Year", author: "Lena Marsh", date: "May 30, 2026" },
  { ph: "ph-4", tag: "Ecology", title: "Amazon Tipping Point Risk Rises as Dry-Season Fires Expand", author: "Ravi Okonjo", date: "May 29, 2026" },
  { ph: "ph-5", tag: "Policy", title: "G20 Nations Miss 2025 Emissions Targets, New Data Shows", author: "Sia Addo", date: "May 28, 2026" },
];

const ARTICLES = [
  { ph: "ph-6", tag: "Weather", title: "Monsoon Season Arrives Six Weeks Early Across South Asia", author: "Sia Addo", date: "May 27, 2026", wide: false },
  { ph: "ph-7", tag: "Energy", title: "Solar Capacity Surpasses Coal Globally for First Time in History", author: "Lena Marsh", date: "May 27, 2026", wide: false },
  { ph: "ph-8", tag: "Ecology", title: "Coral Bleaching Now Affects 85% of Great Barrier Reef Survey Sites", author: "Ravi Okonjo", date: "May 26, 2026", wide: false },
  { ph: "ph-1", tag: "Emissions", title: "Methane Leaks From Permafrost Accelerating Faster Than Models Predicted", author: "Sia Addo", date: "May 25, 2026", wide: false },
  { ph: "ph-2", tag: "Policy", title: "UN Climate Fund Pledges $300B for Adaptation in Vulnerable Nations", author: "Lena Marsh", date: "May 24, 2026", wide: true },
  { ph: "ph-4", tag: "Weather", title: "Category 6 Hurricane Classification Officially Adopted by WMO", author: "Ravi Okonjo", date: "May 23, 2026", wide: true },
];

const EDITOR_PICKS = [
  { hot: true, title: "10 Most Climate-Vulnerable Cities by 2040 — Full Report", author: "Sia Addo", date: "May 28, 2026" },
  { hot: false, title: "How Carbon Capture Failed to Scale and What Comes Next", author: "Lena Marsh", date: "May 25, 2026" },
  { hot: false, title: "The Real Cost of Inaction: Economic Models for 3°C Warming", author: "Ravi Okonjo", date: "May 22, 2026" },
];

const FOOTER_NEWS = [
  { ph: "ph-3", title: "Greenland Ice Sheet Loses Record Volume in 2025 Melt Season", date: "June 1, 2026" },
  { ph: "ph-6", title: "Wildfire Season Expands to Year-Round in Western North America", date: "May 30, 2026" },
  { ph: "ph-8", title: "25 Nations Declare Climate Emergency in Joint UN Declaration", date: "May 28, 2026" },
];

const CATEGORIES = [
  ["Extreme Weather", 31],
  ["Emissions & Carbon", 24],
  ["Ocean Systems", 17],
  ["Biodiversity", 14],
  ["Energy Transition", 12],
  ["Climate Policy", 10],
];

// ─── Placeholder colours ──────────────────────────────────────────────────────

const PH: Record<string, [string, string]> = {
  "ph-1": ["#1a3a5c", "#1a6b8a"],
  "ph-2": ["#0d4d3a", "#157a5e"],
  "ph-3": ["#4a2a0a", "#a05a1a"],
  "ph-4": ["#1a3a1a", "#2e7d32"],
  "ph-5": ["#3a1a4a", "#6a3a8a"],
  "ph-6": ["#4a1a1a", "#b03020"],
  "ph-7": ["#1a3a5c", "#2060a0"],
  "ph-8": ["#1a4a3a", "#0e7c5c"],
};

// ─── Tiny components ─────────────────────────────────────────────────────────

function Bg({ ph, style = {} }: { ph: string; style?: React.CSSProperties }) {
  const [a, b] = PH[ph] ?? ["#333", "#555"];
  return <div style={{ background: `linear-gradient(135deg,${a},${b})`, width: "100%", ...style }} />;
}

function Tag({ label, color = ACC }: { label: string; color?: string }) {
  return (
    <span style={{ display: "inline-block", background: color, color: "#fff", fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" as const, padding: "2px 7px", borderRadius: 2, marginBottom: 5 }}>
      {label}
    </span>
  );
}

function Meta({ author, date }: { author: string; date: string }) {
  return (
    <div style={{ fontSize: 11, color: "#666", display: "flex", alignItems: "center", gap: 6 }}>
      <span>{author}</span>
      <span style={{ color: "#ddd" }}>·</span>
      <span>{date}</span>
      <span style={{ background: "#f4f2ed", color: "#999", border: "1px solid #ddd", fontSize: 10, padding: "1px 6px", borderRadius: 2, marginLeft: "auto" }}>0</span>
    </div>
  );
}

// ─── Brand colours ────────────────────────────────────────────────────────────

const NAV_BG = "#0d2137";
const ACC = "#E8A020";   // amber — urgency / climate warning
const ACC2 = "#1a7a5e";  // teal — ecology / hope

// ─── Logo ─────────────────────────────────────────────────────────────────────

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
      <div style={{ width: 44, height: 44, background: NAV_BG, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <circle cx="13" cy="13" r="8" stroke={ACC} strokeWidth="1.5" fill="none" />
          <path d="M13 5 Q17 10 13 13 Q9 16 13 21" stroke={ACC} strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <path d="M5 13 Q10 9 13 13 Q16 17 21 13" stroke={ACC2} strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <circle cx="13" cy="13" r="2" fill={ACC} />
        </svg>
      </div>
      <div>
        <div style={{ fontFamily: "'Georgia', serif", fontSize: 19, fontWeight: 900, color: NAV_BG, letterSpacing: -0.5, lineHeight: 1 }}>
          Climate Change Tracker
        </div>
        <div style={{ fontSize: 9, color: ACC, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" as const, marginTop: 2 }}>
          Global Emissions &amp; Ecology Intelligence
        </div>
      </div>
    </div>
  );
}

// ─── Hero card ────────────────────────────────────────────────────────────────

function HeroCard({ card }: { card: typeof HERO[0] }) {
  return (
    <div style={{ position: "relative", overflow: "hidden", cursor: "pointer", flex: 1, minHeight: 220 }}>
      <Bg ph={card.ph} style={{ position: "absolute", inset: 0 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 30%,rgba(13,33,55,.93))", padding: 14, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <Tag label={card.tag} color={ACC} />
        <div style={{ fontFamily: "'Georgia', serif", color: "#fff", fontSize: 18, fontWeight: 700, lineHeight: 1.3, marginBottom: 6 }}>{card.title}</div>
        <div style={{ color: "rgba(255,255,255,.6)", fontSize: 10 }}>{card.author} · {card.date}</div>
        <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,.35)", color: "#fff", fontSize: 10, padding: "2px 6px", borderRadius: 2 }}>0</div>
      </div>
    </div>
  );
}

// ─── Secondary card ───────────────────────────────────────────────────────────

function SecCard({ card }: { card: typeof SECONDARY[0] }) {
  return (
    <div style={{ position: "relative", overflow: "hidden", cursor: "pointer", flex: 1 }}>
      <Bg ph={card.ph} style={{ height: 110 }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 110, background: "linear-gradient(transparent 20%,rgba(13,33,55,.88))", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "10px 10px 8px" }}>
        <Tag label={card.tag} color={ACC2} />
        <div style={{ fontFamily: "'Georgia', serif", color: "#fff", fontSize: 12, fontWeight: 700, lineHeight: 1.3 }}>{card.title}</div>
        <div style={{ color: "rgba(255,255,255,.55)", fontSize: 10, marginTop: 3 }}>{card.author} · {card.date}</div>
      </div>
    </div>
  );
}

// ─── Article card ─────────────────────────────────────────────────────────────

function ArtCard({ art }: { art: typeof ARTICLES[0] }) {
  const [hov, setHov] = useState(false);

  if (art.wide) {
    return (
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 12, gridColumn: "span 2", cursor: "pointer" }}
      >
        <Bg ph={art.ph} style={{ height: 110, borderRadius: 2 }} />
        <div>
          <Tag label={art.tag} color={ACC} />
          <div style={{ fontFamily: "'Georgia', serif", fontSize: 14, fontWeight: 600, lineHeight: 1.4, color: hov ? ACC : "#1a1a1a", marginBottom: 6 }}>{art.title}</div>
          <Meta author={art.author} date={art.date} />
        </div>
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ cursor: "pointer" }}
    >
      <Bg ph={art.ph} style={{ height: 130, borderRadius: 2, marginBottom: 8 }} />
      <Tag label={art.tag} color={ACC} />
      <div style={{ fontFamily: "'Georgia', serif", fontSize: 14, fontWeight: 600, lineHeight: 1.4, color: hov ? ACC : "#1a1a1a", marginBottom: 5 }}>{art.title}</div>
      <Meta author={art.author} date={art.date} />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ClimateChangePage() {
  const [activeNav, setActiveNav] = useState("Emissions");
  const [activeSub, setActiveSub] = useState("Extreme Events");

  return (
    <div style={{ fontFamily: "'DM Sans','Helvetica Neue',sans-serif", background: "#f4f2ed", color: "#1a1a1a", fontSize: 14, lineHeight: 1.5 }}>

      {/* TOP BAR */}
      <div style={{ background: NAV_BG, color: "#fff", fontSize: 11, padding: "6px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ opacity: 0.65 }}>Wednesday, June 3, 2026</span>
        <div style={{ display: "flex", gap: 14 }}>
          {["Sign In / Join", "Newsletter", "Contact", "Field Reports"].map(l => (
            <a key={l} href="#" style={{ color: "rgba(255,255,255,.65)", fontSize: 11, textDecoration: "none" }}>{l}</a>
          ))}
        </div>
      </div>

      {/* HEADER */}
      <div style={{ background: "#fff", padding: "12px 20px", display: "flex", alignItems: "center", gap: 20, borderBottom: "1px solid #e0ddd6" }}>
        <Logo />
        <div style={{ flex: 1, background: "#f0f4f8", border: "1px dashed #c0cfd8", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", height: 60, color: "#aaa", fontSize: 11 }}>
          728 × 90 — Sponsor Banner
        </div>
        <a href="#" style={{ background: ACC, color: "#fff", padding: "8px 18px", borderRadius: 4, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", textDecoration: "none" }}>
          Subscribe →
        </a>
      </div>

      {/* MAIN NAV */}
      <div style={{ background: NAV_BG, padding: "0 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {NAV_ITEMS.map(item => (
            <div
              key={item}
              onClick={() => setActiveNav(item)}
              style={{ color: activeNav === item ? "#fff" : "rgba(255,255,255,.8)", fontSize: 12, fontWeight: 500, padding: "11px 13px", cursor: "pointer", background: activeNav === item ? ACC : "transparent", transition: "background .15s" }}
            >
              {item}
            </div>
          ))}
          <div style={{ marginLeft: "auto", color: "rgba(255,255,255,.6)", padding: "11px 8px", cursor: "pointer" }}>⌕</div>
        </div>
      </div>

      {/* SUB NAV */}
      <div style={{ background: "#fff", borderBottom: `2px solid ${ACC}`, padding: "0 20px", display: "flex", alignItems: "center" }}>
        {SUB_ITEMS.map(item => (
          <div
            key={item}
            onClick={() => setActiveSub(item)}
            style={{ fontSize: 11, fontWeight: 700, color: activeSub === item ? ACC : "#666", padding: "9px 14px", cursor: "pointer", letterSpacing: 0.3, textTransform: "uppercase" as const, borderBottom: activeSub === item ? `2px solid ${ACC}` : "2px solid transparent", marginBottom: -2 }}
          >
            {item}
          </div>
        ))}
        <div style={{ marginLeft: "auto", fontSize: 11, color: "#888" }}>Latest ▾</div>
      </div>

      {/* PAGE BODY */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: 20 }}>

        {/* HERO STRIP — two large cards side by side */}
        <div style={{ display: "flex", gap: 3, marginBottom: 3, height: 260 }}>
          {HERO.map((card, i) => <HeroCard key={i} card={card} />)}
        </div>

        {/* SECONDARY STRIP — three cards */}
        <div style={{ display: "flex", gap: 3, marginBottom: 24 }}>
          {SECONDARY.map((card, i) => <SecCard key={i} card={card} />)}
        </div>

        {/* CONTENT + SIDEBAR */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 24 }}>

          {/* MAIN ARTICLES */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, paddingBottom: 8, borderBottom: `2px solid ${NAV_BG}` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: NAV_BG, textTransform: "uppercase" as const, letterSpacing: 0.5 }}>Climate Reports</div>
              <div style={{ fontSize: 11, color: "#888" }}>Home › <span style={{ color: ACC }}>Emissions</span></div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {ARTICLES.map((art, i) => <ArtCard key={i} art={art} />)}
            </div>

            {/* PAGINATION */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 24 }}>
              {[1, 2, "›"].map((p, i) => (
                <div key={i} style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #ddd", borderRadius: 2, fontSize: 12, fontWeight: 600, cursor: "pointer", background: p === 1 ? ACC : "#fff", color: p === 1 ? "#fff" : "#666" }}>{p}</div>
              ))}
              <div style={{ marginLeft: "auto", fontSize: 11, color: "#888" }}>Page 1 of 2</div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div>

            {/* STAY CONNECTED */}
            <div style={{ background: "#fff", padding: 14, border: "1px solid #e0ddd6", marginBottom: 16 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" as const, background: NAV_BG, color: "#fff", padding: "6px 10px", margin: "-14px -14px 12px -14px" }}>
                Stay Connected
              </div>
              {[
                { bg: "#3b5998", icon: "f", count: "4,210", action: "FOLLOW" },
                { bg: "#1da1f2", icon: "𝕏", count: "9,340", action: "FOLLOW" },
                { bg: "#ff0000", icon: "▶", count: "31,800", action: "SUBSCRIBE" },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, background: s.bg, color: "#fff", borderRadius: 3, padding: "7px 10px", fontSize: 12, fontWeight: 600, marginBottom: 6, cursor: "pointer" }}>
                  <span>{s.icon}</span>
                  <div><div style={{ fontSize: 13, fontWeight: 700 }}>{s.count}</div><div style={{ fontSize: 9, opacity: 0.8 }}>Followers</div></div>
                  <div style={{ marginLeft: "auto", fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>{s.action}</div>
                </div>
              ))}
            </div>

            {/* STAT TILES */}
            <div style={{ background: "#fff", padding: 14, border: "1px solid #e0ddd6", marginBottom: 16 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" as const, background: ACC2, color: "#fff", padding: "6px 10px", margin: "-14px -14px 12px -14px" }}>
                Key Metrics 2026
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  { val: "430", unit: "ppm", label: "Atm. CO₂" },
                  { val: "+1.6°", unit: "C", label: "Warming vs. 1850" },
                  { val: "3.7mm", unit: "/yr", label: "Sea-level rise" },
                  { val: "84%", unit: "", label: "Glacier retreat" },
                ].map((m, i) => (
                  <div key={i} style={{ background: "#f4f2ed", borderRadius: 4, padding: "8px 10px" }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: i < 2 ? "#b03020" : NAV_BG, lineHeight: 1 }}>{m.val}<span style={{ fontSize: 11, fontWeight: 500 }}>{m.unit}</span></div>
                    <div style={{ fontSize: 10, color: "#777", marginTop: 2 }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* EDITOR PICKS */}
            <div style={{ background: "#fff", padding: 14, border: "1px solid #e0ddd6" }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" as const, background: ACC, color: "#fff", padding: "6px 10px", margin: "-14px -14px 12px -14px" }}>
                Editor Picks
              </div>
              {EDITOR_PICKS.map((ep, i) => (
                <div key={i} style={{ padding: "10px 0", borderBottom: i < EDITOR_PICKS.length - 1 ? "1px solid #e8e5de" : "none", cursor: "pointer" }}>
                  <div style={{ fontFamily: "'Georgia', serif", fontSize: 13, fontWeight: 600, lineHeight: 1.35, color: "#1a1a1a", marginBottom: 3 }}>
                    {ep.hot && (
                      <span style={{ display: "inline-block", background: "#b03020", color: "#fff", fontSize: 8, fontWeight: 700, padding: "1px 5px", borderRadius: 2, textTransform: "uppercase" as const, marginRight: 4 }}>Hot</span>
                    )}
                    {ep.title}
                  </div>
                  <div style={{ fontSize: 10, color: "#888" }}>{ep.author} · {ep.date}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: NAV_BG, color: "rgba(255,255,255,.8)", marginTop: 32, padding: "28px 20px 16px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: 32, marginBottom: 20 }}>

          <div>
            <div style={{ fontFamily: "'Georgia', serif", color: "#fff", fontSize: 18, fontWeight: 900, marginBottom: 8 }}>Climate Change Tracker</div>
            <div style={{ fontSize: 11, lineHeight: 1.7, color: "rgba(255,255,255,.55)", marginBottom: 10 }}>
              Direct data reports on weather pattern fluctuations, emissions adjustments, and ecological strategies — built for scientists, policymakers, and concerned citizens.
            </div>
            <div style={{ fontSize: 11 }}>Contact: <a href="#" style={{ color: ACC, textDecoration: "none" }}>editors@climatetracker.org</a></div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              {["f", "𝕏", "in", "▶"].map((s, i) => (
                <a key={i} href="#" style={{ width: 26, height: 26, background: "rgba(255,255,255,.12)", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "rgba(255,255,255,.7)", textDecoration: "none" }}>{s}</a>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" as const, color: "#fff", marginBottom: 10 }}>Field Dispatches</div>
            {FOOTER_NEWS.map((n, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10, cursor: "pointer" }}>
                <Bg ph={n.ph} style={{ width: 54, height: 40, borderRadius: 2, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 11, fontWeight: 500, lineHeight: 1.4, color: "rgba(255,255,255,.8)" }}>{n.title}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,.38)", marginTop: 2 }}>{n.date}</div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" as const, color: "#fff", marginBottom: 10 }}>Popular Categories</div>
            {CATEGORIES.map(([name, count], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid rgba(255,255,255,.08)", fontSize: 11 }}>
                <span>{name}</span>
                <span style={{ background: "rgba(255,255,255,.14)", padding: "1px 6px", borderRadius: 2, fontSize: 10 }}>{count}</span>
              </div>
            ))}
          </div>

        </div>

        <div style={{ maxWidth: 960, margin: "0 auto", paddingTop: 14, borderTop: "1px solid rgba(255,255,255,.1)", display: "flex", justifyContent: "space-between", fontSize: 10, color: "rgba(255,255,255,.38)" }}>
          <span>© 2026 Climate Change Tracker · Global Emissions &amp; Ecology Intelligence</span>
          <div style={{ display: "flex", gap: 14 }}>
            {["Disclaimer", "Privacy", "Advertise", "Contact Us"].map(l => (
              <a key={l} href="#" style={{ color: "rgba(255,255,255,.38)", textDecoration: "none" }}>{l}</a>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}