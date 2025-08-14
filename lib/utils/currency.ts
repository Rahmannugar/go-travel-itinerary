export const formatCurrency = (amount: number, currency?: string) => {
  try {
    const userLocale = navigator.language;
    const userCurrency =
      currency ||
      Intl.NumberFormat(userLocale).resolvedOptions().currency ||
      "USD";

    return new Intl.NumberFormat(userLocale, {
      style: "currency",
      currency: userCurrency,
    }).format(amount);
  } catch (_error) {
    // Fallback function
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  }
};
