"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import NumberField from "@/components/calculators/NumberField";
import ResultCard from "@/components/calculators/ResultCard";
import { currency, safeNumber } from "@/lib/format";

const Schema = z.object({
  hourly: z.coerce.number().min(0).default(30),
  hoursWorked: z.coerce.number().min(0).default(45),
  overtimeThreshold: z.coerce.number().min(0).default(40),
  overtimeRate: z.coerce.number().min(1).default(1.5),
  doubleTime: z.coerce.boolean().default(false),
});

type FormValues = z.input<typeof Schema>;

export default function Calculator() {
  const { watch, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(Schema),
    mode: "onChange",
    defaultValues: { hourly: 30, hoursWorked: 45, overtimeThreshold: 40, overtimeRate: 1.5, doubleTime: false },
  });

  const hourly = watch("hourly");
  const hoursWorked = watch("hoursWorked");
  const overtimeThreshold = watch("overtimeThreshold");
  const overtimeRate = watch("overtimeRate");
  const doubleTime = watch("doubleTime");

  const regularHours = Math.max(0, Math.min(safeNumber(hoursWorked), safeNumber(overtimeThreshold)));
  const overtimeHours = Math.max(0, safeNumber(hoursWorked) - safeNumber(overtimeThreshold));

  const regularPay = regularHours * safeNumber(hourly);
  const overtimePay = doubleTime ? 0 : overtimeHours * safeNumber(hourly) * safeNumber(overtimeRate);
  const doubleTimePay = doubleTime ? overtimeHours * safeNumber(hourly) * 2 : 0;
  const totalPay = regularPay + overtimePay + doubleTimePay;

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField
          label="Hourly rate (USD)"
          value={String(hourly)}
          onChange={(v) => setValue("hourly", safeNumber(v), { shouldValidate: true })}
          step={0.01}
          min={0}
          errorMessage={errors.hourly?.message as string | undefined}
        />
        <NumberField
          label="Hours worked (week)"
          value={String(hoursWorked)}
          onChange={(v) => setValue("hoursWorked", safeNumber(v), { shouldValidate: true })}
          step={0.1}
          min={0}
          errorMessage={errors.hoursWorked?.message as string | undefined}
        />
        <NumberField
          label="Overtime threshold (hours)"
          value={String(overtimeThreshold)}
          onChange={(v) => setValue("overtimeThreshold", safeNumber(v), { shouldValidate: true })}
          step={0.5}
          min={0}
          errorMessage={errors.overtimeThreshold?.message as string | undefined}
        />
        <NumberField
          label="Overtime rate multiplier"
          value={String(overtimeRate)}
          onChange={(v) => setValue("overtimeRate", safeNumber(v), { shouldValidate: true })}
          step={0.1}
          min={1}
          errorMessage={errors.overtimeRate?.message as string | undefined}
        />
        <div className="sm:col-span-2 flex items-center justify-between rounded-md border border-black/10 dark:border-white/15 p-3">
          <div>
            <p className="text-sm font-medium">Double-time (2.0x)</p>
            <p className="text-xs text-black/70 dark:text-white/70">When enabled, overtime uses 2.0x instead of the value above.</p>
          </div>
          <label className="inline-flex items-center cursor-pointer select-none">
            <input
              type="checkbox"
              className="sr-only"
              checked={!!doubleTime}
              onChange={(e) => setValue("doubleTime", e.target.checked, { shouldValidate: true })}
            />
            <span className="relative h-6 w-10 rounded-full bg-black/20 dark:bg-white/25 transition-colors">
              <span className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white dark:bg-black transition-transform ${doubleTime ? "translate-x-4" : ""}`} />
            </span>
          </label>
        </div>
      </div>

      <ResultCard
        className="mt-4"
        title="Results"
        items={[
          { label: "Regular pay", value: currency(regularPay) },
          { label: "Overtime pay", value: currency(overtimePay) },
          { label: "Double-time pay", value: currency(doubleTimePay) },
          { label: "Total pay", value: currency(totalPay) },
        ]}
      />
      <p className="mt-3 text-xs text-black/60 dark:text-white/60">Estimates only; not legal advice.</p>
    </>
  );
}


