'use client';

import { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, ReactNode, forwardRef } from 'react';

interface BaseFieldProps {
  label: string;
  labelHi?: string;
  locale?: 'en' | 'hi';
  error?: string;
  help?: string;
  required?: boolean;
}

// Input
interface InputFieldProps extends BaseFieldProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  as?: 'input';
}

// Textarea
interface TextareaFieldProps extends BaseFieldProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
  as: 'textarea';
}

// Select
interface SelectFieldProps extends BaseFieldProps, SelectHTMLAttributes<HTMLSelectElement> {
  as: 'select';
  children: ReactNode;
}

type FormFieldProps = InputFieldProps | TextareaFieldProps | SelectFieldProps;

const baseInput = [
  'w-full min-h-[var(--touch-min)] px-4 py-3',
  'text-base font-medium',
  'bg-[var(--paper-alt)] text-[var(--ink)]',
  'border-2 border-[var(--ink)] rounded-[var(--radius-md)]',
  'shadow-[var(--shadow-sm)]',
  'placeholder:text-[var(--ink-faint)]',
  'focus:outline-none focus:shadow-[var(--shadow-saffron)]',
  'disabled:opacity-50 disabled:cursor-not-allowed',
].join(' ');

export const FormField = forwardRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, FormFieldProps>(
  (props, ref) => {
    const { label, labelHi, locale = 'en', error, help, required, as = 'input', ...inputProps } = props;
    const displayLabel = locale === 'hi' && labelHi ? labelHi : label;
    const id = inputProps.id || label.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="grid gap-2">
        <label htmlFor={id} className="text-sm font-bold text-[var(--ink)]">
          {displayLabel}
          {required && <span className="text-[var(--red)] ml-0.5">*</span>}
        </label>

        {as === 'textarea' ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            id={id}
            className={[baseInput, 'min-h-[120px] resize-y', error ? 'border-[var(--red)]' : ''].join(' ')}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : help ? `${id}-help` : undefined}
            {...(inputProps as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : as === 'select' ? (
          <select
            ref={ref as React.Ref<HTMLSelectElement>}
            id={id}
            className={[baseInput, 'appearance-none cursor-pointer', error ? 'border-[var(--red)]' : ''].join(' ')}
            aria-invalid={!!error}
            {...(inputProps as SelectHTMLAttributes<HTMLSelectElement>)}
          >
            {(props as SelectFieldProps).children}
          </select>
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            id={id}
            className={[baseInput, error ? 'border-[var(--red)]' : ''].join(' ')}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : help ? `${id}-help` : undefined}
            {...(inputProps as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}

        {error && <p id={`${id}-error`} className="text-xs font-bold text-[var(--red)]" role="alert">{error}</p>}
        {help && !error && <p id={`${id}-help`} className="text-xs text-[var(--ink-muted)]">{help}</p>}
      </div>
    );
  }
);

FormField.displayName = 'FormField';
export default FormField;
