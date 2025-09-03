"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import NumberField from "@/components/calculators/NumberField";
import ResultCard from "@/components/calculators/ResultCard";
import StickyResults from "@/components/calculators/StickyResults";
import { trackCalculatorInput, trackCalculatorSubmit, trackCalculatorCopy } from "@/lib/analytics";

interface TaxResults {
  grossPay: number;
  federalIncomeTax: number;
  socialSecurityTax: number;
  medicareTax: number;
  stateIncomeTax: number;
  localTax: number;
  totalTaxes: number;
  netPay: number;
  employerTaxes: {
    socialSecurity: number;
    medicare: number;
    unemployment: number;
    total: number;
  };
}

export default function PayrollTaxCalculator() {
  const [grossPay, setGrossPay] = useState<number>(0);
  const [payPeriod, setPayPeriod] = useState<"weekly" | "biweekly" | "semimonthly" | "monthly" | "annually">("annually");
  const [filingStatus, setFilingStatus] = useState<"single" | "married" | "headofhousehold">("single");
  const [state, setState] = useState<string>("CA");
  const [allowances, setAllowances] = useState<number>(1);
  const [additionalWithholding, setAdditionalWithholding] = useState<number>(0);

  const [results, setResults] = useState<TaxResults>({
    grossPay: 0,
    federalIncomeTax: 0,
    socialSecurityTax: 0,
    medicareTax: 0,
    stateIncomeTax: 0,
    localTax: 0,
    totalTaxes: 0,
    netPay: 0,
    employerTaxes: {
      socialSecurity: 0,
      medicare: 0,
      unemployment: 0,
      total: 0,
    }
  });

  const hasTrackedSubmit = useRef(false);

  // State tax rates (simplified)
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
    "PA": 0.03,
    "OH": 0.03,
    "MI": 0.04,
    "IL": 0.05,
    "MA": 0.05,
    "NJ": 0.06,
    "CT": 0.05,
    "MD": 0.05,
    "VA": 0.05,
    "NC": 0.05,
  };

  // Federal tax brackets (2024)
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

  const calculateFederalTax = (annualIncome: number, status: string, allowances: number) => {
    const brackets = federalTaxBrackets[status as keyof typeof federalTaxBrackets];
    
    // Standard deduction (2024)
    const standardDeductions = {
      single: 13850,
      married: 27700,
      headofhousehold: 20800,
    };
    
    const standardDeduction = standardDeductions[status as keyof typeof standardDeductions] || 13850;
    const personalExemption = allowances * 4300; // Simplified personal exemption
    const taxableIncome = Math.max(0, annualIncome - standardDeduction - personalExemption);
    
    let tax = 0;
    let remainingIncome = taxableIncome;

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

  const calculateEmployerTaxes = (annualIncome: number) => {
    const socialSecurityRate = 0.062;
    const medicareRate = 0.0145;
    const unemploymentRate = 0.006; // Federal unemployment tax (FUTA)
    const socialSecurityWageBase = 168600;
    
    const socialSecurity = Math.min(annualIncome, socialSecurityWageBase) * socialSecurityRate;
    const medicare = annualIncome * medicareRate;
    const unemployment = Math.min(annualIncome, 7000) * unemploymentRate; // FUTA wage base
    
    return {
      socialSecurity,
      medicare,
      unemployment,
      total: socialSecurity + medicare + unemployment,
    };
  };

  const calculateResults = useCallback(() => {
    if (grossPay <= 0) {
      setResults({
        grossPay: 0,
        federalIncomeTax: 0,
        socialSecurityTax: 0,
        medicareTax: 0,
        stateIncomeTax: 0,
        localTax: 0,
        totalTaxes: 0,
        netPay: 0,
        employerTaxes: {
          socialSecurity: 0,
          medicare: 0,
          unemployment: 0,
          total: 0,
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
    const federalIncomeTax = calculateFederalTax(annualIncome, filingStatus, allowances);
    const stateTaxRate = stateTaxRates[state] || 0;
    const stateIncomeTax = annualIncome * stateTaxRate;
    const { socialSecurity, medicare } = calculatePayrollTaxes(annualIncome);
    const employerTaxes = calculateEmployerTaxes(annualIncome);

    // Convert back to pay period
    const conversionFactor = {
      weekly: 52,
      biweekly: 26,
      semimonthly: 24,
      monthly: 12,
      annually: 1,
    }[payPeriod];

    const payPeriodFederalTax = federalIncomeTax / conversionFactor;
    const payPeriodStateTax = stateIncomeTax / conversionFactor;
    const payPeriodSocialSecurity = socialSecurity / conversionFactor;
    const payPeriodMedicare = medicare / conversionFactor;
    const payPeriodAdditionalWithholding = additionalWithholding;

    const totalTaxes = payPeriodFederalTax + payPeriodStateTax + payPeriodSocialSecurity + payPeriodMedicare + payPeriodAdditionalWithholding;
    const netPay = grossPay - totalTaxes;

    setResults({
      grossPay,
      federalIncomeTax: payPeriodFederalTax,
      socialSecurityTax: payPeriodSocialSecurity,
      medicareTax: payPeriodMedicare,
      stateIncomeTax: payPeriodStateTax,
      localTax: 0, // Simplified - no local tax calculation
      totalTaxes,
      netPay,
      employerTaxes: {
        socialSecurity: employerTaxes.socialSecurity / conversionFactor,
        medicare: employerTaxes.medicare / conversionFactor,
        unemployment: employerTaxes.unemployment / conversionFactor,
        total: employerTaxes.total / conversionFactor,
      }
    });
  }, [grossPay, payPeriod, filingStatus, state, allowances, additionalWithholding]);

  useEffect(() => {
    calculateResults();
  }, [calculateResults]);

  useEffect(() => {
    if (results.netPay > 0 && !hasTrackedSubmit.current) {
      trackCalculatorSubmit("payroll-tax");
      hasTrackedSubmit.current = true;
    }
  }, [results.netPay]);

  const handleInputChange = (field: string, value: number) => {
    switch (field) {
      case "grossPay":
        setGrossPay(value);
        break;
      case "allowances":
        setAllowances(value);
        break;
      case "additionalWithholding":
        setAdditionalWithholding(value);
        break;
    }
    trackCalculatorInput("payroll-tax", field, value > 0 ? "has-value" : "no-value");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const resultsContent = (
    <div className="space-y-4">
      <ResultCard
        title="Net Pay"
        value={formatCurrency(results.netPay)}
        subtitle={`After ${formatCurrency(results.totalTaxes)} in taxes`}
        onCopy={() => trackCalculatorCopy("payroll-tax")}
      />
      
      <div className="space-y-3">
        <h3 className="font-medium text-sm">Employee Tax Withholdings</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Federal Income Tax:</span>
            <span>{formatCurrency(results.federalIncomeTax)}</span>
          </div>
          <div className="flex justify-between">
            <span>State Income Tax:</span>
            <span>{formatCurrency(results.stateIncomeTax)}</span>
          </div>
          <div className="flex justify-between">
            <span>Social Security (6.2%):</span>
            <span>{formatCurrency(results.socialSecurityTax)}</span>
          </div>
          <div className="flex justify-between">
            <span>Medicare (1.45%):</span>
            <span>{formatCurrency(results.medicareTax)}</span>
          </div>
          {results.localTax > 0 && (
            <div className="flex justify-between">
              <span>Local Tax:</span>
              <span>{formatCurrency(results.localTax)}</span>
            </div>
          )}
          {additionalWithholding > 0 && (
            <div className="flex justify-between">
              <span>Additional Withholding:</span>
              <span>{formatCurrency(additionalWithholding)}</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-medium text-sm">Employer Payroll Taxes</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Social Security (6.2%):</span>
            <span>{formatCurrency(results.employerTaxes.socialSecurity)}</span>
          </div>
          <div className="flex justify-between">
            <span>Medicare (1.45%):</span>
            <span>{formatCurrency(results.employerTaxes.medicare)}</span>
          </div>
          <div className="flex justify-between">
            <span>Unemployment (FUTA):</span>
            <span>{formatCurrency(results.employerTaxes.unemployment)}</span>
          </div>
          <div className="flex justify-between border-t pt-2 font-medium">
            <span>Total Employer Taxes:</span>
            <span>{formatCurrency(results.employerTaxes.total)}</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
        <div className="text-xs text-blue-800 dark:text-blue-200">
          <strong>Note:</strong> This calculator provides estimates based on 2024 tax rates. Actual withholdings may vary based on specific circumstances and should be verified with tax professionals.
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold mb-4">Employee Information</h2>
          
          <div className="space-y-4">
            <NumberField
              label="Gross Pay"
              value={grossPay}
              onChange={(value) => handleInputChange("grossPay", value)}
              placeholder="Enter gross pay amount"
              prefix="$"
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
                <option value="PA">Pennsylvania</option>
                <option value="OH">Ohio</option>
                <option value="MI">Michigan</option>
                <option value="IL">Illinois</option>
                <option value="MA">Massachusetts</option>
                <option value="NJ">New Jersey</option>
                <option value="CT">Connecticut</option>
                <option value="MD">Maryland</option>
                <option value="VA">Virginia</option>
                <option value="NC">North Carolina</option>
              </select>
            </div>

            <NumberField
              label="Allowances/Exemptions"
              value={allowances}
              onChange={(value) => handleInputChange("allowances", value)}
              placeholder="Number of allowances"
              min={0}
              max={20}
            />

            <NumberField
              label="Additional Withholding"
              value={additionalWithholding}
              onChange={(value) => handleInputChange("additionalWithholding", value)}
              placeholder="Extra amount to withhold"
              prefix="$"
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
