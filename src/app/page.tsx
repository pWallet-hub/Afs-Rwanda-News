'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Clock, TrendingUp, ArrowRight, Search, ChevronRight } from 'lucide-react';

const FacebookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const TwitterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);
const YoutubeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon fill="#fff" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
);
const InstagramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);

// ── DATA ────────────────────────────────────────────────────────────────────

const LEAD_STORY = {
  id: '1',
  category: 'Food Security',
  title: 'Rwanda Infrastructure Initiatives Pave the Way for Climate Resilient Agriculture',
  excerpt:
    'New technological frameworks deployed across central agricultural corridors reveal immense yield potential. Field diagnostics show data-backed improvements across multiple farming cooperatives.',
  time: 'June 2, 2026',
  author: 'Jean de Dieu Kabera',
  image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=900&auto=format&fit=crop&q=80',
};

const SECONDARY_STORIES = [
  {
    id: '2',
    category: 'Climate Change',
    title: 'Key Impact Policies Address Water Allocation Deficits Across Eastern Basins',
    time: '2 hours ago',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: '3',
    category: 'Global Science',
    title: 'Biotechnology Summit Set to Open in Kigali Next Month',
    time: '4 hours ago',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80',
  },
];

const ARTICLES = [
  {
    id: '4',
    category: 'Soil Science',
    title: 'Regional Seed Bank Integration Reaches 85% Deployment Capacity',
    excerpt: 'Cooperative networks across four provinces report record enrollment in shared germplasm programs.',
    time: '5 hours ago',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: '5',
    category: 'Urban AgTech',
    title: 'New Funding Approved for Urban Agro-Tech Testing Facilities',
    excerpt: 'Ministry of Innovation greenlights three new pilot zones near Kigali for vertical farming research.',
    time: '7 hours ago',
    image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: '6',
    category: 'Research',
    title: 'Kigali Innovation Center Publishes Research on Drought-Resistant Maize Variants',
    excerpt: 'Field trials across Bugesera and Nyanza districts demonstrate 23% yield gains under water stress.',
    time: '1 day ago',
    image: 'https://images.unsplash.com/photo-1615811648503-479be498aa12?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: '7',
    category: 'Policy',
    title: 'Cross-Border Water Management Rules Finalized Ahead of Dry Season',
    excerpt: 'EAC environmental ministers sign landmark agreement protecting shared irrigation infrastructure.',
    time: '2 hours ago',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=80',
  },
];

const EDITOR_PICKS = [
  { id: 'e1', title: 'Top 10 Innovations Transforming East African Agriculture in 2026', author: 'Jean Kabera', date: 'May 20, 2026' },
  { id: 'e2', title: 'Biotechnology Safety Review: What the New EAC Framework Means', author: 'Amara Diallo', date: 'May 18, 2026' },
  { id: 'e3', title: "Soil Health Monitoring Goes Digital Across Rwanda's Southern Province", author: 'Marie Uwase', date: 'May 16, 2026' },
  { id: 'e4', title: "Water Futures: Securing Rwanda's Irrigation Corridors Through 2030", author: 'David Nkurunziza', date: 'May 15, 2026' },
];

const NAV_ITEMS = ['News', 'Food Security', 'Climate', 'Biotech', 'Research', 'Policy', 'Features'];

