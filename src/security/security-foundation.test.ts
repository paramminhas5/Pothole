import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(new URL(`../../${path}`, import.meta.url), 'utf8');

describe('P0 security containment', () => {
  it('revokes the legacy public ownership and membership policies', () => {
    const migration = read('supabase/migrations/005_p0_security_foundation.sql');
    expect(migration).toContain('DROP POLICY IF EXISTS "Users can read own posts"');
    expect(migration).toContain('DROP POLICY IF EXISTS "Anyone can read group members"');
    expect(migration).toContain('REVOKE ALL ON TABLE chapters, posts, contact_responses');
    expect(migration).not.toMatch(/GRANT SELECT \([^)]*session_id/);
    expect(migration).not.toMatch(/GRANT SELECT \([^)]*invite_code/);
    expect(migration).not.toMatch(/GRANT SELECT \([^)]*coordinator_key/);
  });

  it('does not cache APIs or use automatic mirror failover', () => {
    const worker = read('public/sw.js');
    expect(worker).not.toContain('/api/');
    expect(worker).not.toMatch(/mirror/i);
    expect(worker).not.toContain('periodicsync');
    expect(worker).toContain("url.origin !== self.location.origin");
  });

  it('keeps synthetic fixtures explicit and blocked by default', () => {
    const seed = read('supabase/seed.sql');
    expect(seed).toContain("app.allow_synthetic_seed");
    expect(seed).toContain('EXAMPLE ORGANIZATION — NOT REAL');
    expect(seed).toContain('example.invalid');
    expect(seed).not.toContain('advocate.sharma@proton.me');
    expect(seed).not.toContain('Retired High Court judge');
  });

  it('publishes no active mirror endpoints', () => {
    const mirrorConfig = JSON.parse(read('public/mirrors.json')) as { status: string; mirrors: unknown[] };
    expect(mirrorConfig.status).toBe('disabled');
    expect(mirrorConfig.mirrors).toEqual([]);
  });
});
