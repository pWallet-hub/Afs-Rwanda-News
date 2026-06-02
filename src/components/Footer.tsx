import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const coverageLinks = ['Science & Research', 'Agriculture', 'Health', 'Climate', 'Technology'];
  const usefulLinks = ['Blog', 'Policy', 'About Us', 'Partnerships', 'Contact'];

  return (
    <footer className="w-full bg-[#001F3F] text-slate-400 border-t-[3px] border-[#70C113] mt-auto">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500&display=swap');
        .footer-root { font-family: 'DM Sans', sans-serif; }
        .footer-brand { font-family: 'DM Serif Display', serif; }
      `}</style>

      <div className="footer-root max-w-[1100px] mx-auto px-10 pt-14 pb-7">

        {/* Main row */}
        <div className="flex flex-row items-start gap-0 pb-9 border-b border-white/[0.08]">

          {/* Brand column */}
          <div className="flex flex-col gap-0 w-[260px] shrink-0 pr-10">
            <p className="footer-brand text-[22px] tracking-[0.04em] text-white leading-none mb-2.5">
              AFS<span className="text-[#70C113]">·</span>NEWS
            </p>
            <p className="text-[12px] font-light text-[#64748b] leading-relaxed mb-5">
              Collaborative media framework operating under the Alliance for Science branding. Science-driven journalism for Rwanda and beyond.
            </p>
            {/* Social icons */}
            <div className="flex flex-row gap-2 flex-wrap">
              {[
                { label: 'Facebook', icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/> },
                { label: 'Twitter', icon: <path d="M4 4l16 16M4 20L20 4"/> },
                { label: 'YouTube', icon: <><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.57 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/></> },
                { label: 'RSS', icon: <><path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1" fill="currentColor" stroke="none"/></> },
              ].map(({ label, icon }) => (
                <a key={label} href="#" aria-label={label}
                  className="w-8 h-8 rounded-full border border-[#70C113]/30 flex items-center justify-center text-[#70C113] hover:bg-[#70C113]/[0.12] hover:border-[#70C113] transition-all duration-200">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    {icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Right columns */}
          <div className="flex flex-row flex-1 justify-between gap-4">
            {[
              { heading: 'Coverage', links: coverageLinks },
              { heading: 'Useful Links', links: usefulLinks },
              { heading: 'Address', links: ['KG 7 Ave, Kacyiru', 'Kigali, Rwanda', 'info@afs.rw', '+250 788 000 000'], isAddress: true },
            ].map(({ heading, links, isAddress }) => (
              <div key={heading} className="flex flex-col gap-3.5">
                <p className="text-[14px] font-semibold text-white">{heading}</p>
                <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
                  {links.map((item) => (
                    <li key={item}>
                      {isAddress
                        ? <span className="text-[13px] font-light text-slate-400">{item}</span>
                        : <a href="#" className="text-[13px] font-light text-slate-400 hover:text-white transition-colors duration-200 no-underline">{item}</a>
                      }
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-center pt-5">
          <p className="text-[12px] text-[#475569]">
            All rights reserved by ©<span className="text-[#70C113] font-medium">Alliance for Science Rwanda</span> {currentYear}
          </p>
        </div>

      </div>
    </footer>
  );
}