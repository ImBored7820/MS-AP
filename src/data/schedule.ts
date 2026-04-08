export interface ScheduleDay {
  day: string;
  date: number; // day of month in May 2026
  morning: string[];
  afternoon: string[];
}

export const SCHEDULE: ScheduleDay[] = [
  { day: "Mon, May 4", date: 4, morning: ["Biology", "Latin"], afternoon: ["European History", "Microeconomics"] },
  { day: "Tue, May 5", date: 5, morning: ["Chemistry", "Human Geography"], afternoon: ["US Government and Politics"] },
  { day: "Wed, May 6", date: 6, morning: ["English Literature"], afternoon: ["Comparative Government", "Physics 1"] },
  { day: "Thu, May 7", date: 7, morning: ["Physics 2", "World History: Modern"], afternoon: ["African American Studies", "Statistics"] },
  { day: "Fri, May 8", date: 8, morning: ["Italian Language", "US History"], afternoon: ["Chinese Language", "Macroeconomics"] },
  { day: "Mon, May 11", date: 11, morning: ["Calculus AB", "Calculus BC"], afternoon: ["Music Theory", "Seminar"] },
  { day: "Tue, May 12", date: 12, morning: ["French Language", "Precalculus"], afternoon: ["Japanese Language", "Psychology"] },
  { day: "Wed, May 13", date: 13, morning: ["English Language", "German Language"], afternoon: ["Physics C: Mechanics", "Spanish Literature"] },
  { day: "Thu, May 14", date: 14, morning: ["Art History", "Spanish Language"], afternoon: ["CS Principles", "Physics C: E&M"] },
  { day: "Fri, May 15", date: 15, morning: ["Environmental Science"], afternoon: ["Computer Science A"] },
];
