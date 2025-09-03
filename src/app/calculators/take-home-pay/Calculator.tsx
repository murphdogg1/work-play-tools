"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import NumberField from "@/components/calculators/NumberField";
import ResultCard from "@/components/calculators/ResultCard";
import StickyResults from "@/components/calculators/StickyResults";
import { trackCalculatorInput, trackCalculatorSubmit, trackCalculatorCopy } from "@/lib/analytics";

interface Deductions {
  federalTax: number;
  stateTax: number;
  socialSecurity: number;
  medicare: number;
  healthInsurance: number;
  retirement401k: number;
  otherDeductions: number;
}

export default function TakeHomePayCalculator() {
  const [grossPay, setGrossPay] = useState<number>(0);
  const [payPeriod, setPayPeriod] = useState<"weekly" | "biweekly" | "semimonthly" | "monthly" | "annually">("annually");
  const [filingStatus, setFilingStatus] = useState<"single" | "married" | "headofhousehold">("single");
  const [state, setState] = useState<string>("CA");
  const [deductions, setDeductions] = useState<Deductions>({
    federalTax: 0,
    stateTax: 0,
    socialSecurity: 0,
    medicare: 0,
    healthInsurance: 0,
    retirement401k: 0,
    otherDeductions: 0,
  });

  const [results, setResults] = useState({
    grossPay: 0,
    totalDeductions: 0,
    netPay: 0,
    effectiveTaxRate: 0,
    deductions: {
      federalTax: 0,
      stateTax: 0,
      socialSecurity: 0,
      medicare: 0,
      healthInsurance: 0,
      retirement401k: 0,
      otherDeductions: 0,
    }
  });

  const hasTrackedSubmit = useRef(false);

  // State tax rates (simplified - in reality these would be more complex)
  const stateTaxRates: { [key: string]: number } = {
    "CA": 0.05,
    "NY": 0.06,
    "TX": 0,
    "FL": 0,
    "WA": 0,
    "NV": 0,
    "SD": 0,
    "WY": 0,
    "TN": 0,
    "NH": 0,
  };

  // Federal tax brackets (2024, simplified)
  const federalTaxBrackets = {
    single: [
      { min: 0, max: 11000, rate: 0.10 },
      { min: 11000, max: 44725, rate: 0.12 },
      { min: 44725, max: 95375, rate: 0.22 },
      { min: 95375, max: 182050, rate: 0.24 },
      { min: 182050, max: 231250, rate: 0.32 },
      { min: 231250, max: 578125, rate: 0.35 },
      { min: 578125, max: Infinity, rate: 0.37 },
    ],
    married: [
      { min: 0, max: 22000, rate: 0.10 },
      { min: 22000, max: 89450, rate: 0.12 },
      { min: 89450, max: 190750, rate: 0.22 },
      { min: 190750, max: 364200, rate: 0.24 },
      { min: 364200, max: 462500, rate: 0.32 },
      { min: 462500, max: 693750, rate: 0.35 },
      { min: 693750, max: Infinity, rate: 0.37 },
    ],
    headofhousehold: [
      { min: 0, max: 15700, rate: 0.10 },
      { min: 15700, max: 59850, rate: 0.12 },
      { min: 59850, max: 95350, rate: 0.22 },
      { min: 95350, max: 182050, rate: 0.24 },
      { min: 182050, max: 231250, rate: 0.32 },
      { min: 231250, max: 578100, rate: 0.35 },
      { min: 578100, max: Infinity, rate: 0.37 },
    ],
  };

  const calculateFederalTax = (annualIncome: number, status: string) => {
    const brackets = federalTaxBrackets[status as keyof typeof federalTaxBrackets];
    let tax = 0;
    let remainingIncome = annualIncome;

    for (const bracket of brackets) {
      if (remainingIncome <= 0) break;
      
      const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min);
      tax += taxableInBracket * bracket.rate;
      remainingIncome -= taxableInBracket;
    }

    return tax;
  };

  const calculatePayrollTaxes = (annualIncome: number) => {
    const socialSecurityRate = 0.062;
    const medicareRate = 0.0145;
    const socialSecurityWageBase = 168600;
    
    const socialSecurity = Math.min(annualIncome, socialSecurityWageBase) * socialSecurityRate;
    const medicare = annualIncome * medicareRate;
    
    return { socialSecurity, medicare };
  };

  const calculateResults = useCallback(() => {
    if (grossPay <= 0) {
      setResults({
        grossPay: 0,
        totalDeductions: 0,
        netPay: 0,
        effectiveTaxRate: 0,
        deductions: {
          federalTax: 0,
          stateTax: 0,
          socialSecurity: 0,
          medicare: 0,
          healthInsurance: 0,
          retirement401k: 0,
          otherDeductions: 0,
        }
      });
      return;
    }

    // Convert to annual income for tax calculations
    let annualIncome = grossPay;
    switch (payPeriod) {
      case "weekly":
        annualIncome = grossPay * 52;
        break;
      case "biweekly":
        annualIncome = grossPay * 26;
        break;
      case "semimonthly":
        annualIncome = grossPay * 24;
        break;
      case "monthly":
        annualIncome = grossPay * 12;
        break;
      case "annually":
        annualIncome = grossPay;
        break;
    }

    // Calculate taxes
    const federalTax = calculateFederalTax(annualIncome, filingStatus);
    const stateTaxRate = stateTaxRates[state] || 0;
    const stateTax = annualIncome * stateTaxRate;
    const { socialSecurity, medicare } = calculatePayrollTaxes(annualIncome);

    // Convert back to pay period
    const conversionFactor = {
      weekly: 52,
      biweekly: 26,
      semimonthly: 24,
      monthly: 12,
      annually: 1,
    }[payPeriod];

    const payPeriodFederalTax = federalTax / conversionFactor;
    const payPeriodStateTax = stateTax / conversionFactor;
    const payPeriodSocialSecurity = socialSecurity / conversionFactor;
    const payPeriodMedicare = medicare / conversionFactor;

    const calculatedDeductions = {
      federalTax: payPeriodFederalTax,
      stateTax: payPeriodStateTax,
      socialSecurity: payPeriodSocialSecurity,
      medicare: payPeriodMedicare,
      healthInsurance: deductions.healthInsurance,
      retirement401k: deductions.retirement401k,
      otherDeductions: deductions.otherDeductions,
    };

    const totalDeductions = Object.values(calculatedDeductions).reduce((sum, val) => sum + val, 0);
    const netPay = grossPay - totalDeductions;
    const effectiveTaxRate = totalDeductions / grossPay;

    setResults({
      grossPay,
      totalDeductions,
      netPay,
      effectiveTaxRate,
      deductions: calculatedDeductions,
    });
  }, [grossPay, payPeriod, filingStatus, state, deductions]);

  useEffect(() => {
    calculateResults();
  }, [calculateResults]);

  useEffect(() => {
    if (results.netPay > 0 && !hasTrackedSubmit.current) {
      trackCalculatorSubmit("take-home-pay");
      hasTrackedSubmit.current = true;
    }
  }, [results.netPay]);

  const handleInputChange = (field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    if (field.startsWith("deductions.")) {
      const deductionField = field.split(".")[1] as keyof Deductions;
      setDeductions(prev => ({
        ...prev,
        [deductionField]: numValue
      }));
      trackCalculatorInput("take-home-pay", field, numValue > 0 ? "has-value" : "no-value");
    } else {
      switch (field) {
        case "grossPay":
          setGrossPay(numValue);
          break;
      }
      trackCalculatorInput("take-home-pay", field, numValue > 0 ? "has-value" : "no-value");
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatPercentage = (rate: number) => {
    return `${(rate * 100).toFixed(1)}%`;
  };

  const resultsContent = (
    <div className="space-y-4">
      <ResultCard
        title="Net Take-Home Pay"
        value={formatCurrency(results.netPay)}
        subtitle={`After ${formatCurrency(results.totalDeductions)} in deductions`}
        onCopy={() => trackCalculatorCopy("take-home-pay")}
      />
      
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
          <div className="text-sm text-gray-600 dark:text-gray-400">Gross Pay</div>
          <div className="text-lg font-semibold">{formatCurrency(results.grossPay)}</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
          <div className="text-sm text-gray-600 dark:text-gray-400">Effective Tax Rate</div>
          <div className="text-lg font-semibold">{formatPercentage(results.effectiveTaxRate)}</div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium text-sm">Deductions Breakdown</h3>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Federal Income Tax:</span>
            <span>{formatCurrency(results.deductions.federalTax)}</span>
          </div>
          <div className="flex justify-between">
            <span>State Income Tax:</span>
            <span>{formatCurrency(results.deductions.stateTax)}</span>
          </div>
          <div className="flex justify-between">
            <span>Social Security (6.2%):</span>
            <span>{formatCurrency(results.deductions.socialSecurity)}</span>
          </div>
          <div className="flex justify-between">
            <span>Medicare (1.45%):</span>
            <span>{formatCurrency(results.deductions.medicare)}</span>
          </div>
          {results.deductions.healthInsurance > 0 && (
            <div className="flex justify-between">
              <span>Health Insurance:</span>
              <span>{formatCurrency(results.deductions.healthInsurance)}</span>
            </div>
          )}
          {results.deductions.retirement401k > 0 && (
            <div className="flex justify-between">
              <span>401(k) Contribution:</span>
              <span>{formatCurrency(results.deductions.retirement401k)}</span>
            </div>
          )}
          {results.deductions.otherDeductions > 0 && (
            <div className="flex justify-between">
              <span>Other Deductions:</span>
              <span>{formatCurrency(results.deductions.otherDeductions)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold mb-4">Pay Information</h2>
          
          <div className="space-y-4">
            <NumberField
              label="Gross Pay"
              value={grossPay}
              onChange={(value) => handleInputChange("grossPay", value)}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Pay Period
              </label>
              <select
                value={payPeriod}
                onChange={(e) => setPayPeriod(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="weekly">Weekly</option>
                <option value="biweekly">Bi-weekly</option>
                <option value="semimonthly">Semi-monthly</option>
                <option value="monthly">Monthly</option>
                <option value="annually">Annually</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Filing Status
              </label>
              <select
                value={filingStatus}
                onChange={(e) => setFilingStatus(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="single">Single</option>
                <option value="married">Married Filing Jointly</option>
                <option value="headofhousehold">Head of Household</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                State
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="CA">California</option>
                <option value="NY">New York</option>
                <option value="TX">Texas</option>
                <option value="FL">Florida</option>
                <option value="WA">Washington</option>
                <option value="NV">Nevada</option>
                <option value="SD">South Dakota</option>
                <option value="WY">Wyoming</option>
                <option value="TN">Tennessee</option>
                <option value="NH">New Hampshire</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold mb-4">Additional Deductions</h2>
          
          <div className="space-y-4">
            <NumberField
              label="Health Insurance Premium"
              value={deductions.healthInsurance}
              onChange={(value) => handleInputChange("deductions.healthInsurance", value)}

            />

            <NumberField
              label="401(k) Contribution"
              value={deductions.retirement401k}
              onChange={(value) => handleInputChange("deductions.retirement401k", value)}

            />

            <NumberField
              label="Other Deductions"
              value={deductions.otherDeductions}
              onChange={(value) => handleInputChange("deductions.otherDeductions", value)}

            />
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
