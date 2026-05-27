import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface HomePageProps {
  server: 'anarchy' | 'classic';
  onGoStart: () => void;
  onGoVideo: () => void;
}

export default function HomePage({ server, onGoStart, onGoVideo }: HomePageProps) {
  const color = server === 'anarchy' ? '#ff4500' : '#ff9900';
  const colorSoft = server === 'anarchy' ? 'rgba(255,69,0,0.12)' : 'rgba(255,153,0,0.12)';

  const stats = server === 'anarchy'
    ? [{ label: 'Онлайн', value: '247', icon: '🔥' }, { label: 'Убийств', value: '128K', icon: '⚔️' }, { label: 'Взрывов', value: '12K', icon: '💥' }]
    : [{ label: 'Онлайн', value: '184', icon: '🌿' }, { label: 'Построено', value: '52K', icon: '🏗️' }, { label: 'Городов', value: '87', icon: '🏙️' }];

  const features = server === 'anarchy'
    ? [
        { icon: '⚔️', title: 'Полный PvP', desc: 'Без защищённых зон, кроме спавна' },
        { icon: '💣', title: 'Гриферство', desc: 'Взрывай, воруй, разрушай — всё законно' },
        { icon: '🏆', title: 'Топ игроков', desc: 'Рейтинг убийств и побед' },
        { icon: '⚡', title: 'TPS 20', desc: 'Стабильный сервер без лагов' },
      ]
    : [
        { icon: '🏗️', title: 'Стройка', desc: 'Защищённые участки и WorldEdit' },
        { icon: '💰', title: 'Экономика', desc: 'Магазины, торговля, аукцион' },
        { icon: '👥', title: 'Кланы', desc: 'Создай свой город с друзьями' },
        { icon: '🗺️', title: 'Карта мира', desc: 'Живая dynmap всего мира' },
      ];

  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      {/* Hero */}
      <div className="flex-1 flex items-center justify-center pt-16">
        <div className="container text-center py-24">

          {/* Онлайн-бейдж */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 border-2 mb-8 animate-fade-in"
            style={{ borderColor: color, background: colorSoft }}
          >
            <span
              className="animate-pulse"
              style={{ width: 8, height: 8, borderRadius: 0, background: color, display: 'inline-block' }}
            />
            <span className="font-pixel text-[9px]" style={{ color }}>
              {server === 'anarchy' ? '💀 СЕРВЕР АНАРХИЯ ОНЛАЙН' : '🌲 СЕРВЕР КЛАССИКА ОНЛАЙН'}
            </span>
          </div>

          {/* Заголовок */}
          <h1
            className="font-pixel text-4xl md:text-6xl lg:text-7xl mb-4 animate-fade-in leading-tight"
            style={{
              animationDelay: '0.1s',
              color,
              textShadow: `2px 2px 0 #000, 0 0 40px ${color}80`,
            }}
          >
            GAMAI
            <br />
            <span className="text-foreground">CLUB</span>
          </h1>

          <p className="font-rubik text-lg text-muted-foreground mb-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {server === 'anarchy'
              ? 'Выживи. Укради. Победи. Нет правил — есть только сила.'
              : 'Строй. Торгуй. Развивайся. Настоящий Minecraft сообщества.'}
          </p>

          {/* Адрес сервера */}
          <div
            className="inline-flex items-center gap-3 px-6 py-3 border-2 mb-10 animate-fade-in"
            style={{
              animationDelay: '0.3s',
              borderColor: color,
              boxShadow: `0 0 20px ${color}40, 4px 4px 0 #000`,
            }}
          >
            <Icon name="Server" size={16} style={{ color }} />
            <span className="font-pixel text-sm tracking-wider" style={{ color }}>mc.gamai.club</span>
            <span className="font-pixel text-[9px] text-muted-foreground">1.21.1</span>
          </div>

          {/* Кнопки */}
          <div className="flex flex-wrap justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <button
              className="pixel-btn text-sm"
              style={{ background: color, borderColor: color, color: '#000' }}
              onClick={onGoStart}
            >
              🚀 Начать играть
            </button>
            <button
              className="pixel-btn text-sm"
              style={{ background: 'transparent', borderColor: color, color }}
              onClick={onGoVideo}
            >
              ▶ Смотреть видео
            </button>
          </div>

          {/* Статистика */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto animate-fade-in" style={{ animationDelay: '0.5s' }}>
            {stats.map((stat, i) => (
              <div key={i} className="pixel-card p-4 text-center">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="font-pixel text-lg mb-1" style={{ color }}>{stat.value}</div>
                <div className="font-pixel text-[8px] text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Видео-превью */}
      <div className="relative z-10 container pb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
          <span className="font-pixel text-[10px]" style={{ color }}>ВИДЕО О СЕРВЕРЕ</span>
          <div className="h-px flex-1" style={{ background: `linear-gradient(270deg, ${color}, transparent)` }} />
        </div>

        <button
          onClick={onGoVideo}
          className="group relative w-full overflow-hidden border-2 block"
          style={{ borderColor: color, boxShadow: `0 0 30px ${color}30, 4px 4px 0 #000` }}
        >
          {/* Превью YouTube */}
          <div className="relative aspect-video bg-black overflow-hidden">
            <img
              src={`https://img.youtube.com/vi/${server === 'anarchy' ? '-ioHuCZryTg' : '5QU20HMPZ3M'}/maxresdefault.jpg`}
              alt="Видео о сервере"
              className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300"
            />
            {/* Оверлей */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${color}20, rgba(0,0,0,0.5))` }}
            >
              {/* Кнопка play */}
              <div
                className="w-20 h-20 flex items-center justify-center border-4 mb-4 group-hover:scale-110 transition-transform"
                style={{
                  borderColor: color,
                  background: `${color}30`,
                  boxShadow: `0 0 30px ${color}60`,
                }}
              >
                <div
                  className="ml-1"
                  style={{
                    width: 0,
                    height: 0,
                    borderTop: '16px solid transparent',
                    borderBottom: '16px solid transparent',
                    borderLeft: `28px solid ${color}`,
                  }}
                />
              </div>
              <span className="font-pixel text-sm" style={{ color, textShadow: '2px 2px 0 #000' }}>
                {server === 'anarchy' ? '💀 ТРЕЙЛЕР АНАРХИИ' : '🌲 ТРЕЙЛЕР КЛАССИКИ'}
              </span>
              <span className="font-rubik text-xs text-white/60 mt-1">Нажми, чтобы посмотреть</span>
            </div>
          </div>
        </button>
      </div>

      {/* Особенности */}
      <div className="relative z-10 container pb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
          <span className="font-pixel text-[10px]" style={{ color }}>ОСОБЕННОСТИ</span>
          <div className="h-px flex-1" style={{ background: `linear-gradient(270deg, ${color}, transparent)` }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feat, i) => (
            <div
              key={i}
              className="pixel-card p-5 animate-fade-in"
              style={{ animationDelay: `${i * 0.1 + 0.6}s` }}
            >
              <div className="text-3xl mb-3">{feat.icon}</div>
              <div className="font-pixel text-[10px] mb-2" style={{ color }}>{feat.title}</div>
              <p className="font-rubik text-xs text-muted-foreground">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}