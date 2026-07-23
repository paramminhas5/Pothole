'use client';

interface PrintButtonProps {
  locale: 'en' | 'hi';
}

export default function PrintButton({ locale }: PrintButtonProps) {
  const isHindi = locale === 'hi';

  return (
    <button
      onClick={() => window.print()}
      className="brutal-btn brutal-btn-sm print:hidden"
      aria-label="Print this page"
    >
      🖨️ {isHindi ? 'प्रिंट करें' : 'PRINT THIS PAGE'}
    </button>
  );
}
