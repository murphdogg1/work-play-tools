export type SearchIntent = 'informational' | 'navigational' | 'transactional' | 'commercial';

export interface ContentBrief {
  keyword: string;
  intent: SearchIntent;
  searchIntent: string;
  tldr: string[];
  outline: string[];
  faqs: { question: string; answer: string }[];
  internalLinks: { title: string; href: string; reason: string }[];
  targetAudience: string;
  contentGoal: string;
}

const CALCULATOR_LINKS = [
  { title: "Overtime Pay Calculator", href: "/calculators/overtime-pay", reason: "Direct calculation tool" },
  { title: "Timecard Calculator", href: "/calculators/timecard", reason: "Track hours for overtime" },
  { title: "Take-Home Pay Calculator", href: "/calculators/take-home-pay", reason: "Calculate net pay with overtime" },
  { title: "Hourly to Salary Converter", href: "/calculators/hourly-to-salary", reason: "Convert hourly rates" },
];

const GUIDE_LINKS = [
  { title: "Payroll Basics Guide", href: "/guides/payroll-basics", reason: "Fundamental payroll concepts" },
  { title: "Overtime Rules by State", href: "/guides/overtime-rules", reason: "State-specific regulations" },
  { title: "Benefits & Deductions Guide", href: "/guides/benefits", reason: "Employee benefits overview" },
];

const TEMPLATE_LINKS = [
  { title: "PTO Policy Template", href: "/hr-templates/pto-policy", reason: "Time off policies" },
  { title: "Offer Letter Template", href: "/hr-templates/offer-letter", reason: "Employment documentation" },
  { title: "Disciplinary Action Form", href: "/hr-templates/disciplinary-action-form", reason: "Employee discipline" },
];

export function buildBrief(keyword: string, intent: SearchIntent): ContentBrief {
  const keywordLower = keyword.toLowerCase();
  
  // Determine search intent description
  const searchIntentMap: Record<SearchIntent, string> = {
    informational: "Users seeking to understand concepts, learn how things work, or get general knowledge",
    navigational: "Users looking for a specific website, tool, or resource they already know exists",
    transactional: "Users ready to take action, make calculations, or use a specific tool",
    commercial: "Users comparing options, evaluating solutions, or researching before making a decision"
  };

  // Generate TL;DR bullets based on keyword
  const tldr = generateTldr(keywordLower, intent);
  
  // Generate H2 outline
  const outline = generateOutline(keywordLower, intent);
  
  // Generate FAQs
  const faqs = generateFaqs(keywordLower, intent);
  
  // Select relevant internal links
  const internalLinks = selectInternalLinks(keywordLower, intent);
  
  // Determine target audience
  const targetAudience = determineTargetAudience(keywordLower);
  
  // Set content goal
  const contentGoal = determineContentGoal(intent);

  return {
    keyword,
    intent,
    searchIntent: searchIntentMap[intent],
    tldr,
    outline,
    faqs,
    internalLinks,
    targetAudience,
    contentGoal
  };
}

