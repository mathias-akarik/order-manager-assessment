
export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // lib/utils.ts

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  