export interface StudyMaterial {
  type: string;
  name: string;
  url: string;
  description?: string;
}

export interface RevisionWeek {
  theme?: string;
  days: string[];
}

export interface CourseContent {
  slug: string;
  overview?: string;
  format?: { section: string; detail: string }[];
  studyMaterials?: StudyMaterial[];
  revisionPlan?: RevisionWeek[];
}
