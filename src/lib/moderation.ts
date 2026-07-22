// PII Detection — keyword filters for personal data leakage
// This runs on content before display and during moderation

const PHONE_PATTERNS = [
  /\b\d{10}\b/g,                    // 10-digit phone numbers
  /\b\+91[\s-]?\d{10}\b/g,         // +91 prefix
  /\b\d{3}[\s-]\d{3}[\s-]\d{4}\b/g, // XXX-XXX-XXXX
  /\b\d{4}[\s-]\d{3}[\s-]\d{3}\b/g, // XXXX-XXX-XXX
  /\b\d{5}[\s-]\d{5}\b/g,          // XXXXX-XXXXX
];

const AADHAAR_PATTERN = /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g;
const PAN_PATTERN = /\b[A-Z]{5}\d{4}[A-Z]\b/g;
const EMAIL_PATTERN = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;

export interface PIIDetectionResult {
  hasPII: boolean;
  flags: string[];
  sanitized: string;
}

export function detectPII(text: string): PIIDetectionResult {
  const flags: string[] = [];
  let sanitized = text;

  // Check phone numbers
  for (const pattern of PHONE_PATTERNS) {
    const matches = text.match(pattern);
    if (matches) {
      flags.push(`Phone number detected: ${matches.length} match(es)`);
      sanitized = sanitized.replace(pattern, '[PHONE REDACTED]');
    }
  }

  // Check Aadhaar
  const aadhaarMatches = text.match(AADHAAR_PATTERN);
  if (aadhaarMatches) {
    flags.push(`Possible Aadhaar number: ${aadhaarMatches.length} match(es)`);
    sanitized = sanitized.replace(AADHAAR_PATTERN, '[AADHAAR REDACTED]');
  }

  // Check PAN
  const panMatches = text.match(PAN_PATTERN);
  if (panMatches) {
    flags.push(`Possible PAN number: ${panMatches.length} match(es)`);
    sanitized = sanitized.replace(PAN_PATTERN, '[PAN REDACTED]');
  }

  // Check email (flag but don't necessarily block — depends on context)
  const emailMatches = text.match(EMAIL_PATTERN);
  if (emailMatches) {
    flags.push(`Email address found: ${emailMatches.length} match(es)`);
    // Don't redact emails in content — they might be intentional contact methods
  }

  return {
    hasPII: flags.length > 0,
    flags,
    sanitized,
  };
}

// Quick check used in API validation before DB insert
export function hasBlockingPII(text: string): boolean {
  // Block phone numbers and Aadhaar only — these are dangerous
  for (const pattern of PHONE_PATTERNS) {
    if (pattern.test(text)) return true;
    pattern.lastIndex = 0; // Reset regex state
  }
  if (AADHAAR_PATTERN.test(text)) return true;
  AADHAAR_PATTERN.lastIndex = 0;
  if (PAN_PATTERN.test(text)) return true;
  PAN_PATTERN.lastIndex = 0;
  return false;
}
