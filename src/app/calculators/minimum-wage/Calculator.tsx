"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import NumberField from "@/components/calculators/NumberField";
import ResultCard from "@/components/calculators/ResultCard";
import StickyResults from "@/components/calculators/StickyResults";
import { trackCalculatorInput, trackCalculatorSubmit } from "@/lib/analytics";

interface WageResults {
  federalMinimum: number;
  stateMinimum: number;
  localMinimum: number;
  applicableMinimum: number;
  regularPay: number;
  overtimePay: number;
  totalPay: number;
  annualSalary: number;
  monthlySalary: number;
  weeklySalary: number;
}

export default function MinimumWageCalculator() {
  const [state, setState] = useState<string>("CA");
  const [city, setCity] = useState<string>("");
  const [hoursWorked, setHoursWorked] = useState<number>(40);
  const [overtimeHours, setOvertimeHours] = useState<number>(0);


  const [results, setResults] = useState<WageResults>({
    federalMinimum: 7.25,
    stateMinimum: 0,
    localMinimum: 0,
    applicableMinimum: 7.25,
    regularPay: 0,
    overtimePay: 0,
    totalPay: 0,
    annualSalary: 0,
    monthlySalary: 0,
    weeklySalary: 0,
  });

  const hasTrackedSubmit = useRef(false);

  // 2024 Minimum wage rates by state
  const stateMinimumWages: { [key: string]: number } = {
    "AL": 7.25, // Federal minimum
    "AK": 11.73,
    "AZ": 14.35,
    "AR": 11.00,
    "CA": 16.00,
    "CO": 14.42,
    "CT": 15.69,
    "DE": 13.25,
    "FL": 12.00,
    "GA": 7.25, // Federal minimum
    "HI": 14.00,
    "ID": 7.25, // Federal minimum
    "IL": 14.00,
    "IN": 7.25, // Federal minimum
    "IA": 7.25, // Federal minimum
    "KS": 7.25, // Federal minimum
    "KY": 7.25, // Federal minimum
    "LA": 7.25, // Federal minimum
    "ME": 14.15,
    "MD": 15.00,
    "MA": 15.00,
    "MI": 10.33,
    "MN": 10.85,
    "MS": 7.25, // Federal minimum
    "MO": 12.30,
    "MT": 10.30,
    "NE": 10.50,
    "NV": 11.25,
    "NH": 7.25, // Federal minimum
    "NJ": 15.13,
    "NM": 12.00,
    "NY": 15.00,
    "NC": 7.25, // Federal minimum
    "ND": 7.25, // Federal minimum
    "OH": 10.45,
    "OK": 7.25, // Federal minimum
    "OR": 14.20,
    "PA": 7.25, // Federal minimum
    "RI": 14.00,
    "SC": 7.25, // Federal minimum
    "SD": 11.20,
    "TN": 7.25, // Federal minimum
    "TX": 7.25, // Federal minimum
    "UT": 7.25, // Federal minimum
    "VT": 13.67,
    "VA": 12.00,
    "WA": 16.28,
    "WV": 8.75,
    "WI": 7.25, // Federal minimum
    "WY": 7.25, // Federal minimum
  };

  // Major city minimum wages (2024)
  const cityMinimumWages: { [key: string]: { [key: string]: number } } = {
    "CA": {
      "Los Angeles": 16.90,
      "San Francisco": 18.07,
      "San Diego": 16.85,
      "Oakland": 16.50,
      "Berkeley": 18.07,
      "Emeryville": 18.67,
      "Fremont": 16.00,
      "Mountain View": 18.15,
      "Palo Alto": 17.25,
      "San Jose": 17.55,
      "Santa Monica": 16.90,
      "West Hollywood": 19.08,
    },
    "NY": {
      "New York City": 16.00,
      "Long Island": 16.00,
      "Westchester": 15.00,
    },
    "WA": {
      "Seattle": 19.97,
      "Tacoma": 16.28,
      "Spokane": 16.28,
    },
    "IL": {
      "Chicago": 15.80,
    },
    "CO": {
      "Denver": 18.29,
    },
    "OR": {
      "Portland": 15.45,
    },
    "MD": {
      "Montgomery County": 16.70,
      "Prince George's County": 16.70,
    },
    "MN": {
      "Minneapolis": 15.57,
      "St. Paul": 15.57,
    },
  };

  const getApplicableMinimumWage = (state: string, city: string) => {
    const federalMinimum = 7.25;
    const stateMinimum = stateMinimumWages[state] || federalMinimum;
    const localMinimum = cityMinimumWages[state]?.[city] || 0;

    // Return the highest applicable minimum wage
    return Math.max(federalMinimum, stateMinimum, localMinimum);
  };

  const calculateResults = useCallback(() => {
    const federalMinimum = 7.25;
    const stateMinimum = stateMinimumWages[state] || federalMinimum;
    const localMinimum = cityMinimumWages[state]?.[city] || 0;
    const applicableMinimum = getApplicableMinimumWage(state, city);

    const regularHours = Math.min(hoursWorked, 40);
    const overtimeHoursCalculated = Math.max(0, hoursWorked - 40) + overtimeHours;
    const overtimeRate = applicableMinimum * 1.5;

    const regularPay = regularHours * applicableMinimum;
    const overtimePay = overtimeHoursCalculated * overtimeRate;
    const totalPay = regularPay + overtimePay;

    // Convert to different pay periods
    const weeklySalary = totalPay;
    const monthlySalary = weeklySalary * 4.33; // Average weeks per month
    const annualSalary = weeklySalary * 52;

    setResults({
      federalMinimum,
      stateMinimum,
      localMinimum,
      applicableMinimum,
      regularPay,
      overtimePay,
      totalPay,
      annualSalary,
      monthlySalary,
      weeklySalary,
    });
  }, [state, city, hoursWorked, overtimeHours]);

  useEffect(() => {
    calculateResults();
  }, [calculateResults]);

  useEffect(() => {
    if (results.totalPay > 0 && !hasTrackedSubmit.current) {
      trackCalculatorSubmit("minimum-wage");
      hasTrackedSubmit.current = true;
    }
  }, [results.totalPay]);

  const handleInputChange = (field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    switch (field) {
      case "hoursWorked":
        setHoursWorked(numValue);
        break;
      case "overtimeHours":
        setOvertimeHours(numValue);
        break;
    }
    trackCalculatorInput("minimum-wage", field, numValue > 0 ? "has-value" : "no-value");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStateName = (stateCode: string) => {
    const stateNames: { [key: string]: string } = {
      "AL": "Alabama", "AK": "Alaska", "AZ": "Arizona", "AR": "Arkansas", "CA": "California",
      "CO": "Colorado", "CT": "Connecticut", "DE": "Delaware", "FL": "Florida", "GA": "Georgia",
      "HI": "Hawaii", "ID": "Idaho", "IL": "Illinois", "IN": "Indiana", "IA": "Iowa",
      "KS": "Kansas", "KY": "Kentucky", "LA": "Louisiana", "ME": "Maine", "MD": "Maryland",
      "MA": "Massachusetts", "MI": "Michigan", "MN": "Minnesota", "MS": "Mississippi", "MO": "Missouri",
      "MT": "Montana", "NE": "Nebraska", "NV": "Nevada", "NH": "New Hampshire", "NJ": "New Jersey",
      "NM": "New Mexico", "NY": "New York", "NC": "North Carolina", "ND": "North Dakota", "OH": "Ohio",
      "OK": "Oklahoma", "OR": "Oregon", "PA": "Pennsylvania", "RI": "Rhode Island", "SC": "South Carolina",
      "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas", "UT": "Utah", "VT": "Vermont",
      "VA": "Virginia", "WA": "Washington", "WV": "West Virginia", "WI": "Wisconsin", "WY": "Wyoming",
    };
    return stateNames[stateCode] || stateCode;
  };

  const getAvailableCities = (state: string) => {
    return cityMinimumWages[state] ? Object.keys(cityMinimumWages[state]) : [];
  };

  const resultsContent = (
    <div className="space-y-4">
      <ResultCard
        title="Total Pay"
        items={[
          { label: "Amount", value: formatCurrency(results.totalPay) },
          { label: "Rate", value: `${formatCurrency(results.applicableMinimum)}/hour` }
        ]}
        tool="minimum-wage"
      />
      
      <div className="space-y-3">
        <h3 className="font-medium text-sm">Minimum Wage Rates</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Federal Minimum:</span>
            <span>{formatCurrency(results.federalMinimum)}</span>
          </div>
          <div className="flex justify-between">
            <span>State Minimum:</span>
            <span>{formatCurrency(results.stateMinimum)}</span>
          </div>
          {results.localMinimum > 0 && (
            <div className="flex justify-between">
              <span>Local Minimum:</span>
              <span>{formatCurrency(results.localMinimum)}</span>
            </div>
          )}
          <div className="flex justify-between border-t pt-2 font-medium">
            <span>Applicable Rate:</span>
            <span>{formatCurrency(results.applicableMinimum)}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-medium text-sm">Pay Breakdown</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Regular Pay ({Math.min(hoursWorked, 40)} hrs):</span>
            <span>{formatCurrency(results.regularPay)}</span>
          </div>
          {(results.overtimePay > 0) && (
            <div className="flex justify-between">
              <span>Overtime Pay ({Math.max(0, hoursWorked - 40) + overtimeHours} hrs):</span>
              <span>{formatCurrency(results.overtimePay)}</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-medium text-sm">Annual Equivalents</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Weekly:</span>
            <span>{formatCurrency(results.weeklySalary)}</span>
          </div>
          <div className="flex justify-between">
            <span>Monthly:</span>
            <span>{formatCurrency(results.monthlySalary)}</span>
          </div>
          <div className="flex justify-between">
            <span>Annual:</span>
            <span>{formatCurrency(results.annualSalary)}</span>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
        <div className="text-xs text-yellow-800 dark:text-yellow-200">
          <strong>Note:</strong> Minimum wage rates are current as of 2024. Some cities and counties may have higher rates. Always verify current rates with local authorities.
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold mb-4">Location & Hours</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                State
              </label>
              <select
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                  setCity(""); // Reset city when state changes
                }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {Object.keys(stateMinimumWages).map(stateCode => (
                  <option key={stateCode} value={stateCode}>
                    {getStateName(stateCode)} ({formatCurrency(stateMinimumWages[stateCode])})
                  </option>
                ))}
              </select>
            </div>

            {getAvailableCities(state).length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  City (Optional)
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">No specific city</option>
                  {getAvailableCities(state).map(cityName => (
                    <option key={cityName} value={cityName}>
                      {cityName} ({formatCurrency(cityMinimumWages[state][cityName])})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <NumberField
              label="Hours Worked (per week)"
              value={hoursWorked}
              onChange={(value) => handleInputChange("hoursWorked", value)}
              placeholder="Enter hours worked"
              min={0}
              max={168}
            />

            <NumberField
              label="Additional Overtime Hours"
              value={overtimeHours}
              onChange={(value) => handleInputChange("overtimeHours", value)}
              placeholder="Extra overtime hours"
              min={0}
              max={40}
            />
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">About Minimum Wage Laws</h3>
          <div className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
            <p>
              <strong>Federal Minimum Wage:</strong> $7.25/hour (unchanged since 2009)
            </p>
            <p>
              <strong>State vs Federal:</strong> When state or local minimum wages are higher than federal, the higher rate applies.
            </p>
            <p>
              <strong>Overtime:</strong> Time and a half (1.5x) for hours over 40 per week, calculated on the applicable minimum wage rate.
            </p>
            <p>
              <strong>Updates:</strong> Many states and cities adjust minimum wages annually for inflation.
            </p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <StickyResults>
          {resultsContent}
        </StickyResults>
      </div>
    </div>
  );
}
