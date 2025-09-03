"use client";

import { useState, useEffect, useCallback } from "react";
import NumberField from "@/components/calculators/NumberField";
import StickyResults from "@/components/calculators/StickyResults";
import { trackCalculatorInput, trackCalculatorSubmit } from "@/lib/analytics";

type FormValues = {
  annualSalary: number;
  hoursPerWeek: number;
  weeksPerYear: number;
};

export default function Calculator() {
  const [values, setValues] = useState<FormValues>({
    annualSalary: 0,
    hoursPerWeek: 40,
    weeksPerYear: 52,
  });

  const [results, setResults] = useState({
    hourlyRate: 0,
    monthlyRate: 0,
    weeklyRate: 0,
    totalHoursPerYear: 0,
  });

  const [hasTrackedSubmit, setHasTrackedSubmit] = useState(false);

  const calculateResults = useCallback(() => {
    const { annualSalary, hoursPerWeek, weeksPerYear } = values;
    
    if (annualSalary <= 0 || hoursPerWeek <= 0 || weeksPerYear <= 0) {
      setResults({
        hourlyRate: 0,
        monthlyRate: 0,
        weeklyRate: 0,
        totalHoursPerYear: 0,
      });
      return;
    }

    const totalHoursPerYear = hoursPerWeek * weeksPerYear;
    const hourlyRate = annualSalary / totalHoursPerYear;
    const weeklyRate = hourlyRate * hoursPerWeek;
    const monthlyRate = annualSalary / 12;

    setResults({
      hourlyRate,
      monthlyRate,
      weeklyRate,
      totalHoursPerYear,
    });
  }, [values]);

  useEffect(() => {
    calculateResults();
  }, [calculateResults]);

  // Track calculator submission
  useEffect(() => {
    if (results.hourlyRate > 0 && !hasTrackedSubmit) {
      trackCalculatorSubmit("salary-to-hourly");
      setHasTrackedSubmit(true);
    }
  }, [results.hourlyRate, hasTrackedSubmit]);

  const handleInputChange = (field: keyof FormValues, value: string) => {
    const numValue = parseFloat(value) || 0;
    setValues(prev => ({ ...prev, [field]: numValue }));
    trackCalculatorInput("salary-to-hourly", field, numValue.toString());
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatHours = (hours: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(hours);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <NumberField
          label="Annual Salary"
          value={values.annualSalary}
          onChange={(value) => handleInputChange("annualSalary", value)}
        />
        <NumberField
          label="Hours per Week"
          value={values.hoursPerWeek}
          onChange={(value) => handleInputChange("hoursPerWeek", value)}
        />
        <NumberField
          label="Weeks per Year"
          value={values.weeksPerYear}
          onChange={(value) => handleInputChange("weeksPerYear", value)}
        />
      </div>

      {results.hourlyRate > 0 && (
        <StickyResults
          title="Salary Breakdown"
          results={[
            {
              label: "Hourly Rate",
              value: formatCurrency(results.hourlyRate)
            },
            {
              label: "Weekly Rate",
              value: formatCurrency(results.weeklyRate)
            },
            {
              label: "Monthly Rate",
              value: formatCurrency(results.monthlyRate)
            }
          ]}
          inputs={{
            "Annual Salary": formatCurrency(values.annualSalary),
            "Hours/Week": `${formatHours(values.hoursPerWeek)}`,
            "Weeks/Year": `${formatHours(values.weeksPerYear)}`
          }}
          tool="salary-to-hourly"
        />
      )}
    </div>
  );
}
