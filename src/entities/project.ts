import { Skill } from "./contributor";

export type Roles = Record<string, Skill>;

export class Project {
  name: string;
  duration: number;
  daysLeft: number; // Days before end of project
  score: number;
  bestBefore: number;
  skills: [string, number][]; // tupple instead of record because we can have multiple times smae role

  constructor(
    name: string,
    duration: number,
    score: number,
    bestBefore: number,
    skills: [string, number][]
  ) {
    this.name = name;
    this.duration = duration;
    this.daysLeft = duration;
    this.score = score;
    this.bestBefore = bestBefore;
    this.skills = skills;
  }
}
