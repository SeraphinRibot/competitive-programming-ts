// interface Skill {
//   name: string,
//   level: number,
// }

import { Contributor } from "../entities/contributor";
import { Project } from "../entities/project";

// interface Project {
//   name: string
//   skills: Skill[]
// }

// interface Contributor {
//   name: string,
//   skills: Skill[],
// }

// const contributors: Contributor[] = [
//   {
//     name: 'Anna',
//     skills: [{ name: 'c++', level: 1 }],
//   },
  
//   {
//     name: 'Bob',
//     skills: [
//       { name: 'html', level: 5 },
//       { name: 'css', level: 5 },
//     ],
//   },
  
//   {
//     name: 'Maria',
//     skills: [{ name: 'python', level: 3 }]
//   },
// ];

// const projects: Project[] = [
//   {
//     name: 'WebChat',
//     skills: [
//       { name: 'html', level: 3 },
//       { name: 'python', level: 3 },
//     ]
//   },
//   {
//     name: 'Logging',
//     skills: [{ name: 'c++', level: 3 }]
//   },
//   {
//     name: 'WebServer',
//     skills: [
//       { name: 'c++', level: 2 },
//       { name: 'html', level: 3 },
//     ]
//   },  
// ]
// Sort projects by skill level
export function sortProjects(projects: Project[]) {
  return projects.sort((prevProject, nextProject) => {
    const prevProjectLevel = prevProject.skills.reduce((total, skill) => total + skill[1], 0);
    const nextProjectLevel = nextProject.skills.reduce((total, skill) => total + skill[1], 0);
    return prevProjectLevel - nextProjectLevel;
  });
}

//Find contributor by project
function findContributors(
  project: Project,
  availableContributors: Contributor[],
) {
  const requiredSkills = project.skills;

  const contributors = requiredSkills.map((skill) => {
    const bestContributors = availableContributors
      .filter(contributor => contributor.skills[skill[0]])
      .filter(contributor => {
        const level = contributor.skills[skill[0]];
        if (level) {
          return level >= skill[1];
        }
        return false;
      })
      .sort((prevContributors, nextContributors) => {
        const prevContributorsLevel = prevContributors.skills[skill[0]] || 0;
        const nextContributorsLevel = nextContributors.skills[skill[0]] || 0;
        return prevContributorsLevel - nextContributorsLevel;
      });

    const contributor = bestContributors.length ? bestContributors[0] : null;
    
    return !!contributor ? { skill, contributor } : null;
  });

  return contributors.filter(Boolean).length === requiredSkills.length ? contributors : null;
}
