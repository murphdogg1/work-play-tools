"use client";

import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import NumberField from "@/components/calculators/NumberField";
import ResultCard from "@/components/calculators/ResultCard";
import StickyResults from "@/components/calculators/StickyResults";
import { currency, safeNumber } from "@/lib/format";
import { trackCalculatorSubmit } from "@/lib/analytics";
import { useCalculatorState } from "@/lib/calculator-utils";

const Schema = z.object({
  hourly: z.coerce.number().min(0).default(30),
  hoursPerWeek: z.coerce.number().min(0).default(40),
  weeksPerYear: z.coerce.number().min(1).default(52),
});

type FormValues = z.input<typeof Schema>;

export default function Calculator() {
  const defaultValues = { hourly: 30, hoursPerWeek: 40, weeksPerYear: 52 };
  const hasTrackedSubmit = useRef(false);
  
  const { watch, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(Schema),
    mode: "onChange",
    defaultValues,
  });

  // Restore state from URL parameters
  useCalculatorState(defaultValues, setValue);

  const hourly = watch("hourly");
  const hoursPerWeek = watch("hoursPerWeek");
  const weeksPerYear = watch("weeksPerYear");

  const weekly = safeNumber(hourly) * safeNumber(hoursPerWeek);
  const annual = weekly * safeNumber(weeksPerYear);
  const monthly = annual / 12;

  // Track submit event when calculator first shows meaningful results
  useEffect(() => {
    if (!hasTrackedSubmit.current && annual > 0) {
      trackCalculatorSubmit("hourly-to-salary");
      hasTrackedSubmit.current = true;
    }
  }, [annual]);

  const results = [
    { label: "Annual", value: currency(annual), highlight: true },
    { label: "Monthly", value: currency(monthly) },
    { label: "Weekly", value: currency(weekly) },
  ];

  const currentInputs = {
    "Hourly Rate": `$${hourly}`,
    "Hours per Week": `${hoursPerWeek} hours`,
    "Weeks per Year": `${weeksPerYear} weeks`,
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-3">
        <NumberField
          label="Hourly rate (USD)"
          value={String(hourly)}
          onChange={(v) => setValue("hourly", safeNumber(v), { shouldValidate: true })}
          step={0.01}
          min={0}
          errorMessage={errors.hourly?.message as string | undefined}
          tool="hourly-to-salary"
          field="hourly"
        />
        <NumberField
          label="Hours per week"
          value={String(hoursPerWeek)}
          onChange={(v) => setValue("hoursPerWeek", safeNumber(v), { shouldValidate: true })}
          step={0.5}
          min={0}
          errorMessage={errors.hoursPerWeek?.message as string | undefined}
          tool="hourly-to-salary"
          field="hoursPerWeek"
        />
        <NumberField
          label="Weeks per year"
          value={String(weeksPerYear)}
          onChange={(v) => setValue("weeksPerYear", safeNumber(v), { shouldValidate: true })}
          step={1}
          min={1}
          errorMessage={errors.weeksPerYear?.message as string | undefined}
          tool="hourly-to-salary"
          field="weeksPerYear"
        />
        </div>

        <ResultCard
          className="mt-4"
          title="Results"
          tool="hourly-to-salary"
          items={results}
        />
      </div>

      <StickyResults
        title="Salary Conversion Results"
        results={results}
        inputs={currentInputs}
        tool="hourly-to-salary"
      />
    </div>
  );
}


