"use client";

import React, { useState } from "react";

const NAV_ITEMS = ["Crops", "Livestock", "Tech", "Water", "Markets", "Policy", "Data Maps"];
const SUB_ITEMS = ["Precision Ag", "Irrigation", "Seed Science", "Supply Chain"];

const FEATURED = [
  { ph: "ph-1", tag: "Precision Ag", tagColor: "#70C113", title: "Satellite Soil Mapping Now Covers 14 Million Hectares Across East Africa", author: "Amara Diallo", date: "June 2, 2026", span: true },
  { ph: "ph-2", tag: "Water", tagColor: "#E8A020", title: "Solar Drip Irrigation Kits Cut Water Use by 60% in Sahel Trials", author: "Kofi Mensah", date: "June 1, 2026" },
  { ph: "ph-3", tag: "Markets", tagColor: "#70C113", title: "Mobile Commodity Exchange Reaches 80,000 Smallholders", author: "Fatima Osei", date: "May 30, 2026" },
  { ph: "ph-4", tag: "Seed Science", tagColor: "#E8A020", title: "Drought-Tolerant Sorghum Variety Released for Semi-Arid Zones", author: "Amara Diallo", date: "May 29, 2026" },
];

const ARTICLES = [
  { ph: "ph-5", tag: "Precision Ag", title: "AI-Powered Pest Detection Deployed Across 3,000 Farms in Ghana", author: "Kofi Mensah", date: "May 28, 2026", wide: false },
  { ph: "ph-2", tag: "Irrigation", title: "Sensor Networks Monitor Reservoir Levels in Real Time Across Rwanda", author: "Amara Diallo", date: "May 27, 2026", wide: false },
  { ph: "ph-7", tag: "Seed Science", title: "New Open-Source Crop Genome Database Targets Sub-Saharan Staples", author: "Fatima Osei", date: "May 26, 2026", wide: false },
  { ph: "ph-6", tag: "Supply Chain", title: "Cold Chain Startup Raises $9M to Reduce Post-Harvest Losses in Nigeria", author: "Kofi Mensah", date: "May 25, 2026", wide: false },
  { ph: "ph-1", tag: "Tech", title: "Drone Seeding Pilots Show 40% Time Reduction for Rice Paddies in Tanzania", author: "Amara Diallo", date: "May 24, 2026", wide: true },
  { ph: "ph-8", tag: "Markets", title: "Blockchain-Based Grain Traceability Pilot Scales to Five Countries", author: "Fatima Osei", date: "May 23, 2026", wide: true },
];

const EDITOR_PICKS = [
  { label: "New", title: "Top 10 Agri-Tech Startups to Watch in East Africa 2026", author: "Kofi Mensah", date: "May 28, 2026" },
  { label: null, title: "How Regenerative Farming is Transforming Soil Health in the Sahel", author: "Amara Diallo", date: "May 25, 2026" },
  { label: null, title: "Climate-Smart Agriculture: What the Data Says for 2026 Harvests", author: "Fatima Osei", date: "May 22, 2026" },
];

const FOOTER_NEWS = [
  { ph: "ph-5", title: "IFAD Allocates $200M for Smallholder Resilience Fund", date: "June 1, 2026" },
  { ph: "ph-3", title: "Fertilizer Shortage Eases as Regional Supply Chains Stabilise", date: "May 30, 2026" },
  { ph: "ph-8", title: "25 Most Productive Farming Regions in Sub-Saharan Africa", date: "May 28, 2026" },
];

const CATEGORIES = [
  ["Precision Agriculture", 24], ["Water & Irrigation", 18], ["Crop Science", 15],
  ["Market Access", 12], ["Climate Resilience", 11], ["Policy & Finance", 9],
];

const PH_COLORS: Record<string, [string, string]> = {
  "ph-1": ["#2d6a1f", "#4d9e35"],
  "ph-2": ["#1a4d6b", "#2980b9"],
  "ph-3": ["#7d4e1a", "#c47c2d"],
  "ph-4": ["#3d1f6b", "#7b4ec2"],
  "ph-5": ["#1a5c3b", "#27ae60"],
  "ph-6": ["#6b1a1a", "#c0392b"],
  "ph-7": ["#2c4a1a", "#5d8a2f"],
  "ph-8": ["#1a3a5c", "#2471a3"],
};

