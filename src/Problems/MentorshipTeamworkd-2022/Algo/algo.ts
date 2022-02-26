import { Contributor, Project, SkillPlusContributor } from "../models";

//sort Projects from low required skills to high required skills ASC
export function sortProjects(projects: Project[]) {
  return projects.sort((prevProject, nextProject) => {
    const prevProjectLevel = prevProject.skills.reduce(
      (total, skill) => total + skill[1],
      0
    );
    const nextProjectLevel = nextProject.skills.reduce(
      (total, skill) => total + skill[1],
      0
    );
    return prevProjectLevel - nextProjectLevel;
  });
}

//Find contributor by project
export function findContributors(
  project: Project,
  availableContributors: Contributor[]
) {
  const requiredSkills = project.skills;
  let chosenContributors: SkillPlusContributor[] = [];

  for (let i = 0; i < requiredSkills.length; i++) {
    const skill = requiredSkills[i];
    const bestContributors = availableContributors
      .filter((contributor) => contributor.skills[skill[0]])
      .filter((contributor) => {
        const level = contributor.skills[skill[0]];
        if (level) {
          return level >= skill[1];
        }
        return false;
      })
      .filter(c => !chosenContributors.find(e => c.name == e.contributor.name))
      .sort((prevContributors, nextContributors) => {
        const prevContributorsLevel = prevContributors.skills[skill[0]] || 0;
        const nextContributorsLevel = nextContributors.skills[skill[0]] || 0;
        return prevContributorsLevel - nextContributorsLevel;
      });
    const contributor = bestContributors.length ? bestContributors[0] : null;
    if (!!contributor) {
      chosenContributors.push({ contributor, skill });
    }
  }
  if (chosenContributors.length === requiredSkills.length) {
    return chosenContributors
  }
  else {
    return null;
  }
}

export function getAvailableContributors(contributors: Contributor[]) {
  return contributors.filter((c) => !c.currentWork);
};
