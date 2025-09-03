export interface InternalLink {
  title: string;
  href: string;
  reason: string;
}

export interface LinkConfig {
  [key: string]: InternalLink[];
}

export const internalLinkConfig: LinkConfig = {
  // Calculator pages
  'overtime-pay': [
    { title: "Timecard Calculator", href: "/calculators/timecard", reason: "Track hours for overtime calculations" },
    { title: "Take-Home Pay Calculator", href: "/calculators/take-home-pay", reason: "Calculate net pay with overtime" },
    { title: "Overtime Rules by State", href: "/guides/overtime-rules", reason: "State-specific overtime regulations" },
    { title: "Payroll Basics Guide", href: "/guides/payroll-basics", reason: "Essential payroll concepts" },
    { title: "Minimum Wage Calculator", href: "/calculators/minimum-wage", reason: "Check minimum wage rates" },
    { title: "Hourly to Salary Converter", href: "/calculators/hourly-to-salary", reason: "Convert hourly rates to salary" }
  ],
  'hourly-to-salary': [
    { title: "Salary to Hourly Calculator", href: "/calculators/salary-to-hourly", reason: "Convert salary back to hourly" },
    { title: "Take-Home Pay Calculator", href: "/calculators/take-home-pay", reason: "Calculate net pay after taxes" },
    { title: "Overtime Pay Calculator", href: "/calculators/overtime-pay", reason: "Calculate overtime pay" },
    { title: "Payroll Tax Calculator", href: "/calculators/payroll-tax", reason: "Calculate payroll taxes" },
    { title: "Payroll Basics Guide", href: "/guides/payroll-basics", reason: "Payroll fundamentals" },
    { title: "Benefits & Deductions Guide", href: "/guides/benefits", reason: "Employee benefits overview" }
  ],
  'salary-to-hourly': [
    { title: "Hourly to Salary Converter", href: "/calculators/hourly-to-salary", reason: "Convert hourly to salary" },
    { title: "Take-Home Pay Calculator", href: "/calculators/take-home-pay", reason: "Calculate net pay" },
    { title: "Overtime Pay Calculator", href: "/calculators/overtime-pay", reason: "Calculate overtime pay" },
    { title: "Payroll Tax Calculator", href: "/calculators/payroll-tax", reason: "Calculate payroll taxes" },
    { title: "Payroll Basics Guide", href: "/guides/payroll-basics", reason: "Payroll fundamentals" },
    { title: "Benefits & Deductions Guide", href: "/guides/benefits", reason: "Employee benefits" }
  ],
  'take-home-pay': [
    { title: "Payroll Tax Calculator", href: "/calculators/payroll-tax", reason: "Detailed tax calculations" },
    { title: "Hourly to Salary Converter", href: "/calculators/hourly-to-salary", reason: "Convert hourly rates" },
    { title: "Overtime Pay Calculator", href: "/calculators/overtime-pay", reason: "Calculate overtime pay" },
    { title: "Benefits & Deductions Guide", href: "/guides/benefits", reason: "Employee benefits and deductions" },
    { title: "Payroll Basics Guide", href: "/guides/payroll-basics", reason: "Payroll fundamentals" },
    { title: "Minimum Wage Calculator", href: "/calculators/minimum-wage", reason: "Check minimum wage rates" }
  ],
  'payroll-tax': [
    { title: "Take-Home Pay Calculator", href: "/calculators/take-home-pay", reason: "Calculate net pay after taxes" },
    { title: "Hourly to Salary Converter", href: "/calculators/hourly-to-salary", reason: "Convert hourly rates" },
    { title: "Overtime Pay Calculator", href: "/calculators/overtime-pay", reason: "Calculate overtime pay" },
    { title: "Payroll Basics Guide", href: "/guides/payroll-basics", reason: "Payroll fundamentals" },
    { title: "Benefits & Deductions Guide", href: "/guides/benefits", reason: "Employee benefits" },
    { title: "Minimum Wage Calculator", href: "/calculators/minimum-wage", reason: "Check minimum wage rates" }
  ],
  'minimum-wage': [
    { title: "Overtime Pay Calculator", href: "/calculators/overtime-pay", reason: "Calculate overtime pay" },
    { title: "Take-Home Pay Calculator", href: "/calculators/take-home-pay", reason: "Calculate net pay" },
    { title: "Hourly to Salary Converter", href: "/calculators/hourly-to-salary", reason: "Convert hourly rates" },
    { title: "Overtime Rules by State", href: "/guides/overtime-rules", reason: "State-specific regulations" },
    { title: "Payroll Basics Guide", href: "/guides/payroll-basics", reason: "Payroll fundamentals" },
    { title: "Benefits & Deductions Guide", href: "/guides/benefits", reason: "Employee benefits" }
  ],
  'timecard': [
    { title: "Overtime Pay Calculator", href: "/calculators/overtime-pay", reason: "Calculate overtime pay" },
    { title: "Take-Home Pay Calculator", href: "/calculators/take-home-pay", reason: "Calculate net pay" },
    { title: "Hourly to Salary Converter", href: "/calculators/hourly-to-salary", reason: "Convert hourly rates" },
    { title: "Overtime Rules by State", href: "/guides/overtime-rules", reason: "State-specific regulations" },
    { title: "Payroll Basics Guide", href: "/guides/payroll-basics", reason: "Payroll fundamentals" },
    { title: "Benefits & Deductions Guide", href: "/guides/benefits", reason: "Employee benefits" }
  ],

  // Guide pages
  'payroll-basics': [
    { title: "Overtime Pay Calculator", href: "/calculators/overtime-pay", reason: "Calculate overtime pay" },
    { title: "Take-Home Pay Calculator", href: "/calculators/take-home-pay", reason: "Calculate net pay" },
    { title: "Payroll Tax Calculator", href: "/calculators/payroll-tax", reason: "Calculate payroll taxes" },
    { title: "Overtime Rules by State", href: "/guides/overtime-rules", reason: "State-specific regulations" },
    { title: "Benefits & Deductions Guide", href: "/guides/benefits", reason: "Employee benefits" },
    { title: "PTO Policy Template", href: "/hr-templates/pto-policy", reason: "Time off policies" }
  ],
  'overtime-rules': [
    { title: "Overtime Pay Calculator", href: "/calculators/overtime-pay", reason: "Calculate overtime pay" },
    { title: "Timecard Calculator", href: "/calculators/timecard", reason: "Track hours for overtime" },
    { title: "Take-Home Pay Calculator", href: "/calculators/take-home-pay", reason: "Calculate net pay" },
    { title: "Payroll Basics Guide", href: "/guides/payroll-basics", reason: "Payroll fundamentals" },
    { title: "Benefits & Deductions Guide", href: "/guides/benefits", reason: "Employee benefits" },
    { title: "Minimum Wage Calculator", href: "/calculators/minimum-wage", reason: "Check minimum wage rates" }
  ],
  'benefits': [
    { title: "Take-Home Pay Calculator", href: "/calculators/take-home-pay", reason: "Calculate net pay with benefits" },
    { title: "Payroll Tax Calculator", href: "/calculators/payroll-tax", reason: "Calculate payroll taxes" },
    { title: "Hourly to Salary Converter", href: "/calculators/hourly-to-salary", reason: "Convert hourly rates" },
    { title: "Payroll Basics Guide", href: "/guides/payroll-basics", reason: "Payroll fundamentals" },
    { title: "Overtime Rules by State", href: "/guides/overtime-rules", reason: "State-specific regulations" },
    { title: "PTO Policy Template", href: "/hr-templates/pto-policy", reason: "Time off policies" }
  ],

  // HR Template pages
  'offer-letter': [
    { title: "PTO Policy Template", href: "/hr-templates/pto-policy", reason: "Time off policies" },
    { title: "Disciplinary Action Form", href: "/hr-templates/disciplinary-action-form", reason: "Employee discipline" },
    { title: "Payroll Basics Guide", href: "/guides/payroll-basics", reason: "Payroll fundamentals" },
    { title: "Benefits & Deductions Guide", href: "/guides/benefits", reason: "Employee benefits" },
    { title: "Take-Home Pay Calculator", href: "/calculators/take-home-pay", reason: "Calculate net pay" },
    { title: "Hourly to Salary Converter", href: "/calculators/hourly-to-salary", reason: "Convert hourly rates" }
  ],
  'pto-policy': [
    { title: "Offer Letter Template", href: "/hr-templates/offer-letter", reason: "Employment documentation" },
    { title: "Disciplinary Action Form", href: "/hr-templates/disciplinary-action-form", reason: "Employee discipline" },
    { title: "Benefits & Deductions Guide", href: "/guides/benefits", reason: "Employee benefits" },
    { title: "Payroll Basics Guide", href: "/guides/payroll-basics", reason: "Payroll fundamentals" },
    { title: "Take-Home Pay Calculator", href: "/calculators/take-home-pay", reason: "Calculate net pay" },
    { title: "Overtime Pay Calculator", href: "/calculators/overtime-pay", reason: "Calculate overtime pay" }
  ],
  'disciplinary-action-form': [
    { title: "Offer Letter Template", href: "/hr-templates/offer-letter", reason: "Employment documentation" },
    { title: "PTO Policy Template", href: "/hr-templates/pto-policy", reason: "Time off policies" },
    { title: "Payroll Basics Guide", href: "/guides/payroll-basics", reason: "Payroll fundamentals" },
    { title: "Benefits & Deductions Guide", href: "/guides/benefits", reason: "Employee benefits" },
    { title: "Overtime Rules by State", href: "/guides/overtime-rules", reason: "State-specific regulations" },
    { title: "Take-Home Pay Calculator", href: "/calculators/take-home-pay", reason: "Calculate net pay" }
  ]
};

export function getInternalLinks(pageKey: string): InternalLink[] {
  return internalLinkConfig[pageKey] || [];
}
