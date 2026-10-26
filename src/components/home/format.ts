/** Two-digit position number for numbered rows and cards: 0 -> "01". */
export const pad = (i: number) => String(i + 1).padStart(2, '0');
