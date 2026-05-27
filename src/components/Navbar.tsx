import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface NavbarProps {
  server: 'anarchy' | 'classic';
  onServerChange: () => void;
  cartCount: number;
  onCartOpen: () => void;
  activePage: string;
  onPageChange: (page: string) => void;
}

export default function Navbar({ server, onServerChange, cartCount, onCartOpen, activePage, onPageChange }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const serverColor = server === 'anarchy' ? '#ff4500' : '#4caf50';
  const serverLabel = server === 'anarchy' ? '💀 Анархия' : '🌲 Классика';

  const navLinks = [
    { id: 'home', label: 'Главная' },
    { id: 'shop', label: 'Магазин' },
    { id: 'about', label: 'О проекте' },
    { id: 'rules', label: 'Правила' },
    { id: 'contacts', label: 'Контакты' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b-2 border-border"
      style={{ background: 'hsl(var(--background) / 0.92)', backdropFilter: 'blur(12px)' }}>
      <div className="container flex items-center justify-between h-16">
        {/* Лого */}
        <button
          onClick={() => onPageChange('home')}
          className="font-pixel text-sm tracking-wider pixel-text-shadow hover:opacity-80 transition-opacity"
          style={{ color: serverColor }}
        >
          GAMAI<br />
          <span className="text-foreground text-[10px]">CLUB</span>
        </button>

        {/* Десктоп меню */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => onPageChange(link.id)}
              className="font-rubik text-sm px-4 py-2 border-b-2 transition-all"
              style={{
                borderColor: activePage === link.id ? serverColor : 'transparent',
                color: activePage === link.id ? serverColor : 'hsl(var(--muted-foreground))',
              }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Правая часть */}
        <div className="flex items-center gap-3">
          {/* Переключатель сервера */}
          <button
            onClick={onServerChange}
            className="hidden md:flex items-center gap-2 font-pixel text-[9px] px-3 py-2 border-2 transition-all"
            style={{ borderColor: serverColor, color: serverColor }}
            title="Сменить сервер"
          >
            {serverLabel}
            <Icon name="RefreshCw" size={10} />
          </button>

          {/* Корзина */}
          <button
            onClick={onCartOpen}
            className="relative p-2 border-2 transition-all hover:scale-105"
            style={{ borderColor: serverColor, color: serverColor }}
          >
            <Icon name="ShoppingCart" size={18} />
            {cartCount > 0 && (
              <span
                className="absolute -top-2 -right-2 font-pixel text-[8px] w-5 h-5 flex items-center justify-center"
                style={{ background: serverColor, color: '#000' }}
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* Мобильное меню */}
          <button
            className="md:hidden p-2 border-2 border-border"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Icon name={mobileOpen ? "X" : "Menu"} size={18} />
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      {mobileOpen && (
        <div className="md:hidden border-t-2 border-border bg-background">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => { onPageChange(link.id); setMobileOpen(false); }}
              className="w-full text-left font-rubik px-6 py-4 border-b border-border hover:bg-muted transition-colors"
              style={{ color: activePage === link.id ? serverColor : 'hsl(var(--foreground))' }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => { onServerChange(); setMobileOpen(false); }}
            className="w-full text-left font-pixel text-[9px] px-6 py-4"
            style={{ color: serverColor }}
          >
            Сменить на: {server === 'anarchy' ? '🌲 Классика' : '💀 Анархия'}
          </button>
        </div>
      )}

      {/* Индикатор сервера */}
      <div className="h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${serverColor}, transparent)` }} />
    </nav>
  );
}
