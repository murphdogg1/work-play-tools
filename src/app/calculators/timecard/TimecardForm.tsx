"use client";

import React, { useEffect, useRef } from "react";
import { safeNumber } from "@/lib/format";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ResultCard from "@/components/calculators/ResultCard";
import StickyResults from "@/components/calculators/StickyResults";
import { useCalculatorState } from "@/lib/calculator-utils";
import { trackCalculatorSubmit } from "@/lib/analytics";

const RowSchema = z.object({
  in: z.string().default("09:00"),
  out: z.string().default("17:00"),
  breakMinutes: z.coerce.number().min(0).default(30),
});

const Schema = z.object({
  rows: z.array(RowSchema).max(7).default([
    { in: "09:00", out: "17:00", breakMinutes: 30 },
  ]),
});

type FormValues = z.input<typeof Schema>;
type RowValues = z.input<typeof RowSchema>;

function diffHours(inTime: string, outTime: string): number {
  const [ih, im] = inTime.split(":").map(Number);
  const [oh, om] = outTime.split(":").map(Number);
  const inMinutes = ih * 60 + im;
  let outMinutes = oh * 60 + om;
  if (!Number.isFinite(inMinutes) || !Number.isFinite(outMinutes)) return 0;
  if (outMinutes < inMinutes) outMinutes += 24 * 60;
  return Math.max(0, (outMinutes - inMinutes) / 60);
}

export default function TimecardForm() {
  const defaultValues = { rows: [{ in: "09:00", out: "17:00", breakMinutes: 30 }] };
  const hasTrackedSubmit = useRef(false);
  
  const { control, watch, register, setValue } = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues,
    mode: "onChange",
  });
  const { fields, append, remove } = useFieldArray({ control, name: "rows" });
  const rows = (watch("rows") ?? []) as RowValues[];

  // Restore state from URL parameters
  useCalculatorState(defaultValues, setValue);

  const perRowHours = rows.map((r) => {
    const inTime = r.in ?? "00:00";
    const outTime = r.out ?? "00:00";
    return Math.max(0, diffHours(inTime, outTime) - safeNumber(r.breakMinutes) / 60);
  });
  const totalHours = perRowHours.reduce((a, b) => a + b, 0);
  const overtimeHours = Math.max(0, totalHours - 40);
  const regularHours = Math.max(0, totalHours - overtimeHours);

  // Track submit event when calculator first shows meaningful results
  useEffect(() => {
    if (!hasTrackedSubmit.current && totalHours > 0) {
      trackCalculatorSubmit("timecard");
      hasTrackedSubmit.current = true;
    }
  }, [totalHours]);

  const results = [
    { label: "Regular hours", value: `${regularHours.toFixed(2)}h` },
    { label: "Overtime hours", value: `${overtimeHours.toFixed(2)}h` },
    { label: "Total hours", value: `${totalHours.toFixed(2)}h`, highlight: true },
  ];

  const currentInputs = {
    "Days tracked": `${rows.length} day${rows.length !== 1 ? 's' : ''}`,
    "Total entries": `${rows.length} entries`,
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
      <div className="space-y-3">
        {fields.map((field, idx) => (
          <div key={field.id} className="grid gap-2 sm:grid-cols-4 items-end">
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Clock in</span>
              <input type="time" className="h-10 rounded-md border border-black/10 dark:border-white/15 bg-transparent px-3 text-sm" {...register(`rows.${idx}.in` as const)} defaultValue={field.in ?? ""} />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Clock out</span>
              <input type="time" className="h-10 rounded-md border border-black/10 dark:border-white/15 bg-transparent px-3 text-sm" {...register(`rows.${idx}.out` as const)} defaultValue={field.out ?? ""} />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Unpaid break (min)</span>
              <input type="number" min={0} step={1} className="h-10 rounded-md border border-black/10 dark:border-white/15 bg-transparent px-3 text-sm" {...register(`rows.${idx}.breakMinutes` as const, { valueAsNumber: true })} defaultValue={Number(field.breakMinutes ?? 0)} />
            </label>
            <div className="flex gap-2">
              <button type="button" className="h-10 px-3 rounded-md border border-black/10 dark:border-white/15 text-sm" onClick={() => remove(idx)}>Remove</button>
            </div>
          </div>
        ))}
        {fields.length < 7 ? (
          <button type="button" className="h-10 px-3 rounded-md border border-black/10 dark:border-white/15 text-sm" onClick={() => append({ in: "09:00", out: "17:00", breakMinutes: 30 })}>+ Add row</button>
        ) : null}
        </div>

        <ResultCard
          title="Results"
          tool="timecard"
          items={results}
        />
        <p className="text-xs text-black/60 dark:text-white/60">Estimates only; not legal advice.</p>
      </div>

      <StickyResults
        title="Timecard Results"
        results={results}
        inputs={currentInputs}
        tool="timecard"
      />
    </div>
  );
}


