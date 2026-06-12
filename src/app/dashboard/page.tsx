"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import {
  IconArticle,
  IconUsers,
  IconEye,
  IconClock,
  IconTrendingUp,
  IconArrowUpRight,
  IconCircleCheck,
  IconAlertCircle,
  IconEdit,
} from "@tabler/icons-react";

// ── Types ──────────────────────────────────────────────────────────────────
interface StatCard {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ElementType;
  accent: string;
}

interface Article {
  id: string;
  title: string;
  author: string;
  category: string;
  status: "published" | "pending" | "draft";
  date: string;
}

interface Activity {
  id: string;
  type: "publish" | "submit" | "edit";
  message: string;
  time: string;
}

// ── Static demo data ───────────────────────────────────────────────────────
const STATS: StatCard[] = [
  {
    label: "Total Articles",
    value: "284",
    change: "+12 this month",
    positive: true,
    icon: IconArticle,
    accent: "#021D38",
  },
  {
    label: "Active Users",
    value: "47",
    change: "+5 this week",
    positive: true,
    icon: IconUsers,
    accent: "#70C113",
  },
  {
    label: "Page Views",
    value: "18.4K",
    change: "+8.2% vs last week",
    positive: true,
    icon: IconEye,
    accent: "#0EA5E9",
  },
  {
    label: "Pending Review",
    value: "4",
    change: "2 overdue",
    positive: false,
    icon: IconClock,
    accent: "#F59E0B",
  },
];

const RECENT_ARTICLES: Article[] = [
  {
    id: "1",
    title: "New malaria vaccine shows 80% efficacy in East Africa trials",
    author: "Dr. Alice Kamau",
    category: "Health",
    status: "published",
    date: "Jun 11, 2026",
  },
  {
    id: "2",
    title: "Rwanda's agri-tech startup secures $2M seed funding",
    author: "Jean-Pierre Nkurunziza",
    category: "Agriculture",
    status: "pending",
    date: "Jun 10, 2026",
  },
  {
    id: "3",
    title: "Climate data stations expand across the Great Lakes region",
    author: "Fatima Ndayishimiye",
    category: "Climate",
    status: "pending",
    date: "Jun 10, 2026",
  },
  {
    id: "4",
    title: "Biofortified beans cut stunting rates in Musanze district",
    author: "Samuel Uwimana",
    category: "Food Security",
    status: "draft",
    date: "Jun 9, 2026",
  },
  {
    id: "5",
    title: "Open-access genomics database launches for African researchers",
    author: "Dr. Alice Kamau",
    category: "Research",
    status: "published",
    date: "Jun 8, 2026",
  },
];

const ACTIVITY: Activity[] = [
  {
    id: "1",
    type: "publish",
    message: "Article published: Malaria vaccine trials",
    time: "2 hours ago",
  },
  {
    id: "2",
    type: "submit",
    message: "Jean-Pierre submitted article for review",
    time: "4 hours ago",
  },
  {
    id: "3",
    type: "edit",
    message: "Fatima updated Climate data stations draft",
    time: "Yesterday",
  },
  {
    id: "4",
    type: "publish",
    message: "Article published: Genomics database",
    time: "Jun 8",
  },
  {
    id: "5",
    type: "submit",
    message: "Samuel submitted Food Security piece",
    time: "Jun 8",
  },
];

// ── Sub-components ─────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: Article["status"] }) {
  const map = {
    published: { label: "Published", color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
    pending:   { label: "Pending",   color: "#d97706", bg: "#fffbeb", border: "#fde68a" },
    draft:     { label: "Draft",     color: "#64748b", bg: "#f8fafc", border: "#e2e8f0" },
  };
  const s = map[status];
  return (
    <span
      style={{
        fontSize: 10, fontWeight: 600, padding: "2px 8px",
        borderRadius: 100, letterSpacing: "0.04em",
        color: s.color, background: s.bg,
        border: `1px solid ${s.border}`,
        textTransform: "uppercase", whiteSpace: "nowrap",
      }}
    >
      {s.label}
    </span>
  );
}

