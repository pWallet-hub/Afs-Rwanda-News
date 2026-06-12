"use client";

import { useState } from "react";
import { PlusCircle, Search, Pencil, Trash2, FileText, Globe, Leaf, Rss, MoreHorizontal, Filter, ChevronDown } from "lucide-react";

const initialArticles = [
  { id: 1, title: "Climate Change Update 2025", category: "Climate", status: "Published", date: "2025-06-01", author: "Alice Uwera", views: 1240 },
  { id: 2, title: "Food Security in East Africa", category: "Food Security", status: "Published", date: "2025-06-03", author: "Bob Nkurunziza", views: 980 },
  { id: 3, title: "Global News Roundup", category: "Global News", status: "Draft", date: "2025-06-08", author: "Claire Mukamana", views: 0 },
  { id: 4, title: "Live Coverage: Summit 2025", category: "Live", status: "Pending Review", date: "2025-06-10", author: "David Habimana", views: 432 },
  { id: 5, title: "Rwandan Agriculture Report", category: "Food Security", status: "Approved", date: "2025-06-11", author: "Eva Ingabire", views: 210 },
  { id: 6, title: "East Africa Climate Forecast", category: "Climate", status: "Published", date: "2025-06-12", author: "Alice Uwera", views: 874 },
];

const STATUS_CONFIG: Record<string, { label: string; color: string; dot: string }> = {
  Published:      { label: "Published",      color: "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20",    dot: "bg-emerald-400" },
  Draft:          { label: "Draft",          color: "bg-slate-500/10 text-slate-400 ring-1 ring-slate-500/20",          dot: "bg-slate-400" },
  "Pending Review": { label: "Pending Review", color: "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20",        dot: "bg-amber-400" },
  Approved:       { label: "Approved",       color: "bg-sky-500/10 text-sky-400 ring-1 ring-sky-500/20",               dot: "bg-sky-400" },
};

const CATEGORY_ICON: Record<string, React.ReactNode> = {
  Climate:       <Leaf size={12} />,
  "Food Security": <Rss size={12} />,
  "Global News": <Globe size={12} />,
  Live:          <FileText size={12} />,
};

const FILTERS = ["All", "Published", "Draft", "Pending Review", "Approved"];

const STATS = [
  { label: "Total",    value: 6,    sub: "articles" },
  { label: "Published", value: 3,   sub: "live now" },
  { label: "Drafts",   value: 1,    sub: "in progress" },
  { label: "Pending",  value: 1,    sub: "awaiting review" },
];