function generateTldr(keyword: string, intent: SearchIntent): string[] {
  const baseTldr: Record<string, string[]> = {
    'overtime': [
      "Overtime pay is typically 1.5x regular rate after 40 hours per week",
      "Some states have daily overtime rules (e.g., after 8 hours in California)",
      "Federal law sets minimum standards; states can have stricter rules"
    ],
    'payroll': [
      "Payroll involves calculating gross pay, deductions, and net pay",
      "Employers must withhold federal, state, and local taxes",
      "Benefits, retirement contributions, and other deductions affect take-home pay"
    ],
    'minimum wage': [
      "Federal minimum wage is $7.25/hour (unchanged since 2009)",
      "Many states and cities have higher minimum wage rates",
      "Tipped employees may have different minimum wage requirements"
    ],
    'salary': [
      "Salary is typically paid annually regardless of hours worked",
      "Exempt employees don't receive overtime pay",
      "Salary can be converted to hourly rates for comparison"
    ],
    'tax': [
      "Federal income tax uses progressive brackets",
      "Social Security and Medicare taxes are flat rates",
      "State taxes vary by location and income level"
    ]
  };

  // Find matching keyword or use generic
  for (const [key, bullets] of Object.entries(baseTldr)) {
    if (keyword.includes(key)) {
      return bullets;
    }
  }

  // Generic TL;DR based on intent
  switch (intent) {
    case 'informational':
      return [
        "Understanding key concepts and requirements",
        "Current rates and regulations for 2025",
        "Important compliance considerations"
      ];
    case 'transactional':
      return [
        "Quick access to calculation tools",
        "Step-by-step process guidance",
        "Immediate results and answers"
      ];
    case 'commercial':
      return [
        "Comparison of different options",
        "Pros and cons of each approach",
        "Recommendations for best practices"
      ];
    default:
      return [
        "Essential information and requirements",
        "Current rates and regulations",
        "Practical guidance and tools"
      ];
  }
}

function generateOutline(keyword: string, intent: SearchIntent): string[] {
  const baseOutline = [
    "Overview and Key Concepts",
    "Current Rates and Requirements (2025)",
    "How to Calculate",
    "State-Specific Rules",
    "Common Questions and Examples",
    "Related Tools and Resources"
  ];

  // Customize outline based on keyword
  if (keyword.includes('overtime')) {
    return [
      "What is Overtime Pay?",
      "Federal vs State Overtime Rules",
      "Daily vs Weekly Overtime Thresholds",
      "How to Calculate Overtime Pay",
      "State-Specific Overtime Requirements",
      "Common Overtime Scenarios and Examples"
    ];
  }

  if (keyword.includes('payroll')) {
    return [
      "Payroll Processing Overview",
      "Gross Pay vs Net Pay",
      "Required Deductions and Withholdings",
      "Payroll Tax Calculations",
      "Benefits and Voluntary Deductions",
      "Payroll Compliance Requirements"
    ];
  }

  if (keyword.includes('minimum wage')) {
    return [
      "Current Minimum Wage Rates",
      "Federal vs State Minimum Wage",
      "Tipped Employee Minimum Wage",
      "City and Local Minimum Wage Laws",
      "Minimum Wage Increases and Updates",
      "Compliance and Enforcement"
    ];
  }

  return baseOutline;
}

function generateFaqs(keyword: string, intent: SearchIntent): { question: string; answer: string }[] {
  const baseFaqs = [
    {
      question: "What are the current rates for 2025?",
      answer: "Rates are updated annually and vary by state. Check our calculators for the most current information."
    },
    {
      question: "How do I calculate this myself?",
      answer: "Use our free calculators for accurate calculations, or refer to the step-by-step guides in our resources."
    },
    {
      question: "Are there state-specific differences?",
      answer: "Yes, many states have their own rules that may be more generous than federal requirements."
    }
  ];

  // Customize FAQs based on keyword
  if (keyword.includes('overtime')) {
    return [
      {
        question: "What is the overtime rate?",
        answer: "Overtime is typically paid at 1.5 times your regular hourly rate for hours worked over 40 in a week."
      },
      {
        question: "Do all states have the same overtime rules?",
        answer: "No, some states like California have daily overtime rules that require overtime pay after 8 hours in a day."
      },
      {
        question: "Are salaried employees eligible for overtime?",
        answer: "It depends on whether the employee is exempt or non-exempt under FLSA regulations."
      }
    ];
  }

  if (keyword.includes('payroll')) {
    return [
      {
        question: "What deductions are required?",
        answer: "Required deductions include federal income tax, Social Security, Medicare, and state/local taxes where applicable."
      },
      {
        question: "How often should payroll be processed?",
        answer: "Payroll frequency varies by state law and company policy, but common frequencies are weekly, bi-weekly, or monthly."
      },
      {
        question: "What records should be kept?",
        answer: "Keep detailed records of hours worked, pay rates, deductions, and tax withholdings for at least 3 years."
      }
    ];
  }

  return baseFaqs;
}

