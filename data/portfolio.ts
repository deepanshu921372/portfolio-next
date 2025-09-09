import ems from "../public/ems.jpeg";
import hms from "../public/deecare.jpeg";
import book from "../public/book.jpeg";
import cloth from "../public/cloth.jpeg";
import nova from "../public/nova.jpeg";
import portfolio from "../public/portfolio.png";
import budget from "../public/budget.png";
import superintern from "../public/superintern.png";

export const personalData = {
  name: "Deepanshu Sharma",
  title: "Web Developer",
  email: "sharmadeepanshu1005@gmail.com",
  location: "India",
  about:
    "I am an enthusiastic Full-Stack Web Developer currently pursuing a B.Tech in AI & ML, dedicated to building scalable and efficient applications. Over the past year, I have held two internship positions: as a React Developer at @Bolofy and as a Full-Stack Developer at @CodTech IT Solutions and @999Logistics, where I developed real-time applications and enhanced performance and user experience.\n\nMy expertise spans React.js, Node.js, AWS, and MongoDB, and I am committed to writing well-structured code and solving challenging problems. My projects include BudgetBuddy, a voice-controlled expense tracking app; an Employee Management Web App; and SuperIntern.in, a platform connecting students to internships and freelance opportunities.\n\nI thrive in fast-paced, collaborative environments and am always eager to learn new technologies. My goal is to contribute my technical skills to innovative projects while growing into a well-rounded software engineer.\n\nSpecialties: React.js | Node.js | Express.js | MongoDB | AWS | Tailwind CSS | Material-UI | API Development | WebSockets | AI & ML",
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
    position: "React Developer Intern",
    company: "Bolofy",
    location: "Remote",
    duration: "March 2024 - Present",
    description: [
      "Enhanced an chatbot by implementing real-time chatting functionalities, improving communication within the employees through the platform.",
      "Integrated in-app push notifications using Firebase, ensuring timely updates and boosting user engagement.",
      "Improved and upgraded the UI/UX of the chatbot, making it more intuitive and user-friendly.",
      "Built SuperIntern.in, a responsive platform that connects students with companies to provide internships and freelance opportunities.",
      "Currently developing a full-featured e-commerce platform with scalable architecture and modern UI components.",
    ],
    technologies: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Firebase",
      "Cloudinary",
      "Vite",
      "Netlify",
      "Hostinger",
    ],
  },
  {
    position: "Full-stack Developer Intern",
    company: "CODTECH IT SOLUTIONS",
    location: "Remote",
    duration: "Dec 2024 - Jan 2025",
    description: [
      "Built a real-time collaborative document editor using React, Node.js & WebSockets.",
      "Gained hands-on experience in full-stack development, debugging, and team-based problem solving.",
      "Improved system collaboration efficiency by implementing optimized frontend-backend communication.",
    ],
    technologies: ["React.js", "Tailwind CSS", "Node.js", "WebSockets", "MongoDB", "Express.js"],
  },
  {
    position: "Web Developer Intern",
    company: "999Logistics",
    location: "Bangalore, India - Remote",
    duration: "Apr 2024 - Jun 2024",
    description: [
      "Enhanced user experience by developing a responsive React.js & Material-UI frontend.",
      "Improved scalability & performance using Amazon S3 storage integration.",
      "Automated employee ID card generation, reducing processing time and streamlining onboarding.",
      "Optimized database structures, reducing storage costs and improving efficiency.",
    ],
    technologies: ["React.js", "Material-UI", "Node.js", "MongoDB", "AWS (S3)"],
  },
];

export const projectsData = [
  {
    title: "SuperIntern.in – Internship & Freelance Platform",
    description:
      "Streamlined employee registration with unique ID card generation using Material-UI, React.js, Node.js, Postman, MongoDB, and Amazon S3.",
    image: superintern,
    technologies: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Firebase",
      "Cloudinary",
      "Postman API",
      "Hostinger",
      "Netlify",
    ],
    githubLink: "https://github.com/SuperrrIntern/superintern",
    liveLink: "https://superintern.in",
  },
  {
    title: "Employee Management Web App",
    description:
      "Streamlined employee registration with unique ID card generation using Material-UI, React.js, Node.js, Postman, MongoDB, and Amazon S3.",
    image: ems,
    technologies: [
      "React",
      "Material-UI",
      "Amazon Web Services (AWS)",
      "Postman API",
      "MongoDB",
    ],
    githubLink: "https://github.com/deepanshu921372/999-manager-app-id-card",
    liveLink: "https://admin.999logistics.in",
  },
  {
    title: "BudgetBuddy - Expense Tracker",
    description:
      "BudgetBuddy is a smart, voice-powered finance tracker that helps you manage income and expenses hands-free. Just say “Add transaction” and speak your details — no typing needed! It features real-time charts, voice navigation, secure login, and works seamlessly across devices",
    image: budget,
    technologies: [
      "React.js",
      "Zustand",
      "TailwindCSS",
      "Node.js",
      "Express",
      "Firebase Auth",
      "MongoDB",
      "Chart.js",
      "Speech Recognition API",
      "XLSX",
    ],
    githubLink: "https://github.com/deepanshu921372/BudgetBuddy",
    liveLink: "https://budgettbuddy.netlify.app",
  },
  {
    title: "DeeCare - Full-Stack Hospital Management System ",
    description:
      "DeeCare is a fully responsive Hospital Management System built using MongoDB, Express.js, React, Node.js, and Cloudinary. It streamlines appointment booking, doctor management, and admin control to enhance hospital operations. Patients can easily book appointments, while admins can manage doctors, view upcoming appointments, and register new admins. The system ensures secure authentication, cloud storage, and a seamless user experience.",
    image: hms,
    technologies: [
      "React.js",
      "Tailwind CSS",
      "Express.js",
      "MongoDB",
      "Node.js",
      "API Development",
      "Netlify",
      "Render",
      "Cloudinary",
    ],
    githubLink: "https://github.com/deepanshu921372/HMS_Frontend_And_Admin",
    liveLink: "https://deecare-hms.netlify.app",
  },
  {
    title: "Book Heaven",
    description:
      "An e-commerce platform where users can purchase books and admins can manage inventory.",
    image: book,
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Redux",
      "Tailwind CSS",
      "REST API",
    ],
    githubLink: "https://github.com/deepanshu921372/bookheaven",
    liveLink: "https://bookheavenstore.netlify.app",
  },
  {
    title: "FamStyle | Clothing Store",
    description:
      "A modern clothing e-commerce platform with seamless shopping experience and admin inventory management system.",
    image: cloth,
    technologies: [
      "Next.js",
      "MongoDB",
      "Tailwind CSS",
      "React.js",
      "Node.js",
      "API Development",
    ],
    githubLink: "https://github.com/deepanshu921372/e-commerce",
    liveLink: "https://famstyle.vercel.app",
  },
  {
    title: "Virtual Assistant Nova",
    description:
      "Created Virtual Assistant Nova, a web-based application that lets users interact with a smart voice assistant using natural language. Built with HTML, CSS, and JavaScript, Nova answers questions, opens websites.",
    image: nova,
    technologies: [
      "HTML5",
      "Cascading Style Sheets (CSS)",
      "JavaScript",
      "Spline",
    ],
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
    { name: "MongoDB", level: 80 },
  ],
  tools: [
    { name: "VS Code", level: 99 },
    { name: "GitHub", level: 90 },
    { name: "Figma", level: 80 },
    { name: "Vercel", level: 75 },
    { name: "AWS", level: 55 },
  ],
};
