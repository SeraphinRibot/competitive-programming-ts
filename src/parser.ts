import fs from "fs";
import { Contributor, Skill } from "./entities/contributor";
import { Project, Roles } from "./entities/project";

export const parseFile = () => {
  const file = fs.readFileSync(
    "./data/qualification_round_2022/c_collaboration.in.txt",
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

    const skills: Skill = {};

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

    const roles: [string, number][] = [];

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
