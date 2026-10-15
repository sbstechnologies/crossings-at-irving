export interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface SpamFilterResult {
  isSpam: boolean;
  reasons: string[];
}

const SPAM_KEYWORDS = [
  "buy backlinks",
  "backlink service",
  "guest post service",
  "seo services",
  "search engine optimization services",
  "casino",
  "online gambling",
  "crypto investment",
  "forex trading",
  "rank your website",
  "increase domain authority",
  "link building service",
  "cheap traffic",
  "website promotion service",
];

const URL_REGEX = /https?:\/\/|www\./i;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PHONE_REGEX = /^[0-9+\-()\s.]{8,20}$/;

function normalize(value: string): string {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function isGarbledText(value: string): boolean {
  if (!value) return false;

  // Long strings with no vowels are suspicious, but not conclusive.
  const letters = value.replace(/[^a-z]/gi, "");

  if (letters.length >= 12 && !/[aeiou]/i.test(letters)) {
    return true;
  }

  // Detect repeated characters such as "xxxxxxxxxxxx".
  if (/(.)\1{7,}/i.test(value)) {
    return true;
  }

  return false;
}

export function filterContactSpam(
  data: ContactFormData,
): SpamFilterResult {
  const reasons: string[] = [];

  const fullName = normalize(data.fullName ?? "");
  const email = normalize(data.email ?? "");
  const phone = (data.phone ?? "").trim();
  const subject = normalize(data.subject ?? "");
  const message = normalize(data.message ?? "");

  const combinedText = `${fullName} ${email} ${subject} ${message}`;

  // 1. Required fields
  if (!fullName || !email || !message) {
    reasons.push("Missing required fields");
  }

  // 2. Email validation
  if (email && !EMAIL_REGEX.test(email)) {
    reasons.push("Invalid email address");
  }

  // 3. Phone validation
  if (phone && !PHONE_REGEX.test(phone)) {
    reasons.push("Invalid phone number");
  }

  // 4. Suspicious names
  if (fullName.length > 100) {
    reasons.push("Name exceeds allowed length");
  }

  if (isGarbledText(fullName)) {
    reasons.push("Suspicious or garbled name");
  }

  if (/https?:\/\/|www\./i.test(fullName)) {
    reasons.push("URL included in name");
  }

  // 5. Message validation
  if (message.length < 3) {
    reasons.push("Message is too short");
  }

  if (message.length > 5000) {
    reasons.push("Message exceeds allowed length");
  }

  if (isGarbledText(message)) {
    reasons.push("Suspicious or garbled message");
  }

  // 6. Excessive links
  const links = message.match(/https?:\/\/|www\./gi) ?? [];

  if (links.length >= 3) {
    reasons.push("Excessive links in message");
  }

  // 7. Promotional and SEO spam
  for (const keyword of SPAM_KEYWORDS) {
    if (combinedText.includes(keyword)) {
      reasons.push(`Promotional spam keyword: ${keyword}`);
    }
  }

  // 8. Repeated promotional patterns
  if (
    /(buy now|act now|limited offer|earn money fast|guaranteed ranking)/i.test(
      message,
    )
  ) {
    reasons.push("Suspicious promotional language");
  }

  // 9. Excessive repeated characters
  if (/(.)\1{7,}/i.test(message)) {
    reasons.push("Repeated characters in message");
  }

  return {
    isSpam: reasons.length > 0,
    reasons,
  };
}

