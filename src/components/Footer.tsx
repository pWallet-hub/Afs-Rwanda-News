import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = ['Home', 'Science', 'Policy', 'About'];
  const legalLinks = ['Terms of Engagement', 'Privacy Architecture', 'Cookie Policy'];

  return (
    <footer className="w-full bg-[#001F3F] text-slate-400 border-t-[3px] border-[#70C113] mt-auto">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500&display=swap');
        .footer-root { font-family: 'DM Sans', sans-serif; }
        .footer-brand { font-family: 'DM Serif Display', serif; }
      `}</style>

      <div className="footer-root max-w-[1200px] mx-auto px-16 pt-12 pb-8">

        {/* Main horizontal row */}
        <div className="flex flex-row items-start justify-between gap-16 pb-10 border-b border-white/10">

          {/* Brand — vertical stack */}
          <div className="flex flex-col gap-3 min-w-[220px] pr-8">
            <p className="footer-brand text-xl tracking-[0.04em] text-white leading-none">
              AFS<span className="text-[#70C113]">·</span>NEWS
            </p>
            <p className="text-xs font-light text-[#64748b] leading-relaxed max-w-[220px]">
              Collaborative media framework operating under the Alliance for Science branding.
            </p>
          </div>

          {/* Navigate — vertical stack */}
          <div className="flex flex-col gap-3 px-8">
            <p className="text-[10px] font-medium tracking-[0.12em] uppercase text-[#70C113]">
              Navigate
            </p>
            <ul className="flex flex-col gap-2">
              {navLinks.map((item) => (
                <li key={item}>
                  <a href="#" className="text-[13px] text-slate-400 hover:text-white transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal — vertical stack */}
          <div className="flex flex-col gap-3 pl-8">
            <p className="text-[10px] font-medium tracking-[0.12em] uppercase text-[#70C113]">
              Legal
            </p>
            <ul className="flex flex-col gap-2">
              {legalLinks.map((item) => (
                <li key={item}>
                  <a href="#" className="text-[13px] text-slate-400 hover:text-white transition-colors duration-200 whitespace-nowrap">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex flex-row justify-between items-center pt-6 pb-2">
          <p className="text-[11px] text-[#475569]">
            © {currentYear}{' '}
            <span className="text-[#70C113] font-medium">Alliance for Science Rwanda</span>
            <span className="inline-block w-[5px] h-[5px] rounded-full bg-[#334155] mx-2 align-middle" />
            All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            <a href="#" aria-label="Twitter / X"
              className="w-[28px] h-[28px] rounded-full border border-[#70C113]/30 flex items-center justify-center text-[#70C113] hover:bg-[#70C113]/[0.12] hover:border-[#70C113] transition-all duration-200">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4l16 16M4 20L20 4" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn"
              className="w-[28px] h-[28px] rounded-full border border-[#70C113]/30 flex items-center justify-center text-[#70C113] hover:bg-[#70C113]/[0.12] hover:border-[#70C113] transition-all duration-200">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a href="#" aria-label="RSS"
              className="w-[28px] h-[28px] rounded-full border border-[#70C113]/30 flex items-center justify-center text-[#70C113] hover:bg-[#70C113]/[0.12] hover:border-[#70C113] transition-all duration-200">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 11a9 9 0 0 1 9 9" />
                <path d="M4 4a16 16 0 0 1 16 16" />
                <circle cx="5" cy="19" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}