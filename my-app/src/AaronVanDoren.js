import React, { useState, useEffect } from 'react';
import { Sun, Moon, Mail } from 'lucide-react';

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
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(2rem, 8vw, 5.5rem)',
            fontWeight: 300,
            letterSpacing: '0.15em',
          }}
        >
          {/* Aaron */}
          <div className="flex items-center aaron-name-wrapper">
            <span style={{ color: accentColor }}>A</span>
            <span className="inline-block overflow-hidden whitespace-nowrap opacity-0 max-w-0 shimmer-text animate-reveal-shimmer-first">aron</span>
            <div className="w-[2px] animate-cursor-first opacity-0" style={{ height: '0.85em', backgroundColor: accentColor, marginLeft: '3px' }}></div>
          </div>

          {/* Van Doren */}
          <div className="flex gap-4 vandoren-wrapper">
            {/* Van */}
            <div className="flex items-center">
              <span style={{ color: accentColor }}>V</span>
              <span className="inline-block overflow-hidden whitespace-nowrap opacity-0 max-w-0 shimmer-text animate-reveal-shimmer-last">an</span>
              <div className="w-[2px] animate-cursor-last opacity-0" style={{ height: '0.85em', backgroundColor: accentColor, marginLeft: '3px' }}></div>
            </div>

            {/* Doren */}
            <div className="flex items-center">
              <span style={{ color: accentColor }}>D</span>
              <span className="inline-block overflow-hidden whitespace-nowrap opacity-0 max-w-0 shimmer-text animate-reveal-shimmer-last">oren</span>
              <div className="w-[2px] animate-cursor-last opacity-0" style={{ height: '0.85em', backgroundColor: accentColor, marginLeft: '3px' }}></div>
            </div>
          </div>
        </h1>

        {/* Contact link — fades in after name animation completes */}
        <a
          href="mailto:aaronvandoren6@gmail.com"
          aria-label="Send email to Aaron Van Doren"
          className="contact-link animate-contact flex items-center gap-2 opacity-0 mt-8"
          style={{ color: textColor }}
        >
          <Mail className="contact-icon w-4 h-4" />
          <span
            className="contact-label"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(0.76rem, 2.8vw, 0.9rem)', // responsive: smaller on mobile, 0.9rem max
              letterSpacing: '0.2em',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            Contact
          </span>
   
        </a>
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
      `}</style>
    </div>
  );
};

export default AaronVanDoren;
