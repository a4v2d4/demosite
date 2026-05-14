import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Mail } from 'lucide-react';

const GithubIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const DARK_BG   = '#0d0b09';
const LIGHT_BG  = '#faf7f2';
const ACCENT_DARK  = '#c9a84c';
const ACCENT_LIGHT = '#c9a84c';

const AaronVanDoren = () => {
  const [darkMode, setDarkMode] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => setDarkMode(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? DARK_BG : LIGHT_BG;
  }, [darkMode]);

  const accentColor = darkMode ? ACCENT_DARK : ACCENT_LIGHT;
  const textColor   = darkMode ? '#f5efe6' : '#1a1614';

  const shimmerRefs = useRef([]);

  // After initial animations complete, lock in the visible/gold state as
  // inline styles and remove the initial animation classes. This frees up
  // the animation property so the hover shimmer can run without !important
  // accidentally killing the reveal fill (max-width / opacity).
  useEffect(() => {
    const timer = setTimeout(() => {
      shimmerRefs.current.forEach(el => {
        if (!el) return;
        el.style.maxWidth = '300px';
        el.style.opacity = '1';
        el.style.color = 'var(--accent)';
        el.classList.remove('animate-reveal-shimmer-first', 'animate-reveal-shimmer-last');
      });
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  const triggerHoverShimmer = () => {
    shimmerRefs.current.forEach(el => {
      if (!el) return;
      el.classList.remove('hover-shimmer-active');
      void el.offsetWidth; // force reflow to restart the animation
      el.classList.add('hover-shimmer-active');
      el.addEventListener('animationend', () => {
        el.classList.remove('hover-shimmer-active');
      }, { once: true });
    });
  };

  return (
    <div
      className="min-h-screen transition-colors duration-500"
      style={{ color: textColor, '--accent': accentColor, '--text-c': textColor }}
    >

      {/* Upper Right Toggle Area */}
      <div className="absolute top-8 right-8 flex items-center gap-2">
        {darkMode ? (
          <Moon className="w-4 h-4" style={{ color: '#a89070' }} />
        ) : (
          <Sun className="w-4 h-4" style={{ color: ACCENT_LIGHT }} />
        )}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300"
          style={{ backgroundColor: darkMode ? '#2e2820' : '#d9cfc4' }}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full transition-transform duration-200 ${
              darkMode ? 'translate-x-6' : 'translate-x-1'
            }`}
            style={{ backgroundColor: darkMode ? ACCENT_DARK : ACCENT_LIGHT }}
          />
        </button>
      </div>

      {/* Centered Name + Contact */}
      <div className="flex flex-col justify-center items-center h-screen">
        <h1
          className="flex items-center gap-4"
          onMouseEnter={triggerHoverShimmer}
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(2rem, 8vw, 5.5rem)',
            fontWeight: 300,
            letterSpacing: '0.15em',
            cursor: 'default',
          }}
        >
          {/* Aaron */}
          <div className="flex items-center aaron-name-wrapper">
            <span style={{ color: accentColor }}>A</span>
            <span ref={el => { shimmerRefs.current[0] = el; }} className="inline-block overflow-hidden whitespace-nowrap opacity-0 max-w-0 shimmer-text animate-reveal-shimmer-first">aron</span>
            <div className="w-[2px] animate-cursor-first opacity-0" style={{ height: '0.85em', backgroundColor: accentColor, marginLeft: '3px' }}></div>
          </div>

          {/* Van Doren */}
          <div className="flex gap-4 vandoren-wrapper">
            {/* Van */}
            <div className="flex items-center">
              <span style={{ color: accentColor }}>V</span>
              <span ref={el => { shimmerRefs.current[1] = el; }} className="inline-block overflow-hidden whitespace-nowrap opacity-0 max-w-0 shimmer-text animate-reveal-shimmer-last">an</span>
              <div className="w-[2px] animate-cursor-last opacity-0" style={{ height: '0.85em', backgroundColor: accentColor, marginLeft: '3px' }}></div>
            </div>

            {/* Doren */}
            <div className="flex items-center">
              <span style={{ color: accentColor }}>D</span>
              <span ref={el => { shimmerRefs.current[2] = el; }} className="inline-block overflow-hidden whitespace-nowrap opacity-0 max-w-0 shimmer-text animate-reveal-shimmer-last">oren</span>
              <div className="w-[2px] animate-cursor-last opacity-0" style={{ height: '0.85em', backgroundColor: accentColor, marginLeft: '3px' }}></div>
            </div>
          </div>
        </h1>

        {/* Contact links — fade in after name animation completes */}
        <div className="animate-contact flex items-center gap-6 opacity-0 mt-8">
          <a
            href="mailto:aaronvandoren6@gmail.com"
            title="Send email to Aaron Van Doren"
            aria-label="Send email to Aaron Van Doren"
            className="contact-link flex items-center gap-2"
            style={{ color: textColor }}
          >
            <Mail className="contact-icon w-4 h-4" />
            <span
              className="contact-label"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(0.76rem, 2.8vw, 0.9rem)',
                letterSpacing: '0.2em',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
            >
              Contact
            </span>
          </a>

          {/* <a
            href="https://github.com/a4v2d4"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="contact-link flex items-center gap-2"
            style={{ color: textColor }}
          >
            <GithubIcon className="contact-icon w-4 h-4" />
            <span
              className="contact-label"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(0.76rem, 2.8vw, 0.9rem)',
                letterSpacing: '0.2em',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
            >
              GitHub
            </span>
          </a>

          <a
            href="https://linkedin.com/in/aaronvandoren"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="contact-link flex items-center gap-2"
            style={{ color: textColor }}
          >
            <LinkedinIcon className="contact-icon w-4 h-4" />
            <span
              className="contact-label"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(0.76rem, 2.8vw, 0.9rem)',
                letterSpacing: '0.2em',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
            >
              LinkedIn
            </span>
          </a> */}
        </div>
      </div>

      <style>{`
        @keyframes reveal {
          from { max-width: 0; opacity: 0; }
          to { max-width: 300px; opacity: 1; }
        }

        @keyframes blink {
          50% { opacity: 0; }
        }

        @keyframes showHideCursor {
          0%, 100% { opacity: 0; }
          5%, 95% { opacity: 1; }
        }

        @keyframes shimmerSweep {
          from { background-position: 100% center; }
          to   { background-position: 0% center; }
        }

        @keyframes toSolidGold {
          from { color: transparent; }
          to   { color: var(--accent); }
        }

        .shimmer-text {
          color: transparent;
          background: linear-gradient(
            90deg,
            var(--accent)  0%,
            var(--accent)  22%,
            #fff8dc        33%,
            var(--accent)  44%,
            var(--text-c)  62%,
            var(--text-c) 100%
          );
          background-size: 300% 100%;
          background-position: 100% center;
          -webkit-background-clip: text;
          background-clip: text;
        }

        .animate-reveal-shimmer-first {
          animation: reveal 1s ease-out forwards 0.5s,
                     shimmerSweep 0.85s ease-in-out both 3.4s,
                     toSolidGold 0.1s ease-out both 4.25s;
        }

        .animate-reveal-shimmer-last {
          animation: reveal 1s ease-out forwards 2.2s,
                     shimmerSweep 0.85s ease-in-out both 3.4s,
                     toSolidGold 0.1s ease-out both 4.25s;
        }

        .animate-cursor-first {
          animation: blink 0.7s infinite, showHideCursor 1.2s forwards 0.3s;
        }

        .animate-cursor-last {
          animation: blink 0.7s infinite, showHideCursor 1.3s forwards 2.0s;
        }

        .animate-contact {
          animation: fadeIn 0.8s ease-out forwards 4.2s;
        }

        @keyframes fadeIn {
          to { opacity: 1; }
        }

        .contact-link {
          position: relative;
          transition: transform 0.25s ease, opacity 0.25s ease;
          text-decoration: none;
          cursor: pointer;
          user-select: none;
        }

        .contact-link:hover {
          transform: translateY(-2px);
          opacity: 0.85;
        }

        .contact-link .contact-icon {
          transition: transform 0.25s ease;
        }

        .contact-link:hover .contact-icon {
          transform: translateX(-3px) rotate(-8deg);
        }

        .contact-label {
          position: relative;
        }

        .contact-label::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0;
          height: 1px;
          background: currentColor;
          transition: width 0.3s ease;
        }

        .contact-link:hover .contact-label::after {
          width: 100%;
        }

        /* ── Hover shimmer: gold → bright flash → gold ── */
        @keyframes hoverShimmerSweep {
          0%   { color: transparent; background-position: 0% center; }
          100% { color: transparent; background-position: 100% center; }
        }

        .hover-shimmer-active {
          animation: hoverShimmerSweep 0.9s ease-in-out forwards;
          color: transparent;
          background: linear-gradient(
            90deg,
            var(--accent) 0%,
            var(--accent) 22%,
            #fffef4       46%,
            var(--accent) 70%,
            var(--accent) 100%
          );
          background-size: 300% 100%;
          -webkit-background-clip: text;
          background-clip: text;
        }
      `}</style>
    </div>
  );
};

export default AaronVanDoren;
