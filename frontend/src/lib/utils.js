import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Use this constant for all API calls: axios.get(`${API_URL}/api/...`)
export const API_URL = import.meta.env.VITE_API_URL;
