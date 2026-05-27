import { useEffect, useState } from 'react';

interface ServerSelectProps {
  onSelect: (server: 'anarchy' | 'classic') => void;
}

export default function ServerSelect({ onSelect }: ServerSelectProps) {
  const [highlighted, setHighlighted] = useState<'anarchy' | 'classic'>('anarchy');
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(() => {
      setHighlighted(prev => prev === 'anarchy' ? 'classic' : 'anarchy');
    }, 10000);
    return () => clearTimeout(timer);
  }, [highlighted, paused]);

  const handleSelect = (server: 'anarchy' | 'classic') => {
    setVisible(false);
    setTimeout(() => onSelect(server), 350);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-4xl mx-4 p-8 bg-black/60"
        style={{ border: '3px solid #ff4500', boxShadow: '0 0 60px rgba(255,69,0,0.3), 8px 8px 0px #000' }}
      >
        {/* Заголовок */}
        <div className="text-center mb-10">
          <div className="font-pixel text-[10px] text-muted-foreground mb-4 tracking-[0.4em]">— ВЫБОР СЕРВЕРА —</div>
          <h1 className="font-pixel text-3xl md:text-5xl text-foreground mb-3" style={{ textShadow: '0 0 30px rgba(255,69,0,0.7), 3px 3px 0 #000' }}>
            GAMAI CLUB
          </h1>
          <p className="font-rubik text-sm text-muted-foreground tracking-wider">mc.gamai.club • Java 1.21.1</p>
        </div>

        {/* Карточки серверов */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Анархия */}
          <button
            className="group relative p-7 border-2 text-left transition-all duration-200"
            style={{
              borderColor: highlighted === 'anarchy' ? '#ff4500' : 'rgba(255,255,255,0.1)',
              background: highlighted === 'anarchy'
                ? 'linear-gradient(135deg, rgba(255,69,0,0.18), rgba(139,0,0,0.12))'
                : 'rgba(0,0,0,0.4)',
              boxShadow: highlighted === 'anarchy'
                ? '0 0 40px rgba(255,69,0,0.35), inset 0 0 20px rgba(255,69,0,0.05), 5px 5px 0px #000'
                : '5px 5px 0px #000',
            }}
            onClick={() => handleSelect('anarchy')}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {highlighted === 'anarchy' && (
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: 'linear-gradient(90deg, transparent, #ff4500, transparent)' }}
              />
            )}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">💀</span>
              <div>
                <h2 className="font-pixel text-xl mb-1" style={{ color: '#ff4500' }}>АНАРХИЯ</h2>
                <div className="flex gap-1">
                  <span className="font-pixel text-[7px] px-2 py-0.5" style={{ background: '#ff4500', color: '#000' }}>PVP</span>
                  <span className="font-pixel text-[7px] px-2 py-0.5 border" style={{ borderColor: '#ff4500', color: '#ff4500' }}>ГРИФ</span>
                  <span className="font-pixel text-[7px] px-2 py-0.5 border" style={{ borderColor: '#ff4500', color: '#ff4500' }}>РЕЙДЫ</span>
                </div>
              </div>
            </div>
            <p className="font-rubik text-sm leading-relaxed" style={{ color: 'rgba(255,200,180,0.75)' }}>
              Никаких правил. Полная свобода. Выживай любой ценой в мире без законов.
            </p>
            <div
              className="mt-5 font-pixel text-[9px] py-2 text-center border-2 transition-all"
              style={{
                borderColor: '#ff4500',
                color: highlighted === 'anarchy' ? '#000' : '#ff4500',
                background: highlighted === 'anarchy' ? '#ff4500' : 'transparent',
              }}
            >
              {highlighted === 'anarchy' ? '▶  НАЖМИ ENTER  ◀' : 'ВЫБРАТЬ'}
            </div>
          </button>

          {/* Классика */}
          <button
            className="group relative p-7 border-2 text-left transition-all duration-200"
            style={{
              borderColor: highlighted === 'classic' ? '#ff9900' : 'rgba(255,255,255,0.1)',
              background: highlighted === 'classic'
                ? 'linear-gradient(135deg, rgba(255,153,0,0.18), rgba(120,70,0,0.12))'
                : 'rgba(0,0,0,0.4)',
              boxShadow: highlighted === 'classic'
                ? '0 0 40px rgba(255,153,0,0.35), inset 0 0 20px rgba(255,153,0,0.05), 5px 5px 0px #000'
                : '5px 5px 0px #000',
            }}
            onClick={() => handleSelect('classic')}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {highlighted === 'classic' && (
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: 'linear-gradient(90deg, transparent, #ff9900, transparent)' }}
              />
            )}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">🌲</span>
              <div>
                <h2 className="font-pixel text-xl mb-1" style={{ color: '#ff9900' }}>КЛАССИКА</h2>
                <div className="flex gap-1">
                  <span className="font-pixel text-[7px] px-2 py-0.5" style={{ background: '#ff9900', color: '#000' }}>СТРОЙКА</span>
                  <span className="font-pixel text-[7px] px-2 py-0.5 border" style={{ borderColor: '#ff9900', color: '#ff9900' }}>КЛАНЫ</span>
                  <span className="font-pixel text-[7px] px-2 py-0.5 border" style={{ borderColor: '#ff9900', color: '#ff9900' }}>ТОРГОВЛЯ</span>
                </div>
              </div>
            </div>
            <p className="font-rubik text-sm leading-relaxed" style={{ color: 'rgba(255,220,160,0.75)' }}>
              Классический Minecraft. Стройте, исследуйте, торгуйте в дружелюбном сообществе.
            </p>
            <div
              className="mt-5 font-pixel text-[9px] py-2 text-center border-2 transition-all"
              style={{
                borderColor: '#ff9900',
                color: highlighted === 'classic' ? '#000' : '#ff9900',
                background: highlighted === 'classic' ? '#ff9900' : 'transparent',
              }}
            >
              {highlighted === 'classic' ? '▶  НАЖМИ ENTER  ◀' : 'ВЫБРАТЬ'}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
