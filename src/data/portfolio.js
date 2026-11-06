/**
 * Centralized Portfolio Data for Agnes Rose Saji
 * Edit this file to update any content across the portfolio website.
 */

export const personalData = {
  name: "Agnes Rose Saji",
  monogram: "AR.",
  role: "Computer Science Student | Aspiring Developer",
  shortRole: "Computer Science Student & Aspiring Developer",
  location: "Kerala, India",
  college: "Amal Jyothi College of Engineering, Kanjirappally",
  collegeShort: "Amal Jyothi College of Engineering",
  degree: "Bachelor of Technology (B.Tech)",
  degreeShort: "Bachelor of Technology",
  department: "Computer Science and Engineering",
  academicYear: "2026",
  experienceLevel: "Student / Fresher",
  status: "Open to Internships & Entry-Level Roles",
  email: "rose@gmail.com",
  tagline: "Curious mind. Creative thinker. Future developer.",
  eyebrow: "HELLO, WELCOME TO MY PORTFOLIO",
  heroHeading: "I'm Agnes Rose Saji.",
  heroIntroduction:
    "I'm passionate about technology, creative problem-solving, and building meaningful digital experiences. Currently exploring web development, app development, and programming while continuously growing my skills.",
  careerObjective: "Seeking internship and entry-level job opportunities.",
  
  aboutStory: [
    "I'm Agnes Rose Saji, a Computer Science Engineering student at Amal Jyothi College of Engineering, Kanjirappally.",
    "I enjoy exploring the world of technology and discovering how ideas can become useful digital products. My interests include web development, app development, and programming.",
    "As someone at the beginning of my professional journey, I'm focused on building a strong foundation, improving my problem-solving abilities, and gaining practical experience.",
    "I believe every project and learning opportunity is a chance to grow, experiment, and become a better developer."
  ]
};

export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Education", href: "#education" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" }
];

export const skillCategories = [
  {
    id: "web-dev",
    title: "Web Development",
    icon: "Layout",
    description:
      "Crafting clean, accessible, and responsive user interfaces with modern web standards.",
    suggestedTech: ["HTML5", "CSS3", "JavaScript", "React", "Responsive UI", "Tailwind CSS"],
    status: "Currently Exploring & Practicing"
  },
  {
    id: "app-dev",
    title: "App Development",
    icon: "Smartphone",
    description:
      "Learning mobile design patterns, cross-platform concepts, and user-centric app architectures.",
    suggestedTech: ["Mobile UI Design", "Component Architecture", "State Management", "API Basics"],
    status: "Active Exploration"
  },
  {
    id: "programming",
    title: "Programming",
    icon: "Code2",
    description:
      "Building a solid academic foundation in structured languages, syntax, and logic formulation.",
    suggestedTech: ["C", "Java", "Python", "Object-Oriented Concepts", "Data Structures Basics"],
    status: "Coursework & Foundation"
  },
  {
    id: "problem-solving",
    title: "Problem Solving",
    icon: "BrainCircuit",
    description:
      "Tackling analytical challenges, understanding algorithmic efficiency, and debugging with curiosity.",
    suggestedTech: ["Algorithmic Thinking", "Analytical Logic", "Debugging", "Git & GitHub Basics"],
    status: "Continuous Learning"
  }
];

/**
 * Suggestions for technologies to explore or showcase as learning progresses.
 * These are presented transparently as areas of study and active exploration.
 */
export const explorationTechnologies = [
  { name: "HTML", category: "Web" },
  { name: "CSS", category: "Web" },
  { name: "JavaScript", category: "Web & Core" },
  { name: "React", category: "Web Framework" },
  { name: "Python", category: "Programming" },
  { name: "Java", category: "Programming" },
  { name: "C", category: "Core Academic" },
  { name: "Git", category: "Version Control" },
  { name: "GitHub", category: "Collaboration" }
];

export const educationData = [
  {
    degree: "Bachelor of Technology",
    degreeFull: "Bachelor of Technology (B.Tech)",
    department: "Computer Science and Engineering",
    institution: "Amal Jyothi College of Engineering",
    location: "Kanjirappally, Kerala, India",
    academicYear: "2026",
    status: "Pursuing (Undergraduate)",
    highlights: [
      "Focused on core computer science foundations, algorithms, and system concepts.",
      "Engaging in software engineering labs, team workshops, and technical presentations.",
      "Actively applying theoretical principles to hands-on programming exercises."
    ]
  }
];

/**
 * Editable project cards. Since actual project details are not supplied,
 * these cards are configured as structured, high-finish placeholders ready
 * for Agnes to populate with her real repositories and live demos.
 */
export const projectData = [
  {
    id: "project-1",
    title: "Personal Portfolio Experience",
    subtitle: "Web Development Showcase",
    description:
      "A minimalist, editorial personal brand website built with React, Vite, Tailwind CSS, and Framer Motion featuring fluid pink ambient geometry, accessible layouts, and zero bloat.",
    category: "Web Development",
    tags: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    featured: true,
    githubUrl: "https://github.com",
    liveUrl: "#home",
    status: "Active Project",
    isPlaceholder: false
  },
  {
    id: "project-2",
    title: "Interactive Web Application [Workspace Placeholder]",
    subtitle: "Frontend Architecture",
    description:
      "A structured placeholder for a future responsive web app. Ready to be populated with project screenshots, API integration details, and deployment URLs.",
    category: "Web Development",
    tags: ["JavaScript", "HTML5", "CSS3", "REST APIs"],
    featured: false,
    githubUrl: "https://github.com",
    liveUrl: "",
    status: "In Planning / Upcoming",
    isPlaceholder: true
  },
  {
    id: "project-3",
    title: "Mobile App Concept [Workspace Placeholder]",
    subtitle: "App Development",
    description:
      "Designed for a future mobile or cross-platform utility. Features dedicated slots for wireframes, component breakdowns, and repository links.",
    category: "App Development",
    tags: ["Mobile UI", "UI/UX", "State Architecture"],
    featured: false,
    githubUrl: "https://github.com",
    liveUrl: "",
    status: "In Planning / Upcoming",
    isPlaceholder: true
  },
  {
    id: "project-4",
    title: "Algorithmic Solutions & Labs [Workspace Placeholder]",
    subtitle: "Problem Solving & Core Programming",
    description:
      "A curated repository structure for academic lab experiments, data structure implementations, and competitive problem-solving solutions.",
    category: "Programming",
    tags: ["C / Java", "Data Structures", "Algorithms"],
    featured: false,
    githubUrl: "https://github.com",
    liveUrl: "",
    status: "Academic Workspace",
    isPlaceholder: true
  }
];

export const contactDetails = {
  heading: "Let's Create Something Meaningful.",
  copy: "I'm always excited to learn, connect with new people, and explore opportunities in technology. Have an opportunity or idea? Let's connect!",
  email: "rose@gmail.com",
  location: "Kerala, India",
  college: "Amal Jyothi College of Engineering, Kanjirappally",
  statusBadge: "Available for Internships & Fresher Roles (2026)",
  socialPlaceholders: [
    { name: "GitHub", url: "https://github.com", icon: "Github", label: "github.com/profile" },
    { name: "LinkedIn", url: "https://linkedin.com", icon: "Linkedin", label: "linkedin.com/in/profile" },
    { name: "Email", url: "mailto:rose@gmail.com", icon: "Mail", label: "rose@gmail.com" }
  ]
};

