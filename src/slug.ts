/**
 * Turkish-aware slug generation.
 *
 * `slugify` transliterates Turkish letters to their ASCII counterparts
 * (ç→c, ğ→g, ı→i, İ→i, ö→o, ş→s, ü→u), folds remaining diacritics,
 * drops punctuation and produces a URL-safe, separator-joined string.
 */

const TURKISH: Readonly<Record<string, string>> = {
  ç: "c", Ç: "c",
  ğ: "g", Ğ: "g",
  ı: "i", I: "i",
  İ: "i", i: "i",
  ö: "o", Ö: "o",
  ş: "s", Ş: "s",
  ü: "u", Ü: "u",
  â: "a", Â: "a",
  î: "i", Î: "i",
  û: "u", Û: "u",
};

export interface SlugifyOptions {
  /** Separator between words. Defaults to `"-"`. */
  separator?: string;
  /** Lowercase the result. Defaults to `true`. */
  lowercase?: boolean;
  /** Hard limit for the returned slug length. Truncation happens on a word boundary. */
  maxLength?: number;
}

/** Convert arbitrary text into a URL-safe slug, respecting Turkish letters. */
export function slugify(input: string, options: SlugifyOptions = {}): string {
  const separator = options.separator ?? "-";
  const lowercase = options.lowercase ?? true;
  if (separator === "") throw new RangeError("slugify: separator must not be empty");

  let out = "";
  for (const char of input.normalize("NFC")) {
    const mapped = TURKISH[char];
    if (mapped !== undefined) {
      out += mapped;
      continue;
    }
    out += char.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
  }

  out = out.replace(/[^a-zA-Z0-9]+/g, separator);
  const escaped = separator.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  out = out.replace(new RegExp(`^(${escaped})+|(${escaped})+$`, "g"), "");
  if (lowercase) out = out.toLowerCase();

  if (options.maxLength !== undefined && out.length > options.maxLength) {
    const cut = out.slice(0, options.maxLength);
    const lastSep = cut.lastIndexOf(separator);
    out = (lastSep > 0 ? cut.slice(0, lastSep) : cut).replace(
      new RegExp(`(${escaped})+$`),
      "",
    );
  }

  return out;
}
