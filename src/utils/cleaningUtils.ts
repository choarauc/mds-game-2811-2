// Utility functions for data cleaning calculations
export function calculateCleaningOutput(rawData: number, cleaningRate: number, quality: number): number {
  // If no raw data available, no cleaning can happen
  if (rawData <= 0) return 0;
  
  // Calculate how many raw data items we can clean this tick
  const maxCleanableData = Math.min(rawData, cleaningRate);
  
  // Calculate clean data output based on quality
  // We floor the result to ensure we get whole numbers
  return Math.floor(maxCleanableData);
}

export function calculateAutomaticSale(rawData: number): { amountToSell: number; revenue: number } {
  if (rawData < 100000) return { amountToSell: 0, revenue: 0 };
  
  const amountToSell = Math.floor(rawData * 0.2);
  const revenue = Math.floor(amountToSell / 10000) * 10; // 10000 données = 10€
  
  return { amountToSell, revenue };
}