import { Console } from "console";

interface Skill {
  name: string,
  level: number,
}

interface Project {
  name: string
  skills: Skill[]
}

interface Contributor {
  name: string,
  available: boolean,
  skills: Skill[],
}

const contributors: Contributor[] = [
  {
    name: 'Anna',
    available: true,
    skills: [{ name: 'c++', level: 1 }],
  },
  
  {
    name: 'Bob',
    available: true,
    skills: [
      { name: 'html', level: 5 },
      { name: 'css', level: 5 },
    ],
  },
  
  {
    name: 'Maria',
    available: true,
    skills: [{ name: 'python', level: 3 }]
  },
];

const projects: Project[] = [
  {
    name: 'WebChat',
    skills: [
      { name: 'html', level: 3 },
      { name: 'python', level: 3 },
    ]
  },
  {
    name: 'Logging',
    skills: [{ name: 'c++', level: 3 }]
  },
  {
    name: 'WebServer',
    skills: [
      { name: 'c++', level: 2 },
      { name: 'html', level: 3 },
    ]
  },  
]
// Sort projects by skill level
function sortProjects(projects: Project[]) {
  return projects.sort((prevProject, nextProject) => {
    const prevProjectLevel = prevProject.skills.reduce((total, skill) => total + skill.level, 0);
    const nextProjectLevel = nextProject.skills.reduce((total, skill) => total + skill.level, 0);
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
      .filter(contributor => contributor.available)
      .filter(contributor => contributor.skills.findIndex((s) => s.name === skill.name) !== -1)
      .filter(contributor => {
        const selectedSkill = contributor.skills.find((s) => s.name === skill.name);
        if (selectedSkill) {
          return selectedSkill.level >= skill.level;
        }
        return false;
      })
      .sort((prevContributors, nextContributors) => {
        const prevContributorsLevel = prevContributors.skills.find((s) => s.name === skill.name)?.level || 0;
        const nextContributorsLevel = nextContributors.skills.find((s) => s.name === skill.name)?.level || 0;
        return prevContributorsLevel - nextContributorsLevel;
      });

    const contributor = bestContributors.length ? bestContributors[0] : null;
    
    return !!contributor ? { skill, contributor } : null;
  });

  return contributors.filter(Boolean).length === requiredSkills.length ? contributors : null;
}


//sortProjects(projects);
console.log(findContributors(projects[0], contributors));