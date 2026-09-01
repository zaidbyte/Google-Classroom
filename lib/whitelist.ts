const DEFAULT_DOMAIN = "students.csdmi.org";
const DEFAULT_PREFIXES = ["2001", "2002"];

function allowedPrefixes(): string[] {
  const raw = process.env.ALLOWED_ID_PREFIXES;
  if (!raw) return DEFAULT_PREFIXES;
  return raw
    .split(",")
    .map((prefix) => prefix.trim().toLowerCase())
    .filter(Boolean);
}

export function isWhitelisted(email: string | null | undefined): boolean {
  if (!email) return false;

  const domain = (process.env.ALLOWED_EMAIL_DOMAIN ?? DEFAULT_DOMAIN).toLowerCase();
  const [localPart, emailDomain] = email.toLowerCase().split("@");
  if (emailDomain !== domain) return false;

  return allowedPrefixes().some((prefix) => localPart.startsWith(prefix));
}
