import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface VideoPageProps {
  server: 'anarchy' | 'classic';
}

const VIDEOS = {
  anarchy: [
    { id: '-ioHuCZryTg', title: 'Трейлер сервера Анархия', desc: 'Официальный трейлер — атмосфера, PvP, разрушения' },
    { id: 'dQw4w9WgXcQ', title: 'Лучшие моменты', desc: 'Эпичные бои и рейды игроков' },
    { id: 'dQw4w9WgXcQ', title: 'Обзор механик', desc: 'Как устроена анархия на нашем сервере' },
  ],
  classic: [
    { id: '5QU20HMPZ3M', title: 'Трейлер сервера Классика', desc: 'Официальный трейлер — стройка, города, сообщество' },
    { id: 'dQw4w9WgXcQ', title: 'Лучшие постройки', desc: 'Топ построек игроков за 2024 год' },
    { id: 'dQw4w9WgXcQ', title: 'Экономика сервера', desc: 'Как зарабатывать и торговать на классике' },
  ],
};

export default function VideoPage({ server }: VideoPageProps) {
  const color = server === 'anarchy' ? '#ff4500' : '#ff9900';
  const videos = VIDEOS[server];
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div className="relative z-10 container pt-28 pb-20">
      {/* Заголовок */}
      <div className="text-center mb-12 animate-fade-in">
        <div className="font-pixel text-xs text-muted-foreground tracking-[0.4em] mb-3">ВИДЕО</div>
        <h2
          className="font-pixel text-3xl md:text-4xl mb-4"
          style={{ color, textShadow: `2px 2px 0 #000, 0 0 30px ${color}60` }}
        >
          {server === 'anarchy' ? '💀 АНАРХИЯ' : '🌲 КЛАССИКА'}
        </h2>
        <p className="font-rubik text-muted-foreground">
          Посмотри видео и почувствуй атмосферу сервера
        </p>
      </div>

      {/* Сетка видео */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, i) => (
          <div
            key={i}
            className="animate-fade-in"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <button
              className="group w-full text-left border-2 overflow-hidden block transition-all"
              style={{
                borderColor: 'hsl(var(--border))',
                boxShadow: '4px 4px 0 #000',
              }}
              onClick={() => setActiveVideo(video.id)}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = color;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${color}30, 6px 6px 0 #000`;
                (e.currentTarget as HTMLElement).style.transform = 'translate(-2px,-2px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'hsl(var(--border))';
                (e.currentTarget as HTMLElement).style.boxShadow = '4px 4px 0 #000';
                (e.currentTarget as HTMLElement).style.transform = 'translate(0,0)';
              }}
            >
              {/* Превью */}
              <div className="relative aspect-video bg-black overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover opacity-75 group-hover:opacity-95 transition-opacity duration-200"
                />
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: `rgba(0,0,0,0.3)` }}
                >
                  <div
                    className="w-14 h-14 flex items-center justify-center border-3 group-hover:scale-110 transition-transform"
                    style={{
                      borderColor: color,
                      background: `${color}40`,
                      border: `3px solid ${color}`,
                      boxShadow: `0 0 20px ${color}60`,
                    }}
                  >
                    <div
                      className="ml-1"
                      style={{
                        width: 0, height: 0,
                        borderTop: '10px solid transparent',
                        borderBottom: '10px solid transparent',
                        borderLeft: `18px solid ${color}`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Инфо */}
              <div className="p-4 bg-card">
                <div className="font-pixel text-[10px] mb-1" style={{ color }}>{video.title}</div>
                <p className="font-rubik text-xs text-muted-foreground">{video.desc}</p>
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* Модалка плеера */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl mx-4 border-2 animate-scale-in"
            style={{ borderColor: color, boxShadow: `0 0 60px ${color}40, 8px 8px 0 #000` }}
            onClick={e => e.stopPropagation()}
          >
            {/* Закрыть */}
            <button
              className="absolute -top-4 -right-4 z-10 w-8 h-8 flex items-center justify-center border-2"
              style={{ background: '#000', borderColor: color, color }}
              onClick={() => setActiveVideo(null)}
            >
              <Icon name="X" size={14} />
            </button>
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0&modestbranding=1`}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="video"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
