export interface Course {
  slug: string;
  title: string;
  examDate: string;
  examTime: string;
  units: number;
  desc: string;
}

export interface Category {
  name: string;
  courses: Course[];
}

export const CATEGORIES: Category[] = [
  {
    name: "Sciences",
    courses: [
      { slug: "AP-Biology", title: "AP Biology", examDate: "May 4, 2026", examTime: "Morning", units: 8, desc: "Explore the core scientific principles, theories, and processes that govern living organisms and biological systems." },
      { slug: "AP-Chemistry", title: "AP Chemistry", examDate: "May 5, 2026", examTime: "Morning", units: 9, desc: "Study the fundamental concepts of chemistry including structure, states of matter, intermolecular forces, and reactions." },
      { slug: "AP-Environmental-Science", title: "AP Environmental Science", examDate: "May 15, 2026", examTime: "Morning", units: 9, desc: "Examine the interrelationships of the natural world and analyze environmental problems, both natural and human-made." },
      { slug: "AP-Physics-1", title: "AP Physics 1: Algebra-Based", examDate: "May 6, 2026", examTime: "Afternoon", units: 7, desc: "Explore foundational physics concepts including Newtonian mechanics, work, energy, and mechanical waves." },
      { slug: "AP-Physics-2", title: "AP Physics 2: Algebra-Based", examDate: "May 7, 2026", examTime: "Morning", units: 7, desc: "Study fluid mechanics, thermodynamics, electricity, magnetism, optics, and modern physics." },
      { slug: "AP-Physics-C-Mechanics", title: "AP Physics C: Mechanics", examDate: "May 13, 2026", examTime: "Afternoon", units: 7, desc: "Calculus-based study of kinematics, Newton's laws, work and energy, systems of particles, and rotation." },
      { slug: "AP-Physics-C-EM", title: "AP Physics C: E&M", examDate: "May 14, 2026", examTime: "Afternoon", units: 5, desc: "Calculus-based exploration of electrostatics, conductors, capacitors, dielectrics, electric circuits, and electromagnetism." },
    ],
  },
  {
    name: "Mathematics",
    courses: [
      { slug: "AP-Calculus-AB", title: "AP Calculus AB", examDate: "May 11, 2026", examTime: "Morning", units: 8, desc: "Master the concepts and applications of differential and integral calculus." },
      { slug: "AP-Calculus-BC", title: "AP Calculus BC", examDate: "May 11, 2026", examTime: "Morning", units: 10, desc: "Extend your knowledge of calculus through parametric, polar, and vector functions, and series." },
      { slug: "AP-Precalculus", title: "AP Precalculus", examDate: "May 12, 2026", examTime: "Morning", units: 4, desc: "Build a deep understanding of polynomial, rational, exponential, logarithmic, and trigonometric functions." },
      { slug: "AP-Statistics", title: "AP Statistics", examDate: "May 7, 2026", examTime: "Afternoon", units: 9, desc: "Learn to collect, analyze, and draw conclusions from data using statistical methods." },
    ],
  },
  {
    name: "English",
    courses: [
      { slug: "AP-English-Language", title: "AP English Language and Composition", examDate: "May 13, 2026", examTime: "Morning", units: 9, desc: "Develop skills in rhetorical analysis, argumentation, and synthesis of information from multiple sources." },
      { slug: "AP-English-Literature", title: "AP English Literature and Composition", examDate: "May 6, 2026", examTime: "Morning", units: 9, desc: "Engage with challenging literary texts and develop your skills in literary analysis and argumentative writing." },
    ],
  },
  {
    name: "History & Social Sciences",
    courses: [
      { slug: "AP-US-History", title: "AP United States History", examDate: "May 8, 2026", examTime: "Morning", units: 9, desc: "Study the cultural, economic, political, and social developments that shaped the United States." },
      { slug: "AP-World-History", title: "AP World History: Modern", examDate: "May 7, 2026", examTime: "Morning", units: 9, desc: "Explore world history from c. 1200 to the present, analyzing patterns of continuity and change." },
      { slug: "AP-European-History", title: "AP European History", examDate: "May 4, 2026", examTime: "Afternoon", units: 9, desc: "Study the major events, individuals, and developments in European history from 1450 to the present." },
      { slug: "AP-US-Government", title: "AP US Government and Politics", examDate: "May 5, 2026", examTime: "Afternoon", units: 5, desc: "Study the principles, institutions, processes, and policies of the United States government." },
      { slug: "AP-Comparative-Government", title: "AP Comparative Government and Politics", examDate: "May 6, 2026", examTime: "Afternoon", units: 5, desc: "Compare political systems, institutions, and processes across six countries." },
      { slug: "AP-Human-Geography", title: "AP Human Geography", examDate: "May 5, 2026", examTime: "Morning", units: 7, desc: "Explore how humans have shaped the Earth's surface and developed patterns of spatial organization." },
      { slug: "AP-Psychology", title: "AP Psychology", examDate: "May 12, 2026", examTime: "Afternoon", units: 9, desc: "Study the systematic and scientific study of human behavior and mental processes." },
      { slug: "AP-Macroeconomics", title: "AP Macroeconomics", examDate: "May 8, 2026", examTime: "Afternoon", units: 6, desc: "Examine the principles of economics that apply to an economic system as a whole." },
      { slug: "AP-Microeconomics", title: "AP Microeconomics", examDate: "May 4, 2026", examTime: "Afternoon", units: 6, desc: "Study the principles of economics that apply to individual decision-makers within an economic system." },
      { slug: "AP-African-American-Studies", title: "AP African American Studies", examDate: "May 7, 2026", examTime: "Afternoon", units: 4, desc: "Explore the diversity of African American experiences through interdisciplinary study." },
    ],
  },
  {
    name: "Computer Science",
    courses: [
      { slug: "AP-Computer-Science-A", title: "AP Computer Science A", examDate: "May 15, 2026", examTime: "Afternoon", units: 10, desc: "Study object-oriented programming methodology with an emphasis on problem solving and algorithm development using Java." },
      { slug: "AP-Computer-Science-Principles", title: "AP Computer Science Principles", examDate: "May 14, 2026", examTime: "Afternoon", units: 5, desc: "Explore the foundational concepts of computer science and understand how computing affects the world." },
    ],
  },
  {
    name: "Arts",
    courses: [
      { slug: "AP-Art-History", title: "AP Art History", examDate: "May 14, 2026", examTime: "Morning", units: 10, desc: "Examine major forms of artistic expression from the past and present across diverse cultures." },
      { slug: "AP-Music-Theory", title: "AP Music Theory", examDate: "May 11, 2026", examTime: "Afternoon", units: 8, desc: "Develop understanding of musical structure, compositional techniques, and aural skills." },
    ],
  },
  {
    name: "World Languages",
    courses: [
      { slug: "AP-Spanish-Language", title: "AP Spanish Language and Culture", examDate: "May 14, 2026", examTime: "Morning", units: 6, desc: "Develop proficiency in interpersonal, interpretive, and presentational communication in Spanish." },
      { slug: "AP-French-Language", title: "AP French Language and Culture", examDate: "May 12, 2026", examTime: "Morning", units: 6, desc: "Develop proficiency in interpersonal, interpretive, and presentational communication in French." },
      { slug: "AP-German-Language", title: "AP German Language and Culture", examDate: "May 13, 2026", examTime: "Morning", units: 6, desc: "Develop proficiency in interpersonal, interpretive, and presentational communication in German." },
      { slug: "AP-Chinese-Language", title: "AP Chinese Language and Culture", examDate: "May 8, 2026", examTime: "Afternoon", units: 6, desc: "Develop proficiency in interpersonal, interpretive, and presentational communication in Chinese." },
      { slug: "AP-Japanese-Language", title: "AP Japanese Language and Culture", examDate: "May 12, 2026", examTime: "Afternoon", units: 6, desc: "Develop proficiency in interpersonal, interpretive, and presentational communication in Japanese." },
      { slug: "AP-Italian-Language", title: "AP Italian Language and Culture", examDate: "May 8, 2026", examTime: "Morning", units: 6, desc: "Develop proficiency in interpersonal, interpretive, and presentational communication in Italian." },
      { slug: "AP-Spanish-Literature", title: "AP Spanish Literature and Culture", examDate: "May 13, 2026", examTime: "Afternoon", units: 8, desc: "Explore themes in Spanish literature from medieval to contemporary periods across the Spanish-speaking world." },
      { slug: "AP-Latin", title: "AP Latin", examDate: "May 4, 2026", examTime: "Morning", units: 5, desc: "Develop reading skills in Latin through study of Vergil's Aeneid and Caesar's Gallic War." },
    ],
  },
  {
    name: "Capstone",
    courses: [
      { slug: "AP-Seminar", title: "AP Seminar", examDate: "May 11, 2026", examTime: "Afternoon", units: 4, desc: "Develop analytical and inquiry skills through exploring real-world issues from multiple perspectives." },
      { slug: "AP-Research", title: "AP Research", examDate: "N/A", examTime: "Portfolio", units: 0, desc: "Conduct an independent research project culminating in an academic paper and presentation." },
    ],
  },
];

export const ALL_COURSES = CATEGORIES.flatMap((c) => c.courses);
