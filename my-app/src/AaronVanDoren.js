import React, { useState, useEffect } from 'react';
import { Sun, Moon, Mail } from 'lucide-react';

const DARK_BG   = '#0d0b09';
const LIGHT_BG  = '#faf7f2';
const ACCENT_DARK  = '#c9a84c';
const ACCENT_LIGHT = '#9a6f24';

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
      style={{ color: textColor }}
    >

      {/* Contact Mail Button */}
      <div className="absolute top-8 left-8">
        <a
          href="mailto:aaronvandoren6@gmail.com"
          aria-label="Send email to Aaron Van Doren"
          className="flex items-center gap-2 transition-opacity duration-200 hover:opacity-70"
          style={{ color: accentColor }}
        >
          <Mail className="w-5 h-5" />
          <span
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '0.85rem',
              letterSpacing: '0.12em',
              fontWeight: 400,
            }}
          >
            Contact
          </span>
        </a>
      </div>

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

      {/* Centered Name Animation */}
      <div className="flex justify-center items-center h-screen">
        <h1
          className="flex gap-4"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(3rem, 8vw, 5.5rem)',
            fontWeight: 300,
            letterSpacing: '0.15em',
          }}
        >
          {/* Aaron */}
          <div className="flex items-center">
            <span className="animate-color-reset" style={{ color: accentColor }}>A</span>
            <span className="inline-block overflow-hidden whitespace-nowrap animate-reveal-first opacity-0 max-w-0">aron</span>
            <div className="w-[2px] animate-cursor-first opacity-0" style={{ height: '0.85em', backgroundColor: accentColor, marginLeft: '3px' }}></div>
          </div>

          {/* Van */}
          <div className="flex items-center">
            <span className="animate-color-reset" style={{ color: accentColor }}>V</span>
            <span className="inline-block overflow-hidden whitespace-nowrap animate-reveal-last opacity-0 max-w-0">an</span>
            <div className="w-[2px] animate-cursor-last opacity-0" style={{ height: '0.85em', backgroundColor: accentColor, marginLeft: '3px' }}></div>
          </div>

          {/* Doren */}
          <div className="flex items-center">
            <span className="animate-color-reset" style={{ color: accentColor }}>D</span>
            <span className="inline-block overflow-hidden whitespace-nowrap animate-reveal-last opacity-0 max-w-0">oren</span>
            <div className="w-[2px] animate-cursor-last opacity-0" style={{ height: '0.85em', backgroundColor: accentColor, marginLeft: '3px' }}></div>
          </div>
        </h1>
      </div>

      <style>{`
        @keyframes reveal {
          from { max-width: 0; opacity: 0; }
          to { max-width: 300px; opacity: 1; }
        }

        @keyframes colorReset {
          to { color: inherit; }
        }

        @keyframes blink {
          50% { opacity: 0; }
        }

        @keyframes showHideCursor {
          0%, 100% { opacity: 0; }
          5%, 95% { opacity: 1; }
        }

        .animate-reveal-first {
          animation: reveal 1s ease-out forwards 0.5s;
        }

        .animate-reveal-last {
          animation: reveal 1s ease-out forwards 2.2s;
        }

        .animate-cursor-first {
          animation: blink 0.7s infinite, showHideCursor 1.2s forwards 0.3s;
        }

        .animate-cursor-last {
          animation: blink 0.7s infinite, showHideCursor 1.3s forwards 2.0s;
        }

        .animate-color-reset {
          animation: colorReset 0.5s ease-out forwards 3.8s;
        }
      `}</style>
    </div>
  );
};

export default AaronVanDoren;
