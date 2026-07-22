import { describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';
import {
  cleanString,
  isKnownCityArea,
  isSafeContactMethod,
  normalizeEmail,
  parseJsonObject,
  validCategories,
} from './validation';

describe('server input validation', () => {
  it('normalizes bounded text and email values', () => {
    expect(cleanString('  hello  ', 10)).toBe('hello');
    expect(cleanString('too long', 3)).toBeNull();
    expect(normalizeEmail(' USER@Example.COM ')).toBe('user@example.com');
  });

  it('accepts only configured city and area combinations', () => {
    expect(isKnownCityArea('Delhi', 'Central Delhi')).toBe(true);
    expect(isKnownCityArea('Delhi', 'Mumbai')).toBe(false);
  });

  it('deduplicates valid categories and rejects unknown ones', () => {
    expect(validCategories(['legal', 'legal', 'translation'])).toEqual(['legal', 'translation']);
    expect(validCategories(['legal', 'unknown'])).toBeNull();
  });

  it('requires HTTPS or mailto contacts', () => {
    expect(isSafeContactMethod('https://example.org/contact')).toBe(true);
    expect(isSafeContactMethod('mailto:help@example.org')).toBe(true);
    expect(isSafeContactMethod('http://example.org')).toBe(false);
    expect(isSafeContactMethod('javascript:alert(1)')).toBe(false);
    expect(isSafeContactMethod('plain@example.org')).toBe(false);
  });

  it('rejects non-JSON and cross-origin mutation bodies', async () => {
    const nonJson = new NextRequest('https://sahayata.example/api/posts', {
      method: 'POST',
      headers: { 'content-type': 'text/plain' },
      body: '{}',
    });
    expect(await parseJsonObject(nonJson)).toBeNull();

    const crossOrigin = new NextRequest('https://sahayata.example/api/posts', {
      method: 'POST',
      headers: { 'content-type': 'application/json', origin: 'https://attacker.example' },
      body: '{}',
    });
    expect(await parseJsonObject(crossOrigin)).toBeNull();

    const sameOrigin = new NextRequest('https://sahayata.example/api/posts', {
      method: 'POST',
      headers: { 'content-type': 'application/json', origin: 'https://sahayata.example' },
      body: '{"type":"need"}',
    });
    expect(await parseJsonObject(sameOrigin)).toEqual({ type: 'need' });
  });
});
