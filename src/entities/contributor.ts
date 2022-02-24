import { SkillRecord, SkillTupple } from "./skill";

export class Contributor {
  name: string;
  skills: SkillRecord;
  currentProject: string | null = null;

  constructor(name: string, skills: SkillRecord) {
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

  canContribute() {}

  canMentor(skill: SkillTupple) {
    const [name, level] = skill;
    return this.skills[name] >= level;
  }
}
