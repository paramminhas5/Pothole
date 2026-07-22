import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(new URL(`../../${path}`, import.meta.url), 'utf8');

describe('simple and safe public experience', () => {
  it('provides a skip link, main landmark, and truthful prototype notice', () => {
    const layout = read('src/app/layout.tsx');
    expect(layout).toContain('href="#main-content"');
    expect(layout).toContain('<main id="main-content"');
    expect(layout).toContain('Private prototype:');
    expect(layout).toContain('Do not use for emergencies');
  });

  it('presents three obvious first actions without fake live statistics', () => {
    const home = read('src/app/page.tsx');
    expect(home).toContain('Get help');
    expect(home).toContain('Offer help');
    expect(home).toContain('Find support');
    expect(home).toContain('A moderator checks submissions for harmful content and obvious private details, but some content may be missed.');
    expect(home).not.toMatch(/47|156|live groups|open needs/i);
  });

  it('enforces large targets, visible focus, and reduced motion', () => {
    const styles = read('src/app/globals.css');
    expect(styles).toMatch(/\.brutal-btn\s*\{[\s\S]*?min-height:\s*48px/);
    expect(styles).toContain('*:focus-visible');
    expect(styles).toContain('@media (prefers-reduced-motion: reduce)');
  });

  it('replaces browser prompts and adds trusted-adult safeguards', () => {
    const board = read('src/app/board/BoardClient.tsx');
    const createPost = read('src/app/create-post/CreatePostClient.tsx');
    const directory = read('src/app/directory/DirectoryClient.tsx');
    expect(board).not.toContain('prompt(');
    expect(board).toContain('trusted adult');
    expect(board).toContain('safety_attested');
    expect(createPost).toContain('trusted adult');
    expect(createPost).toContain('No names, phone numbers, ID numbers, or exact addresses.');
    expect(directory).toContain('trusted adult');
  });
});
