export function formatCurrency(value: number | bigint, country = "en-US") {
  return new Intl.NumberFormat(country, {
    style: "currency",
    currency: "USD",
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: 2,
  }).format(value);
}

// console.log(formatCurrency(10));
