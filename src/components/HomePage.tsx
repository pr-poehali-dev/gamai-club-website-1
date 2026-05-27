import Icon from '@/components/ui/icon';

interface HomePageProps {
  server: 'anarchy' | 'classic';
  onGoShop: () => void;
}

export default function HomePage({ server, onGoShop }: HomePageProps) {
  const color = server === 'anarchy' ? '#ff4500' : '#4caf50';
  const colorSoft = server === 'anarchy' ? '#ff450020' : '#4caf5020';

  const stats = server === 'anarchy'
    ? [{ label: 'Онлайн', value: '247', icon: '🔥' }, { label: 'Убийств', value: '128K', icon: '⚔️' }, { label: 'Взрывов', value: '12K', icon: '💥' }]
    : [{ label: 'Онлайн', value: '184', icon: '🌿' }, { label: 'Построено', value: '52K', icon: '🏗️' }, { label: 'Городов', value: '87', icon: '🏙️' }];

  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      {/* Hero */}
      <div className="flex-1 flex items-center justify-center pt-16">
        <div className="container text-center py-24">

          {/* Бейдж сервера */}
          <div className="inline-flex items-center gap-2 px-4 py-2 border-2 mb-8 animate-fade-in"
            style={{ borderColor: color, background: colorSoft }}>
            <span className="animate-pulse" style={{ width: 8, height: 8, borderRadius: 0, background: color, display: 'inline-block' }} />
            <span className="font-pixel text-[9px]" style={{ color }}>
              {server === 'anarchy' ? '💀 СЕРВЕР АНАРХИЯ ОНЛАЙН' : '🌲 СЕРВЕР КЛАССИКА ОНЛАЙН'}
            </span>
          </div>

          {/* Главный заголовок */}
          <h1 className="font-pixel text-4xl md:text-6xl lg:text-7xl pixel-text-shadow mb-4 animate-fade-in leading-tight"
            style={{ animationDelay: '0.1s', color }}>
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
          <div className="inline-flex items-center gap-3 px-6 py-3 border-2 mb-10 animate-fade-in"
            style={{ animationDelay: '0.3s', borderColor: color, boxShadow: `0 0 20px ${color}30, 4px 4px 0 #000` }}>
            <Icon name="Server" size={16} style={{ color }} />
            <span className="font-pixel text-sm tracking-wider" style={{ color }}>mc.gamai.club</span>
            <span className="font-pixel text-[9px] text-muted-foreground">1.21.1</span>
          </div>

          {/* Кнопки */}
          <div className="flex flex-wrap justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <button
              className="pixel-btn text-sm"
              style={{ background: color, borderColor: color, color: '#000' }}
              onClick={onGoShop}
            >
              🛒 Магазин
            </button>
            <button
              className="pixel-btn text-sm"
              style={{ background: 'transparent', borderColor: color, color }}
              onClick={() => navigator.clipboard.writeText('mc.gamai.club')}
            >
              📋 Скопировать IP
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

      {/* Фичи */}
      <div className="relative z-10 container pb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
          <span className="font-pixel text-[10px]" style={{ color }}>ОСОБЕННОСТИ</span>
          <div className="h-px flex-1" style={{ background: `linear-gradient(270deg, ${color}, transparent)` }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {(server === 'anarchy' ? [
            { icon: '⚔️', title: 'Полный PvP', desc: 'Без защищённых зон, кроме спавна' },
            { icon: '💣', title: 'Гриферство', desc: 'Взрывай, воруй, разрушай — всё законно' },
            { icon: '🏆', title: 'Топ игроков', desc: 'Рейтинг убийств и побед' },
            { icon: '⚡', title: 'TPS 20', desc: 'Стабильный сервер без лагов' },
          ] : [
            { icon: '🏗️', title: 'Стройка', desc: 'Защищённые участки и WorldEdit' },
            { icon: '💰', title: 'Экономика', desc: 'Магазины, торговля, аукцион' },
            { icon: '👥', title: 'Кланы', desc: 'Создай свой город с друзьями' },
            { icon: '🗺️', title: 'Карта мира', desc: 'Живая dynmap всего мира' },
          ]).map((feat, i) => (
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
