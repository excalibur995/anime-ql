export function formatter(
  number: number | bigint,
  options?: Intl.NumberFormatOptions
) {
  return new Intl.NumberFormat("id-Id", options).format(number);
}
