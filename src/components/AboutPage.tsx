interface AboutPageProps {
  server: 'anarchy' | 'classic';
}

export default function AboutPage({ server }: AboutPageProps) {
  const color = server === 'anarchy' ? '#ff4500' : '#4caf50';

  const team = [
    { name: 'GamaiHost', role: 'Основатель', icon: '👑' },
    { name: 'NightCraft', role: 'Администратор', icon: '🛡️' },
    { name: 'PixelStorm', role: 'Модератор', icon: '⚔️' },
    { name: 'BuilderX', role: 'Строитель', icon: '🏗️' },
  ];

  return (
    <div className="relative z-10 container pt-28 pb-20">
      <div className="text-center mb-12 animate-fade-in">
        <div className="font-pixel text-xs text-muted-foreground tracking-widest mb-3">О ПРОЕКТЕ</div>
        <h2 className="font-pixel text-3xl pixel-text-shadow mb-3" style={{ color }}>GAMAI CLUB</h2>
        <p className="font-rubik text-muted-foreground max-w-lg mx-auto">
          Проект для тех, кто хочет настоящего Minecraft без ограничений и с дружным сообществом
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        {/* История */}
        <div className="pixel-card p-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="font-pixel text-[10px] mb-4" style={{ color }}>📖 ИСТОРИЯ</div>
          <p className="font-rubik text-sm text-foreground/90 leading-relaxed mb-4">
            Gamai Club основан в 2022 году группой энтузиастов, которые хотели создать стабильный и честный
            сервер для русскоязычного Minecraft-сообщества.
          </p>
          <p className="font-rubik text-sm text-foreground/90 leading-relaxed">
            За три года мы выросли из маленького сервера для друзей в полноценный проект с двумя режимами игры,
            активным сообществом и постоянными ивентами. Версия 1.21.1, адрес <span style={{ color }}>mc.gamai.club</span>.
          </p>
        </div>

        {/* Команда */}
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="font-pixel text-[10px] mb-4" style={{ color }}>👥 КОМАНДА</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {team.map((member, i) => (
              <div key={i} className="pixel-card p-4 text-center">
                <div className="text-3xl mb-2">{member.icon}</div>
                <div className="font-pixel text-[9px] mb-1" style={{ color }}>{member.name}</div>
                <div className="font-rubik text-xs text-muted-foreground">{member.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Технические характеристики */}
        <div className="pixel-card p-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="font-pixel text-[10px] mb-4" style={{ color }}>⚙️ ТЕХНИЧЕСКИЕ ДАННЫЕ</div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Версия', value: '1.21.1 Java' },
              { label: 'Адрес', value: 'mc.gamai.club' },
              { label: 'Движок', value: 'Paper + Folia' },
              { label: 'Бэкапы', value: 'Каждые 6 часов' },
              { label: 'Uptime', value: '99.8%' },
              { label: 'Слоты', value: '500 игроков' },
            ].map((item, i) => (
              <div key={i} className="flex justify-between border-b border-border pb-2">
                <span className="font-rubik text-xs text-muted-foreground">{item.label}</span>
                <span className="font-pixel text-[9px]" style={{ color }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
