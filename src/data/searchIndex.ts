export interface SearchItem {
  title: string;
  href: string;
  tags: string[];
  section: string;
  description?: string;
}

export const searchIndex: SearchItem[] = [
  // Calculators
  {
    title: "Payroll Calculator",
    href: "/calculators/payroll",
    tags: ["payroll", "calculator", "employee", "pay", "taxes", "deductions", "net pay", "gross pay"],
    section: "Calculators",
    description: "Comprehensive payroll calculator for employee pay, taxes, and deductions"
  },
  {
    title: "Overtime Pay Calculator",
    href: "/calculators/overtime-pay",
    tags: ["overtime", "pay", "hours", "1.5x", "double time", "wage", "salary"],
    section: "Calculators",
    description: "Calculate regular and overtime pay based on hourly rate and hours worked"
  },
  {
    title: "Hourly to Salary Converter",
    href: "/calculators/hourly-to-salary",
    tags: ["hourly", "salary", "annual", "convert", "wage", "income", "yearly"],
    section: "Calculators",
    description: "Convert hourly rates to annual salary equivalents"
  },
  {
    title: "Timecard Calculator",
    href: "/calculators/timecard",
    tags: ["timecard", "hours", "timesheet", "clock in", "clock out", "break", "overnight"],
    section: "Calculators",
    description: "Track work hours and calculate totals with break time"
  },
  
  // Guide Hubs
  {
    title: "Payroll Basics Guide",
    href: "/guides/payroll-basics",
    tags: ["payroll", "basics", "fundamentals", "processing", "deductions", "taxes"],
    section: "Guides",
    description: "Essential payroll concepts and step-by-step processing guide"
  },
  {
    title: "Overtime Rules by State",
    href: "/guides/overtime-rules",
    tags: ["overtime", "rules", "state", "laws", "regulations", "compliance", "40 hours"],
    section: "Guides",
    description: "State-specific overtime regulations and compliance requirements"
  },
  {
    title: "Benefits & Deductions Guide",
    href: "/guides/benefits",
    tags: ["benefits", "deductions", "health insurance", "401k", "taxes", "employee"],
    section: "Guides",
    description: "Employee benefits and tax deduction guidelines"
  },
  
  // State-specific Overtime Rules
  {
    title: "Overtime Rules in California",
    href: "/guides/overtime-rules/ca",
    tags: ["california", "ca", "overtime", "daily", "8 hours", "double time"],
    section: "Guides",
    description: "California overtime laws including daily overtime requirements"
  },
  {
    title: "Overtime Rules in New York",
    href: "/guides/overtime-rules/ny",
    tags: ["new york", "ny", "overtime", "minimum wage", "labor law"],
    section: "Guides",
    description: "New York overtime regulations and minimum wage requirements"
  },
  {
    title: "Overtime Rules in Texas",
    href: "/guides/overtime-rules/tx",
    tags: ["texas", "tx", "overtime", "federal", "40 hours"],
    section: "Guides",
    description: "Texas overtime rules following federal FLSA guidelines"
  },
  {
    title: "Overtime Rules in Florida",
    href: "/guides/overtime-rules/fl",
    tags: ["florida", "fl", "overtime", "federal", "minimum wage"],
    section: "Guides",
    description: "Florida overtime regulations and state-specific requirements"
  },
  {
    title: "Overtime Rules in Illinois",
    href: "/guides/overtime-rules/il",
    tags: ["illinois", "il", "overtime", "chicago", "minimum wage"],
    section: "Guides",
    description: "Illinois overtime laws and Chicago-specific regulations"
  },
  
  // HR Templates
  {
    title: "Job Offer Letter Template",
    href: "/hr-templates/offer-letter",
    tags: ["offer letter", "job offer", "employment", "template", "hiring", "contract"],
    section: "HR Templates",
    description: "Professional job offer letter templates and examples"
  },
  {
    title: "PTO Policy Template",
    href: "/hr-templates/pto-policy",
    tags: ["pto", "paid time off", "vacation", "sick leave", "policy", "template"],
    section: "HR Templates",
    description: "Comprehensive paid time off policy templates"
  },
  {
    title: "Disciplinary Action Form",
    href: "/hr-templates/disciplinary-action-form",
    tags: ["disciplinary", "action", "form", "employee", "warning", "termination"],
    section: "HR Templates",
    description: "Employee disciplinary action documentation forms"
  },
  
  // General Pages
  {
    title: "About WorkPayTools",
    href: "/about",
    tags: ["about", "company", "mission", "team", "workpaytools"],
    section: "Resources",
    description: "Learn about WorkPayTools mission and team"
  },
  {
    title: "Contact Us",
    href: "/contact",
    tags: ["contact", "help", "support", "feedback", "email"],
    section: "Resources",
    description: "Get help or provide feedback to our team"
  },
  {
    title: "Privacy Policy",
    href: "/privacy",
    tags: ["privacy", "policy", "data", "protection", "gdpr"],
    section: "Resources",
    description: "How we protect and handle your personal data"
  },
  {
    title: "Terms of Service",
    href: "/terms",
    tags: ["terms", "service", "agreement", "legal", "conditions"],
    section: "Resources",
    description: "Terms and conditions for using WorkPayTools"
  },
  
  // Additional Calculator Concepts
  {
    title: "Minimum Wage Calculator",
    href: "/calculators/minimum-wage",
    tags: ["minimum wage", "federal", "state", "hourly", "pay", "compliance"],
    section: "Calculators",
    description: "Calculate minimum wage requirements by state and federal law"
  },
  {
    title: "Take-Home Pay Calculator",
    href: "/calculators/take-home-pay",
    tags: ["take home", "net pay", "gross pay", "taxes", "deductions", "paycheck"],
    section: "Calculators",
    description: "Calculate net take-home pay after taxes and deductions"
  },
  {
    title: "Payroll Tax Calculator",
    href: "/calculators/payroll-tax",
    tags: ["payroll tax", "fica", "medicare", "social security", "federal", "state"],
    section: "Calculators",
    description: "Calculate payroll taxes including FICA, Medicare, and Social Security"
  }
];
