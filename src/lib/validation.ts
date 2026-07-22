import type { NextRequest } from 'next/server';
import { CATEGORIES, CITIES_AREAS } from './constants';

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const CATEGORY_SET = new Set<string>(CATEGORIES.map((category) => category.value));
const CITY_AREAS = new Map(CITIES_AREAS.map(({ city, areas }) => [city, new Set(areas)]));

export async function parseJsonObject(request: NextRequest, maxBytes = 12_000): Promise<Record<string, unknown> | null> {
  const contentType = request.headers.get('content-type')?.toLowerCase() || '';
  if (!contentType.startsWith('application/json')) return null;
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return null;

  const declaredLength = Number(request.headers.get('content-length') || '0');
  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) return null;

  const text = await request.text();
  if (!text || new TextEncoder().encode(text).byteLength > maxBytes) return null;
  try {
    const parsed: unknown = JSON.parse(text);
    return parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed)
      ? parsed as Record<string, unknown>
      : null;
  } catch {
    return null;
  }
}

export function cleanString(value: unknown, maxLength: number, minLength = 1): string | null {
  if (typeof value !== 'string') return null;
  const cleaned = value.trim();
  return cleaned.length >= minLength && cleaned.length <= maxLength ? cleaned : null;
}

export function optionalString(value: unknown, maxLength: number): string | null {
  if (value === undefined || value === null || value === '') return '';
  return cleanString(value, maxLength, 0);
}

export function isUuid(value: unknown): value is string {
  return typeof value === 'string' && UUID_PATTERN.test(value);
}

export function isCategory(value: unknown): value is string {
  return typeof value === 'string' && CATEGORY_SET.has(value);
}

export function validCategories(value: unknown, maxItems = 11): string[] | null {
  if (!Array.isArray(value) || value.length < 1 || value.length > maxItems) return null;
  if (!value.every(isCategory)) return null;
  return [...new Set(value)];
}

export function isKnownCity(value: unknown): value is string {
  return typeof value === 'string' && CITY_AREAS.has(value);
}

export function isKnownCityArea(city: unknown, area: unknown): city is string {
  return typeof city === 'string' && typeof area === 'string' && CITY_AREAS.get(city)?.has(area) === true;
}

export function normalizeEmail(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const email = value.trim().toLowerCase();
  return email.length <= 254 && EMAIL_PATTERN.test(email) ? email : null;
}

export function isSafeContactMethod(value: string): boolean {
  if (/[\u0000-\u001f\u007f]/.test(value)) return false;
  const schemeMatch = value.match(/^([a-z][a-z0-9+.-]*):/i);
  if (!schemeMatch) return false;
  return ['https', 'mailto'].includes(schemeMatch[1].toLowerCase());
}

export function validFilter(value: string | null, allowed: ReadonlySet<string>, maxLength = 100): value is string {
  return value !== null && value.length <= maxLength && allowed.has(value);
}
