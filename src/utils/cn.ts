// src/utils/cn.ts
export const cn = (...xs: (string | false | null | undefined)[]) =>
  xs.filter(Boolean).join(" ");

export const formatCurrency = (n: number, currency = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(n);
