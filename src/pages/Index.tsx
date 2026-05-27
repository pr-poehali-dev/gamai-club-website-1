import { useState, useEffect } from 'react';
import ServerSelect from '@/components/ServerSelect';
import VideoBackground from '@/components/VideoBackground';
import Navbar from '@/components/Navbar';
import Cart from '@/components/Cart';
import HomePage from '@/components/HomePage';
import Shop from '@/components/Shop';
import Rules from '@/components/Rules';
import StartPage from '@/components/StartPage';
import VideoPage from '@/components/VideoPage';
import ContactsPage from '@/components/ContactsPage';

interface CartItem {
  id: string;
  name: string;
  price: number;
  icon: string;
  duration?: string;
}

export default function Index() {
  const [server, setServer] = useState<'anarchy' | 'classic' | null>(null);
  const [activePage, setActivePage] = useState('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  // Тема — применяется только после выбора сервера, не меняется потом
  useEffect(() => {
    if (server === null) return;
    if (server === 'classic') {
      document.body.classList.add('theme-classic');
    } else {
      document.body.classList.remove('theme-classic');
    }
  }, [server]);

  const handleServerSelect = (s: 'anarchy' | 'classic') => {
    setServer(s);
    setActivePage('home');
  };

  const handleServerChange = () => {
    setTransitioning(true);
    setTimeout(() => {
      setServer(null);
      setActivePage('home');
      setTransitioning(false);
    }, 300);
  };

  const handleAddToCart = (item: CartItem) => {
    setCartItems(prev => {
      if (prev.find(i => i.id === item.id)) return prev;
      return [...prev, item];
    });
    setCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  // Экран выбора сервера
  if (!server) {
    return (
      <div className="min-h-screen bg-black">
        <div className="video-bg">
          <iframe
            src="https://www.youtube.com/embed/-ioHuCZryTg?autoplay=1&mute=1&loop=1&playlist=-ioHuCZryTg&controls=0&disablekb=1&fs=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3"
            allow="autoplay; encrypted-media"
            allowFullScreen={false}
            title="background"
          />
        </div>
        <div className="video-overlay" style={{ background: 'rgba(0,0,0,0.78)' }} />
        <div className="fixed inset-0 z-[2] pixel-grid pointer-events-none" />
        <ServerSelect onSelect={handleServerSelect} />
      </div>
    );
  }

  const serverColor = server === 'anarchy' ? '#ff4500' : '#ff9900';

  const renderPage = () => {
    switch (activePage) {
      case 'start':    return <StartPage server={server} />;
      case 'video':    return <VideoPage server={server} />;
      case 'shop':     return <Shop server={server} onAddToCart={handleAddToCart} />;
      case 'rules':    return <Rules server={server} />;
      case 'contacts': return <ContactsPage server={server} />;
      default:         return (
        <HomePage
          server={server}
          onGoStart={() => setActivePage('start')}
          onGoVideo={() => setActivePage('video')}
        />
      );
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-opacity duration-300 ${transitioning ? 'opacity-0' : 'opacity-100'}`}
    >
      <VideoBackground server={server} />

      <Navbar
        server={server}
        onServerChange={handleServerChange}
        cartCount={cartItems.length}
        onCartOpen={() => setCartOpen(true)}
        activePage={activePage}
        onPageChange={setActivePage}
      />

      <Cart
        items={cartItems}
        server={server}
        onRemove={handleRemoveFromCart}
        onClose={() => setCartOpen(false)}
        open={cartOpen}
      />

      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Футер */}
      <footer className="relative z-10 border-t-2 border-border mt-auto">
        <div
          className="h-0.5"
          style={{ background: `linear-gradient(90deg, transparent, ${serverColor}, transparent)` }}
        />
        <div className="container py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Лого */}
            <div>
              <div
                className="font-pixel text-xl mb-3"
                style={{ color: serverColor, textShadow: `2px 2px 0 #000, 0 0 20px ${serverColor}60` }}
              >
                GAMAI CLUB
              </div>
              <p className="font-rubik text-xs text-muted-foreground leading-relaxed mb-3">
                Лучший Minecraft-сервер для русскоязычного сообщества. Два режима — Анархия и Классика.
              </p>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 border font-pixel text-[9px]"
                style={{ borderColor: serverColor, color: serverColor }}
              >
                <span className="animate-pulse" style={{ width: 6, height: 6, background: serverColor, display: 'inline-block' }} />
                mc.gamai.club
              </div>
            </div>

            {/* Навигация */}
            <div>
              <div className="font-pixel text-[10px] mb-4" style={{ color: serverColor }}>НАВИГАЦИЯ</div>
              <ul className="space-y-2">
                {[
                  { id: 'home', label: 'Главная' },
                  { id: 'start', label: 'Как начать' },
                  { id: 'video', label: 'Видео' },
                  { id: 'shop', label: 'Магазин' },
                  { id: 'rules', label: 'Правила' },
                  { id: 'contacts', label: 'Контакты' },
                ].map(link => (
                  <li key={link.id}>
                    <button
                      onClick={() => setActivePage(link.id)}
                      className="font-rubik text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Соцсети */}
            <div>
              <div className="font-pixel text-[10px] mb-4" style={{ color: serverColor }}>СООБЩЕСТВО</div>
              <ul className="space-y-3">
                {[
                  { icon: '💬', label: 'Discord', href: 'https://discord.gg/gamai' },
                  { icon: '📱', label: 'VK', href: 'https://vk.com/gamai_club' },
                  { icon: '✈️', label: 'Telegram', href: 'https://t.me/gamai_club' },
                ].map(s => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 font-rubik text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span>{s.icon}</span>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Нижняя строка */}
          <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="font-pixel text-[8px] text-muted-foreground">
              GAMAI CLUB © 2022–2026 • ВСЕ ПРАВА ЗАЩИЩЕНЫ
            </div>
            <div className="font-pixel text-[8px] text-muted-foreground">
              ВЕРСИЯ 1.21.1 • JAVA EDITION
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
