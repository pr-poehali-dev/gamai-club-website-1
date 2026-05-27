import { useEffect, useRef } from 'react';

interface VideoBackgroundProps {
  server: 'anarchy' | 'classic';
}

export default function VideoBackground({ server }: VideoBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const videoId = server === 'anarchy' ? '-ioHuCZryTg' : '5QU20HMPZ3M';

  return (
    <>
      <div className="video-bg" ref={containerRef}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&disablekb=1&fs=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&start=15`}
          allow="autoplay; encrypted-media"
          allowFullScreen={false}
          title="background video"
          style={{ filter: 'blur(4px) brightness(0.75)', transform: 'translate(-50%, -50%) scale(1.06)' }}
        />
      </div>
      <div className="video-overlay" />
      <div className="fixed inset-0 z-[2] pixel-grid pointer-events-none" />
      <div className="scanlines" />
    </>
  );
}