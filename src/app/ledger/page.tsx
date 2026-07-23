import { LedgerClient } from './LedgerClient';

export const metadata = {
  title: 'Accountability Ledger — Sahayata',
  description: 'Public record of demands made to institutions, their deadlines, and their responses (or silence).',
};

export default function LedgerPage() {
  return <LedgerClient />;
}
