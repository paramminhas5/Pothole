import { GrievanceRouterClient } from './GrievanceRouterClient';

export const metadata = {
  title: 'Grievance Router — Sahayata',
  description: "I'm angry, what do I do? Answer 4 questions and we'll route you to the correct civic instrument.",
};

export default function GrievanceRouterPage() {
  return <GrievanceRouterClient />;
}