function ActivityIcon({ type }: { type: Activity["type"] }) {
  if (type === "publish") return <IconCircleCheck size={16} color="#16a34a" stroke={2} />;
  if (type === "submit")  return <IconAlertCircle size={16} color="#d97706" stroke={2} />;
  return <IconEdit size={16} color="#0ea5e9" stroke={2} />;
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { currentUser } = useApp();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <>
      <style>{`
        .db-page { display: flex; flex-direction: column; gap: 28px; }

        /* Header */
        .db-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
        .db-greeting { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #70C113; margin-bottom: 4px; }
        .db-title { font-size: 24px; font-weight: 700; color: #0F172A; letter-spacing: -0.02em; }
        .db-subtitle { font-size: 13px; color: #64748B; margin-top: 4px; }
        .db-header-btn {
          display: flex; align-items: center; gap: 6px;
          background: #021D38; color: #fff;
          border: none; border-radius: 8px;
          padding: 9px 16px; font-size: 13px; font-weight: 600;
          cursor: pointer; font-family: inherit;
          white-space: nowrap;
          transition: background 0.15s;
        }
        .db-header-btn:hover { background: #0a2d52; }

        /* Stats grid */
        .db-stats { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }
        .db-stat-card {
          background: #fff; border: 1px solid #E2E8F0;
          border-radius: 12px; padding: 20px;
        }
        .db-stat-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
        .db-stat-icon {
          width: 36px; height: 36px; border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
        }
        .db-stat-trend { display: flex; align-items: center; gap: 3px; font-size: 11px; font-weight: 600; }
        .db-stat-value { font-size: 28px; font-weight: 700; color: #0F172A; letter-spacing: -0.02em; line-height: 1; }
        .db-stat-label { font-size: 12px; color: #64748B; margin-top: 4px; }
        .db-stat-change { font-size: 11px; margin-top: 8px; font-weight: 500; }

        /* Two-col layout */
        .db-two-col { display: grid; grid-template-columns: 1fr 320px; gap: 16px; }
        @media (max-width: 900px) { .db-two-col { grid-template-columns: 1fr; } }

        /* Card shell */
        .db-card { background: #fff; border: 1px solid #E2E8F0; border-radius: 12px; }
        .db-card-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 20px 14px;
          border-bottom: 1px solid #F1F5F9;
        }
        .db-card-title { font-size: 14px; font-weight: 700; color: #0F172A; }
        .db-card-link { font-size: 12px; font-weight: 600; color: #70C113; text-decoration: none; }
        .db-card-link:hover { text-decoration: underline; }

        /* Article table */
        .db-table { width: 100%; border-collapse: collapse; }
        .db-table th {
          text-align: left; font-size: 10px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.1em; color: #94A3B8;
          padding: 10px 20px; background: #FAFBFC;
          border-bottom: 1px solid #F1F5F9;
        }
        .db-table td {
          padding: 13px 20px; font-size: 13px; color: #334155;
          border-bottom: 1px solid #F8FAFC; vertical-align: middle;
        }
        .db-table tr:last-child td { border-bottom: none; }
        .db-table tr:hover td { background: #FAFBFC; }
        .db-article-title { font-weight: 600; color: #0F172A; line-height: 1.4; max-width: 280px; }
        .db-article-author { font-size: 12px; color: #94A3B8; margin-top: 2px; }
        .db-cat-chip {
          font-size: 10px; font-weight: 600; padding: 2px 8px;
          border-radius: 100px; background: rgba(2,29,56,0.06); color: #021D38;
          white-space: nowrap;
        }
        .db-date { font-size: 11px; color: #94A3B8; white-space: nowrap; }

        /* Activity feed */
        .db-activity-list { padding: 8px 0; }
        .db-activity-item {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 12px 20px;
          border-bottom: 1px solid #F8FAFC;
        }
        .db-activity-item:last-child { border-bottom: none; }
        .db-activity-icon {
          width: 28px; height: 28px; border-radius: 50%;
          background: #F1F5F9;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 1px;
        }
        .db-activity-msg { font-size: 12px; color: #334155; line-height: 1.5; flex: 1; }
        .db-activity-time { font-size: 10px; color: #94A3B8; margin-top: 2px; }
      `}</style>

      <div className="db-page">
        {/* Header */}
        <div className="db-header">
          <div>
            <div className="db-greeting">{greeting}</div>
            <div className="db-title">{currentUser || "Admin"}</div>
            <div className="db-subtitle">Here's what's happening in the network today.</div>
          </div>
          <Link href="/dashboard/articles">
            <button className="db-header-btn">
              <IconTrendingUp size={15} />
              View all articles
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div className="db-stats">
          {STATS.map((s) => (
            <div className="db-stat-card" key={s.label}>
              <div className="db-stat-top">
                <div
                  className="db-stat-icon"
                  style={{ background: s.accent + "18" }}
                >
                  <s.icon size={18} color={s.accent} stroke={1.8} />
                </div>
                <div
                  className="db-stat-trend"
                  style={{ color: s.positive ? "#16a34a" : "#d97706" }}
                >
                  <IconArrowUpRight size={13} />
                </div>
              </div>
              <div className="db-stat-value">{s.value}</div>
              <div className="db-stat-label">{s.label}</div>
              <div
                className="db-stat-change"
                style={{ color: s.positive ? "#16a34a" : "#d97706" }}
              >
                {s.change}
              </div>
            </div>
          ))}
        </div>

        {/* Two-column section */}
        <div className="db-two-col">
          {/* Recent articles */}
          <div className="db-card">
            <div className="db-card-head">
              <div className="db-card-title">Recent Articles</div>
              <Link href="/dashboard/articles" className="db-card-link">
                View all →
              </Link>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table className="db-table">
                <thead>
                  <tr>
                    <th>Article</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_ARTICLES.map((a) => (
                    <tr key={a.id}>
                      <td>
                        <div className="db-article-title">{a.title}</div>
                        <div className="db-article-author">{a.author}</div>
                      </td>
                      <td>
                        <span className="db-cat-chip">{a.category}</span>
                      </td>
                      <td>
                        <StatusBadge status={a.status} />
                      </td>
                      <td>
                        <span className="db-date">{a.date}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Activity feed */}
          <div className="db-card">
            <div className="db-card-head">
              <div className="db-card-title">Activity Feed</div>
            </div>
            <div className="db-activity-list">
              {ACTIVITY.map((a) => (
                <div className="db-activity-item" key={a.id}>
                  <div className="db-activity-icon">
                    <ActivityIcon type={a.type} />
                  </div>
                  <div>
                    <div className="db-activity-msg">{a.message}</div>
                    <div className="db-activity-time">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}