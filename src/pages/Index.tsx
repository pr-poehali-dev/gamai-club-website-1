import { useState, useEffect } from 'react';
import ServerSelect from '@/components/ServerSelect';
import VideoBackground from '@/components/VideoBackground';
import Navbar from '@/components/Navbar';
import Cart from '@/components/Cart';
import HomePage from '@/components/HomePage';
import Shop from '@/components/Shop';
import Rules from '@/components/Rules';
import AboutPage from '@/components/AboutPage';
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

  useEffect(() => {
    if (server === 'classic') {
      document.body.classList.add('theme-classic');
      document.body.classList.add('theme-transition');
    } else {
      document.body.classList.remove('theme-classic');
      document.body.classList.add('theme-transition');
    }
  }, [server]);

  const handleServerSelect = (s: 'anarchy' | 'classic') => {
    setServer(s);
  };

  const handleServerChange = () => {
    setTransitioning(true);
    setTimeout(() => {
      setServer(null);
      setTransitioning(false);
    }, 300);
  };

  const handleAddToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev;
      return [...prev, item];
    });
    setCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

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
        <div className="video-overlay" style={{ background: 'rgba(0,0,0,0.75)' }} />
        <div className="fixed inset-0 z-[2] pixel-grid pointer-events-none" />
        <ServerSelect onSelect={handleServerSelect} />
      </div>
    );
  }

  const renderPage = () => {
    switch (activePage) {
      case 'shop': return <Shop server={server} onAddToCart={handleAddToCart} />;
      case 'rules': return <Rules server={server} />;
      case 'about': return <AboutPage server={server} />;
      case 'contacts': return <ContactsPage server={server} />;
      default: return <HomePage server={server} onGoShop={() => setActivePage('shop')} />;
    }
  };

  return (
    <div className={`min-h-screen ${transitioning ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
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

      <main>
        {renderPage()}
      </main>

      <footer className="relative z-10 border-t-2 border-border py-6">
        <div className="container text-center">
          <div className="font-pixel text-[9px] text-muted-foreground">
            GAMAI CLUB © 2022–2026 • mc.gamai.club • v1.21.1
          </div>
        </div>
      </footer>
    </div>
  );
}
