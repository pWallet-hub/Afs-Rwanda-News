'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, TrendingUp, ArrowRight } from 'lucide-react';

const LEAD_STORY = {
  id: "1",
  category: "Food Security",
  title: "Rwanda Infrastructure Initiatives Pave the Way for Climate Resilient Agriculture",
  excerpt: "New technological frameworks deployed across central agricultural corridors reveal immense yield potential. Field diagnostics show data-backed improvements across multiple farming cooperatives utilizing localized soil sensor networks.",
  time: "June 2, 2026",
  author: "Jean de Dieu Kabera",
  image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200&auto=format&fit=crop&q=80"
};

const SECONDARY_STORIES = [
  {
    id: "2",
    category: "Climate Change",
    title: "Key Impact Policies Address Water Allocation Deficits Across Eastern Basins",
    excerpt: "Environmental leaders finalize cross-border water management rules to protect vulnerable irrigation zones ahead of dry cycles.",
    time: "2 hours ago"
  },
  {
    id: "3",
    category: "Global Science",
    title: "Biotechnology Summit Set to Open in Kigali Next Month",
    excerpt: "Global thought leaders and regulatory minds converge to lay down modern bio-safety foundations and regional policy frameworks.",
    time: "4 hours ago"
  }
];

const BRIEF_FEEDS = [
  { id: "4", title: "Regional seed bank integration reaches 85% deployment capacity.", time: "5 hours ago" },
  { id: "5", title: "New funding approved for urban agro-tech testing facilities.", time: "7 hours ago" },
  { id: "6", title: "Kigali Innovation Center publishes research on drought-resistant maize variants.", time: "1 day ago" }
];

