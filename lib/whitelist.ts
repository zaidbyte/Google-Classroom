function parseWhitelist(): Set<string> {
  const raw = process.env.WHITELISTED_EMAILS ?? "";
  const emails = raw
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
  return new Set(emails);
}

export function isWhitelisted(email: string | null | undefined): boolean {
  if (!email) return false;
  return parseWhitelist().has(email.toLowerCase());
}
