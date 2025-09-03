#!/usr/bin/env tsx

import { buildBrief, formatBrief, type SearchIntent } from '../src/lib/contentBrief';

function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log('Usage: pnpm brief "keyword phrase" <intent>');
    console.log('');
    console.log('Intent options:');
    console.log('  - informational: Users seeking to understand concepts');
    console.log('  - navigational: Users looking for specific tools/resources');
    console.log('  - transactional: Users ready to take action');
    console.log('  - commercial: Users comparing options');
    console.log('');
    console.log('Examples:');
    console.log('  pnpm brief "overtime california" informational');
    console.log('  pnpm brief "payroll calculator" transactional');
    console.log('  pnpm brief "minimum wage" commercial');
    process.exit(1);
  }

  const keyword = args[0];
  const intent = args[1] as SearchIntent;

  // Validate intent
  const validIntents: SearchIntent[] = ['informational', 'navigational', 'transactional', 'commercial'];
  if (!validIntents.includes(intent)) {
    console.error(`Error: Invalid intent "${intent}"`);
    console.error(`Valid intents: ${validIntents.join(', ')}`);
    process.exit(1);
  }

  try {
    const brief = buildBrief(keyword, intent);
    const formattedBrief = formatBrief(brief);
    
    console.log(formattedBrief);
  } catch (error) {
    console.error('Error generating brief:', error);
    process.exit(1);
  }
}

main();
