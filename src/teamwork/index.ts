

interface Project {
  name: string
  skills: {
    [index: string]: number
  }
}

interface Contributor {
  name: string,
  available: boolean,
  skills: {
    [index: string]: number
  },
}

const contributors: Contributor[] = [
  {
    name: 'Anna',
    available: true,
    skills: {
      'c++': 1,
    },
  },
  
  {
    name: 'Bob',
    available: true,
    skills: {
      'html': 5,
      'css': 5,
    },
  },
  
  {
    name: 'Maria',
    available: true,
    skills: {
      'python': 3,
    }
  },
];

const projects: Project[] = [
    {
        name: 'WebChat',
        skills: {
            'html': 3,
            'python': 3
        }
    },
    {
        name: 'Logging',
        skills: {
            'c++': 3
        }
    },
    {
        name: 'WebServer',
        skills: {
            'c++': 2,
            'html': 3
        }
    },
  
    
]
// Sort projects by skill level
function sortProjects(projects: Project[]) {
  return projects.sort((prevProject, nextProject) => {
    const prevProjectLevel = Object.values(prevProject.skills).reduce((total, level) => total + level, 0);
    const nextProjectLevel = Object.values(nextProject.skills).reduce((total, level) => total + level, 0);
    return prevProjectLevel - nextProjectLevel;
  });
}

//Find contributor by project
function findContributors(
  project: Project,
  availableContributors: Contributor[],
) {
  const requiredSkills = project.skills;

  const contributors = Object.keys(requiredSkills).map((skill) => {
    const level = requiredSkills[skill];

    const bestContributors = availableContributors
      .filter(contributor => contributor.available)
      .filter(contributor => contributor.skills[skill] >= level)
      .sort((prevContributors, nextContributors) => {
        const prevContributorsLevel = prevContributors.skills[skill];
        const nextContributorsLevel = nextContributors.skills[skill];
        return prevContributorsLevel - nextContributorsLevel;
      });

    return bestContributors.length ? `${skill} ${level} ${bestContributors[0].name}` : 'Not found';
  });

  return contributors;
}

//sortProjects(projects);
console.log(findContributors(projects[2], contributors));