function selectInternalLinks(keyword: string, intent: SearchIntent): { title: string; href: string; reason: string }[] {
  const links: { title: string; href: string; reason: string }[] = [];

  // Always include relevant calculators
  if (keyword.includes('overtime')) {
    links.push(
      { title: "Overtime Pay Calculator", href: "/calculators/overtime-pay", reason: "Calculate overtime pay" },
      { title: "Timecard Calculator", href: "/calculators/timecard", reason: "Track hours for overtime" }
    );
  }

  if (keyword.includes('payroll') || keyword.includes('salary')) {
    links.push(
      { title: "Take-Home Pay Calculator", href: "/calculators/take-home-pay", reason: "Calculate net pay" },
      { title: "Payroll Tax Calculator", href: "/calculators/payroll-tax", reason: "Calculate payroll taxes" }
    );
  }

  if (keyword.includes('minimum wage')) {
    links.push(
      { title: "Minimum Wage Calculator", href: "/calculators/minimum-wage", reason: "Check minimum wage rates" }
    );
  }

  // Add relevant guides
  if (keyword.includes('overtime')) {
    links.push(
      { title: "Overtime Rules by State", href: "/guides/overtime-rules", reason: "State-specific overtime rules" }
    );
  }

  if (keyword.includes('payroll')) {
    links.push(
      { title: "Payroll Basics Guide", href: "/guides/payroll-basics", reason: "Payroll fundamentals" },
      { title: "Benefits & Deductions Guide", href: "/guides/benefits", reason: "Employee benefits" }
    );
  }

  // Add templates if relevant
  if (keyword.includes('policy') || keyword.includes('hr')) {
    links.push(
      { title: "PTO Policy Template", href: "/hr-templates/pto-policy", reason: "Time off policies" },
      { title: "Offer Letter Template", href: "/hr-templates/offer-letter", reason: "Employment documentation" }
    );
  }

  return links.slice(0, 4); // Limit to 4 links
}

function determineTargetAudience(keyword: string): string {
  if (keyword.includes('hr') || keyword.includes('policy') || keyword.includes('template')) {
    return "HR professionals, business owners, and managers";
  }
  
  if (keyword.includes('employee') || keyword.includes('worker')) {
    return "Employees, hourly workers, and job seekers";
  }
  
  if (keyword.includes('payroll') || keyword.includes('tax')) {
    return "Business owners, HR professionals, and payroll administrators";
  }
  
  return "Business owners, HR professionals, employees, and job seekers";
}

function determineContentGoal(intent: SearchIntent): string {
  switch (intent) {
    case 'informational':
      return "Educate users about concepts, rules, and requirements";
    case 'navigational':
      return "Help users find specific tools and resources";
    case 'transactional':
      return "Enable users to complete calculations and tasks";
    case 'commercial':
      return "Help users compare options and make informed decisions";
    default:
      return "Provide comprehensive information and practical tools";
  }
}

export function formatBrief(brief: ContentBrief): string {
  return `# Content Brief: ${brief.keyword}

## Search Intent
**Type:** ${brief.intent}
**Description:** ${brief.searchIntent}

## Target Audience
${brief.targetAudience}

## Content Goal
${brief.contentGoal}

## TL;DR (Key Points)
${brief.tldr.map(bullet => `- ${bullet}`).join('\n')}

## Content Outline
${brief.outline.map((section, index) => `${index + 1}. ${section}`).join('\n')}

## FAQ Suggestions
${brief.faqs.map(faq => `**Q:** ${faq.question}\n**A:** ${faq.answer}`).join('\n\n')}

## Internal Link Opportunities
${brief.internalLinks.map(link => `- [${link.title}](${link.href}) - ${link.reason}`).join('\n')}

---
*Generated for keyword: "${brief.keyword}" with intent: "${brief.intent}"*`;
}
