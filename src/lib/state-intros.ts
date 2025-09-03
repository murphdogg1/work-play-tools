import { StateInfo } from "@/data/states";

interface StateIntro {
  firstSentence: string;
  secondSentence: string;
}

const stateIntros: Record<string, StateIntro> = {
  al: {
    firstSentence: "Alabama follows federal overtime laws with a standard 40-hour weekly threshold.",
    secondSentence: "The state has specific regulations for certain industries like healthcare and manufacturing."
  },
  ak: {
    firstSentence: "Alaska enforces federal overtime standards but has unique considerations for remote work.",
    secondSentence: "The state's high cost of living may influence overtime compensation discussions."
  },
  az: {
    firstSentence: "Arizona adheres to federal overtime requirements with no additional state-specific rules.",
    secondSentence: "The state's growing tech sector often implements more generous overtime policies."
  },
  ar: {
    firstSentence: "Arkansas follows federal overtime laws with standard 40-hour weekly thresholds.",
    secondSentence: "The state has specific exemptions for agricultural and seasonal workers."
  },
  ca: {
    firstSentence: "California has the most comprehensive overtime laws in the nation, including daily overtime.",
    secondSentence: "The state requires 1.5× pay after 8 hours daily and 2× pay after 12 hours daily."
  },
  co: {
    firstSentence: "Colorado follows federal overtime standards with some additional protections for workers.",
    secondSentence: "The state has implemented progressive labor laws that may affect overtime calculations."
  },
  ct: {
    firstSentence: "Connecticut enforces federal overtime laws with additional state-level protections.",
    secondSentence: "The state has specific rules for certain sectors like healthcare and retail."
  },
  de: {
    firstSentence: "Delaware follows federal overtime requirements with standard weekly thresholds.",
    secondSentence: "The state's proximity to major metropolitan areas influences its labor standards."
  },
  dc: {
    firstSentence: "The District of Columbia has progressive overtime laws that exceed federal standards.",
    secondSentence: "DC requires overtime pay for hours worked over 40 in a week, with some additional protections."
  },
  fl: {
    firstSentence: "Florida follows federal overtime laws with no additional state-specific requirements.",
    secondSentence: "The state's tourism and hospitality industries often have unique overtime considerations."
  },
  ga: {
    firstSentence: "Georgia adheres to federal overtime standards with standard 40-hour weekly thresholds.",
    secondSentence: "The state's growing film industry has specific overtime agreements and practices."
  },
  hi: {
    firstSentence: "Hawaii follows federal overtime laws with some state-specific considerations.",
    secondSentence: "The state's unique economy and high cost of living influence overtime practices."
  },
  id: {
    firstSentence: "Idaho follows federal overtime requirements with no additional state regulations.",
    secondSentence: "The state's agricultural sector has specific exemptions under federal law."
  },
  il: {
    firstSentence: "Illinois has progressive overtime laws that may exceed federal standards in some areas.",
    secondSentence: "The state's major cities like Chicago have additional local labor protections."
  },
  in: {
    firstSentence: "Indiana follows federal overtime laws with standard weekly thresholds.",
    secondSentence: "The state's manufacturing sector often has specific overtime agreements."
  },
  ia: {
    firstSentence: "Iowa adheres to federal overtime standards with no additional state requirements.",
    secondSentence: "The state's agricultural economy has specific exemptions for farm workers."
  },
  ks: {
    firstSentence: "Kansas follows federal overtime laws with standard 40-hour weekly thresholds.",
    secondSentence: "The state's aviation industry often has unique overtime considerations."
  },
  ky: {
    firstSentence: "Kentucky enforces federal overtime requirements with no additional state rules.",
    secondSentence: "The state's bourbon and manufacturing industries have specific overtime practices."
  },
  la: {
    firstSentence: "Louisiana follows federal overtime standards with some industry-specific considerations.",
    secondSentence: "The state's oil and gas industry often has unique overtime arrangements."
  },
  me: {
    firstSentence: "Maine has progressive labor laws that may exceed federal overtime standards.",
    secondSentence: "The state's seasonal tourism industry has specific overtime considerations."
  },
  md: {
    firstSentence: "Maryland follows federal overtime laws with additional state-level protections.",
    secondSentence: "The state's proximity to Washington DC influences its labor standards."
  },
  ma: {
    firstSentence: "Massachusetts has comprehensive overtime laws that exceed federal requirements.",
    secondSentence: "The state requires overtime pay for hours over 40 per week with strong enforcement."
  },
  mi: {
    firstSentence: "Michigan follows federal overtime standards with some state-specific considerations.",
    secondSentence: "The state's automotive industry has historically influenced overtime practices."
  },
  mn: {
    firstSentence: "Minnesota has progressive overtime laws that may exceed federal standards.",
    secondSentence: "The state's strong labor protections include specific overtime requirements."
  },
  ms: {
    firstSentence: "Mississippi follows federal overtime laws with standard weekly thresholds.",
    secondSentence: "The state's manufacturing and agricultural sectors have specific exemptions."
  },
  mo: {
    firstSentence: "Missouri adheres to federal overtime requirements with no additional state rules.",
    secondSentence: "The state's central location influences its labor market dynamics."
  },
  mt: {
    firstSentence: "Montana follows federal overtime standards with some unique considerations.",
    secondSentence: "The state's rural nature and seasonal industries affect overtime practices."
  },
  ne: {
    firstSentence: "Nebraska enforces federal overtime laws with standard 40-hour weekly thresholds.",
    secondSentence: "The state's agricultural economy has specific exemptions for farm workers."
  },
  nv: {
    firstSentence: "Nevada follows federal overtime requirements with some industry-specific rules.",
    secondSentence: "The state's gaming and hospitality industries have unique overtime considerations."
  },
  nh: {
    firstSentence: "New Hampshire adheres to federal overtime standards with no additional state requirements.",
    secondSentence: "The state's small business environment influences overtime practices."
  },
  nj: {
    firstSentence: "New Jersey has progressive overtime laws that exceed federal standards.",
    secondSentence: "The state requires overtime pay for hours over 40 per week with strong enforcement."
  },
  nm: {
    firstSentence: "New Mexico follows federal overtime laws with some state-specific considerations.",
    secondSentence: "The state's diverse economy includes unique overtime arrangements."
  },
  ny: {
    firstSentence: "New York has comprehensive overtime laws that exceed federal requirements.",
    secondSentence: "The state requires overtime pay for hours over 40 per week with additional protections."
  },
  nc: {
    firstSentence: "North Carolina follows federal overtime standards with no additional state rules.",
    secondSentence: "The state's growing tech sector often implements progressive overtime policies."
  },
  nd: {
    firstSentence: "North Dakota enforces federal overtime requirements with standard weekly thresholds.",
    secondSentence: "The state's oil industry boom has influenced overtime practices significantly."
  },
  oh: {
    firstSentence: "Ohio follows federal overtime laws with some state-specific considerations.",
    secondSentence: "The state's manufacturing heritage influences its overtime practices."
  },
  ok: {
    firstSentence: "Oklahoma adheres to federal overtime standards with no additional state requirements.",
    secondSentence: "The state's energy sector often has unique overtime arrangements."
  },
  or: {
    firstSentence: "Oregon has progressive overtime laws that exceed federal standards.",
    secondSentence: "The state requires overtime pay for hours over 40 per week with strong enforcement."
  },
  pa: {
    firstSentence: "Pennsylvania follows federal overtime laws with some additional state protections.",
    secondSentence: "The state's diverse economy includes various overtime practices across industries."
  },
  ri: {
    firstSentence: "Rhode Island has progressive labor laws that may exceed federal overtime standards.",
    secondSentence: "The state's small size allows for comprehensive labor law enforcement."
  },
  sc: {
    firstSentence: "South Carolina follows federal overtime requirements with standard weekly thresholds.",
    secondSentence: "The state's growing manufacturing sector often has specific overtime agreements."
  },
  sd: {
    firstSentence: "South Dakota enforces federal overtime laws with no additional state rules.",
    secondSentence: "The state's agricultural economy has specific exemptions for farm workers."
  },
  tn: {
    firstSentence: "Tennessee follows federal overtime standards with no additional state requirements.",
    secondSentence: "The state's music and entertainment industries have unique overtime considerations."
  },
  tx: {
    firstSentence: "Texas adheres to federal overtime laws with standard 40-hour weekly thresholds.",
    secondSentence: "The state's large economy includes diverse overtime practices across industries."
  },
  ut: {
    firstSentence: "Utah follows federal overtime requirements with no additional state regulations.",
    secondSentence: "The state's growing tech sector often implements progressive overtime policies."
  },
  vt: {
    firstSentence: "Vermont has progressive overtime laws that may exceed federal standards.",
    secondSentence: "The state's small business environment influences its labor protections."
  },
  va: {
    firstSentence: "Virginia follows federal overtime laws with some state-specific considerations.",
    secondSentence: "The state's proximity to Washington DC influences its labor standards."
  },
  wa: {
    firstSentence: "Washington has comprehensive overtime laws that exceed federal requirements.",
    secondSentence: "The state requires overtime pay for hours over 40 per week with strong enforcement."
  },
  wv: {
    firstSentence: "West Virginia follows federal overtime standards with no additional state rules.",
    secondSentence: "The state's energy and manufacturing sectors have specific overtime practices."
  },
  wi: {
    firstSentence: "Wisconsin has progressive labor laws that may exceed federal overtime standards.",
    secondSentence: "The state's manufacturing heritage influences its overtime protections."
  },
  wy: {
    firstSentence: "Wyoming follows federal overtime requirements with standard weekly thresholds.",
    secondSentence: "The state's energy sector often has unique overtime arrangements."
  }
};

export function getStateIntro(state: StateInfo): StateIntro {
  return stateIntros[state.slug] || {
    firstSentence: `${state.name} follows federal overtime laws with standard weekly thresholds.`,
    secondSentence: "The state's specific regulations may vary by industry and employment type."
  };
}
