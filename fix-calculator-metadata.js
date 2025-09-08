const fs = require('fs');
const path = require('path');

const calculatorPages = [
  'src/app/calculators/paystub-generator/page.tsx',
  'src/app/calculators/salary-to-hourly/page.tsx',
  'src/app/calculators/timecard/page.tsx',
  'src/app/calculators/payroll-tax/page.tsx',
  'src/app/calculators/payroll/page.tsx',
  'src/app/calculators/minimum-wage/page.tsx',
  'src/app/calculators/take-home-pay/page.tsx',
  'src/app/calculators/hourly-to-salary/page.tsx'
];

const calculatorNames = {
  'paystub-generator': 'Paystub Generator',
  'salary-to-hourly': 'Salary to Hourly Calculator',
  'timecard': 'Timecard Calculator',
  'payroll-tax': 'Payroll Tax Calculator',
  'payroll': 'Payroll Calculator',
  'minimum-wage': 'Minimum Wage Calculator',
  'take-home-pay': 'Take-Home Pay Calculator',
  'hourly-to-salary': 'Hourly to Salary Calculator'
};

const descriptions = {
  'paystub-generator': 'Create professional ADP-style pay stubs instantly. Generate accurate pay stubs with all necessary deductions and calculations.',
  'salary-to-hourly': 'Convert annual salary to hourly rate for contracts and negotiations. Essential for freelancers and contract workers.',
  'timecard': 'Track work hours and calculate totals with break time. Perfect for hourly workers and freelancers.',
  'payroll-tax': 'Calculate federal, state, and local payroll taxes for employees. Includes FICA, Medicare, and Social Security taxes.',
  'payroll': 'Calculate employee pay, taxes, deductions, and net pay instantly. Free payroll calculator for 2025.',
  'minimum-wage': 'Calculate minimum wage rates by state and city. Compare federal vs state minimum wages and calculate overtime pay.',
  'take-home-pay': 'Calculate net pay after taxes and deductions. Get accurate take-home pay calculations for any salary.',
  'hourly-to-salary': 'Convert hourly rates to annual salary equivalents. Essential for job negotiations and budgeting.'
};

calculatorPages.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Extract the calculator name from the path
    const pathParts = filePath.split('/');
    const calculatorKey = pathParts[pathParts.length - 2];
    const calculatorName = calculatorNames[calculatorKey];
    const description = descriptions[calculatorKey];
    
    if (calculatorName && description) {
      // Add import if not present
      if (!content.includes('generateCalculatorMetadata')) {
        content = content.replace(
          /import { generateOgImageUrl } from "@\/lib\/og";/,
          'import { generateOgImageUrl } from "@/lib/og";\nimport { generateCalculatorMetadata } from "@/lib/seo/metadata";'
        );
      }
      
      // Replace the metadata object
      const metadataRegex = /export const metadata: Metadata = \{[\s\S]*?\};/;
      const newMetadata = `export const metadata: Metadata = generateCalculatorMetadata(
  "${calculatorName}",
  "${description}",
  "/calculators/${calculatorKey}"
);`;
      
      content = content.replace(metadataRegex, newMetadata);
      
      fs.writeFileSync(filePath, content);
      console.log(`Fixed metadata for ${calculatorKey}`);
    }
  }
});

console.log('All calculator metadata fixed!');
