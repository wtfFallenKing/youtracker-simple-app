export interface Project {
  id: string;
  name: string;
  shortName: string;
  testFlag: boolean;
}

export interface ProjectFlagResponse {
  projectName: string;
  testFlag: boolean;
}