export default function ArticlesPage() {
  const [search, setSearch]       = useState("");
  const [activeFilter, setFilter] = useState("All");
  const [openMenu, setOpenMenu]   = useState<number | null>(null);

  const filtered = initialArticles.filter((a) => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
                        a.author.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === "All" || a.status === activeFilter;
    return matchSearch && matchFilter;
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        .art-root { font-family: 'Inter', system-ui, sans-serif; padding: 28px 24px; background: transparent; min-height: 100vh; }

        /* Header */
        .art-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 28px; flex-wrap: wrap; }
        .art-title { font-size: 22px; font-weight: 700;     color: #021d38; letter-spacing: -0.02em; }
        .art-subtitle { font-size: 13px;     color: #021d38; margin-top: 3px; }
        .art-new-btn {
          display: flex; align-items: center; gap-8px; gap: 7px;
          background: #70C113; color: #021D38;
          font-size: 13px; font-weight: 600;
          padding: 9px 16px; border-radius: 9px; border: none; cursor: pointer;
          transition: background 0.15s, transform 0.1s;
          white-space: nowrap; flex-shrink: 0;
        }
        .art-new-btn:hover { background: #5ea50f; }
        .art-new-btn:active { transform: scale(0.98); }

        /* Stats row */
        .art-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px; }
        @media (max-width: 700px) { .art-stats { grid-template-columns: repeat(2, 1fr); } }
        .art-stat-card {
          background: #0B1E30;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px; padding: 16px 18px;
        }
        .art-stat-value { font-size: 26px; font-weight: 700; color: #fff; letter-spacing: -0.03em; line-height: 1; }
        .art-stat-label { font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 0.08em; margin-top: 6px; }
        .art-stat-sub { font-size: 11px; color: rgba(255,255,255,0.22); margin-top: 2px; }

        /* Toolbar */
        .art-toolbar { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; flex-wrap: wrap; }
        .art-search-wrap { position: relative; flex: 1; min-width: 180px; }
        .art-search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: rgba(255,255,255,0.25); pointer-events: none; }
        .art-search {
          width: 100%; background: #0B1E30;
          border: 1px solid rgba(255,255,255,0.08);
          color: #fff; font-size: 13px;
          border-radius: 9px; padding: 9px 12px 9px 36px;
          outline: none; transition: border-color 0.15s;
          font-family: inherit;
        }
        .art-search::placeholder { color: rgba(255,255,255,0.22); }
        .art-search:focus { border-color: rgba(112,193,19,0.4); }

        /* Filter pills */
        .art-filters { display: flex; gap: 6px; flex-wrap: wrap; }
        .art-filter-pill {
          font-size: 12px; font-weight: 500;
          padding: 6px 13px; border-radius: 100px; border: none; cursor: pointer;
          background: #0B1E30; color: rgba(255,255,255,0.4);
          border: 1px solid rgba(255,255,255,0.07);
          transition: all 0.12s; font-family: inherit;
        }
        .art-filter-pill:hover { color: rgba(255,255,255,0.7); border-color: rgba(255,255,255,0.15); }
        .art-filter-pill.active { background: rgba(112,193,19,0.12); color: #70C113; border-color: rgba(112,193,19,0.3); }

        /* Table card */
        .art-card {
          background: #0B1E30;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px; overflow: hidden;
        }
        .art-table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .art-table thead tr { border-bottom: 1px solid rgba(255,255,255,0.06); }
        .art-table th {
          text-align: left; padding: 13px 18px;
          font-size: 11px; font-weight: 600;
          color: rgba(255,255,255,0.28);
          text-transform: uppercase; letter-spacing: 0.08em;
          white-space: nowrap;
        }
        .art-table tbody tr {
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: background 0.1s;
        }
        .art-table tbody tr:last-child { border-bottom: none; }
        .art-table tbody tr:hover { background: rgba(255,255,255,0.025); }
        .art-table td { padding: 14px 18px; vertical-align: middle; }

        /* Title cell */
        .art-title-cell { display: flex; align-items: center; gap: 12px; }
        .art-article-icon {
          width: 34px; height: 34px; border-radius: 8px;
          background: rgba(112,193,19,0.08);
          border: 1px solid rgba(112,193,19,0.12);
          display: flex; align-items: center; justify-content: center;
          color: #70C113; flex-shrink: 0;
        }
        .art-article-name { font-size: 13px; font-weight: 600; color: #fff; line-height: 1.3; }
        .art-article-author { font-size: 11px; color: rgba(255,255,255,0.32); margin-top: 2px; }

        /* Category badge */
        .art-cat {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 11px; font-weight: 500;
          padding: 4px 9px; border-radius: 6px;
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.45);
          border: 1px solid rgba(255,255,255,0.07);
          white-space: nowrap;
        }

        /* Status badge */
        .art-status {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 11px; font-weight: 600;
          padding: 4px 10px; border-radius: 100px;
          white-space: nowrap;
        }
        .art-status-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }

        /* Views */
        .art-views { font-size: 12px; color: rgba(255,255,255,0.35); font-variant-numeric: tabular-nums; }

        /* Actions */
        .art-actions { display: flex; align-items: center; gap: 4px; justify-content: flex-end; position: relative; }
        .art-action-btn {
          background: none; border: none; cursor: pointer;
          padding: 6px; border-radius: 7px;
          color: rgba(255,255,255,0.25);
          transition: background 0.12s, color 0.12s;
          display: flex; align-items: center;
        }
        .art-action-btn:hover { background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.75); }
        .art-action-btn.danger:hover { background: rgba(239,68,68,0.1); color: #f87171; }

        /* Divider line in header */
        .art-count-chip {
          display: inline-flex; align-items: center;
          background: rgba(112,193,19,0.12);
          color: #70C113; font-size: 11px; font-weight: 700;
          padding: 2px 8px; border-radius: 100px;
          margin-left: 8px; vertical-align: middle;
        }

        /* Empty state */
        .art-empty { padding: 48px 24px; text-align: center; color: rgba(255,255,255,0.22); font-size: 13px; }
        .art-empty-icon { opacity: 0.15; margin: 0 auto 12px; display: block; }

        /* Responsive hide */
        @media (max-width: 768px) {
          .hide-md { display: none; }
        }
        @media (max-width: 560px) {
          .hide-sm { display: none; }
        }
      `}</style>

      <div className="art-root">
        {/* Header */}
        <div className="art-header">
          <div>
            <h1 className="art-title">
              Articles
              <span className="art-count-chip">{initialArticles.length}</span>
            </h1>
            <p className="art-subtitle">Manage and publish content across all categories.</p>
          </div>
          <button className="art-new-btn">
            <PlusCircle size={15} />
            New Article
          </button>
        </div>

        {/* Stats */}
        <div className="art-stats">
          {STATS.map((s) => (
            <div className="art-stat-card" key={s.label}>
              <div className="art-stat-value">{s.value}</div>
              <div className="art-stat-label">{s.label}</div>
              <div className="art-stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="art-toolbar">
          <div className="art-search-wrap">
            <Search size={14} className="art-search-icon" />
            <input
              className="art-search"
              type="text"
              placeholder="Search by title or author…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="art-filters">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`art-filter-pill ${activeFilter === f ? "active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="art-card">
          <table className="art-table">
            <thead>
              <tr>
                <th>Article</th>
                <th className="hide-sm">Category</th>
                <th>Status</th>
                <th className="hide-md">Views</th>
                <th className="hide-md">Date</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filtered.map((article) => {
                const statusCfg = STATUS_CONFIG[article.status] ?? STATUS_CONFIG["Draft"];
                return (
                  <tr key={article.id}>
                    {/* Title */}
                    <td>
                      <div className="art-title-cell">
                        <div className="art-article-icon">
                          <FileText size={14} />
                        </div>
                        <div>
                          <div className="art-article-name">{article.title}</div>
                          <div className="art-article-author">by {article.author}</div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="hide-sm">
                      <span className="art-cat">
                        {CATEGORY_ICON[article.category]}
                        {article.category}
                      </span>
                    </td>

                    {/* Status */}
                    <td>
                      <span className={`art-status ${statusCfg.color}`}>
                        <span className={`art-status-dot ${statusCfg.dot}`} />
                        {statusCfg.label}
                      </span>
                    </td>

                    {/* Views */}
                    <td className="hide-md">
                      <span className="art-views">
                        {article.views > 0 ? article.views.toLocaleString() : "—"}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="hide-md">
                      <span className="art-views">{article.date}</span>
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="art-actions">
                        <button className="art-action-btn" title="Edit">
                          <Pencil size={14} />
                        </button>
                        <button className="art-action-btn danger" title="Delete">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6}>
                    <div className="art-empty">
                      <FileText size={32} className="art-empty-icon" />
                      No articles match your search.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}