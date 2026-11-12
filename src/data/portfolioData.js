/**
 * ============================================================================
 * PORTFOLIO DATA CONFIGURATION — JANVI NANKANI
 * ============================================================================
 * Edit personal details, profile photo path, resume PDF path, projects,
 * skills, education, research, achievements, certifications, timeline
 * milestones, and contact settings in this single file.
 *
 * Asset Paths (place real files inside `public/`):
 * - Profile Photo: `public/images/janvi-profile.jpeg` -> "/images/janvi-profile.jpeg"
 * - Resume PDF:    `public/files/janvi-nankani-resume.pdf` -> "/files/janvi-nankani-resume.pdf"
 * - Project screenshots / Certificate images or PDFs can be added per item below.
 */

export const PORTFOLIO_DATA = {
  profile: {
    firstName: 'Janvi',
    lastName: 'Nankani',
    fullName: 'Janvi Nankani',
    monogram: 'JN',
    role: 'Aspiring Software Developer | AI & ML Enthusiast',
    heroRoleHeadline: 'Aspiring Software Developer',
    tagline: 'Turning ideas into interactive digital experiences.',
    rotatingRoles: [
      'Software Developer',
      'Python Developer',
      'AI & ML Enthusiast',
      'Problem Solver',
      'Tech Explorer',
    ],
    availability: {
      // Editable status — update when confirming internship availability
      active: false,
      label: 'BCA Student · Ahmedabad, India',
    },
    location: 'Ahmedabad, Gujarat, India',
    avatarUrl: '/images/janvi-profile.jpeg',
    avatarAlt: 'Janvi Nankani — Aspiring Software Developer & AI/ML Enthusiast',
    portfolioEdition: 'JN // PORTFOLIO',
    resume: {
      url: '/files/janvi-nankani-resume.pdf',
      fileName: 'Janvi-Nankani-Resume.pdf',
    },
    socials: {
      github: {
        label: 'GitHub',
        handle: '@janvinankani21',
        url: 'https://github.com/janvinankani21',
        isPlaceholder: false,
      },
      linkedin: {
        label: 'LinkedIn',
        handle: 'in/janvi-nankani-462b353b6',
        url: 'https://www.linkedin.com/in/janvi-nankani-462b353b6/',
        isPlaceholder: false,
      },
    },
  },

  navLinks: [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'research', label: 'Research' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'journey', label: 'Journey' },
    { id: 'contact', label: 'Contact' },
  ],

  marqueeItems: [
    'Python',
    'React',
    'TypeScript',
    'Node.js',
    'Prisma ORM',
    'PostgreSQL',
    'Artificial Intelligence',
    'Machine Learning',
    'Generative AI',
    'BERT & SHAP',
    'Tailwind CSS',
  ],

  about: {
    kicker: 'About Me',
    headingPrefix: 'Building practical software &',
    headingHighlight: 'exploring AI',
    scrollManifesto:
      'I am a Bachelor of Computer Applications student at LJ College of Computer Applications, Ahmedabad, combining full-stack development and Python experience with a growing passion for Artificial Intelligence, Machine Learning, and Generative AI.',
    editorialCards: [
      {
        index: '01',
        title: 'Academic & Technical Foundation',
        description:
          'Pursuing my Bachelor of Computer Applications (BCA) at LJ College of Computer Applications, Ahmedabad (2024–2027), building strong fundamentals in programming, data visualization, and software architecture.',
      },
      {
        index: '02',
        title: 'Python & Full-Stack Experience',
        description:
          'Gained hands-on Python development experience through a one-month Winter Internship at CodeSprint Labs, alongside full-stack project development with React, TypeScript, Node.js, Express.js, and Prisma ORM.',
      },
      {
        index: '03',
        title: 'AI, ML & Generative AI Curiosity',
        description:
          'Deeply interested in Artificial Intelligence, Machine Learning, Generative AI, and explainable NLP—combining coursework, specializations, and research into trustworthy model interpretability with BERT and SHAP.',
      },
      {
        index: '04',
        title: 'Hackathons, Research & Leadership',
        description:
          'Enjoy solving real-world problems collaboratively—achieving 2nd position at the internal Smart India Hackathon (LJCCA), leading the Smart Yatri team at LJ Innovation Village 2026, and presenting research at ICMOTARSS.',
      },
    ],
    focusPillars: [
      {
        label: 'Core Engineering',
        value: 'Full-Stack & Python',
        note: 'Building reliable interfaces and APIs with React, TypeScript, Node.js, Prisma, and Python.',
      },
      {
        label: 'Emerging Focus',
        value: 'AI, ML & GenAI',
        note: 'Applying ML fundamentals, prompt engineering, and explainable AI methods like BERT and SHAP.',
      },
      {
        label: 'Team & Impact',
        value: 'Builder & Presenter',
        note: 'Collaborating across hackathons, innovation showcases, and international conference research.',
      },
    ],
  },

  education: {
    kicker: 'Education',
    headingPrefix: 'Academic',
    headingHighlight: 'background',
    subtitle:
      'Strong academic foundation in computer applications alongside consistent university performance and practical project execution.',
    degree: 'Bachelor of Computer Applications (BCA)',
    college: 'LJ College of Computer Applications, Ahmedabad',
    duration: '2024 – 2027 (Expected)',
    university: 'Gujarat University',
    highlights: [
      {
        label: 'Semester 1 SGPA',
        value: '9.18',
        detail: 'Strong academic start across core computing subjects',
      },
      {
        label: 'Semester 4 SGPA',
        value: '8.36',
        detail: 'Consistent performance alongside projects, research & hackathons',
      },
      {
        label: 'University Standing',
        value: '27th Rank',
        detail: 'Reported 27th rank at Gujarat University',
      },
    ],
    timeline: [
      {
        period: '2024 – Present',
        title: 'Enrolled in BCA at LJ College of Computer Applications',
        note: 'Built core grounding in programming logic, statistics, databases, and web technologies in Ahmedabad.',
      },
      {
        period: 'Semester 1',
        title: 'Achieved 9.18 SGPA & Reported 27th University Rank',
        note: 'Established early academic momentum in foundational computer science coursework.',
      },
      {
        period: 'Semester 4',
        title: 'Maintained 8.36 SGPA Alongside Practical Building',
        note: 'Balanced academics with full-stack engineering, internship training, research poster work, and LJ Innovation Village 2026.',
      },
    ],
  },

  skills: {
    kicker: 'Technical Skills',
    headingPrefix: 'Technologies & tools I',
    headingHighlight: 'work with',
    subtitle:
      'Organized across programming languages, modern frontend frameworks, backend APIs, databases, AI/ML tooling, and data visualization.',
    groups: [
      {
        id: 'programming',
        title: 'Programming',
        tagline: 'Core languages and web fundamentals',
        items: [
          { name: 'Python', note: 'Scripting, logic & ML coursework' },
          { name: 'TypeScript', note: 'Type-safe frontend & backend code' },
          { name: 'JavaScript', note: 'Interactive web applications' },
          { name: 'HTML', note: 'Semantic document structure' },
          { name: 'CSS', note: 'Responsive styling & motion' },
        ],
      },
      {
        id: 'frontend',
        title: 'Frontend',
        tagline: 'Component UI, validation, and state management',
        items: [
          { name: 'React', note: 'Component-driven interfaces' },
          { name: 'Vite', note: 'Fast modern build tooling' },
          { name: 'Tailwind CSS', note: 'Utility-first responsive UI' },
          { name: 'React Query', note: 'Server-state caching & sync' },
          { name: 'React Hook Form', note: 'Performant form handling' },
          { name: 'Zod', note: 'Schema-based runtime validation' },
        ],
      },
      {
        id: 'backend',
        title: 'Backend',
        tagline: 'APIs, security, and access control architecture',
        items: [
          { name: 'Node.js', note: 'Server-side JavaScript runtime' },
          { name: 'Express.js', note: 'Structured routing & middleware' },
          { name: 'REST APIs', note: 'Resource endpoints & JSON contracts' },
          { name: 'JWT Authentication', note: 'Access & refresh token flows' },
          { name: 'Role-Based Access Control (RBAC)', note: 'Multi-role permissions' },
        ],
      },
      {
        id: 'database',
        title: 'Database',
        tagline: 'Relational modeling and ORM workflows',
        items: [
          { name: 'PostgreSQL', note: 'Production relational database' },
          { name: 'SQLite', note: 'Lightweight embedded storage' },
          { name: 'Prisma ORM', note: 'Type-safe schemas & seeding' },
        ],
      },
      {
        id: 'aiml',
        title: 'AI & Machine Learning',
        tagline: 'Model fundamentals, GenAI, and explainability',
        items: [
          { name: 'AI and ML Fundamentals', note: 'Core supervised & NLP concepts' },
          { name: 'Generative AI', note: 'Modern GenAI workflows & apps' },
          { name: 'Prompt Engineering', note: 'Structured prompt design' },
          { name: 'BERT', note: 'Transformer-based text classification' },
          { name: 'SHAP', note: 'Explainable feature attribution' },
        ],
      },
      {
        id: 'tools',
        title: 'Developer Tools',
        tagline: 'Version control and AI-assisted engineering tools',
        items: [
          { name: 'Git', note: 'Branching & commit history' },
          { name: 'GitHub', note: 'Repositories & collaboration' },
          { name: 'Cursor AI', note: 'AI-native code editor' },
          { name: 'GitHub Copilot', note: 'In-editor pair programming' },
          { name: 'Claude Code', note: 'Agentic coding workflows' },
          { name: 'Model Context Protocol (MCP)', note: 'Tool & context integration' },
        ],
      },
      {
        id: 'data-design',
        title: 'Data & Design',
        tagline: 'Visual analytics and UI/graphic communication',
        items: [
          { name: 'Tableau', note: 'Data visualization & dashboards' },
          { name: 'Canva', note: 'Visual design & presentations' },
        ],
      },
    ],
  },

  projectFilters: ['All', 'Full-Stack', 'Web Apps', 'Hackathon & Concept'],

  projects: [
    {
      id: 'vendorbridge-erp',
      index: '01',
      name: 'VendorBridge ERP – Procurement and Vendor Management SaaS',
      shortDescription:
        'A full-stack web application designed to manage the procurement lifecycle, including vendor management, RFQs, quotation comparison, approvals, purchase orders, invoices, audit logs and dashboards.',
      category: 'Full-Stack',
      filterCategories: ['Full-Stack', 'Web Apps'],
      status: 'Full-Stack Application',
      highlightBadge: '4-Role RBAC & JWT Auth',
      technologies: [
        'React 19',
        'TypeScript',
        'Vite',
        'Tailwind CSS',
        'Node.js',
        'Express.js',
        'PostgreSQL',
        'SQLite',
        'Prisma ORM',
        'JWT',
      ],
      thumbnailType: 'vendorbridge',
      thumbnailImage: '', // Editable: add real screenshot path (e.g., "/images/projects/vendorbridge.png")
      liveUrl: '', // Editable: add live demo URL when deployed
      repoUrl: '', // Editable: add exact GitHub repo URL when ready
      overview:
        'Built a full-stack procurement SaaS managing the end-to-end vendor lifecycle from Request for Quotation (RFQ) creation and quotation comparison to multi-stage approvals, purchase orders, invoice tracking, audit logs, and role-tailored dashboards.',
      highlights: [
        'Vendor Management, Request for Quotation (RFQ), and side-by-side Quotation Comparison',
        'Structured Approval Workflows, Purchase Orders, Invoice Management, and Audit Logs',
        'JWT and Refresh Token Authentication with Role-Based Access Control (RBAC)',
        'Four distinct user roles: Admin, Procurement Officer, Vendor, and Manager',
        'Prisma ORM data models supporting PostgreSQL and SQLite with seed data',
      ],
    },
    {
      id: 'smart-yatri',
      index: '02',
      name: 'Smart Yatri – Travel and Crowd Prediction Platform',
      shortDescription:
        'A travel-planning platform designed to help users discover destinations, understand crowd levels and visitor density, and find less-crowded visiting times using historical and time-based trends.',
      category: 'Web Apps',
      filterCategories: ['Full-Stack', 'Web Apps'],
      status: 'LJ Innovation Village 2026',
      highlightBadge: 'Team Leader & Presenter · LJ Innovation Village 2026',
      technologies: [
        'Web Platform',
        'Crowd & Density Insights',
        'Time-Based Trends',
        'Ticket Booking',
      ],
      thumbnailType: 'smart-yatri',
      thumbnailImage: '', // Editable: add real screenshot path
      liveUrl: '', // Editable: add live URL when available
      repoUrl: '', // Editable: add GitHub repository URL when available
      overview:
        'Designed a travel-planning platform focused on helping travelers discover destinations while avoiding peak congestion through crowd-level insights, visitor-density indicators, less-crowded time suggestions, and integrated ticket booking. Led the project team and presented Smart Yatri at LJ Innovation Village 2026.',
      highlights: [
        'Destination Discovery paired with Crowd-Level Information',
        'Visitor-Density Insights and Less-Crowded Time Suggestions from historical & time-based trends',
        'Integrated Ticket Booking Functionality for smoother trip planning',
        'Led the team as Team Leader and presented the project at LJ Innovation Village 2026',
      ],
    },
    {
      id: 'phone-price-comparison',
      index: '03',
      name: 'Phone Price Comparison Web Application',
      shortDescription:
        'A web application that compares smartphones side by side based on price and technical specifications to help users choose a suitable device.',
      category: 'Web Apps',
      filterCategories: ['Web Apps'],
      status: 'Web Application',
      highlightBadge: 'Side-by-Side Spec Evaluation',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive UI'],
      thumbnailType: 'phone-comparison',
      thumbnailImage: '', // Editable: add real screenshot path
      liveUrl: '', // Editable
      repoUrl: '', // Editable
      overview:
        'Developed a clean comparison web application allowing users to compare smartphones side by side across pricing and key technical specifications so buyers can evaluate trade-offs quickly and choose a suitable device.',
      highlights: [
        'Side-by-side smartphone comparison layout',
        'Structured price comparison across models',
        'Clear technical specifications breakdown for easier device evaluation',
      ],
    },
    {
      id: 'buildsutra',
      index: '04',
      name: 'BuildSutra – Construction Progress Monitoring System',
      shortDescription:
        'A construction project management concept focused on monitoring construction progress, project stages, materials and project workflows.',
      category: 'Hackathon & Concept',
      filterCategories: ['Web Apps', 'Hackathon & Concept'],
      status: 'Project Concept',
      highlightBadge: 'Concept / Workflow Architecture',
      technologies: ['Web Concept', 'Stage Monitoring', 'Material Tracking', 'Workflows'],
      thumbnailType: 'buildsutra',
      thumbnailImage: '', // Editable: add real screenshot path
      liveUrl: '', // Editable
      repoUrl: '', // Editable
      overview:
        'A construction project management concept designed to bring clear visibility to construction progress, stage-wise execution, materials tracking, and coordinated project workflows.',
      highlights: [
        'Monitoring construction progress across defined project stages',
        'Structured visibility into construction materials and site workflows',
        'Clearly scoped as a project management concept ready for expansion',
      ],
    },
    {
      id: 'solar-agarbatti-system',
      index: '05',
      name: 'Solar-Powered Agarbatti Drying and Compact Packaging System',
      shortDescription:
        'A hackathon concept designed to support rural women artisans through solar-powered drying, temperature and humidity monitoring, airflow management and compact moisture-resistant packaging.',
      category: 'Hackathon & Concept',
      filterCategories: ['Hackathon & Concept'],
      status: 'Hackathon Concept / Prototype',
      highlightBadge: 'Smart India Hackathon 2026 · Internal Hackathon 2nd Position',
      technologies: [
        'Solar Drying Concept',
        'Temp & Humidity Monitoring',
        'Airflow Management',
        'Compact Packaging',
      ],
      thumbnailType: 'solar-agarbatti',
      thumbnailImage: '', // Editable: add real prototype photo/diagram path
      liveUrl: '', // Editable
      repoUrl: '', // Editable
      overview:
        'A Smart India Hackathon concept and prototype created to empower rural women artisans by pairing solar-assisted drying, temperature and humidity monitoring, and controlled airflow management with compact moisture-resistant packaging.',
      highlights: [
        'Hackathon concept/prototype developed for Smart India Hackathon (2nd Position, Internal Hackathon at LJCCA)',
        'Solar-powered drying with temperature and humidity monitoring plus airflow management',
        'Compact moisture-resistant packaging workflow designed around rural women artisan needs',
      ],
    },
  ],

  research: {
    kicker: 'Research & Innovation',
    headingPrefix: 'Explainable AI &',
    headingHighlight: 'research work',
    subtitle:
      'Exploring trustworthy machine learning methods that pair predictive accuracy with transparent human-interpretable explanations.',
    badge: 'Research Poster Presenter · ICMOTARSS',
    title:
      'Trustworthy Fake News Detection on FakeNewsNet Using BERT, SHAP and Social Context Analysis',
    conference: 'ICMOTARSS (International Conference)',
    role: 'Research Poster Presenter',
    dataset: 'FakeNewsNet',
    summary:
      'Presented a research poster investigating trustworthy fake news detection on the FakeNewsNet dataset by combining BERT-based language representations, SHAP explainability for transparent feature attribution, and social context analysis.',
    pillars: [
      {
        label: 'Language Representation',
        title: 'BERT',
        detail: 'Contextual transformer encoding of news content for classification.',
      },
      {
        label: 'Explainable AI',
        title: 'SHAP',
        detail: 'Post-hoc interpretability surfacing why predictions are flagged.',
      },
      {
        label: 'Behavioral Signals',
        title: 'Social Context Analysis',
        detail: 'Incorporating surrounding social context alongside textual cues.',
      },
    ],
  },

  experience: {
    id: 'codesprint-internship',
    role: 'Python Developer Intern',
    title: 'Python Developer Intern – CodeSprint Labs',
    company: 'CodeSprint Labs',
    issuer: 'CodeSprint Labs',
    issuerCode: 'CSL',
    category: 'Internship Experience',
    documentType: 'Internship Certificate',
    credentialScope: 'One-Month Winter Internship',
    duration: 'One-month Winter Internship',
    topics: ['Python Development', 'Problem Solving', 'Winter Internship'],
    summary:
      'Completed a one-month Winter Internship as a Python Developer, strengthening practical Python problem-solving, core programming patterns, and structured software development habits.',
    certificateImage: '', // Optional: add scanned certificate image or PDF path
  },

  achievements: {
    kicker: 'Experience & Achievements',
    headingPrefix: 'Internships, wins &',
    headingHighlight: 'certifications',
    subtitle:
      'Practical internship training, hackathon recognitions, research presentations, campus leadership, and verified course credentials.',
    featured: {
      id: 'sih-internal-2nd',
      badge: '2nd Position',
      rank: '2nd Position',
      title: 'Smart India Hackathon – Internal Hackathon (LJCCA) 2nd Position',
      issuer: 'LJ College of Computer Applications · Smart India Hackathon',
      issuerCode: 'SIH',
      documentType: 'Certificate of Achievement',
      credentialScope: '2nd Position · Second SIH Participation',
      topics: ['Smart India Hackathon', 'Team Collaboration', 'Prototype Concept'],
      summary:
        'Team placed 2nd in the internal Smart India Hackathon round at LJCCA—marking my second Smart India Hackathon participation—with the Solar-Powered Agarbatti Drying and Compact Packaging System concept.',
      category: 'Hackathon Achievement',
      certificateImage: '', // Optional: add scanned certificate image or PDF path
    },
    items: [
      {
        id: 'lj-innovation-village',
        title: 'LJ Innovation Village 2026',
        category: 'Leadership & Showcase',
        issuer: 'LJ University',
        issuerCode: 'LJU',
        date: '2026',
        documentType: 'Certificate of Leadership',
        credentialScope: 'Team Leader · Smart Yatri',
        topics: ['Team Leadership', 'Smart Yatri', 'Project Showcase'],
        description:
          'Served as Team Leader and project presenter for Smart Yatri – Travel and Crowd Prediction Platform.',
        certificateImage: '',
      },
      {
        id: 'icmotarss-poster',
        title: 'ICMOTARSS Research Poster Presenter',
        category: 'International Conference',
        issuer: 'ICMOTARSS',
        issuerCode: 'ICMO',
        date: 'Conference Poster',
        documentType: 'Certificate of Presentation',
        credentialScope: 'International Conference Poster',
        topics: ['BERT', 'SHAP', 'FakeNewsNet', 'Social Context Analysis'],
        description:
          'Presented research poster: "Trustworthy Fake News Detection on FakeNewsNet Using BERT, SHAP and Social Context Analysis".',
        certificateImage: '',
      },
      {
        id: 'ai-creators-bootcamp',
        title: 'AI-Powered Creators Bootcamp',
        category: 'Event Coordination',
        issuer: 'LJCCA',
        issuerCode: 'LJ',
        date: 'Coordinator',
        documentType: 'Certificate of Appreciation',
        credentialScope: 'Coordinator Recognition',
        topics: ['Event Coordination', 'AI Bootcamp', 'LJCCA'],
        description:
          'Recognized for successful coordination of the AI-Powered Creators Bootcamp at LJCCA.',
        certificateImage: '',
      },
      {
        id: 'laravel-fdp',
        title: 'Laravel Web Application Development FDP',
        category: 'Technical Program',
        issuer: 'LJCCA',
        issuerCode: 'LJ',
        date: 'Participant',
        documentType: 'Certificate of Participation',
        credentialScope: 'Faculty Development Program',
        topics: ['Laravel', 'Web Application Development', 'FDP'],
        description:
          'Participated in the Laravel Web Application Development Faculty Development Program.',
        certificateImage: '',
      },
      {
        id: 'iot-tech-talk',
        title: 'IoT Tech Talk: The Kickoff',
        category: 'Technical Session',
        issuer: 'NistantriTech',
        issuerCode: 'NT',
        date: 'Participant',
        documentType: 'Certificate of Participation',
        credentialScope: 'Technical Session',
        topics: ['Internet of Things (IoT)', 'Tech Talk', 'NistantriTech'],
        description:
          'Participated in "IoT Tech Talk: The Kickoff" hosted by NistantriTech.',
        certificateImage: '',
      },
    ],
  },

  certifications: [
    {
      id: 'google-ai-prof',
      title: 'Google AI Professional Certificate – 7 Courses',
      provider: 'Google, via Coursera',
      issuerCode: 'G',
      detail: '7 Courses',
      documentType: 'Professional Certificate',
      category: 'Artificial Intelligence',
      topics: ['Artificial Intelligence', '7-Course Track', 'Google Career Track'],
      certificateImage: '', // Optional: e.g. "/files/certs/google-ai.pdf" or "/images/certs/google-ai.jpg"
    },
    {
      id: 'upenn-ai-ml',
      title: 'AI and Machine Learning Essentials with Python',
      provider: 'University of Pennsylvania, via Coursera',
      issuerCode: 'UPenn',
      detail: 'Specialization · 3 Courses',
      documentType: 'Specialization Certificate',
      category: 'AI & Machine Learning',
      topics: ['Python', 'Machine Learning', '3-Course Specialization'],
      certificateImage: '',
    },
    {
      id: 'scrimba-vibe-coding',
      title: 'Vibe Coding Essentials: Build Apps with AI',
      provider: 'Scrimba, via Coursera',
      issuerCode: 'SC',
      detail: 'Specialization · 5 Courses',
      documentType: 'Specialization Certificate',
      category: 'AI-Assisted Development',
      topics: ['AI App Building', 'Prompting', '5-Course Specialization'],
      certificateImage: '',
    },
    {
      id: 'ibm-genai-uiux',
      title: 'Generative AI for UI/UX Design',
      provider: 'IBM Skills Network and SkillUp, via Coursera',
      issuerCode: 'IBM',
      detail: 'Specialization · 3 Courses',
      documentType: 'Specialization Certificate',
      category: 'Generative AI & Design',
      topics: ['Generative AI', 'UI/UX Design', '3-Course Specialization'],
      certificateImage: '',
    },
    {
      id: 'microsoft-ai-ml',
      title: 'Foundation of AI and Machine Learning',
      provider: 'Microsoft',
      issuerCode: 'MS',
      detail: 'Course Credential',
      documentType: 'Certificate of Completion',
      category: 'AI & Machine Learning',
      topics: ['AI Foundations', 'Machine Learning', 'Microsoft'],
      certificateImage: '',
    },
    {
      id: 'ucdavis-tableau',
      title: 'Fundamentals of Visualization with Tableau',
      provider: 'UC Davis, via Coursera',
      issuerCode: 'UCD',
      detail: 'Data Visualization',
      documentType: 'Certificate of Completion',
      category: 'Data & Analytics',
      topics: ['Tableau', 'Data Visualization', 'Analytics'],
      certificateImage: '',
    },
    {
      id: 'iima-pre-mba-stats',
      title: 'Pre-MBA Statistics',
      provider: 'IIM Ahmedabad',
      issuerCode: 'IIMA',
      detail: 'Quantitative Foundations',
      documentType: 'Certificate of Completion',
      category: 'Statistics',
      topics: ['Statistics', 'Quantitative Analysis', 'IIM Ahmedabad'],
      certificateImage: '',
    },
    {
      id: 'ibm-cybersecurity',
      title: 'Introduction to Cybersecurity Essentials',
      provider: 'IBM',
      issuerCode: 'IBM',
      detail: 'Security Fundamentals',
      documentType: 'Certificate of Completion',
      category: 'Cybersecurity',
      topics: ['Cybersecurity', 'Security Fundamentals', 'IBM'],
      certificateImage: '',
    },
  ],

  journey: {
    kicker: 'My Journey',
    headingPrefix: 'Growth across',
    headingHighlight: 'chapters',
    subtitle:
      'From starting my BCA degree in Ahmedabad to building full-stack software, interning in Python, leading hackathon teams, and presenting AI research.',
    milestones: [
      {
        id: 'bca-start',
        step: '01',
        phase: 'Academic Start',
        when: 'BCA Foundation',
        title: 'Starting BCA at LJ College of Computer Applications',
        description:
          'Began my Bachelor of Computer Applications journey in Ahmedabad (2024–2027), building strong academic fundamentals (9.18 SGPA in Semester 1; reported 27th rank at Gujarat University).',
        tags: ['BCA (2024–2027)', 'LJCCA Ahmedabad'],
      },
      {
        id: 'python-fundamentals',
        step: '02',
        phase: 'Core Coding',
        when: 'Core Programming',
        title: 'Learning Python and Programming Fundamentals',
        description:
          'Focused on Python, JavaScript, HTML, CSS, and problem-solving patterns to turn algorithmic ideas into clean, readable code.',
        tags: ['Python', 'JavaScript', 'HTML & CSS'],
      },
      {
        id: 'web-stack',
        step: '03',
        phase: 'Web Engineering',
        when: 'Web Technologies',
        title: 'Exploring Frontend and Backend Development',
        description:
          'Expanded into modern React, TypeScript, Vite, Tailwind CSS, React Query, React Hook Form, Zod, Node.js, Express.js, REST APIs, PostgreSQL, SQLite, and Prisma ORM.',
        tags: ['React & TypeScript', 'Node.js & Express', 'Prisma ORM'],
      },
      {
        id: 'fullstack-apps',
        step: '04',
        phase: 'Building Systems',
        when: 'Full-Stack Projects',
        title: 'Building Full-Stack Applications',
        description:
          'Engineered applications like VendorBridge ERP (procurement lifecycle, JWT/refresh auth, and 4-role RBAC), Phone Price Comparison Web App, and the BuildSutra concept.',
        tags: ['VendorBridge ERP', 'RBAC & JWT', 'Phone Comparison'],
      },
      {
        id: 'codesprint-internship',
        step: '05',
        phase: 'Internship',
        when: 'Winter Internship',
        title: 'Completing Python Developer Internship at CodeSprint Labs',
        description:
          'Completed a one-month Winter Internship as a Python Developer at CodeSprint Labs, applying Python skills to practical development tasks.',
        tags: ['CodeSprint Labs', 'Python Developer Intern'],
      },
      {
        id: 'ai-ml-exploration',
        step: '06',
        phase: 'AI & ML',
        when: 'AI / ML & GenAI',
        title: 'Exploring AI, Machine Learning and Generative AI',
        description:
          'Completed specialized coursework across Google AI Professional Certificate, UPenn AI & ML Essentials with Python, Microsoft AI/ML Foundations, IBM Generative AI for UI/UX, and Scrimba Vibe Coding.',
        tags: ['AI & ML', 'Generative AI', 'Prompt Engineering'],
      },
      {
        id: 'sih-hackathon',
        step: '07',
        phase: 'Hackathons',
        when: 'Smart India Hackathon',
        title: 'Participating in Smart India Hackathon (2nd Position Internal)',
        description:
          'Collaborated in Smart India Hackathon—marking my second SIH participation—and earned 2nd Position in the internal hackathon at LJCCA with the Solar-Powered Agarbatti Drying and Compact Packaging System concept.',
        tags: ['SIH Internal 2nd Position', 'Social Impact Concept'],
      },
      {
        id: 'lj-innovation-village',
        step: '08',
        phase: 'Team Leadership',
        when: 'LJ Innovation Village 2026',
        title: 'Leading Smart Yatri at LJ Innovation Village 2026',
        description:
          'Led the team as Team Leader and presented Smart Yatri – Travel and Crowd Prediction Platform at LJ Innovation Village 2026.',
        tags: ['Smart Yatri', 'Team Leader', '2026 Showcase'],
      },
      {
        id: 'icmotarss-research',
        step: '09',
        phase: 'Research',
        when: 'ICMOTARSS',
        title: 'Presenting Research at ICMOTARSS',
        description:
          'Presented my research poster "Trustworthy Fake News Detection on FakeNewsNet Using BERT, SHAP and Social Context Analysis" at the ICMOTARSS international conference.',
        tags: ['BERT & SHAP', 'FakeNewsNet', 'Poster Presenter'],
      },
    ],
  },

  contact: {
    kicker: "Let's Connect",
    heading: "Let's Connect and Build Something Meaningful.",
    subtext:
      'Open to connecting about software development, full-stack engineering, AI/ML research, hackathons, and meaningful technical collaborations.',
    email: 'nankanijanvi695@gmail.com',
    emailPlaceholderDisplay: 'nankanijanvi695@gmail.com',
    emailIsPlaceholder: false,
    formEndpoint: '', // Optional: add Formspree / backend endpoint URL to enable live form delivery
    responseNote:
      'Reach out directly via nankanijanvi695@gmail.com, LinkedIn, or GitHub. Configure contact.formEndpoint in src/data/portfolioData.js to enable direct server delivery.',
  },
};
