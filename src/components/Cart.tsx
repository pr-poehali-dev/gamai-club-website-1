import Icon from '@/components/ui/icon';

interface CartItem {
  id: string;
  name: string;
  price: number;
  icon: string;
  duration?: string;
}

interface CartProps {
  items: CartItem[];
  server: 'anarchy' | 'classic';
  onRemove: (id: string) => void;
  onClose: () => void;
  open: boolean;
}

export default function Cart({ items, server, onRemove, onClose, open }: CartProps) {
  const color = server === 'anarchy' ? '#ff4500' : '#4caf50';
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      {/* Оверлей */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />
      )}

      {/* Панель */}
      <div
        className="fixed top-0 right-0 h-full w-full max-w-sm z-50 flex flex-col border-l-2"
        style={{
          background: 'hsl(var(--background))',
          borderColor: color,
          boxShadow: `-8px 0 40px ${color}30`,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
        }}
      >
        {/* Шапка */}
        <div className="flex items-center justify-between p-6 border-b-2 border-border">
          <div>
            <div className="font-pixel text-[9px] text-muted-foreground mb-1">КОРЗИНА</div>
            <div className="font-pixel text-sm" style={{ color }}>
              {items.length} {items.length === 1 ? 'товар' : items.length < 5 ? 'товара' : 'товаров'}
            </div>
          </div>
          <button onClick={onClose} className="p-2 border-2 border-border hover:border-foreground transition-colors">
            <Icon name="X" size={16} />
          </button>
        </div>

        {/* Товары */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div className="text-5xl opacity-30">🛒</div>
              <div className="font-pixel text-[9px] text-muted-foreground">КОРЗИНА ПУСТА</div>
              <p className="font-rubik text-sm text-muted-foreground">Добавьте товары из магазина</p>
            </div>
          ) : (
            items.map(item => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 border-2 border-border"
                style={{ boxShadow: '3px 3px 0 #000' }}
              >
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-rubik text-sm font-medium truncate">{item.name}</div>
                  <div className="font-pixel text-[10px]" style={{ color }}>{item.price} ₽</div>
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Icon name="Trash2" size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Итог */}
        {items.length > 0 && (
          <div className="p-6 border-t-2 border-border space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-rubik text-muted-foreground">Итого:</span>
              <span className="font-pixel text-xl" style={{ color }}>{total} ₽</span>
            </div>
            <button
              className="pixel-btn w-full text-center"
              style={{ background: color, borderColor: color, color: '#000' }}
            >
              Оформить заказ
            </button>
            <p className="font-rubik text-xs text-center text-muted-foreground">
              После оплаты введи свой ник на сервере
            </p>
          </div>
        )}
      </div>
    </>
  );
}
