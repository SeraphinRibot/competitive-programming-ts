import { Skill } from "./skill";

export class Contributor {
  name: string;
  skills: Skill[];
  isAvailable: boolean = true;

  constructor(name: string, skills: Skill[]) {
    this.name = name;
    this.skills = skills;
  }

  startProject() {
    this.isAvailable = false;
  }

  finishProject() {
    this.isAvailable = true;
  }

  improveSkill(skill: Skill) {
    const skillToImprove = this.skills.find(e => e.name === skill.name);
    if (skillToImprove) {
      skillToImprove.level++;
    }
  }
}
