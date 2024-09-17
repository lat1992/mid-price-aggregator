let prices = new Map<string, number>();

export const updatePrice = (key: string, price: number) => {
  prices.set(key, price);
};

export const getAvgPrice = (): number => {
  let sum = 0;
  for (let v of prices.values()) {
    sum += v;
  }
  return sum / prices.size;
};

export const clearPrices = () => {
  prices.clear();
};
