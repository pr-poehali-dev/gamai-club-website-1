import { useEffect, useState } from 'react';

interface ServerSelectProps {
  onSelect: (server: 'anarchy' | 'classic') => void;
}

export default function ServerSelect({ onSelect }: ServerSelectProps) {
  const [highlighted, setHighlighted] = useState<'anarchy' | 'classic'>('anarchy');
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (paused) return;

    setProgress(0);
    const startTime = Date.now();
    const duration = 10000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);

      if (elapsed >= duration) {
        setHighlighted(prev => prev === 'anarchy' ? 'classic' : 'anarchy');
        setProgress(0);
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [highlighted, paused]);

  const handleSelect = (server: 'anarchy' | 'classic') => {
    setVisible(false);
    setTimeout(() => onSelect(server), 400);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
      {/* Пиксельная рамка */}
      <div
        className="relative w-full max-w-4xl mx-4 p-8"
        style={{ border: '3px solid hsl(var(--glow))', boxShadow: '0 0 40px hsl(var(--glow) / 0.4), 8px 8px 0px #000' }}
      >
        {/* Заголовок */}
        <div className="text-center mb-8">
          <div className="font-pixel text-xs text-muted-foreground mb-3 tracking-widest">ВЫБОР СЕРВЕРА</div>
          <h1 className="font-pixel text-2xl md:text-4xl text-foreground pixel-text-shadow mb-2">
            GAMAI CLUB
          </h1>
          <p className="font-rubik text-sm text-muted-foreground">mc.gamai.club • Версия 1.21.1</p>
        </div>

        {/* Карточки серверов */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Анархия */}
          <button
            className="group relative p-6 border-2 text-left transition-all duration-150"
            style={{
              borderColor: highlighted === 'anarchy' ? '#ff4500' : 'hsl(var(--border))',
              background: highlighted === 'anarchy' ? 'linear-gradient(135deg, rgba(255,69,0,0.15), rgba(139,0,0,0.1))' : 'hsl(var(--card))',
              boxShadow: highlighted === 'anarchy' ? '0 0 30px rgba(255,69,0,0.4), 4px 4px 0px #000' : '4px 4px 0px #000',
            }}
            onClick={() => handleSelect('anarchy')}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {highlighted === 'anarchy' && (
              <div className="absolute top-2 right-2 font-pixel text-[8px] px-2 py-1" style={{ background: '#ff4500', color: '#000' }}>
                ВЫБРАНО
              </div>
            )}
            <div className="text-5xl mb-4">💀</div>
            <h2 className="font-pixel text-lg text-foreground mb-2" style={{ color: highlighted === 'anarchy' ? '#ff6a00' : undefined }}>
              АНАРХИЯ
            </h2>
            <p className="font-rubik text-sm text-muted-foreground mb-4">
              Никаких правил. Полная свобода. Выживай любой ценой в мире без законов.
            </p>
            <div className="flex flex-wrap gap-2">
              {['PvP', 'Гриф', 'Рейды', 'Война'].map(tag => (
                <span key={tag} className="font-pixel text-[8px] px-2 py-1 border" style={{ borderColor: '#ff4500', color: '#ff4500' }}>{tag}</span>
              ))}
            </div>
          </button>

          {/* Классика */}
          <button
            className="group relative p-6 border-2 text-left transition-all duration-150"
            style={{
              borderColor: highlighted === 'classic' ? '#4caf50' : 'hsl(var(--border))',
              background: highlighted === 'classic' ? 'linear-gradient(135deg, rgba(76,175,80,0.15), rgba(27,94,32,0.1))' : 'hsl(var(--card))',
              boxShadow: highlighted === 'classic' ? '0 0 30px rgba(76,175,80,0.4), 4px 4px 0px #000' : '4px 4px 0px #000',
            }}
            onClick={() => handleSelect('classic')}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {highlighted === 'classic' && (
              <div className="absolute top-2 right-2 font-pixel text-[8px] px-2 py-1" style={{ background: '#4caf50', color: '#000' }}>
                ВЫБРАНО
              </div>
            )}
            <div className="text-5xl mb-4">🌲</div>
            <h2 className="font-pixel text-lg text-foreground mb-2" style={{ color: highlighted === 'classic' ? '#66bb6a' : undefined }}>
              КЛАССИКА
            </h2>
            <p className="font-rubik text-sm text-muted-foreground mb-4">
              Классический Minecraft. Стройте, исследуйте, торгуйте в дружелюбном сообществе.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Стройка', 'Экономика', 'Клановый', 'Дружелюбный'].map(tag => (
                <span key={tag} className="font-pixel text-[8px] px-2 py-1 border" style={{ borderColor: '#4caf50', color: '#4caf50' }}>{tag}</span>
              ))}
            </div>
          </button>
        </div>

        {/* Прогресс-бар автопереключения */}
        <div className="relative">
          <div className="flex justify-between font-pixel text-[8px] text-muted-foreground mb-2">
            <span>АВТО-ПЕРЕКЛЮЧЕНИЕ</span>
            <span>{paused ? 'ПАУЗА' : `${Math.round((100 - progress) / 10)}с`}</span>
          </div>
          <div className="h-1 bg-secondary w-full">
            <div
              className="h-full transition-none"
              style={{
                width: `${progress}%`,
                background: highlighted === 'anarchy' ? '#ff4500' : '#4caf50',
                boxShadow: `0 0 8px ${highlighted === 'anarchy' ? '#ff4500' : '#4caf50'}`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
