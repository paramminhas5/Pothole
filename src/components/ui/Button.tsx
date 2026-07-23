'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonVariant = 'primary' | 'dark' | 'danger' | 'success' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-[var(--saffron)] text-[#0F0F0F] border-[var(--ink)] hover:bg-[var(--saffron-hover)]',
  dark: 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]',
  danger: 'bg-[var(--red)] text-white border-[var(--ink)]',
  success: 'bg-[var(--lime)] text-[#0F0F0F] border-[var(--ink)]',
  ghost: 'bg-transparent text-[var(--ink)] border-transparent hover:border-[var(--ink)]',
  outline: 'bg-[var(--paper)] text-[var(--ink)] border-[var(--ink)]',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-3 py-2 text-xs min-h-[var(--touch-min)]',
  md: 'px-5 py-3 text-sm min-h-[var(--touch-min)]',
  lg: 'px-7 py-4 text-base min-h-[var(--touch-lg)]',
  xl: 'px-8 py-5 text-lg min-h-[var(--touch-xl)]',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', fullWidth, loading, className = '', children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={[
          'inline-flex items-center justify-center gap-2',
          'font-bold uppercase tracking-wide',
          'border-2 rounded-[var(--radius-md)]',
          'shadow-[var(--shadow-sm)]',
          'transition-transform duration-[var(--duration-fast)]',
          'hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[var(--shadow-md)]',
          'active:translate-x-[2px] active:translate-y-[2px] active:shadow-none',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
          'focus-visible:outline-3 focus-visible:outline-[var(--saffron)] focus-visible:outline-offset-2',
          variants[variant],
          sizes[size],
          fullWidth ? 'w-full' : '',
          className,
        ].filter(Boolean).join(' ')}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
