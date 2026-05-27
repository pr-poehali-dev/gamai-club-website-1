import * as React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

/* ─── Minecraft click-частицы ─────────────────────────────── */
const MC_COLORS_ANARCHY = ['#ff4500', '#ff6a00', '#ff8c00', '#ffaa00', '#cc2200'];
const MC_COLORS_CLASSIC = ['#ff9900', '#ffb830', '#ffd060', '#ff8800', '#ffcc44'];

const BLOCK_CHARS = ['▪', '▫', '◼', '◻', '■', '□'];

function spawnParticles(x: number, y: number) {
  const isClassic = document.body.classList.contains('theme-classic');
  const colors = isClassic ? MC_COLORS_CLASSIC : MC_COLORS_ANARCHY;
  const count = 7 + Math.floor(Math.random() * 5);

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'click-particle';
    el.textContent = BLOCK_CHARS[Math.floor(Math.random() * BLOCK_CHARS.length)];

    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
    const dist = 30 + Math.random() * 50;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - Math.random() * 20;

    const size = 6 + Math.floor(Math.random() * 8);
    const color = colors[Math.floor(Math.random() * colors.length)];

    el.style.cssText = `
      left: ${x - size / 2}px;
      top: ${y - size / 2}px;
      width: ${size}px;
      height: ${size}px;
      color: ${color};
      font-size: ${size}px;
      line-height: 1;
      --dx: ${dx}px;
      --dy: ${dy}px;
      animation-duration: ${0.4 + Math.random() * 0.4}s;
    `;

    document.body.appendChild(el);
    setTimeout(() => el.remove(), 800);
  }
}

document.addEventListener('click', (e) => {
  spawnParticles(e.clientX, e.clientY);
});
/* ─────────────────────────────────────────────────────────── */

createRoot(document.getElementById("root")!).render(<App />);
