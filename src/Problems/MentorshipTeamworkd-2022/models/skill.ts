import { Contributor } from "./contributor";

export type ContributorProjectSkill = {
  projectSkill: Skill;
  contributorSkill: Skill;
  contributor: Contributor;
};

export class Skill {
  public name: string;
  public level: number;
  constructor(name: string, level: number) {
    this.name = name;
    this.level = level;
  }
}
