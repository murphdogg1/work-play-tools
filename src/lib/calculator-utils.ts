import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function useCalculatorState<T extends Record<string, any>>(
  defaultValues: T,
  setValue: (name: keyof T, value: any) => void
) {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Restore state from URL parameters
    const params: Partial<T> = {};
    let hasParams = false;

    Object.keys(defaultValues).forEach((key) => {
      const paramValue = searchParams.get(key);
      if (paramValue !== null) {
        const defaultValue = defaultValues[key];
        
        // Convert string back to appropriate type
        if (typeof defaultValue === 'number') {
          const numValue = parseFloat(paramValue);
          if (!isNaN(numValue)) {
            params[key as keyof T] = numValue as T[keyof T];
            hasParams = true;
          }
        } else if (typeof defaultValue === 'boolean') {
          params[key as keyof T] = (paramValue === 'true') as T[keyof T];
          hasParams = true;
        } else if (typeof defaultValue === 'string') {
          params[key as keyof T] = paramValue as T[keyof T];
          hasParams = true;
        }
      }
    });

    // Only set values if we found valid parameters
    if (hasParams) {
      Object.entries(params).forEach(([key, value]) => {
        setValue(key as keyof T, value);
      });
    }
  }, [searchParams, defaultValues, setValue]);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatHours(hours: number): string {
  if (hours === Math.floor(hours)) {
    return `${hours}h`;
  }
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);
  return `${wholeHours}h ${minutes}m`;
}

export function parseTimeToHours(timeString: string): number {
  if (!timeString) return 0;
  
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours + (minutes || 0) / 60;
}

export function formatTimeFromHours(hours: number): string {
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);
  return `${wholeHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}
