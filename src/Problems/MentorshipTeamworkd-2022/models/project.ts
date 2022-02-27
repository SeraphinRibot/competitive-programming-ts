import { Skill, ContributorProjectSkill } from "./skill";

export class Project {
  name: string;
  duration: number;
  daysLeft: number; // Days before end of project
  score: number;
  bestBefore: number;
  skills: Skill[]; // tupple instead of record because we can have multiple times smae role

  start_date?: number;
  end_date?: number;
  contributors?: ContributorProjectSkill[];

  constructor(
    name: string,
    duration: number,
    score: number,
    bestBefore: number,
    skills: Skill[]
  ) {
    this.name = name;
    this.duration = duration;
    this.daysLeft = duration;
    this.score = score;
    this.bestBefore = bestBefore;
    this.skills = skills;
  }

  oneDaySpent() {
    this.daysLeft--;
  }

  isFinished() {
    return this.daysLeft == 0;
  }

  start(date: number, contributors: ContributorProjectSkill[]) {
    this.start_date = date;
    this.contributors = contributors;
  }

  finish(date: number) {
    this.end_date = date;
  }
}
