import ems from "../public/ems.jpeg";
import hms from "../public/deecare.jpeg";
import book from "../public/book.jpeg";
import cloth from "../public/cloth.jpeg";
import nova from "../public/nova.jpeg";
import portfolio from "../public/portfolio.png"

export const personalData = {
  name: "Deepanshu Sharma",
  title: "Web Developer",
  email: "sharmadeepanshu1005@gmail.com",
  location: "India",
  about:
    "I am a proficient Full Stack Web Developer with 1 year of experience, including a 6 months internship,specializing in building scalable and responsive web applications. Skilled in React.js, Node.js, and AWS, I excel at developing efficient APIs, optimizing performance, and enhancing user experiences. With a strong problemsolving mindset and a keen eye for detail, I am passionate about writing clean, maintainable code and staying updated with emerging technologies. My adaptability and collaborative approach enable me to thrive in fastpaced environments, contributing effectively to innovative and high-impact projects.",
  socialLinks: {
    github: "https://github.com/deepanshu921372",
    linkedin: "https://www.linkedin.com/in/deepanshusharma921372/",
  },
};

export const educationData = [
  {
    degree:
      "Bachelor of Technology in Artificial Intelligence & Machine Learning",
    institution: "Vivekanand Institute of Professional Studies",
    location: "New Delhi, India",
    duration: "2023 - Present",
    description:
      "College has been the most important experience for me. VIPS provided me with ample opportunities to explore various domains and a talented peer group that never failed to inspire me",
  },
  {
    degree: "Secondary Education (10th) & Senior Secondary Education (12th)",
    institution: "Basava International School",
    location: "New Delhi, India",
    duration: "2019 - 2023",
    description: "Completed with 92% marks in 10th and 87% marks in 12th.",
  },
];

export const experienceData = [
  {
    position: "Full-stack Developer Intern",
    company: "CODTECH IT SOLUTIONS",
    location: "Remote",
    duration: "Dec 2024 - Jan 2025",
    description:
      "Built a real-time collaborative document editor with React, Node.js & WebSockets. Developed a Chrome extension for website time tracking, enhancing productivity insights.",
    technologies: ["React", "Node.js", "WebSockets", "Tailwind CSS"],
  },
  {
    position: "Web Developer Intern",
    company: "999Logistics",
    location: "Bangalore, India - Remote",
    duration: "Apr 2024 - Jun 2024",
    description:
      "Developed an employee management system with an intuitive interface, automated ID card generation, and an optimized database structure, reducing storage space.",
    technologies: ["React.js", "Material UI", "Amazon S3", "Node.js"],
  },
];

export const projectsData = [
  {
    title: "Employee Management Web App",
    description:
      "Streamlined employee registration with unique ID card generation using Material-UI, React.js, Node.js, Postman, MongoDB, and Amazon S3.",
    image: ems,
    technologies: ["React", "Material-UI", "Amazon Web Services (AWS)", "Postman API", "MongoDB"],
    githubLink: "https://github.com/deepanshu921372/999-manager-app-id-card",
    liveLink: "https://admin.999logistics.in",
  },
  {
    title: "DeeCare - Full-Stack Hospital Management System ",
    description:
      "DeeCare is a fully responsive Hospital Management System built using MongoDB, Express.js, React, Node.js, and Cloudinary. It streamlines appointment booking, doctor management, and admin control to enhance hospital operations. Patients can easily book appointments, while admins can manage doctors, view upcoming appointments, and register new admins. The system ensures secure authentication, cloud storage, and a seamless user experience.",
    image: hms,
    technologies: ["React.js", "Tailwind CSS", "Express.js", "MongoDB", "Node.js", "API Development", "Netlify", "Render", "Cloudinary"],
    githubLink: "https://github.com/deepanshu921372/HMS_Frontend_And_Admin",
    liveLink: "https://deecare-hms.netlify.app",
  },
  {
    title: "Book Heaven",
    description:
      "An e-commerce platform where users can purchase books and admins can manage inventory.",
    image: book,
    technologies: ["React", "Node.js", "Express", "MongoDB", "Redux", "Tailwind CSS", "REST API"],
    githubLink: "https://github.com/deepanshu921372/bookheaven",
    liveLink: "https://bookheavenstore.netlify.app",
  },
  {
    title: "FamStyle | Clothing Store",
    description:
      "A modern clothing e-commerce platform with seamless shopping experience and admin inventory management system.",
    image: cloth,
    technologies: ["Next.js", "MongoDB", "Tailwind CSS", "React.js", "Node.js", "API Development"],
    githubLink: "https://github.com/deepanshu921372/e-commerce",
    liveLink: "https://famstyle.vercel.app",
  },
  {
    title: "Virtual Assistant Nova",
    description:
      "Created Virtual Assistant Nova, a web-based application that lets users interact with a smart voice assistant using natural language. Built with HTML, CSS, and JavaScript, Nova answers questions, opens websites.",
    image: nova,
    technologies: ["HTML5", "Cascading Style Sheets (CSS)", "JavaScript", "Spline"],
    githubLink: "https://github.com/deepanshu921372/VirtualAssistant",
    liveLink: "https://virtualassistantnova.netlify.app",
  },
  {
    title: "Portfolio Website",
    description:
      "A personal portfolio website showcasing my projects, skills, and experience.",
    image: portfolio,
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
    githubLink: "https://github.com/deepanshu921372/portfolio",
    liveLink: "https://deepanshu-portfolio.vercel.app",
  },
];

export const skillsData = {
  frontend: [
    { name: "HTML", level: 99 },
    { name: "CSS", level: 95 },
    { name: "Tailwind CSS", level: 95 },
    { name: "JavaScript", level: 90 },
    { name: "React", level: 90 },
    { name: "Next.js", level: 85 },
  ],
  backend: [
    { name: "Node.js", level: 90 },
    { name: "Express", level: 85 },
    { name: "MongoDB", level: 80 },,
  ],
  tools: [
    { name: "VS Code", level: 99 },
    { name: "GitHub", level: 90 },
    { name: "Figma", level: 80 },
    { name: "Vercel", level: 75 },
    { name: "AWS", level: 55 },
  ],
};
