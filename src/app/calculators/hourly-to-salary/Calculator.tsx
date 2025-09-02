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
  hoursPerWeek: z.coerce.number().min(0).default(40),
  weeksPerYear: z.coerce.number().min(1).default(52),
});

type FormValues = z.input<typeof Schema>;

export default function Calculator() {
  const { watch, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(Schema),
    mode: "onChange",
    defaultValues: { hourly: 30, hoursPerWeek: 40, weeksPerYear: 52 },
  });

  const hourly = watch("hourly");
  const hoursPerWeek = watch("hoursPerWeek");
  const weeksPerYear = watch("weeksPerYear");

  const weekly = safeNumber(hourly) * safeNumber(hoursPerWeek);
  const annual = weekly * safeNumber(weeksPerYear);
  const monthly = annual / 12;

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-3">
        <NumberField
          label="Hourly rate (USD)"
          value={String(hourly)}
          onChange={(v) => setValue("hourly", safeNumber(v), { shouldValidate: true })}
          step={0.01}
          min={0}
          errorMessage={errors.hourly?.message as string | undefined}
        />
        <NumberField
          label="Hours per week"
          value={String(hoursPerWeek)}
          onChange={(v) => setValue("hoursPerWeek", safeNumber(v), { shouldValidate: true })}
          step={0.5}
          min={0}
          errorMessage={errors.hoursPerWeek?.message as string | undefined}
        />
        <NumberField
          label="Weeks per year"
          value={String(weeksPerYear)}
          onChange={(v) => setValue("weeksPerYear", safeNumber(v), { shouldValidate: true })}
          step={1}
          min={1}
          errorMessage={errors.weeksPerYear?.message as string | undefined}
        />
      </div>

      <ResultCard
        className="mt-4"
        title="Results"
        items={[
          { label: "Annual", value: currency(annual) },
          { label: "Monthly", value: currency(monthly) },
          { label: "Weekly", value: currency(weekly) },
        ]}
      />
    </>
  );
}


