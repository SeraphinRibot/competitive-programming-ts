import { Project, SkillPlusContributor } from "./models";
import { ParseFile } from "./Parser/parseFile";
import { sortProjects, findContributors, getAvailableContributors } from "./Algo";
import { LocalSimulator } from "./LocalSimulator/LocalSimulator";

const fileParser = new ParseFile('b_better_start_small.in.txt');
const localSimulator = new LocalSimulator();
const finishedProjects: Project[] = [];
var inProgressProjects: Project[] = [];
const { projects, contributors } = fileParser.parseFile();

let days = 0;
let leftProjects = sortProjects(projects);

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
      contributors
        .filter((c) => c.currentWork?.project === project.name)
        .forEach((c) => c.finishProject(project)); // Make contributor available again

      inProgressProjects = inProgressProjects.filter(
        (p) => project.name !== p.name
      );

      project.finish(days);
      finishedProjects.push(project); // Add project to finished projects
    }
  });

  days++; // Advance day
  fileParser.writeResults(finishedProjects);
  console.log(finishedProjects.length);
}
