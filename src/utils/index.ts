/**
 * Utility functions for the application.
 */

/**
 * Format a 10 digit number to space-separated blocks: "XXXXX XXXXX"
 */
export const formatPhoneNumber = (phone: string): string => {
  const digits = phone.replace(/\D/g, '');
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)} ${digits.slice(5, 10)}`;
};

/**
 * Sleep for a specific duration in milliseconds
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
