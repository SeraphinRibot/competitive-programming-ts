import { Project } from "./project";
import { SkillRecord, SkillTupple } from "./skill";

export class Contributor {
  name: string;
  skills: SkillRecord;
  currentWork: { project: string; skill: string } | null = null;

  constructor(name: string, skills: SkillRecord) {
    this.name = name;
    this.skills = skills;
  }

  setProject(project: string, skillName: string) {
    this.currentWork = { project, skill: skillName };
  }

  finishProject(project: Project) {
    if (this.currentWork) {
      const workedSkill = this.currentWork.skill;
      const projectSkill = project.contributors?.find(e => e.contributor.name === this.name)?.skill;

      if (projectSkill) {
        const canImproveSkill = this.skills[workedSkill] <= projectSkill[1];

        if (canImproveSkill) {
          this.improveSkill(workedSkill);
        }
      }

      this.currentWork = null;
    }
  }

  improveSkill(skillName: string) {
    this.skills[skillName]++;
  }

  canContribute(skill: SkillTupple) {
    const [name, level] = skill;

    return this.skills[name] >= level - 1;
  }

  canMentor(skill: SkillTupple) {
    const [name, level] = skill;
    return this.skills[name] >= level;
  }
}
