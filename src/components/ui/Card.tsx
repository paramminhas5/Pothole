'use client';

import { HTMLAttributes, forwardRef } from 'react';

type CardVariant = 'default' | 'flat' | 'urgent' | 'elevated' | 'accent';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-[var(--paper-alt)] border-[var(--ink)] shadow-[var(--shadow-md)]',
  flat: 'bg-[var(--paper-alt)] border-[var(--ink)]',
  urgent: 'bg-[var(--paper-alt)] border-[var(--red)] border-l-[6px] shadow-[var(--shadow-md)]',
  elevated: 'bg-[var(--paper-alt)] border-[var(--ink)] shadow-[var(--shadow-lg)]',
  accent: 'bg-[var(--paper-alt)] border-[var(--ink)] border-t-[6px] border-t-[var(--saffron)]',
};

const paddings: Record<string, string> = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', padding = 'md', hoverable = false, className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={[
          'border-2 rounded-[var(--radius-md)]',
          variantStyles[variant],
          paddings[padding],
          hoverable ? 'transition-transform duration-[var(--duration-fast)] hover:translate-x-[-1px] hover:translate-y-[-1px] cursor-pointer' : '',
          className,
        ].filter(Boolean).join(' ')}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
export default Card;
