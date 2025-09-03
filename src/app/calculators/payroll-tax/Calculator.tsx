"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import NumberField from "@/components/calculators/NumberField";

import StickyResults from "@/components/calculators/StickyResults";
import { trackCalculatorInput, trackCalculatorSubmit } from "@/lib/analytics";

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

  const handleInputChange = (field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    switch (field) {
      case "grossPay":
        setGrossPay(numValue);
        break;
      case "allowances":
        setAllowances(numValue);
        break;
      case "additionalWithholding":
        setAdditionalWithholding(numValue);
        break;
    }
    trackCalculatorInput("payroll-tax", field, numValue > 0 ? "has-value" : "no-value");
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
          <h2 className="text-lg font-semibold mb-4">Employee Information</h2>
          
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

            <NumberField
              label="Allowances/Exemptions"
              value={allowances}
              onChange={(value) => handleInputChange("allowances", value)}

              min={0}
              max={20}
            />

            <NumberField
              label="Additional Withholding"
              value={additionalWithholding}
              onChange={(value) => handleInputChange("additionalWithholding", value)}
            />
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <StickyResults
          title="Payroll Tax Results"
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
              label: "Federal Income Tax",
              value: formatCurrency(results.federalIncomeTax)
            },
            {
              label: "State Income Tax",
              value: formatCurrency(results.stateIncomeTax)
            },
            {
              label: "Social Security",
              value: formatCurrency(results.socialSecurityTax)
            },
            {
              label: "Medicare",
              value: formatCurrency(results.medicareTax)
            },
            {
              label: "FUTA",
              value: formatCurrency(results.employerTaxes.unemployment)
            },
            {
              label: "SUTA",
              value: formatCurrency(results.employerTaxes.unemployment)
            }
          ]}
          inputs={{
            grossPay: grossPay,
            payPeriod: payPeriod,
            filingStatus: filingStatus,
            state: state,
            allowances: allowances,
            additionalWithholding: additionalWithholding
          }}
          tool="payroll-tax"
        />
      </div>
    </div>
  );
}
