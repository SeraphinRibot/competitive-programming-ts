import { Project, ContributorProjectSkill, Contributor } from "./models";
import { ParseFile } from "./Parser/parseFile";
import { sortProjects, findContributors } from "./Algo";
import { LocalSimulator } from "./LocalSimulator/LocalSimulator";

const fileParser = new ParseFile('e_exceptional_skills.in.txt');
const localSimulator = new LocalSimulator();
const finishedProjects: Project[] = [];
var inProgressProjects: Project[] = [];
const { projects, contributors } = fileParser.parseFile();
const maxDates = Math.max(...projects.map(e=> e.bestBefore))

let days = 0;
let leftProjects = sortProjects(projects);
const availableContributors: Contributor[] = contributors.slice();

// A loop iteration simulate one day
while (true) {
  /**
   * First we start project
   */
  leftProjects.forEach((project) => {
    const projectContributors: ContributorProjectSkill[] | null = findContributors(project, availableContributors);
    if (projectContributors) {
      projectContributors.forEach((c) => {
        const index = availableContributors.findIndex(e=> e.name === c.contributor.name);
        availableContributors.splice(index, 1);
      });
      project.start(days, projectContributors);
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
      project.contributors?.forEach(c => {
        //TO DO: introduce mentoring skill improvement
        if (c.contributorSkill.level === c.projectSkill.level) {
          c.contributor.improveSkill(c.projectSkill);
        }
        availableContributors.push(c.contributor);
      });
      inProgressProjects = inProgressProjects.filter(
        (p) => project.name !== p.name
      );
      project.finish(days);
      finishedProjects.push(project); // Add project to finished projects
    }
  });

  days++; // Advance day
  if (days%20) {
    fileParser.writeResults(finishedProjects);
  }
  console.log(finishedProjects.length, projects.length, days, maxDates);
}
