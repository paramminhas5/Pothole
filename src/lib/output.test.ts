import { describe, expect, it } from 'vitest';
import { escapeHtml, safePublicHref, staticHtmlHeaders } from './output';

describe('public output safety', () => {
  it('escapes every HTML metacharacter used by exports', () => {
    expect(escapeHtml(`<script a="b">'&</script>`)).toBe(
      '&lt;script a=&quot;b&quot;&gt;&#39;&amp;&lt;/script&gt;'
    );
  });

  it('allows only HTTPS and mailto public contacts', () => {
    expect(safePublicHref('https://example.org/help')).toBe('https://example.org/help');
    expect(safePublicHref('mailto:help@example.org')).toBe('mailto:help@example.org');
    expect(safePublicHref('http://example.org/help')).toBeNull();
    expect(safePublicHref('javascript:alert(1)')).toBeNull();
    expect(safePublicHref('help@example.org')).toBeNull();
  });

  it('locks down generated HTML snapshots', () => {
    const headers = staticHtmlHeaders();
    expect(headers['X-Content-Type-Options']).toBe('nosniff');
    expect(headers['Content-Security-Policy']).toContain("default-src 'none'");
    expect(headers['Content-Security-Policy']).toContain("frame-ancestors 'none'");
  });
});
