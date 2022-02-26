import fs from "fs";
import { Contributor, Project, SkillRecord, SkillTupple } from "../models";

export class ParseFile {
  filename: string;
  constructor(filename: string) {
    this.filename = filename;
  }

  public parseFile() {
    const file = fs.readFileSync(
      `./Parser/data/${this.filename}`,
      { encoding: "utf-8" }
    );

    const [first, ...lines] = file.split("\n");
    const [numberOfContributors, numberOfProjects] = first.split(" ");

    var leftLines = lines;
    var leftContributors = Number(numberOfContributors);

    const contributors = [];

    while (leftContributors > 0) {
      const [contributorLine] = leftLines.splice(0, 1);
      const [name, skillsCount] = contributorLine.split(" ");

      var leftSkill = Number(skillsCount);

      const skills: SkillRecord = {};

      while (leftSkill > 0) {
        const [skillLine] = leftLines.splice(0, 1);
        const [skillName, skillLevel] = skillLine.split(" ");

        skills[skillName] = Number(skillLevel);
        leftSkill--;
      }

      contributors.push(new Contributor(name, skills));

      leftContributors--;
    }

    var leftProjects = Number(numberOfProjects);
    const projects = [];

    while (leftProjects > 0) {
      const [projectLine] = leftLines.splice(0, 1);
      const [name, duration, initialScore, bestBefore, rolesCount] =
        projectLine.split(" ");

      var leftRoles = Number(rolesCount);

      const roles: SkillTupple[] = [];

      while (leftRoles > 0) {
        const [roleLine] = leftLines.splice(0, 1);
        const [skillName, skillLevel] = roleLine.split(" ");

        roles.push([skillName, Number(skillLevel)]);
        leftRoles--;
      }

      projects.push(
        new Project(
          name,
          Number(duration),
          Number(initialScore),
          Number(bestBefore),
          roles
        )
      );

      leftProjects--;
    }

    return { projects, contributors };
  };

  public writeResults = (finishedProjects: Project[]) => {
    const outputJSON = finishedProjects.reduce((acc, cur) => {
      const name = cur.name as string;
      acc[name] = {
        "start_date": cur.start_date,
        "end_date": cur.end_date,
        "best_before": cur.bestBefore,
        "days": cur.duration,
        "score": cur.score,
      }
      return acc;
    }, {} as any);
    const result = `${finishedProjects.length}\n` + finishedProjects
      .flatMap(project => [project.name, project.contributors?.join(' ')]
        .join('\n'))
      .join('\n')
    fs.writeFileSync(`./Parser/output/${this.filename}`, result.toString());
  }
}
