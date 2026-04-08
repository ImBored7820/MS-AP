// src/data/slugAliases.ts
// Maps informal/shorthand URL slugs → canonical course slugs.
// Lookup is case-insensitive: always normalize with .toLowerCase() before checking.
export const SLUG_ALIASES: Record<string, string> = {
  // ── Physics ──────────────────────────────────────────────
  "phys1":                    "AP-Physics-1",
  "physics1":                 "AP-Physics-1",
  "apphys1":                  "AP-Physics-1",
  "ap-physics-1-algebra":     "AP-Physics-1",
  "phys2":                    "AP-Physics-2",
  "physics2":                 "AP-Physics-2",
  "apphys2":                  "AP-Physics-2",
  "ap-physics-2-algebra":     "AP-Physics-2",
  "apcmech":                  "AP-Physics-C-Mechanics",
  "apc-mech":                 "AP-Physics-C-Mechanics",
  "apcmechanics":             "AP-Physics-C-Mechanics",
  "physicsc":                 "AP-Physics-C-Mechanics",
  "physcmech":                "AP-Physics-C-Mechanics",
  "apcm":                     "AP-Physics-C-Mechanics",
  "apcem":                    "AP-Physics-C-EM",
  "apc-em":                   "AP-Physics-C-EM",
  "physicsce":                "AP-Physics-C-EM",
  "apcelectromagnetism":      "AP-Physics-C-EM",

  // ── Mathematics ──────────────────────────────────────────
  "calcab":                   "AP-Calculus-AB",
  "apcalcab":                 "AP-Calculus-AB",
  "calc-ab":                  "AP-Calculus-AB",
  "calcbc":                   "AP-Calculus-BC",
  "apcalcbc":                 "AP-Calculus-BC",
  "calc-bc":                  "AP-Calculus-BC",
  "precalc":                  "AP-Precalculus",
  "precalculus":              "AP-Precalculus",
  "stats":                    "AP-Statistics",
  "apstats":                  "AP-Statistics",
  "statistics":               "AP-Statistics",

  // ── Sciences ─────────────────────────────────────────────
  "bio":                      "AP-Biology",
  "apbio":                    "AP-Biology",
  "biology":                  "AP-Biology",
  "chem":                     "AP-Chemistry",
  "apchem":                   "AP-Chemistry",
  "chemistry":                "AP-Chemistry",
  "apes":                     "AP-Environmental-Science",
  "enviro":                   "AP-Environmental-Science",
  "envsci":                   "AP-Environmental-Science",
  "environmental-science":    "AP-Environmental-Science",
  "environmentalscience":     "AP-Environmental-Science",

  // ── History ──────────────────────────────────────────────
  "apush":                    "AP-US-History",
  "ushistory":                "AP-US-History",
  "us-history":               "AP-US-History",
  "apwh":                     "AP-World-History",
  "worldhistory":             "AP-World-History",
  "world-history":            "AP-World-History",
  "apeuro":                   "AP-European-History",
  "euro":                     "AP-European-History",
  "european-history":         "AP-European-History",
  "europeanhistory":          "AP-European-History",

  // ── Government & Social Sciences ─────────────────────────
  "apgov":                    "AP-US-Government",
  "usgov":                    "AP-US-Government",
  "gov":                      "AP-US-Government",
  "compgov":                  "AP-Comparative-Government",
  "comparative-government":   "AP-Comparative-Government",
  "hug":                      "AP-Human-Geography",
  "humangeography":           "AP-Human-Geography",
  "human-geography":          "AP-Human-Geography",
  "psych":                    "AP-Psychology",
  "appsych":                  "AP-Psychology",
  "psychology":               "AP-Psychology",
  "macro":                    "AP-Macroeconomics",
  "apmacro":                  "AP-Macroeconomics",
  "macroeconomics":           "AP-Macroeconomics",
  "micro":                    "AP-Microeconomics",
  "apmicro":                  "AP-Microeconomics",
  "microeconomics":           "AP-Microeconomics",
  "aas":                      "AP-African-American-Studies",
  "african-american-studies": "AP-African-American-Studies",

  // ── Computer Science ─────────────────────────────────────
  "csa":                      "AP-Computer-Science-A",
  "cs-a":                     "AP-Computer-Science-A",
  "apcsa":                    "AP-Computer-Science-A",
  "java":                     "AP-Computer-Science-A",
  "csp":                      "AP-Computer-Science-Principles",
  "cs-p":                     "AP-Computer-Science-Principles",
  "apcsp":                    "AP-Computer-Science-Principles",

  // ── English ──────────────────────────────────────────────
  "aplang":                   "AP-English-Language",
  "lang":                     "AP-English-Language",
  "english-language":         "AP-English-Language",
  "aplit":                    "AP-English-Literature",
  "lit":                      "AP-English-Literature",
  "english-literature":       "AP-English-Literature",

  // ── Arts ─────────────────────────────────────────────────
  "arthistory":               "AP-Art-History",
  "art-history":              "AP-Art-History",
  "musictheory":              "AP-Music-Theory",
  "music-theory":             "AP-Music-Theory",
  "music":                    "AP-Music-Theory",

  // ── World Languages ──────────────────────────────────────
  "spanish":                  "AP-Spanish-Language",
  "french":                   "AP-French-Language",
  "german":                   "AP-German-Language",
  "chinese":                  "AP-Chinese-Language",
  "japanese":                 "AP-Japanese-Language",
  "italian":                  "AP-Italian-Language",
  "latin":                    "AP-Latin",
  "spanlit":                  "AP-Spanish-Literature",
  "spanlitculture":           "AP-Spanish-Literature",

  // ── Capstone ─────────────────────────────────────────────
  "seminar":                  "AP-Seminar",
  "research":                 "AP-Research",
  "capstone":                 "AP-Seminar",
};
