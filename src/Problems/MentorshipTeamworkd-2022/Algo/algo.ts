import { Contributor, Project, ContributorProjectSkill } from "../models";

//sort Projects from low required skills to high required skills ASC
export function sortProjects(projects: Project[]) {
  return projects.sort((prevProject, nextProject) => {
    const prevProjectLevel = prevProject.skills.reduce(
      (total, skill) => total + skill.level,
      0
    );
    const nextProjectLevel = nextProject.skills.reduce(
      (total, skill) => total + skill.level,
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
  let chosenContributors: ContributorProjectSkill[] = [];

  for (let i = 0; i < requiredSkills.length; i++) {
    const requiredSkill = requiredSkills[i];
    const bestContributors = availableContributors
      .reduce((acc: ContributorProjectSkill[], contributor) => {
        const searchedSkill = contributor.skills.find(e => e.name === requiredSkill.name);
        if (searchedSkill && searchedSkill.level >= requiredSkill.level && !chosenContributors.find(e => e.contributor.name === contributor.name)) {
          acc.push({ contributor, projectSkill: requiredSkill, contributorSkill: searchedSkill });
        }
        return acc;
      }, [])
      .sort((a, b) => a.contributorSkill.level - b.contributorSkill.level);
    if (bestContributors[0]) chosenContributors.push(bestContributors[0]);
  }
  if (chosenContributors.length === requiredSkills.length) {
    return chosenContributors
  }
  else {
    return null;
  }
}
