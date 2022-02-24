import { Contributor } from "./entities/contributor";
import { Project } from "./entities/project";
import { SkillPlusContributor, SkillTupple } from "./entities/skill";
import { sortProjects, findContributors } from "./teamwork";

const getAvailableContributors = (contributors: Contributor[]) => {
  return contributors.filter((c) => !c.currentWork);
};

const finishedProject: string[] = [];

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

        finishedProject.push(project.name); // Add project to finished projects
        finishedProject.push(contributorsFinished.map((c) => c.name).join(" "));
      }
    });

    days++; // Advance day
  }
};
