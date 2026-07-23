'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
interface Props { onApprove?: () => void; onReject?: () => void; onNext?: () => void; onPrev?: () => void }
export default function KeyboardShortcuts({ onApprove, onReject, onNext, onPrev }: Props) {
  const [show, setShow] = useState(false); const closeRef = useRef<HTMLButtonElement>(null);
  const keydown = useCallback((event: KeyboardEvent) => { if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement || event.target instanceof HTMLSelectElement) return; switch (event.key) { case '?': setShow((value) => !value); break; case 'j': onNext?.(); break; case 'k': onPrev?.(); break; case 'a': onApprove?.(); break; case 'r': onReject?.(); break; case 'Escape': setShow(false); break; } }, [onApprove, onReject, onNext, onPrev]);
  useEffect(() => { document.addEventListener('keydown', keydown); return () => document.removeEventListener('keydown', keydown); }, [keydown]);
  useEffect(() => { if (show) closeRef.current?.focus(); }, [show]);
  if (!show) return null;
  return <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setShow(false); }}><section className="shortcut-dialog" role="dialog" aria-modal="true" aria-labelledby="shortcut-title"><h2 id="shortcut-title" className="heading-3">Keyboard shortcuts</h2><dl className="shortcut-list"><div><dt><kbd>j</kbd></dt><dd>Next item</dd></div><div><dt><kbd>k</kbd></dt><dd>Previous item</dd></div><div><dt><kbd>a</kbd></dt><dd>Approve</dd></div><div><dt><kbd>r</kbd></dt><dd>Reject</dd></div><div><dt><kbd>?</kbd></dt><dd>Show or hide help</dd></div><div><dt><kbd>Esc</kbd></dt><dd>Close</dd></div></dl><button ref={closeRef} type="button" onClick={() => setShow(false)} className="brutal-btn brutal-btn-dark">Close</button></section></div>;
}
