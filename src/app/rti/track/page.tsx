import { RTITrackerClient } from './RTITrackerClient';

export const metadata = {
  title: 'RTI Tracker — Sahayata',
  description: 'Track your RTI filings, escalate on deadline, generate appeals automatically.',
};

export default function RTITrackerPage() {
  return <RTITrackerClient />;
}
