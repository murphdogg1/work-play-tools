"use client";

import React from "react";

export type NumberFieldProps = {
  id?: string;
  label: string;
  value: string | number;
  onChange: (next: string) => void;
  step?: number | string;
  min?: number | string;
  max?: number | string;
  helperText?: string;
  errorMessage?: string;
  className?: string;
  inputClassName?: string;
};

export default function NumberField({
  id,
  label,
  value,
  onChange,
  step,
  min,
  max,
  helperText,
  errorMessage,
  className,
  inputClassName,
}: NumberFieldProps) {
  const reactId = React.useId();
  const inputId = id ?? `num-${reactId}`;
  const describedById = helperText ? `${inputId}-desc` : undefined;

  return (
    <div className={className}>
      <label className="flex flex-col gap-1" htmlFor={inputId}>
        <span className="text-sm font-medium">{label}</span>
        <input
          id={inputId}
          type="number"
          inputMode="decimal"
          step={step}
          min={min as number | undefined}
          max={max as number | undefined}
          className={`h-10 rounded-md border bg-transparent px-3 text-sm outline-none focus:ring-2 border-black/10 dark:border-white/15 focus:ring-black/10 dark:focus:ring-white/20 ${inputClassName ?? ""} ${errorMessage ? "border-red-500/70 focus:ring-red-500/30" : ""}`}
          value={value as number | string}
          aria-invalid={Boolean(errorMessage) || undefined}
          aria-describedby={describedById}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
      {helperText ? (
        <p id={describedById} className="mt-1 text-xs text-black/70 dark:text-white/70">{helperText}</p>
      ) : null}
      {errorMessage ? (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errorMessage}</p>
      ) : null}
    </div>
  );
}