export default function HomePage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

        .hp-root {
          font-family: 'DM Sans', sans-serif;
          background: #F5F4F0;
          min-height: 100vh;
          color: #1a1a1a;
        }
        .hp-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 28px 24px;
        }

        /* Ticker */
        .hp-ticker {
          background: #021D38;
          border-radius: 10px;
          padding: 10px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 28px;
        }
        .hp-ticker-badge {
          background: #70C113;
          color: #021D38;
          font-family: 'Syne', sans-serif;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .08em;
          text-transform: uppercase;
          padding: 5px 11px;
          border-radius: 6px;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .hp-ticker-text {
          font-size: 12px;
          color: rgba(255,255,255,.55);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          flex: 1;
        }
        .hp-ticker-date {
          font-size: 11px;
          color: rgba(255,255,255,.35);
          white-space: nowrap;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        /* Layout grid */
        .hp-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 260px;
          gap: 24px;
        }
        @media (max-width: 900px) {
          .hp-grid { grid-template-columns: 1fr; }
        }

        /* Section label */
        .hp-section-label {
          display: flex;
          align-items: center;
          gap: 8px;
          padding-bottom: 10px;
          border-bottom: 2px solid #021D38;
          margin-bottom: 20px;
        }
        .hp-section-dot {
          width: 8px;
          height: 8px;
          background: #70C113;
          border-radius: 2px;
          flex-shrink: 0;
        }
        .hp-section-text {
          font-family: 'Syne', sans-serif;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: #021D38;
        }

        /* Lead story */
        .hp-lead {
          background: #fff;
          border-radius: 14px;
          overflow: hidden;
          border: .5px solid rgba(0,0,0,.08);
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
          margin-bottom: 20px;
          transition: box-shadow .2s;
        }
        .hp-lead:hover { box-shadow: 0 4px 20px rgba(0,0,0,.07); }
        @media (max-width: 640px) {
          .hp-lead { grid-template-columns: 1fr; }
        }
        .hp-lead-img {
          position: relative;
          overflow: hidden;
          min-height: 280px;
        }
        .hp-lead-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform .5s ease;
        }
        .hp-lead:hover .hp-lead-img img { transform: scale(1.02); }
        .hp-lead-cat {
          position: absolute;
          top: 14px;
          left: 14px;
          background: #021D38;
          color: #70C113;
          font-family: 'Syne', sans-serif;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: .1em;
          text-transform: uppercase;
          padding: 5px 11px;
          border-radius: 5px;
        }
        .hp-lead-body {
          padding: 28px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 14px;
        }
        .hp-lead-meta {
          font-size: 11px;
          color: #999;
          font-weight: 500;
          letter-spacing: .02em;
        }
        .hp-lead-title {
          font-family: 'DM Serif Display', serif;
          font-size: 20px;
          line-height: 1.3;
          color: #021D38;
          margin-top: 8px;
          transition: color .2s;
        }
        .hp-lead:hover .hp-lead-title { color: #3B6D11; }
        .hp-lead-excerpt {
          font-size: 13px;
          color: #555;
          line-height: 1.7;
          margin-top: 10px;
        }
        .hp-lead-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'Syne', sans-serif;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: #021D38;
          text-decoration: none;
          border-top: .5px solid #ebebeb;
          padding-top: 16px;
          margin-top: 6px;
          transition: color .2s;
        }
        .hp-lead-cta:hover { color: #3B6D11; }
        .hp-lead-cta svg { color: #70C113; }

        /* Sub-feature cards */
        .hp-cards {
          display: grid;
          grid-template-columns: repeat(2, minmax(0,1fr));
          gap: 14px;
        }
        @media (max-width: 480px) {
          .hp-cards { grid-template-columns: 1fr; }
        }
        .hp-card {
          background: #fff;
          border-radius: 14px;
          padding: 20px;
          border: .5px solid rgba(0,0,0,.08);
          display: flex;
          flex-direction: column;
          gap: 8px;
          transition: box-shadow .2s;
        }
        .hp-card:hover { box-shadow: 0 4px 18px rgba(0,0,0,.07); }
        .hp-card-cat {
          font-family: 'Syne', sans-serif;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: #70C113;
        }
        .hp-card-title {
          font-family: 'DM Serif Display', serif;
          font-size: 14.5px;
          line-height: 1.35;
          color: #021D38;
          transition: color .2s;
        }
        .hp-card:hover .hp-card-title { color: #3B6D11; }
        .hp-card-excerpt {
          font-size: 11.5px;
          color: #666;
          line-height: 1.65;
        }
        .hp-card-foot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 6px;
          padding-top: 12px;
          border-top: .5px solid #f0f0f0;
        }
        .hp-card-time { font-size: 10.5px; color: #aaa; font-weight: 500; }
        .hp-card-link {
          font-family: 'Syne', sans-serif;
          font-size: 9.5px;
          font-weight: 800;
          letter-spacing: .06em;
          text-transform: uppercase;
          color: #021D38;
          display: flex;
          align-items: center;
          gap: 3px;
          cursor: pointer;
          text-decoration: none;
          transition: color .2s;
        }
        .hp-card-link:hover { color: #3B6D11; }
        .hp-card-link svg { color: #70C113; }

        /* Sidebar */
        .hp-sidebar { display: flex; flex-direction: column; gap: 22px; }

        .hp-wire-list { display: flex; flex-direction: column; }
        .hp-wire-item { padding: 12px 0; border-bottom: .5px solid #e5e5e5; }
        .hp-wire-item:first-child { padding-top: 0; }
        .hp-wire-item:last-child { border-bottom: none; padding-bottom: 0; }
        .hp-wire-time {
          font-size: 10px;
          color: #aaa;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 5px;
          margin-bottom: 5px;
        }
        .hp-wire-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #70C113;
          flex-shrink: 0;
        }
        .hp-wire-title {
          font-family: 'DM Serif Display', serif;
          font-size: 13px;
          line-height: 1.4;
          color: #021D38;
          transition: color .2s;
          cursor: pointer;
        }
        .hp-wire-title:hover { color: #3B6D11; }

        /* CTA card */
        .hp-cta {
          background: #021D38;
          border-radius: 14px;
          padding: 22px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          border: .5px solid rgba(255,255,255,.05);
        }
        .hp-cta-label {
          font-family: 'Syne', sans-serif;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: #70C113;
        }
        .hp-cta-title {
          font-family: 'DM Serif Display', serif;
          font-size: 16px;
          line-height: 1.35;
          color: #fff;
        }
        .hp-cta-desc {
          font-size: 11.5px;
          color: rgba(255,255,255,.45);
          line-height: 1.65;
        }
        .hp-cta-input {
          width: 100%;
          background: rgba(255,255,255,.07);
          border: .5px solid rgba(255,255,255,.12);
          border-radius: 8px;
          padding: 10px 13px;
          font-size: 12px;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color .2s;
        }
        .hp-cta-input::placeholder { color: rgba(255,255,255,.28); }
        .hp-cta-input:focus { border-color: #70C113; }
        .hp-cta-btn {
          width: 100%;
          background: #70C113;
          color: #021D38;
          font-family: 'Syne', sans-serif;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .1em;
          text-transform: uppercase;
          border: none;
          border-radius: 8px;
          padding: 12px;
          cursor: pointer;
          transition: opacity .2s, transform .15s;
        }
        .hp-cta-btn:hover { opacity: .88; transform: translateY(-1px); }
      `}</style>

      <div className="hp-root">
        <div className="hp-inner">

          {/* Ticker */}
          <div className="hp-ticker">
            <span className="hp-ticker-badge">Priority Notice</span>
            <p className="hp-ticker-text">
              Bringing professional values & deep insights into modern scientific research infrastructure across Rwanda.
            </p>
            <span className="hp-ticker-date">
              <Clock size={13} /> Updated: June 2, 2026
            </span>
          </div>

          <div className="hp-grid">

            {/* Main column */}
            <div>
              <div className="hp-section-label">
                <span className="hp-section-dot" />
                <span className="hp-section-text">Top Analytical Headlines</span>
              </div>

              {/* Lead story */}
              <article className="hp-lead">
                <div className="hp-lead-img">
                  <img src={LEAD_STORY.image} alt={LEAD_STORY.title} />
                  <span className="hp-lead-cat">{LEAD_STORY.category}</span>
                </div>
                <div className="hp-lead-body">
                  <div>
                    <p className="hp-lead-meta">By {LEAD_STORY.author} · {LEAD_STORY.time}</p>
                    <h2 className="hp-lead-title">
                      <Link href={`/items/${LEAD_STORY.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {LEAD_STORY.title}
                      </Link>
                    </h2>
                    <p className="hp-lead-excerpt">{LEAD_STORY.excerpt}</p>
                  </div>
                  <Link href={`/items/${LEAD_STORY.id}`} className="hp-lead-cta">
                    Read Investigative Report <ArrowRight size={13} />
                  </Link>
                </div>
              </article>

              {/* Secondary cards */}
              <div className="hp-cards">
                {SECONDARY_STORIES.map((story) => (
                  <article key={story.id} className="hp-card">
                    <span className="hp-card-cat">{story.category}</span>
                    <h3 className="hp-card-title">
                      <Link href={`/items/${story.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {story.title}
                      </Link>
                    </h3>
                    <p className="hp-card-excerpt">{story.excerpt}</p>
                    <div className="hp-card-foot">
                      <span className="hp-card-time">{story.time}</span>
                      <Link href={`/items/${story.id}`} className="hp-card-link">
                        Analyze <ArrowRight size={11} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="hp-sidebar">
              <div>
                <div className="hp-section-label">
                  <TrendingUp size={14} color="#70C113" />
                  <span className="hp-section-text">Intelligence Wire</span>
                </div>
                <div className="hp-wire-list">
                  {BRIEF_FEEDS.map((feed) => (
                    <div key={feed.id} className="hp-wire-item">
                      <div className="hp-wire-time">
                        <span className="hp-wire-dot" />{feed.time}
                      </div>
                      <p className="hp-wire-title">{feed.title}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hp-cta">
                <span className="hp-cta-label">Research Hub</span>
                <h4 className="hp-cta-title">Access Main Activities & Bio-Safety Data Sheets</h4>
                <p className="hp-cta-desc">
                  Sign up for deep-dives on food safety guidelines, technological advancements, and modern bioscience policies.
                </p>
                <input
                  type="email"
                  placeholder="professional@email.rw"
                  className="hp-cta-input"
                />
                <button className="hp-cta-btn">Request Access</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
