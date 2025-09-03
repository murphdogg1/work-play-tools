"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import NumberField from "@/components/calculators/NumberField";

import StickyResults from "@/components/calculators/StickyResults";
import { trackCalculatorInput, trackCalculatorSubmit } from "@/lib/analytics";

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
    "AL": 0.05, // Alabama
    "AK": 0,    // Alaska (no state income tax)
    "AZ": 0.025, // Arizona
    "AR": 0.055, // Arkansas
    "CA": 0.05,  // California
    "CO": 0.045, // Colorado
    "CT": 0.05,  // Connecticut
    "DE": 0.06,  // Delaware
    "DC": 0.06,  // District of Columbia
    "FL": 0,     // Florida (no state income tax)
    "GA": 0.055, // Georgia
    "HI": 0.11,  // Hawaii
    "ID": 0.06,  // Idaho
    "IL": 0.0495, // Illinois
    "IN": 0.0315, // Indiana
    "IA": 0.06,  // Iowa
    "KS": 0.057, // Kansas
    "KY": 0.05,  // Kentucky
    "LA": 0.06,  // Louisiana
    "ME": 0.075, // Maine
    "MD": 0.0575, // Maryland
    "MA": 0.05,  // Massachusetts
    "MI": 0.0425, // Michigan
    "MN": 0.0985, // Minnesota
    "MS": 0.05,  // Mississippi
    "MO": 0.054, // Missouri
    "MT": 0.06,  // Montana
    "NE": 0.0684, // Nebraska
    "NV": 0,     // Nevada (no state income tax)
    "NH": 0,     // New Hampshire (no state income tax)
    "NJ": 0.0637, // New Jersey
    "NM": 0.049, // New Mexico
    "NY": 0.06,  // New York
    "NC": 0.0525, // North Carolina
    "ND": 0.029, // North Dakota
    "OH": 0.0399, // Ohio
    "OK": 0.05,  // Oklahoma
    "OR": 0.099, // Oregon
    "PA": 0.0307, // Pennsylvania
    "RI": 0.0599, // Rhode Island
    "SC": 0.07,  // South Carolina
    "SD": 0,     // South Dakota (no state income tax)
    "TN": 0,     // Tennessee (no state income tax)
    "TX": 0,     // Texas (no state income tax)
    "UT": 0.0495, // Utah
    "VT": 0.0875, // Vermont
    "VA": 0.0575, // Virginia
    "WA": 0,     // Washington (no state income tax)
    "WV": 0.065, // West Virginia
    "WI": 0.0765, // Wisconsin
    "WY": 0,     // Wyoming (no state income tax)
  };

  // Federal tax brackets (2025, simplified)
  const federalTaxBrackets = {
    single: [
      { min: 0, max: 11925, rate: 0.10 },
      { min: 11925, max: 48475, rate: 0.12 },
      { min: 48475, max: 103350, rate: 0.22 },
      { min: 103350, max: 197300, rate: 0.24 },
      { min: 197300, max: 250525, rate: 0.32 },
      { min: 250525, max: 626350, rate: 0.35 },
      { min: 626350, max: Infinity, rate: 0.37 },
    ],
    married: [
      { min: 0, max: 23850, rate: 0.10 },
      { min: 23850, max: 96950, rate: 0.12 },
      { min: 96950, max: 206700, rate: 0.22 },
      { min: 206700, max: 394600, rate: 0.24 },
      { min: 394600, max: 501050, rate: 0.32 },
      { min: 501050, max: 751600, rate: 0.35 },
      { min: 751600, max: Infinity, rate: 0.37 },
    ],
    headofhousehold: [
      { min: 0, max: 17000, rate: 0.10 },
      { min: 17000, max: 64850, rate: 0.12 },
      { min: 64850, max: 103350, rate: 0.22 },
      { min: 103350, max: 197300, rate: 0.24 },
      { min: 197300, max: 250500, rate: 0.32 },
      { min: 250500, max: 626350, rate: 0.35 },
      { min: 626350, max: Infinity, rate: 0.37 },
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
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
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
        <StickyResults
          title="Take-Home Pay Results"
          results={[
            {
              label: "Net Pay",
              value: formatCurrency(results.netPay),
              highlight: true
            },
            {
              label: "Gross Pay",
              value: formatCurrency(results.grossPay)
            },
            {
              label: "Federal Tax",
              value: formatCurrency(results.deductions.federalTax)
            },
            {
              label: "State Tax",
              value: formatCurrency(results.deductions.stateTax)
            },
            {
              label: "Social Security",
              value: formatCurrency(results.deductions.socialSecurity)
            },
            {
              label: "Medicare",
              value: formatCurrency(results.deductions.medicare)
            },
            {
              label: "Total Deductions",
              value: formatCurrency(results.totalDeductions)
            }
          ]}
          inputs={{
            grossPay: grossPay,
            payPeriod: payPeriod,
            filingStatus: filingStatus,
            state: state,
            deductions: deductions
          }}
          tool="take-home-pay"
        />
      </div>
    </div>
  );
}