// ── COMPONENT ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [activeNav, setActiveNav] = useState('News');
  const [activePick, setActivePick] = useState('All');
  const [email, setEmail] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,300&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --navy: #021D38;
          --green: #70C113;
          --green-dk: #3B6D11;
          --cream: #F5F4F0;
          --border: rgba(2,29,56,.1);
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .nw { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--navy); font-size: 13px; }

        /* TOP BAR */
        .nw-top { background: var(--navy); padding: 7px 20px; display: flex; align-items: center; justify-content: space-between; }
        .nw-top-date { font-size: 10px; color: rgba(255,255,255,.4); letter-spacing: .05em; font-family: 'Syne',sans-serif; }
        .nw-top-links { display: flex; gap: 14px; }
        .nw-top-links a { font-size: 10px; color: rgba(255,255,255,.45); text-decoration: none; font-family: 'Syne',sans-serif; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; transition: color .2s; }
        .nw-top-links a:hover { color: var(--green); }
        .nw-top-social { display: flex; gap: 10px; }
        .nw-top-social a { color: rgba(255,255,255,.35); transition: color .2s; display: flex; }
        .nw-top-social a:hover { color: var(--green); }

        /* MASTHEAD */
        .nw-head { padding: 18px 20px 0; display: flex; align-items: center; justify-content: space-between; }
        .nw-logo { font-family: 'Fraunces',serif; font-size: 30px; font-weight: 700; color: var(--navy); letter-spacing: -.02em; line-height: 1; text-decoration: none; }
        .nw-logo span { color: var(--green); }
        .nw-head-tagline { font-size: 11px; color: #999; font-style: italic; font-family: 'Fraunces',serif; }

        /* NAV */
        .nw-nav { background: #fff; border-top: 3px solid var(--navy); border-bottom: .5px solid var(--border); padding: 0 20px; display: flex; align-items: center; margin-top: 14px; }
        .nw-nav-item { font-family: 'Syne',sans-serif; font-size: 10px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; padding: 12px 14px; color: var(--navy); cursor: pointer; border-bottom: 2px solid transparent; transition: all .2s; text-decoration: none; background: none; border-left: none; border-right: none; border-top: none; }
        .nw-nav-item:hover { color: var(--green-dk); }
        .nw-nav-item.active { color: var(--green-dk); border-bottom: 2px solid var(--green); }
        .nw-nav-search { margin-left: auto; color: #999; cursor: pointer; display: flex; }

        /* TICKER */
        .nw-ticker { background: var(--navy); padding: 8px 20px; display: flex; align-items: center; gap: 12px; }
        .nw-ticker-label { background: var(--green); color: var(--navy); font-family: 'Syne',sans-serif; font-size: 9px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; padding: 4px 10px; border-radius: 4px; white-space: nowrap; flex-shrink: 0; }
        .nw-ticker-scroll { font-size: 11px; color: rgba(255,255,255,.5); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1; }

        /* INNER */
        .nw-inner { max-width: 1200px; margin: 0 auto; padding: 22px 20px; }

        /* SECTION HEADER */
        .nw-section-header { display: flex; align-items: center; gap: 8px; margin-bottom: 16px; padding-bottom: 10px; border-bottom: 2px solid var(--navy); }
        .nw-section-dot { width: 7px; height: 7px; background: var(--green); border-radius: 2px; flex-shrink: 0; }
        .nw-section-title { font-family: 'Syne',sans-serif; font-size: 10px; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; color: var(--navy); }
        .nw-section-count { margin-left: auto; font-size: 10px; color: #aaa; font-family: 'Syne',sans-serif; }

        /* FEATURED HERO */
        .nw-featured { display: grid; grid-template-columns: 1.6fr 1fr; gap: 3px; border-radius: 12px; overflow: hidden; margin-bottom: 24px; height: 340px; }
        .nw-feat-main { position: relative; overflow: hidden; background: #111; cursor: pointer; }
        .nw-feat-main img { width: 100%; height: 100%; object-fit: cover; opacity: .82; transition: transform .5s; display: block; }
        .nw-feat-main:hover img { transform: scale(1.03); }
        .nw-feat-overlay { position: absolute; inset: 0; background: linear-gradient(0deg, rgba(2,29,56,.85) 0%, transparent 55%); }
        .nw-feat-body { position: absolute; bottom: 0; left: 0; right: 0; padding: 22px; }
        .nw-feat-cat { display: inline-block; background: var(--green); color: var(--navy); font-family: 'Syne',sans-serif; font-size: 9px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; padding: 4px 10px; border-radius: 4px; margin-bottom: 10px; }
        .nw-feat-title { font-family: 'Fraunces',serif; font-size: 20px; line-height: 1.25; color: #fff; margin-bottom: 8px; }
        .nw-feat-meta { font-size: 10px; color: rgba(255,255,255,.55); display: flex; align-items: center; gap: 10px; }
        .nw-feat-meta-dot { width: 3px; height: 3px; background: var(--green); border-radius: 50%; }
        .nw-feat-stack { display: grid; grid-template-rows: 1fr 1fr; gap: 3px; }
        .nw-feat-sm { position: relative; overflow: hidden; background: #111; cursor: pointer; }
        .nw-feat-sm img { width: 100%; height: 100%; object-fit: cover; opacity: .75; transition: transform .4s; display: block; }
        .nw-feat-sm:hover img { transform: scale(1.05); }
        .nw-feat-sm-overlay { position: absolute; inset: 0; background: linear-gradient(0deg, rgba(2,29,56,.8) 0%, transparent 55%); }
        .nw-feat-sm-body { position: absolute; bottom: 0; left: 0; right: 0; padding: 14px; }
        .nw-feat-sm-cat { display: inline-block; background: rgba(112,193,19,.9); color: var(--navy); font-family: 'Syne',sans-serif; font-size: 8px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; padding: 3px 8px; border-radius: 3px; margin-bottom: 6px; }
        .nw-feat-sm-title { font-family: 'Fraunces',serif; font-size: 13px; line-height: 1.3; color: #fff; }

        /* MAIN + SIDEBAR */
        .nw-body { display: grid; grid-template-columns: minmax(0,1fr) 240px; gap: 24px; }
        @media (max-width: 900px) { .nw-body { grid-template-columns: 1fr; } .nw-featured { grid-template-columns: 1fr; height: auto; } .nw-feat-stack { grid-template-rows: none; grid-template-columns: 1fr 1fr; min-height: 200px; } }

        /* ARTICLE GRID */
        .nw-grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 14px; margin-bottom: 20px; }
        @media (max-width: 600px) { .nw-grid { grid-template-columns: 1fr; } }
        .nw-article { background: #fff; border-radius: 12px; overflow: hidden; border: .5px solid var(--border); transition: box-shadow .2s; }
        .nw-article:hover { box-shadow: 0 4px 18px rgba(0,0,0,.08); }
        .nw-article-img { position: relative; height: 150px; overflow: hidden; background: #eee; }
        .nw-article-img img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .4s; }
        .nw-article:hover .nw-article-img img { transform: scale(1.04); }
        .nw-article-cat { position: absolute; top: 10px; left: 10px; background: var(--navy); color: var(--green); font-family: 'Syne',sans-serif; font-size: 8px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; padding: 3px 8px; border-radius: 3px; }
        .nw-article-body { padding: 14px; }
        .nw-article-title { font-family: 'Fraunces',serif; font-size: 14px; line-height: 1.35; color: var(--navy); margin-bottom: 8px; transition: color .2s; text-decoration: none; display: block; }
        .nw-article:hover .nw-article-title { color: var(--green-dk); }
        .nw-article-excerpt { font-size: 11.5px; color: #666; line-height: 1.6; margin-bottom: 10px; }
        .nw-article-foot { display: flex; justify-content: space-between; align-items: center; padding-top: 10px; border-top: .5px solid #f0f0f0; }
        .nw-article-author { font-size: 10px; color: #aaa; font-weight: 500; }
        .nw-article-read { font-family: 'Syne',sans-serif; font-size: 9px; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; color: var(--navy); display: flex; align-items: center; gap: 3px; text-decoration: none; transition: color .2s; }
        .nw-article-read:hover { color: var(--green-dk); }
        .nw-article-read svg { color: var(--green); }

        /* PAGINATION */
        .nw-pager { display: flex; align-items: center; gap: 6px; margin-bottom: 24px; }
        .nw-page-btn { width: 30px; height: 30px; border-radius: 6px; border: .5px solid var(--border); background: #fff; display: flex; align-items: center; justify-content: center; font-family: 'Syne',sans-serif; font-size: 11px; font-weight: 800; color: var(--navy); cursor: pointer; transition: all .2s; }
        .nw-page-btn:hover { background: var(--navy); color: #fff; border-color: var(--navy); }
        .nw-page-btn.active { background: var(--navy); color: var(--green); border-color: var(--navy); }
        .nw-page-of { font-size: 10px; color: #aaa; font-family: 'Syne',sans-serif; margin-left: 4px; }

        /* SIDEBAR */
        .nw-sb { display: flex; flex-direction: column; gap: 20px; }

        /* Social Box */
        .nw-social-box { background: #fff; border-radius: 12px; padding: 16px; border: .5px solid var(--border); }
        .nw-social-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; border-bottom: .5px solid #f0f0f0; }
        .nw-social-row:last-child { border-bottom: none; }
        .nw-social-left { display: flex; align-items: center; gap: 8px; }
        .nw-social-icon { width: 28px; height: 28px; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #fff; }
        .nw-social-icon.fb { background: #1877f2; }
        .nw-social-icon.tw { background: #1da1f2; }
        .nw-social-icon.yt { background: #ff0000; }
        .nw-social-count { font-family: 'Syne',sans-serif; font-size: 11px; font-weight: 800; color: var(--navy); }
        .nw-social-label { font-size: 10px; color: #aaa; }
        .nw-social-btn { font-family: 'Syne',sans-serif; font-size: 8px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; padding: 4px 10px; border-radius: 4px; border: none; cursor: pointer; transition: opacity .2s; }
        .nw-social-btn.like { background: #1877f2; color: #fff; }
        .nw-social-btn.follow { background: #1da1f2; color: #fff; }
        .nw-social-btn.sub { background: #ff0000; color: #fff; }
        .nw-social-btn:hover { opacity: .8; }

        /* Editor Picks */
        .nw-picks { background: #fff; border-radius: 12px; padding: 16px; border: .5px solid var(--border); }
        .nw-pick-filter { display: flex; align-items: center; gap: 6px; margin-bottom: 14px; flex-wrap: wrap; }
        .nw-pick-pill { font-family: 'Syne',sans-serif; font-size: 9px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; padding: 4px 10px; border-radius: 20px; border: .5px solid var(--border); color: #888; cursor: pointer; transition: all .2s; background: none; }
        .nw-pick-pill:hover { border-color: var(--navy); color: var(--navy); }
        .nw-pick-pill.active { background: var(--navy); color: var(--green); border-color: var(--navy); }
        .nw-pick-item { padding: 10px 0; border-bottom: .5px solid #f5f5f5; }
        .nw-pick-item:last-child { border-bottom: none; padding-bottom: 0; }
        .nw-pick-title { font-family: 'Fraunces',serif; font-size: 13px; line-height: 1.35; color: var(--navy); margin-bottom: 4px; cursor: pointer; transition: color .2s; }
        .nw-pick-title:hover { color: var(--green-dk); }
        .nw-pick-meta { font-size: 10px; color: #aaa; display: flex; align-items: center; gap: 5px; }
        .nw-pick-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--green); flex-shrink: 0; }

        /* Newsletter CTA */
        .nw-cta { background: var(--navy); border-radius: 12px; padding: 18px; }
        .nw-cta-label { font-family: 'Syne',sans-serif; font-size: 9px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; color: var(--green); margin-bottom: 8px; }
        .nw-cta-title { font-family: 'Fraunces',serif; font-size: 15px; line-height: 1.3; color: #fff; margin-bottom: 8px; }
        .nw-cta-desc { font-size: 11px; color: rgba(255,255,255,.4); line-height: 1.6; margin-bottom: 14px; }
        .nw-cta-input { width: 100%; background: rgba(255,255,255,.07); border: .5px solid rgba(255,255,255,.12); border-radius: 7px; padding: 9px 12px; font-size: 12px; color: #fff; font-family: 'DM Sans',sans-serif; outline: none; margin-bottom: 8px; }
        .nw-cta-input::placeholder { color: rgba(255,255,255,.28); }
        .nw-cta-input:focus { border-color: var(--green); }
        .nw-cta-btn { width: 100%; background: var(--green); color: var(--navy); font-family: 'Syne',sans-serif; font-size: 10px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; border: none; border-radius: 7px; padding: 11px; cursor: pointer; transition: opacity .2s; }
        .nw-cta-btn:hover { opacity: .85; }

        /* FOOTER */
        .nw-footer { background: var(--navy); margin-top: 32px; padding: 28px 20px 20px; }
        .nw-footer-grid { display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 24px; max-width: 1200px; margin: 0 auto; }
        @media (max-width: 768px) { .nw-footer-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 480px) { .nw-footer-grid { grid-template-columns: 1fr; } }
        .nw-footer-logo { font-family: 'Fraunces',serif; font-size: 22px; font-weight: 700; color: #fff; margin-bottom: 8px; text-decoration: none; display: block; }
        .nw-footer-logo span { color: var(--green); }
        .nw-footer-desc { font-size: 11px; color: rgba(255,255,255,.38); line-height: 1.65; margin-bottom: 12px; }
        .nw-footer-contact { font-size: 11px; color: rgba(255,255,255,.4); }
        .nw-footer-contact a { color: var(--green); text-decoration: none; }
        .nw-footer-col-title { font-family: 'Syne',sans-serif; font-size: 10px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; color: var(--green); margin-bottom: 12px; }
        .nw-footer-links { display: flex; flex-direction: column; gap: 7px; }
        .nw-footer-links a { font-size: 11.5px; color: rgba(255,255,255,.45); text-decoration: none; transition: color .2s; display: flex; justify-content: space-between; }
        .nw-footer-links a:hover { color: rgba(255,255,255,.85); }
        .nw-footer-links-count { color: rgba(255,255,255,.25); }
        .nw-footer-bar { max-width: 1200px; margin: 20px auto 0; padding-top: 16px; border-top: .5px solid rgba(255,255,255,.08); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
        .nw-footer-copy { font-size: 10px; color: rgba(255,255,255,.3); }
        .nw-footer-bar-links { display: flex; gap: 16px; }
        .nw-footer-bar-links a { font-size: 10px; color: rgba(255,255,255,.3); text-decoration: none; transition: color .2s; }
        .nw-footer-bar-links a:hover { color: rgba(255,255,255,.6); }
      `}</style>

      <div className="nw">

        {/* TOP BAR */}
        <div className="nw-top">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span className="nw-top-date">Tuesday, June 3, 2026</span>
            <div className="nw-top-links">
              <a href="#">Sign In</a>
              <a href="#">Join</a>
              <a href="#">Advertise</a>
              <a href="#">Contact</a>
            </div>
          </div>
          <div className="nw-top-social">
            <a href="#" aria-label="Facebook"><FacebookIcon /></a>
            <a href="#" aria-label="Instagram"><InstagramIcon /></a>
            <a href="#" aria-label="Twitter"><TwitterIcon /></a>
            <a href="#" aria-label="YouTube"><YoutubeIcon /></a>
          </div>
        </div>

        {/* MASTHEAD */}
        <div className="nw-head">
          <Link href="/" className="nw-logo">AGRI<span>WIRE</span></Link>
          <span className="nw-head-tagline">Rwanda's science & food security intelligence platform</span>
        </div>

        {/* NAV */}
        <nav className="nw-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              className={`nw-nav-item${activeNav === item ? ' active' : ''}`}
              onClick={() => setActiveNav(item)}
            >
              {item}
            </button>
          ))}
          <span className="nw-nav-search" aria-label="Search">
            <Search size={17} />
          </span>
        </nav>

        {/* TICKER */}
        <div className="nw-ticker">
          <span className="nw-ticker-label">Priority Notice</span>
          <p className="nw-ticker-scroll">
            Bringing professional values & deep insights into modern scientific research infrastructure across Rwanda
            &nbsp;·&nbsp; New biosafety framework scheduled for ratification
            &nbsp;·&nbsp; Kigali Biotech Summit opens next month
          </p>
        </div>

        <div className="nw-inner">

          {/* SECTION HEADER */}
          <div className="nw-section-header">
            <span className="nw-section-dot" />
            <span className="nw-section-title">Top Analytical Headlines</span>
            <span className="nw-section-count">
              <Clock size={11} style={{ marginRight: 4, verticalAlign: 'middle' }} />
              Updated June 3, 2026
            </span>
          </div>

          {/* FEATURED HERO */}
          <div className="nw-featured">
            <Link href={`/items/${LEAD_STORY.id}`} className="nw-feat-main" style={{ textDecoration: 'none' }}>
              <img src={LEAD_STORY.image} alt={LEAD_STORY.title} />
              <div className="nw-feat-overlay" />
              <div className="nw-feat-body">
                <span className="nw-feat-cat">{LEAD_STORY.category}</span>
                <h2 className="nw-feat-title">{LEAD_STORY.title}</h2>
                <div className="nw-feat-meta">
                  <span>{LEAD_STORY.author}</span>
                  <span className="nw-feat-meta-dot" />
                  <span>{LEAD_STORY.time}</span>
                </div>
              </div>
            </Link>
            <div className="nw-feat-stack">
              {SECONDARY_STORIES.map((story) => (
                <Link key={story.id} href={`/items/${story.id}`} className="nw-feat-sm" style={{ textDecoration: 'none' }}>
                  <img src={story.image} alt={story.title} />
                  <div className="nw-feat-sm-overlay" />
                  <div className="nw-feat-sm-body">
                    <span className="nw-feat-sm-cat">{story.category}</span>
                    <p className="nw-feat-sm-title">{story.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* BODY */}
          <div className="nw-body">

            {/* ARTICLE GRID */}
            <div>
              <div className="nw-section-header">
                <span className="nw-section-dot" />
                <span className="nw-section-title">Latest Reports</span>
                <TrendingUp size={13} style={{ marginLeft: 'auto', color: 'var(--green)' }} />
              </div>

              <div className="nw-grid">
                {ARTICLES.map((article) => (
                  <article key={article.id} className="nw-article">
                    <div className="nw-article-img">
                      <img src={article.image} alt={article.title} />
                      <span className="nw-article-cat">{article.category}</span>
                    </div>
                    <div className="nw-article-body">
                      <Link href={`/items/${article.id}`} className="nw-article-title">
                        {article.title}
                      </Link>
                      <p className="nw-article-excerpt">{article.excerpt}</p>
                      <div className="nw-article-foot">
                        <span className="nw-article-author">{article.time}</span>
                        <Link href={`/items/${article.id}`} className="nw-article-read">
                          Read <ArrowRight size={11} />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* PAGINATION */}
              <div className="nw-pager">
                {[1, 2, 3].map((p) => (
                  <button
                    key={p}
                    className={`nw-page-btn${currentPage === p ? ' active' : ''}`}
                    onClick={() => setCurrentPage(p)}
                  >
                    {p}
                  </button>
                ))}
                <button className="nw-page-btn" onClick={() => setCurrentPage((p) => Math.min(p + 1, 3))}>
                  <ChevronRight size={13} />
                </button>
                <span className="nw-page-of">Page {currentPage} of 3</span>
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="nw-sb">

              {/* Stay Connected */}
              <div className="nw-social-box">
                <div className="nw-section-header" style={{ marginBottom: 12 }}>
                  <span className="nw-section-dot" />
                  <span className="nw-section-title">Stay Connected</span>
                </div>
                <div className="nw-social-row">
                  <div className="nw-social-left">
                    <div className="nw-social-icon fb"><FacebookIcon /></div>
                    <div>
                      <div className="nw-social-count">4,820</div>
                      <div className="nw-social-label">Fans</div>
                    </div>
                  </div>
                  <button className="nw-social-btn like">Like</button>
                </div>
                <div className="nw-social-row">
                  <div className="nw-social-left">
                    <div className="nw-social-icon tw"><TwitterIcon /></div>
                    <div>
                      <div className="nw-social-count">5,912</div>
                      <div className="nw-social-label">Followers</div>
                    </div>
                  </div>
                  <button className="nw-social-btn follow">Follow</button>
                </div>
                <div className="nw-social-row">
                  <div className="nw-social-left">
                    <div className="nw-social-icon yt"><YoutubeIcon /></div>
                    <div>
                      <div className="nw-social-count">22,800</div>
                      <div className="nw-social-label">Subscribers</div>
                    </div>
                  </div>
                  <button className="nw-social-btn sub">Subscribe</button>
                </div>
              </div>

              {/* Editor Picks */}
              <div className="nw-picks">
                <div className="nw-section-header" style={{ marginBottom: 10 }}>
                  <span className="nw-section-dot" />
                  <span className="nw-section-title">Editor Picks</span>
                </div>
                <div className="nw-pick-filter">
                  {['All', 'Research', 'Policy'].map((f) => (
                    <button
                      key={f}
                      className={`nw-pick-pill${activePick === f ? ' active' : ''}`}
                      onClick={() => setActivePick(f)}
                    >
                      {f}
                    </button>
                  ))}
                </div>
                {EDITOR_PICKS.map((pick) => (
                  <div key={pick.id} className="nw-pick-item">
                    <p className="nw-pick-title">{pick.title}</p>
                    <div className="nw-pick-meta">
                      <span className="nw-pick-dot" />
                      {pick.author} · {pick.date}
                    </div>
                  </div>
                ))}
              </div>

              {/* Newsletter CTA */}
              <div className="nw-cta">
                <p className="nw-cta-label">Research Hub</p>
                <h4 className="nw-cta-title">Access Bio-Safety Data Sheets & Field Reports</h4>
                <p className="nw-cta-desc">
                  Sign up for deep-dives on food safety guidelines, technological advancements, and modern bioscience policy.
                </p>
                <input
                  type="email"
                  placeholder="professional@email.rw"
                  className="nw-cta-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="nw-cta-btn">Request Access</button>
              </div>

            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="nw-footer">
          <div className="nw-footer-grid">
            <div>
              <Link href="/" className="nw-footer-logo">AGRI<span>WIRE</span></Link>
              <p className="nw-footer-desc">
                Rwanda's premier science and agriculture intelligence platform. We provide breaking research news,
                biosafety data, and analytical reports straight from the field.
              </p>
              <p className="nw-footer-contact">
                Contact us: <a href="mailto:contact@agriwire.rw">contact@agriwire.rw</a>
              </p>
            </div>
            <div>
              <p className="nw-footer-col-title">Even More News</p>
              <div className="nw-footer-links">
                <a href="#">Biotechnology developments in East Africa</a>
                <a href="#">Hexagon: the new circle in 2026</a>
                <a href="#">10 Most Visited Research Sites in Rwanda</a>
              </div>
            </div>
            <div>
              <p className="nw-footer-col-title">Popular Categories</p>
              <div className="nw-footer-links">
                {[['Food Security', 13], ['Climate Change', 9], ['Biotechnology', 9], ['Policy', 8], ['Research', 7], ['Soil Science', 6]].map(([label, count]) => (
                  <a key={label as string} href="#">
                    {label}
                    <span className="nw-footer-links-count">{count}</span>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="nw-footer-col-title">Quick Links</p>
              <div className="nw-footer-links">
                <a href="#">About AgriWire</a>
                <a href="#">Editorial Policy</a>
                <a href="#">Data & Privacy</a>
                <a href="#">Advertise</a>
                <a href="#">Press Kit</a>
              </div>
            </div>
          </div>
          <div className="nw-footer-bar">
            <span className="nw-footer-copy">© 2026 AgriWire — Rwanda Science & Agriculture Intelligence</span>
            <div className="nw-footer-bar-links">
              <a href="#">Disclaimer</a>
              <a href="#">Privacy</a>
              <a href="#">Advertisement</a>
              <a href="#">Contact us</a>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}