import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// API configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api'
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

// Environment helpers
export const isDevelopment = process.env.NODE_ENV === 'development'
export const isProduction = process.env.NODE_ENV === 'production'