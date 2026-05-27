import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface RulesProps {
  server: 'anarchy' | 'classic';
}

const anarchyRules = [
  {
    title: '⚔️ Основные правила PvP',
    rules: [
      'PvP разрешён в любом месте и в любое время.',
      'Гриферство и рейды — законны. Защищай своё имущество сам.',
      'Уничтожение построек допустимо, кроме зоны спавна (50 блоков).',
      'Читы на полёт, ESP, X-Ray — запрещены и ведут к бану.',
    ],
  },
  {
    title: '💬 Чат и поведение',
    rules: [
      'Оскорбления по национальным, расовым и другим признакам — бан.',
      'Реклама других серверов — мут на 30 дней.',
      'Угрозы реальному вреду — перманентный бан.',
      'Спам в чате — мут на 24 часа.',
    ],
  },
  {
    title: '🔧 Технические правила',
    rules: [
      'Запрещены механизмы, вызывающие лаги сервера (автокликеры, фермы нещадящие TPS).',
      'Дюп предметов через баги — бан на 7 дней.',
      'Использование багов клиента для прохода сквозь стены — бан.',
      'Обход блокировки через альт-аккаунты — перманентный бан.',
    ],
  },
  {
    title: '🏪 Торговля',
    rules: [
      'Скам при торговле через /trade запрещён — бан на 14 дней.',
      'Передача предметов дублированных через баги — изъятие + бан.',
      'Аукцион /ah свободен, мошенничество через него наказуемо.',
    ],
  },
];

const classicRules = [
  {
    title: '🌿 Правила сообщества',
    rules: [
      'Уважай других игроков. Оскорбления — мут на 24 часа.',
      'PvP только с взаимного согласия обеих сторон.',
      'Гриферство и воровство запрещены. Нарушение — бан на 7 дней.',
      'Помогай новичкам. Это добровольно, но очень ценится.',
    ],
  },
  {
    title: '🏗️ Строительство',
    rules: [
      'Строить можно только на своём заявленном участке.',
      'Минимум 200 блоков между постройками разных игроков.',
      'Неэстетичные конструкции у спавна могут быть удалены администрацией.',
      'Заброшенные участки (30+ дней без входа) освобождаются.',
    ],
  },
  {
    title: '💎 Экономика',
    rules: [
      'Основная валюта — Изумруды. Обмен через /shop и /ah.',
      'Запрещено накручивать лоты на аукционе через фиктивные ставки.',
      'Скам при личной торговле — бан на 14 дней.',
      'Нельзя блокировать чужие магазины или создавать монополии на базовые ресурсы.',
    ],
  },
  {
    title: '⚙️ Технические правила',
    rules: [
      'Клиентские моды разрешены только визуальные (шейдеры, оптимизация).',
      'X-Ray и другие читы — перманентный бан.',
      'Фермы мобов не более 50 существ в одной области.',
      'Дюп предметов через баги — бан на 30 дней.',
    ],
  },
];

export default function Rules({ server }: RulesProps) {
  const [openSections, setOpenSections] = useState<Set<number>>(new Set([0]));
  const color = server === 'anarchy' ? '#ff4500' : '#4caf50';
  const rules = server === 'anarchy' ? anarchyRules : classicRules;

  const toggle = (i: number) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div className="relative z-10 container pt-28 pb-20">
      <div className="text-center mb-12 animate-fade-in">
        <div className="font-pixel text-xs text-muted-foreground tracking-widest mb-3">ПРАВИЛА</div>
        <h2 className="font-pixel text-3xl pixel-text-shadow mb-3" style={{ color }}>
          {server === 'anarchy' ? '💀 АНАРХИЯ' : '🌲 КЛАССИКА'}
        </h2>
        <p className="font-rubik text-muted-foreground max-w-md mx-auto">
          {server === 'anarchy'
            ? 'Даже в анархии есть минимальные правила. Нарушители банятся без предупреждений.'
            : 'Правила созданы для комфортной игры всего сообщества.'}
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-3">
        {rules.map((section, i) => (
          <div
            key={i}
            className="border-2 animate-fade-in overflow-hidden"
            style={{
              borderColor: openSections.has(i) ? color : 'hsl(var(--border))',
              boxShadow: openSections.has(i) ? `0 0 20px ${color}25, 4px 4px 0 #000` : '4px 4px 0 #000',
              animationDelay: `${i * 0.1}s`,
            }}
          >
            <button
              className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-muted/50"
              onClick={() => toggle(i)}
            >
              <span className="font-pixel text-sm" style={{ color: openSections.has(i) ? color : 'hsl(var(--foreground))' }}>
                {section.title}
              </span>
              <Icon
                name={openSections.has(i) ? 'ChevronUp' : 'ChevronDown'}
                size={16}
                style={{ color, flexShrink: 0 }}
              />
            </button>

            {openSections.has(i) && (
              <div className="px-5 pb-5 border-t-2" style={{ borderColor: color + '40' }}>
                <ul className="space-y-3 mt-4">
                  {section.rules.map((rule, j) => (
                    <li key={j} className="flex gap-3 animate-fade-in" style={{ animationDelay: `${j * 0.05}s` }}>
                      <span className="font-pixel text-[10px] mt-1 shrink-0" style={{ color }}>
                        {String(j + 1).padStart(2, '0')}.
                      </span>
                      <span className="font-rubik text-sm text-foreground/90">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Дисклеймер */}
      <div
        className="max-w-2xl mx-auto mt-8 p-4 border-2 border-dashed"
        style={{ borderColor: color + '60' }}
      >
        <p className="font-rubik text-xs text-center text-muted-foreground">
          Незнание правил не освобождает от ответственности. Администрация оставляет за собой право
          принимать решения по спорным ситуациям на своё усмотрение.
        </p>
      </div>
    </div>
  );
}