function Placeholder({ ph, style = {} }: { ph: string; style?: React.CSSProperties }) {
  const [a, b] = PH_COLORS[ph] || ["#333", "#555"];
  return (
    <div
      style={{
        background: `linear-gradient(135deg,${a},${b})`,
        width: "100%",
        ...style,
      }}
    />
  );
}

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
      <div style={{ width: 44, height: 44, background: "#032B53", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <path d="M13 3C13 3 8 8 8 14C8 17 10 19.5 13 20.5C16 19.5 18 17 18 14C18 8 13 3 13 3Z" fill="#70C113" />
          <path d="M13 20.5L13 24" stroke="#70C113" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M10 12C10 12 7 11 5 13" stroke="#70C113" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M16 11C16 11 19 10 21 12" stroke="#70C113" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
      <div>
        <div style={{ fontFamily: "'Georgia', serif", fontSize: 20, fontWeight: 900, color: "#032B53", letterSpacing: -0.5, lineHeight: 1 }}>Food Security Hub</div>
        <div style={{ fontSize: 9, color: "#70C113", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginTop: 2 }}>Sub-Saharan Intelligence</div>
      </div>
    </div>
  );
}

type FeaturedCard = {
  ph: string;
  tag: string;
  tagColor: string;
  title: string;
  author: string;
  date: string;
  span?: boolean;
};

function FeatCard({ card }: { card: FeaturedCard }) {
  return (
    <div style={{ position: "relative", overflow: "hidden", cursor: "pointer", ...(card.span ? { gridColumn: "span 2", gridRow: "span 2" } : {}) }}>
      <Placeholder ph={card.ph} style={{ height: "100%", minHeight: card.span ? "100%" : 130 }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent,rgba(3,43,83,.92))", padding: 12 }}>
        <div style={{ display: "inline-block", background: card.tagColor, color: "#fff", fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "2px 7px", borderRadius: 2, marginBottom: 5 }}>{card.tag}</div>
        <div style={{ fontFamily: "'Georgia', serif", color: "#fff", fontSize: card.span ? 20 : 13, fontWeight: 700, lineHeight: 1.3 }}>{card.title}</div>
        <div style={{ color: "rgba(255,255,255,.65)", fontSize: 10, marginTop: 4 }}>{card.author} · {card.date}</div>
      </div>
    </div>
  );
}

type Article = {
  ph: string;
  tag: string;
  title: string;
  author: string;
  date: string;
  wide: boolean;
};

function ArtCard({ art }: { art: Article }) {
  const [hovered, setHovered] = useState(false);
  if (art.wide) {
    return (
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 12, gridColumn: "span 2", cursor: "pointer", background: "#fff" }}
      >
        <Placeholder ph={art.ph} style={{ height: 120, borderRadius: 2 }} />
        <div style={{ padding: "4px 0" }}>
          <TagPill tag={art.tag} />
          <div style={{ fontFamily: "'Georgia', serif", fontSize: 14, fontWeight: 600, lineHeight: 1.4, color: hovered ? "#70C113" : "#1a1a1a", marginBottom: 5 }}>{art.title}</div>
          <Meta author={art.author} date={art.date} />
        </div>
      </div>
    );
  }
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "pointer", background: "#fff" }}
    >
      <Placeholder ph={art.ph} style={{ height: 130, borderRadius: 2, marginBottom: 8 }} />
      <TagPill tag={art.tag} />
      <div style={{ fontFamily: "'Georgia', serif", fontSize: 14, fontWeight: 600, lineHeight: 1.4, color: hovered ? "#70C113" : "#1a1a1a", marginBottom: 5 }}>{art.title}</div>
      <Meta author={art.author} date={art.date} />
    </div>
  );
}

function TagPill({ tag }: { tag: string }) {
  return (
    <div style={{ display: "inline-block", background: "#f5f3ee", color: "#70C113", fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "2px 7px", borderRadius: 2, marginBottom: 5, border: "1px solid #70C113" }}>{tag}</div>
  );
}

function Meta({ author, date }: { author: string; date: string }) {
  return (
    <div style={{ fontSize: 11, color: "#666", display: "flex", alignItems: "center", gap: 6 }}>
      <span>{author}</span>
      <span style={{ color: "#e0ddd6" }}>·</span>
      <span>{date}</span>
      <span style={{ background: "#f5f3ee", color: "#888", border: "1px solid #e0ddd6", fontSize: 10, padding: "1px 6px", borderRadius: 2, marginLeft: "auto" }}>0</span>
    </div>
  );
}

