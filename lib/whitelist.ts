const DEFAULT_DOMAIN = "students.csdmi.org";
const DEFAULT_PREFIXES = ["2001", "2002"];
const DEFAULT_EXTRA_EMAILS = ["acaat@sea.yt"];

function allowedPrefixes(): string[] {
  const raw = process.env.ALLOWED_ID_PREFIXES;
  if (!raw) return DEFAULT_PREFIXES;
  return raw
    .split(",")
    .map((prefix) => prefix.trim().toLowerCase())
    .filter(Boolean);
}

function extraAllowedEmails(): string[] {
  const raw = process.env.EXTRA_ALLOWED_EMAILS;
  if (!raw) return DEFAULT_EXTRA_EMAILS;
  return raw
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isWhitelisted(email: string | null | undefined): boolean {
  if (!email) return false;

  const normalized = email.toLowerCase();
  if (extraAllowedEmails().includes(normalized)) return true;

  const domain = (process.env.ALLOWED_EMAIL_DOMAIN ?? DEFAULT_DOMAIN).toLowerCase();
  const [localPart, emailDomain] = normalized.split("@");
  if (emailDomain !== domain) return false;

  return allowedPrefixes().some((prefix) => localPart.startsWith(prefix));
}
