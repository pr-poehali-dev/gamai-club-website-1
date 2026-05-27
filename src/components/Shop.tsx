import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface CartItem {
  id: string;
  name: string;
  price: number;
  icon: string;
  duration?: string;
}

interface ShopProps {
  server: 'anarchy' | 'classic';
  onAddToCart: (item: CartItem) => void;
}

interface Product {
  id: string;
  name: string;
  icon: string;
  price: number;
  type: 'privilege' | 'item';
  description: string;
  features: string[];
  basePrices?: { '30': number; '60': number; '90': number; forever: number };
}

const anarchyProducts: Product[] = [
  {
    id: 'vip-a', name: 'VIP', icon: '⚔️', price: 199, type: 'privilege',
    description: 'Базовые привилегии для выживания',
    features: ['Цветной ник', 'Набор стартовых вещей', '/back после смерти', 'Доп. 3 дома'],
    basePrices: { '30': 199, '60': 349, '90': 449, forever: 899 }
  },
  {
    id: 'elite-a', name: 'ELITE', icon: '💎', price: 399, type: 'privilege',
    description: 'Для опытных игроков анархии',
    features: ['Всё из VIP', 'Неуязвимость 5 сек', 'Полёт в spawn', '/god на 10 мин/час', 'Кастомный ник'],
    basePrices: { '30': 399, '60': 699, '90': 899, forever: 1799 }
  },
  {
    id: 'skull-a', name: 'SKULL', icon: '💀', price: 799, type: 'privilege',
    description: 'Легенда анархии',
    features: ['Всё из ELITE', 'Кит раз в 3 дня', 'Особый эффект смерти', 'Доп. слот в инвентаре', 'Уникальный плащ'],
    basePrices: { '30': 799, '60': 1399, '90': 1799, forever: 3499 }
  },
  {
    id: 'kit-a', name: 'Стартовый кит', icon: '🎒', price: 149, type: 'item',
    description: 'Набор алмазных инструментов',
    features: ['Алмазный меч (Sharp V)', 'Броня (Prot IV)', 'Зелья регена x16', 'Еда x64'],
  },
  {
    id: 'tnt-a', name: 'TNT x64', icon: '💣', price: 79, type: 'item',
    description: 'Задокументированные разрушения',
    features: ['64 блока TNT', 'Мгновенная выдача', 'Без ограничений'],
  },
  {
    id: 'elytra-a', name: 'Элитра', icon: '🪽', price: 249, type: 'item',
    description: 'Крылья для полётов',
    features: ['Элитра с Mending', 'Ракеты x32', 'Мгновенная выдача'],
  },
];

const classicProducts: Product[] = [
  {
    id: 'builder', name: 'BUILDER', icon: '🏗️', price: 149, type: 'privilege',
    description: 'Привилегии для строителей',
    features: ['Цветной ник', '/fly на своём участке', '6 домов', 'WorldEdit базовый'],
    basePrices: { '30': 149, '60': 269, '90': 349, forever: 699 }
  },
  {
    id: 'lord', name: 'LORD', icon: '👑', price: 349, type: 'privilege',
    description: 'Лорд классического мира',
    features: ['Всё из Builder', 'Летать везде', 'Большой участок', '/back /feed', 'Особый префикс'],
    basePrices: { '30': 349, '60': 619, '90': 799, forever: 1599 }
  },
  {
    id: 'legend', name: 'LEGEND', icon: '🌟', price: 699, type: 'privilege',
    description: 'Легендарный статус',
    features: ['Всё из LORD', 'Персональный варп', 'Особые частицы', 'VIP-чат', 'Уникальный плащ'],
    basePrices: { '30': 699, '60': 1249, '90': 1599, forever: 3199 }
  },
  {
    id: 'starter', name: 'Стартовый набор', icon: '📦', price: 99, type: 'item',
    description: 'Всё необходимое для старта',
    features: ['Железный комплект', 'Семена и инструменты', 'Еда x64', 'Карта мира'],
  },
  {
    id: 'spawner', name: 'Спавнер монстров', icon: '🔮', price: 299, type: 'item',
    description: 'Создай ферму мобов',
    features: ['1 спавнер на выбор', 'Установка в любом месте', 'Мгновенная выдача'],
  },
  {
    id: 'shulker', name: 'Шалкер x4', icon: '🟣', price: 129, type: 'item',
    description: 'Расширь хранилище',
    features: ['4 шалкер-бокса', 'Разные цвета', 'Мгновенная выдача'],
  },
];

interface DurationModalProps {
  product: Product;
  server: 'anarchy' | 'classic';
  onAdd: (item: CartItem) => void;
  onClose: () => void;
}

