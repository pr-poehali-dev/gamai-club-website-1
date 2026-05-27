import Icon from '@/components/ui/icon';

interface StartPageProps {
  server: 'anarchy' | 'classic';
}

const STEPS = [
  {
    num: '01',
    icon: '☕',
    title: 'Скачай Java',
    desc: 'Minecraft Java Edition требует Java 17 или новее. Скачай с официального сайта adoptium.net.',
    link: 'https://adoptium.net/',
    linkLabel: 'Скачать Java',
  },
  {
    num: '02',
    icon: '🚀',
    title: 'Скачай лаунчер',
    desc: 'Используй официальный лаунчер Minecraft или наш рекомендованный — TLauncher для бесплатной игры.',
    link: 'https://tlauncher.org/en/',
    linkLabel: 'Скачать TLauncher',
  },
  {
    num: '03',
    icon: '🔑',
    title: 'Войди в игру',
    desc: 'Запусти лаунчер, выбери версию 1.21.1 и создай профиль. Для TLauncher регистрация бесплатна.',
  },
  {
    num: '04',
    icon: '🌐',
    title: 'Подключись к серверу',
    desc: 'В главном меню выбери Мультиплеер → Добавить сервер → вставь адрес и нажми Готово.',
    copy: 'mc.gamai.club',
  },
];

export default function StartPage({ server }: StartPageProps) {
  const color = server === 'anarchy' ? '#ff4500' : '#ff9900';
  const colorSoft = server === 'anarchy' ? 'rgba(255,69,0,0.08)' : 'rgba(255,153,0,0.08)';

  return (
    <div className="relative z-10 container pt-28 pb-20">
      {/* Шапка */}
      <div className="text-center mb-14 animate-fade-in">
        <div className="font-pixel text-xs text-muted-foreground tracking-[0.4em] mb-3">КАК НАЧАТЬ</div>
        <h2
          className="font-pixel text-3xl md:text-4xl mb-4"
          style={{ color, textShadow: `2px 2px 0 #000, 0 0 30px ${color}60` }}
        >
          НАЧАТЬ ИГРАТЬ
        </h2>
        <p className="font-rubik text-muted-foreground max-w-lg mx-auto">
          Всего 4 шага — и ты уже на сервере. Это займёт не больше 5 минут.
        </p>
      </div>

      {/* Шаги */}
      <div className="max-w-2xl mx-auto space-y-4 mb-14">
        {STEPS.map((step, i) => (
          <div
            key={i}
            className="flex gap-5 p-6 border-2 animate-fade-in"
            style={{
              borderColor: 'hsl(var(--border))',
              background: colorSoft,
              boxShadow: `4px 4px 0 #000`,
              animationDelay: `${i * 0.1}s`,
            }}
          >
            {/* Номер */}
            <div
              className="font-pixel text-2xl shrink-0 w-14 h-14 flex items-center justify-center border-2"
              style={{ borderColor: color, color, boxShadow: `3px 3px 0 #000` }}
            >
              {step.num}
            </div>

            {/* Контент */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{step.icon}</span>
                <span className="font-pixel text-[11px]" style={{ color }}>{step.title}</span>
              </div>
              <p className="font-rubik text-sm text-muted-foreground mb-3 leading-relaxed">{step.desc}</p>

              {step.link && (
                <a
                  href={step.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-pixel text-[9px] px-3 py-2 border-2 transition-all hover:opacity-80"
                  style={{ borderColor: color, color, background: `${color}15` }}
                >
                  <Icon name="ExternalLink" size={10} />
                  {step.linkLabel}
                </a>
              )}

              {step.copy && (
                <button
                  onClick={() => navigator.clipboard.writeText(step.copy!)}
                  className="inline-flex items-center gap-2 font-pixel text-[9px] px-3 py-2 border-2 transition-all hover:opacity-80"
                  style={{ borderColor: color, color, background: `${color}15` }}
                >
                  <Icon name="Copy" size={10} />
                  Скопировать: {step.copy}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Баннер с адресом */}
      <div
        className="max-w-2xl mx-auto p-8 text-center border-2 animate-fade-in"
        style={{
          borderColor: color,
          background: colorSoft,
          boxShadow: `0 0 40px ${color}20, 6px 6px 0 #000`,
          animationDelay: '0.5s',
        }}
      >
        <div className="font-pixel text-[10px] text-muted-foreground mb-3 tracking-widest">АДРЕС СЕРВЕРА</div>
        <div
          className="font-pixel text-3xl mb-2"
          style={{ color, textShadow: `2px 2px 0 #000, 0 0 20px ${color}70` }}
        >
          mc.gamai.club
        </div>
        <div className="font-pixel text-[10px] text-muted-foreground mb-6">ВЕРСИЯ 1.21.1 • JAVA EDITION</div>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            className="pixel-btn"
            style={{ background: color, borderColor: color, color: '#000' }}
            onClick={() => navigator.clipboard.writeText('mc.gamai.club')}
          >
            📋 Скопировать IP
          </button>
          <a
            href="https://tlauncher.org/en/"
            target="_blank"
            rel="noopener noreferrer"
            className="pixel-btn inline-block text-center"
            style={{ background: 'transparent', borderColor: color, color }}
          >
            🚀 Скачать лаунчер
          </a>
        </div>
      </div>

      {/* Помощь */}
      <div className="max-w-2xl mx-auto mt-6 text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <p className="font-rubik text-xs text-muted-foreground">
          Возникли проблемы? Напиши нам в{' '}
          <a
            href="https://discord.gg/gamai"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium"
            style={{ color }}
          >
            Discord
          </a>
          {' '}— поможем в течение часа.
        </p>
      </div>
    </div>
  );
}
