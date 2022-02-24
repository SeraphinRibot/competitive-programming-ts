import { Contributor } from "./entities/contributor";
import { Project } from "./entities/project";
import { SkillPlusContributor, SkillTupple } from "./entities/skill";
import { parseFile } from "./parser";
import { sortProjects, findContributors } from "./teamwork";
import * as fs from 'fs';

const getAvailableContributors = (contributors: Contributor[]) => {
  return contributors.filter((c) => !c.currentWork);
};

const finishedProject: Project[] = [];

export const consumeProjects = (
  projects: Project[],
  contributors: Contributor[]
) => {
  var days = 0;
  var leftProjects = sortProjects(projects);
  var inProgressProjects: Project[] = [];
  // A loop iteration simulate one day
  while (true) {
    /**
     * First we start project
     */
    leftProjects.forEach((project) => {
      const projectContributors: SkillPlusContributor[] | null =
        findContributors(project, getAvailableContributors(contributors));

      if (projectContributors) {
        projectContributors.forEach((c) => {
          c.contributor.setProject(project.name, c.skill[0]); // Contributors on a project TODO: add skill
        });
        project.start(days, projectContributors.map(({ contributor }) => contributor.name));

        inProgressProjects.push(project); // Add project to in progress projects
        leftProjects = leftProjects.filter((p) => project.name !== p.name); // Remove project from left projects
      }
    });

    /**
     * Then finished projects when possible
     */
    inProgressProjects.forEach((project: Project) => {
      project.oneDaySpent();

      if (project.isFinished()) {
        const contributorsFinished = contributors.filter(
          (c) => c.currentWork?.project === project.name
        );

        contributorsFinished.forEach((c) => c.finishProject(project)); // Make contributor available again
        inProgressProjects = inProgressProjects.filter(
          (p) => project.name !== p.name
        );

        project.finish(days);
        finishedProject.push(project); // Add project to finished projects
        //finishedProject.push(contributorsFinished.map((c) => c.name).join(" "));
      }
    });

    days++; // Advance day
    const outputJSON = finishedProject.reduce((acc, cur) => {
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
    fs.writeFileSync('./output.json', JSON.stringify(outputJSON));
    const a = `${finishedProject.length}\n` + finishedProject.flatMap(project => [project.name, project.contributors?.join(' ')].join('\n')).join('\n')
    fs.writeFileSync('./output.txt', a.toString());
  }
};


const database = parseFile();
consumeProjects(database.projects, database.contributors);
