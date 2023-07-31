export function formatter(
  number: number | bigint,
  options?: Intl.NumberFormatOptions
) {
  return new Intl.NumberFormat("id-Id", options).format(number);
}

const suffixes = new Map([
  ["one", ""],
  ["other", "'s"],
]);

export function plural(n: number, text: string) {
  const enOrdinalRules = new Intl.PluralRules("en-US");

  const rule = enOrdinalRules.select(n);
  const suffix = suffixes.get(rule);
  return `${text}${suffix}`;
}
