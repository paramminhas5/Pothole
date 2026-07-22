import { en } from './en';
import { hi } from './hi';
import { Locale } from '@/types';

const translations = { en, hi };

export function t(locale: Locale, key: string): string | string[] {
  const keys = key.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = translations[locale];
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback to English
      value = translations.en;
      for (const fallbackKey of keys) {
        if (value && typeof value === 'object' && fallbackKey in value) {
          value = value[fallbackKey];
        } else {
          return key; // Return key as fallback
        }
      }
      return value;
    }
  }
  return value;
}

export function getLocaleFromCookie(cookieString?: string): Locale {
  if (!cookieString) return 'en';
  const match = cookieString.match(/locale=(en|hi)/);
  return (match?.[1] as Locale) || 'en';
}