export default function FoodSecurityPage() {
  const [activeNav, setActiveNav] = useState("Tech");
  const [activeSub, setActiveSub] = useState("Precision Ag");

  return (
    <div style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", background: "#f5f3ee", color: "#1a1a1a", fontSize: 14, lineHeight: 1.5 }}>

      {/* TOP BAR */}
      <div style={{ background: "#032B53", color: "#fff", fontSize: 11, padding: "6px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ opacity: 0.7 }}>Wednesday, June 3, 2026</span>
        <div style={{ display: "flex", gap: 14 }}>
          {["Sign In / Join", "Newsletter", "Contact", "Field Reports"].map(l => (
            <a key={l} href="#" style={{ color: "rgba(255,255,255,.7)", fontSize: 11, textDecoration: "none" }}>{l}</a>
          ))}
        </div>
      </div>

      {/* HEADER */}
      <div style={{ background: "#fff", padding: "12px 20px", display: "flex", alignItems: "center", gap: 20, borderBottom: "1px solid #e0ddd6" }}>
        <Logo />
        <div style={{ flex: 1, background: "#f0f4f8", border: "1px dashed #c0cfd8", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", height: 60, color: "#aaa", fontSize: 11 }}>
          728 × 90 — Sponsor Banner
        </div>
        <a href="#" style={{ background: "#70C113", color: "#fff", padding: "8px 18px", borderRadius: 4, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", textDecoration: "none" }}>Subscribe →</a>
      </div>

      {/* MAIN NAV */}
      <div style={{ background: "#032B53", padding: "0 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {NAV_ITEMS.map(item => (
            <div
              key={item}
              onClick={() => setActiveNav(item)}
              style={{ color: activeNav === item ? "#fff" : "rgba(255,255,255,.85)", fontSize: 12, fontWeight: 500, padding: "11px 13px", cursor: "pointer", background: activeNav === item ? "#70C113" : "transparent" }}
            >
              {item}
            </div>
          ))}
          <div style={{ marginLeft: "auto", color: "rgba(255,255,255,.7)", padding: "11px 8px", cursor: "pointer" }}>⌕</div>
        </div>
      </div>

      {/* SUB NAV */}
      <div style={{ background: "#fff", borderBottom: "2px solid #70C113", padding: "0 20px", display: "flex", alignItems: "center" }}>
        {SUB_ITEMS.map(item => (
          <div
            key={item}
            onClick={() => setActiveSub(item)}
            style={{ fontSize: 11, fontWeight: 700, color: activeSub === item ? "#70C113" : "#666", padding: "9px 14px", cursor: "pointer", letterSpacing: 0.3, textTransform: "uppercase", borderBottom: activeSub === item ? "2px solid #70C113" : "2px solid transparent", marginBottom: -2 }}
          >
            {item}
          </div>
        ))}
        <div style={{ marginLeft: "auto", fontSize: 11, color: "#666" }}>Latest ▾</div>
      </div>

      {/* PAGE BODY */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: 20 }}>

        {/* FEATURED */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#70C113", borderLeft: "3px solid #70C113", paddingLeft: 8, marginBottom: 12 }}>Featured Stories</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "130px 130px", gap: 2 }}>
            {FEATURED.map((card, i) => <FeatCard key={i} card={card} />)}
          </div>
        </div>

        {/* CONTENT + SIDEBAR */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 24 }}>

          {/* MAIN */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, paddingBottom: 8, borderBottom: "2px solid #032B53" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#032B53", textTransform: "uppercase", letterSpacing: 0.5 }}>Agricultural Tech</div>
              <div style={{ fontSize: 11, color: "#888" }}>Home › <span style={{ color: "#70C113" }}>Tech</span></div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {ARTICLES.map((art, i) => <ArtCard key={i} art={art} />)}
            </div>

            {/* PAGINATION */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 20 }}>
              {[1, 2, "›"].map((p, i) => (
                <div key={i} style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #e0ddd6", borderRadius: 2, fontSize: 12, fontWeight: 600, cursor: "pointer", background: p === 1 ? "#70C113" : "#fff", color: p === 1 ? "#fff" : "#666" }}>{p}</div>
              ))}
              <div style={{ marginLeft: "auto", fontSize: 11, color: "#888" }}>Page 1 of 2</div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div>

            {/* SOCIAL */}
            <div style={{ background: "#fff", padding: 14, border: "1px solid #e0ddd6", marginBottom: 16 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", background: "#032B53", color: "#fff", padding: "6px 10px", margin: "-14px -14px 12px -14px" }}>Stay Connected</div>
              {[
                { bg: "#3b5998", label: "f", count: "1,240", action: "FOLLOW" },
                { bg: "#1da1f2", label: "𝕏", count: "5,830", action: "FOLLOW" },
                { bg: "#ff0000", label: "▶", count: "18,400", action: "SUBSCRIBE" },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, background: s.bg, color: "#fff", borderRadius: 3, padding: "7px 10px", fontSize: 12, fontWeight: 600, marginBottom: 6, cursor: "pointer" }}>
                  <span>{s.label}</span>
                  <div><div style={{ fontSize: 13, fontWeight: 700 }}>{s.count}</div><div style={{ fontSize: 9, opacity: 0.8 }}>Followers</div></div>
                  <div style={{ marginLeft: "auto", fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>{s.action}</div>
                </div>
              ))}
            </div>

            {/* AD */}
            <div style={{ background: "#f0f4f0", border: "1px solid #c8ddb8", display: "flex", flexDirection: "column", alignItems: "center", padding: 16, textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 9, color: "#70C113", letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>Field Intelligence</div>
              <div style={{ fontFamily: "'Georgia', serif", color: "#70C113", fontSize: 22, fontWeight: 900, lineHeight: 1 }}>Harvest<br />Data</div>
              <div style={{ fontSize: 9, color: "#888", margin: "6px 0 8px" }}>300 × 250 — Premium crop analytics for decision makers</div>
              <div style={{ background: "#032B53", color: "#fff", fontSize: 10, fontWeight: 700, padding: "4px 12px", borderRadius: 2, letterSpacing: 1 }}>TRY NOW · FSH PRO</div>
            </div>

            {/* EDITOR PICKS */}
            <div style={{ background: "#fff", padding: 14, border: "1px solid #e0ddd6" }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", background: "#E8A020", color: "#fff", padding: "6px 10px", margin: "-14px -14px 12px -14px" }}>Editor Picks</div>
              {EDITOR_PICKS.map((ep, i) => (
                <div key={i} style={{ padding: "10px 0", borderBottom: i < EDITOR_PICKS.length - 1 ? "1px solid #e0ddd6" : "none", cursor: "pointer" }}>
                  <div style={{ fontFamily: "'Georgia', serif", fontSize: 13, fontWeight: 600, lineHeight: 1.35, color: "#1a1a1a", marginBottom: 3 }}>
                    {ep.label && <span style={{ display: "inline-block", background: "#E8A020", color: "#fff", fontSize: 8, fontWeight: 700, padding: "1px 5px", borderRadius: 2, textTransform: "uppercase", marginRight: 4 }}>{ep.label}</span>}
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
      <div style={{ background: "#032B53", color: "rgba(255,255,255,.8)", marginTop: 32, padding: "28px 20px 16px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: 32, marginBottom: 20 }}>
          <div>
            <div style={{ fontFamily: "'Georgia', serif", color: "#fff", fontSize: 18, fontWeight: 900, marginBottom: 8 }}>Food Security Hub</div>
            <div style={{ fontSize: 11, lineHeight: 1.7, color: "rgba(255,255,255,.6)", marginBottom: 10 }}>Your source for agricultural technology, harvest data metrics, and crop resilience systems across sub-Saharan Africa. Covering innovations that feed the continent.</div>
            <div style={{ fontSize: 11 }}>Contact: <a href="#" style={{ color: "#70C113", textDecoration: "none" }}>editors@foodsecurityhub.org</a></div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              {["f", "𝕏", "in", "▶"].map((s, i) => (
                <a key={i} href="#" style={{ width: 26, height: 26, background: "rgba(255,255,255,.12)", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "rgba(255,255,255,.7)", textDecoration: "none" }}>{s}</a>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#fff", marginBottom: 10 }}>More Field News</div>
            {FOOTER_NEWS.map((n, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10, cursor: "pointer" }}>
                <Placeholder ph={n.ph} style={{ width: 54, height: 40, borderRadius: 2, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 11, fontWeight: 500, lineHeight: 1.4, color: "rgba(255,255,255,.8)" }}>{n.title}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)", marginTop: 2 }}>{n.date}</div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#fff", marginBottom: 10 }}>Popular Categories</div>
            {CATEGORIES.map(([name, count], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid rgba(255,255,255,.08)", fontSize: 11 }}>
                <span>{name}</span>
                <span style={{ background: "rgba(255,255,255,.15)", padding: "1px 6px", borderRadius: 2, fontSize: 10 }}>{count}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ maxWidth: 960, margin: "0 auto", paddingTop: 14, borderTop: "1px solid rgba(255,255,255,.1)", display: "flex", justifyContent: "space-between", fontSize: 10, color: "rgba(255,255,255,.4)" }}>
          <span>© 2026 Food Security Hub · Sub-Saharan Intelligence</span>
          <div style={{ display: "flex", gap: 14 }}>
            {["Disclaimer", "Privacy", "Advertise", "Contact Us"].map(l => (
              <a key={l} href="#" style={{ color: "rgba(255,255,255,.4)", textDecoration: "none" }}>{l}</a>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}