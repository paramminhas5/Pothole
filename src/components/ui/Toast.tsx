'use client';

import { useEffect, useState, createContext, useContext, useCallback, ReactNode } from 'react';

interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastContextValue {
  toast: (message: string, type?: ToastItem['type']) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });
export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((message: string, type: ToastItem['type'] = 'info') => {
    const id = crypto.randomUUID();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-4 right-4 z-[var(--z-toast)] flex flex-col gap-2 max-w-sm" aria-live="polite">
        {toasts.map(t => (
          <ToastMessage key={t.id} item={t} onDismiss={() => setToasts(prev => prev.filter(x => x.id !== t.id))} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastMessage({ item, onDismiss }: { item: ToastItem; onDismiss: () => void }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(true); }, []);

  const bgClass = item.type === 'success' ? 'border-[var(--lime)]'
    : item.type === 'error' ? 'border-[var(--red)]'
    : 'border-[var(--saffron)]';

  return (
    <div
      className={[
        'px-4 py-3 bg-[var(--paper-alt)] border-2 rounded-[var(--radius-md)] shadow-[var(--shadow-md)]',
        'text-sm font-bold text-[var(--ink)]',
        'transition-all duration-300',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
        bgClass,
      ].join(' ')}
      role="alert"
    >
      <div className="flex items-center justify-between gap-3">
        <span>{item.message}</span>
        <button onClick={onDismiss} className="text-[var(--ink-muted)] hover:text-[var(--ink)] text-lg leading-none">×</button>
      </div>
    </div>
  );
}

export default ToastProvider;