function DurationModal({ product, server, onAdd, onClose }: DurationModalProps) {
  const [selected, setSelected] = useState<'30' | '60' | '90' | 'forever'>('30');
  const color = server === 'anarchy' ? '#ff4500' : '#4caf50';

  const options: { key: '30' | '60' | '90' | 'forever'; label: string; discount?: string }[] = [
    { key: '30', label: '30 дней' },
    { key: '60', label: '60 дней', discount: '-12%' },
    { key: '90', label: '90 дней', discount: '-25%' },
    { key: 'forever', label: 'Навсегда', discount: 'ЛУЧШЕЕ' },
  ];

  const price = product.basePrices![selected];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-md mx-4 p-6 border-2 bg-card animate-scale-in"
        style={{ borderColor: color, boxShadow: `0 0 40px ${color}40, 8px 8px 0px #000` }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="font-pixel text-[9px] text-muted-foreground mb-1">ВЫБОР СРОКА</div>
            <h3 className="font-pixel text-lg" style={{ color }}>{product.icon} {product.name}</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:opacity-70"><Icon name="X" size={18} /></button>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {options.map(opt => (
            <button
              key={opt.key}
              onClick={() => setSelected(opt.key)}
              className="p-4 border-2 text-left transition-all relative"
              style={{
                borderColor: selected === opt.key ? color : 'hsl(var(--border))',
                background: selected === opt.key ? `${color}15` : 'hsl(var(--card))',
                boxShadow: selected === opt.key ? `0 0 15px ${color}30, 3px 3px 0 #000` : '3px 3px 0 #000',
              }}
            >
              {opt.discount && (
                <span className="absolute top-1 right-1 font-pixel text-[7px] px-1" style={{ background: color, color: '#000' }}>
                  {opt.discount}
                </span>
              )}
              <div className="font-pixel text-[10px] mb-2" style={{ color: selected === opt.key ? color : 'hsl(var(--foreground))' }}>
                {opt.label}
              </div>
              <div className="font-pixel text-lg" style={{ color }}>
                {product.basePrices![opt.key]} ₽
              </div>
            </button>
          ))}
        </div>

        <button
          className="pixel-btn w-full text-center"
          style={{ background: color, borderColor: color, color: '#000' }}
          onClick={() => {
            onAdd({ id: `${product.id}-${selected}`, name: `${product.name} (${selected === 'forever' ? '∞' : selected + ' дн.'})`, price, icon: product.icon, duration: selected });
            onClose();
          }}
        >
          Добавить в корзину — {price} ₽
        </button>
      </div>
    </div>
  );
}

export default function Shop({ server, onAddToCart }: ShopProps) {
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const color = server === 'anarchy' ? '#ff4500' : '#4caf50';
  const products = server === 'anarchy' ? anarchyProducts : classicProducts;
  const privileges = products.filter(p => p.type === 'privilege');
  const items = products.filter(p => p.type === 'item');

  return (
    <div className="relative z-10 container pt-28 pb-20">
      <div className="text-center mb-12 animate-fade-in">
        <div className="font-pixel text-xs text-muted-foreground tracking-widest mb-3">МАГАЗИН</div>
        <h2 className="font-pixel text-3xl pixel-text-shadow mb-3" style={{ color }}>
          {server === 'anarchy' ? '⚔️ АНАРХИЯ' : '🌲 КЛАССИКА'}
        </h2>
        <p className="font-rubik text-muted-foreground">Привилегии и предметы для сервера</p>
      </div>

      {/* Привилегии */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
          <span className="font-pixel text-[10px]" style={{ color }}>ПРИВИЛЕГИИ</span>
          <div className="h-px flex-1" style={{ background: `linear-gradient(270deg, ${color}, transparent)` }} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {privileges.map((product, i) => (
            <div
              key={product.id}
              className="pixel-card p-6 flex flex-col animate-fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="text-4xl mb-4 animate-float" style={{ animationDelay: `${i * 0.5}s` }}>
                {product.icon}
              </div>
              <div className="font-pixel text-sm mb-2" style={{ color }}>{product.name}</div>
              <p className="font-rubik text-sm text-muted-foreground mb-4 flex-1">{product.description}</p>
              <ul className="mb-6 space-y-1">
                {product.features.map(f => (
                  <li key={f} className="font-rubik text-xs text-muted-foreground flex items-center gap-2">
                    <span style={{ color }}>▪</span>{f}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-pixel text-[8px] text-muted-foreground">ОТ</div>
                  <div className="font-pixel text-xl" style={{ color }}>{product.basePrices!['30']} ₽</div>
                </div>
                <button
                  className="pixel-btn"
                  style={{ background: color, borderColor: color, color: '#000' }}
                  onClick={() => setModalProduct(product)}
                >
                  Купить
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Предметы */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
          <span className="font-pixel text-[10px]" style={{ color }}>ПРЕДМЕТЫ</span>
          <div className="h-px flex-1" style={{ background: `linear-gradient(270deg, ${color}, transparent)` }} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((product, i) => (
            <div
              key={product.id}
              className="pixel-card p-6 flex flex-col animate-fade-in"
              style={{ animationDelay: `${i * 0.1 + 0.3}s` }}
            >
              <div className="text-4xl mb-4">{product.icon}</div>
              <div className="font-pixel text-sm mb-2" style={{ color }}>{product.name}</div>
              <p className="font-rubik text-sm text-muted-foreground mb-4 flex-1">{product.description}</p>
              <ul className="mb-6 space-y-1">
                {product.features.map(f => (
                  <li key={f} className="font-rubik text-xs text-muted-foreground flex items-center gap-2">
                    <span style={{ color }}>▪</span>{f}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between">
                <div className="font-pixel text-xl" style={{ color }}>{product.price} ₽</div>
                <button
                  className="pixel-btn"
                  style={{ background: color, borderColor: color, color: '#000' }}
                  onClick={() => onAddToCart({ id: product.id, name: product.name, price: product.price, icon: product.icon })}
                >
                  В корзину
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalProduct && (
        <DurationModal
          product={modalProduct}
          server={server}
          onAdd={onAddToCart}
          onClose={() => setModalProduct(null)}
        />
      )}
    </div>
  );
}
