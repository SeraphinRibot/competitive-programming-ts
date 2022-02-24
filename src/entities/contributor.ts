export type Skill = Record<string, number>;

export class Contributor {
  name: string;
  skills: Record<string, number>;
  currentProject: string | null = null;

  constructor(name: string, skills: Skill) {
    this.name = name;
    this.skills = skills;
  }

  setProject(project: string) {
    this.currentProject = project;
  }

  available() {
    this.currentProject = null;
  }

  improveSkill(skillName: string) {
    this.skills[skillName]++;
  }
}
