import Icon from '@/components/ui/icon';

interface ContactsPageProps {
  server: 'anarchy' | 'classic';
}

export default function ContactsPage({ server }: ContactsPageProps) {
  const color = server === 'anarchy' ? '#ff4500' : '#4caf50';

  const contacts = [
    { icon: '💬', label: 'Discord', value: 'discord.gg/gamai', desc: 'Основное сообщество' },
    { icon: '📱', label: 'VK', value: 'vk.com/gamai_club', desc: 'Новости и обновления' },
    { icon: '✈️', label: 'Telegram', value: '@gamai_club', desc: 'Быстрые уведомления' },
    { icon: '📧', label: 'E-mail', value: 'admin@gamai.club', desc: 'По деловым вопросам' },
  ];

  return (
    <div className="relative z-10 container pt-28 pb-20">
      <div className="text-center mb-12 animate-fade-in">
        <div className="font-pixel text-xs text-muted-foreground tracking-widest mb-3">КОНТАКТЫ</div>
        <h2 className="font-pixel text-3xl pixel-text-shadow mb-3" style={{ color }}>СВЯЗАТЬСЯ С НАМИ</h2>
        <p className="font-rubik text-muted-foreground">Пишите по любым вопросам — ответим быстро</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        {contacts.map((c, i) => (
          <div
            key={i}
            className="pixel-card p-6 flex items-center gap-5 animate-fade-in cursor-pointer"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="text-3xl">{c.icon}</div>
            <div className="flex-1">
              <div className="font-pixel text-[10px] text-muted-foreground mb-1">{c.label}</div>
              <div className="font-rubik font-semibold" style={{ color }}>{c.value}</div>
              <div className="font-rubik text-xs text-muted-foreground">{c.desc}</div>
            </div>
            <Icon name="ExternalLink" size={16} className="text-muted-foreground" />
          </div>
        ))}

        {/* Копировать IP */}
        <div
          className="border-2 p-6 text-center animate-fade-in"
          style={{ borderColor: color, boxShadow: `0 0 20px ${color}20, 4px 4px 0 #000`, animationDelay: '0.4s' }}
        >
          <div className="font-pixel text-[9px] text-muted-foreground mb-2">АДРЕС СЕРВЕРА</div>
          <div className="font-pixel text-2xl mb-3" style={{ color }}>mc.gamai.club</div>
          <div className="font-pixel text-[9px] text-muted-foreground mb-4">ВЕРСИЯ 1.21.1 JAVA EDITION</div>
          <button
            className="pixel-btn"
            style={{ background: color, borderColor: color, color: '#000' }}
            onClick={() => navigator.clipboard.writeText('mc.gamai.club')}
          >
            📋 Скопировать IP
          </button>
        </div>
      </div>
    </div>
  );
}
