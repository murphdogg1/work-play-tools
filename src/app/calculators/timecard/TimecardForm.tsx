"use client";

import React from "react";
import { safeNumber } from "@/lib/format";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
  const { control, watch, register } = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: { rows: [{ in: "09:00", out: "17:00", breakMinutes: 30 }] },
    mode: "onChange",
  });
  const { fields, append, remove } = useFieldArray({ control, name: "rows" });
  const rows = (watch("rows") ?? []) as RowValues[];

  const perRowHours = rows.map((r) => {
    const inTime = r.in ?? "00:00";
    const outTime = r.out ?? "00:00";
    return Math.max(0, diffHours(inTime, outTime) - safeNumber(r.breakMinutes) / 60);
  });
  const totalHours = perRowHours.reduce((a, b) => a + b, 0);
  const overtimeHours = Math.max(0, totalHours - 40);
  const regularHours = Math.max(0, totalHours - overtimeHours);

  return (
    <div className="space-y-4">
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

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-md border border-black/10 dark:border-white/15 p-3">
          <p className="text-xs text-black/70 dark:text-white/70">Regular hours</p>
          <p className="text-base font-semibold">{regularHours.toFixed(2)}</p>
        </div>
        <div className="rounded-md border border-black/10 dark:border-white/15 p-3">
          <p className="text-xs text-black/70 dark:text-white/70">Overtime hours</p>
          <p className="text-base font-semibold">{overtimeHours.toFixed(2)}</p>
        </div>
        <div className="rounded-md border border-black/10 dark:border-white/15 p-3">
          <p className="text-xs text-black/70 dark:text-white/70">Total hours</p>
          <p className="text-base font-semibold">{totalHours.toFixed(2)}</p>
        </div>
      </div>

      <p className="text-xs text-black/60 dark:text-white/60">Estimates only; not legal advice.</p>
    </div>
  );
}


