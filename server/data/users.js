export const USERS = [
  // 5 STUDENTS (Classes 6th to 10th)
  {
    id: "std-6",
    role: "student",
    name: "Aarav Sharma",
    rollNo: "240601", // Joined 2024, Class 6, Roll 01
    joiningYear: 2024,
    grade: "Class 6",
    gradeNum: 6,
    password: "Aarav@2024",
    email: "aarav.sharma@vnrvjiet.edu.in",
    elo: 1724,
    avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80",
    academicSummary: {
      overallProgress: 78,
      studyStreakDays: 5,
      completedModules: 14,
      totalModules: 18,
      avgQuizScore: 88,
      learningSpeed: "Optimal (Level 2)",
      currentTopic: "Fractions & Decimals in Daily Life"
    },
    enrolledCourses: [
      { id: "c6-math", name: "Mathematics - Grade 6", code: "MTH-601", progress: 75, mastery: "Intermediate", currentChapter: "Fractions & Decimals" },
      { id: "c6-sci", name: "General Science - Grade 6", code: "SCI-601", progress: 85, mastery: "Advanced", currentChapter: "Living Organisms & Habitats" },
      { id: "c6-eng", name: "English Language & Grammar", code: "ENG-601", progress: 70, mastery: "Intermediate", currentChapter: "Tenses & Creative Composition" },
      { id: "c6-soc", name: "Social Studies & Geography", code: "SST-601", progress: 82, mastery: "Proficient", currentChapter: "The Solar System & Earth" }
    ],
    adaptiveTasks: [
      { id: "t1", title: "Practice Decimal Division Visualizer", subject: "Math", due: "Tomorrow", status: "In Progress", difficulty: "Adaptive Medium" },
      { id: "t2", title: "Habitats Audio Summary Quiz", subject: "Science", due: "Friday", status: "Pending", difficulty: "Standard" }
    ],
    strengths: ["Whole Numbers", "Solar System Facts", "General Science Concepts"],
    weaknesses: ["Division with Multi-digit Decimals", "Preposition Usage"]
  },
  {
    id: "std-7",
    role: "student",
    name: "Diya Patel",
    rollNo: "230702", // Joined 2023, Class 7, Roll 02
    joiningYear: 2023,
    grade: "Class 7",
    gradeNum: 7,
    password: "Diya@2023",
    email: "diya.patel@vnrvjiet.edu.in",
    elo: 1046,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    academicSummary: {
      overallProgress: 88,
      studyStreakDays: 12,
      completedModules: 22,
      totalModules: 25,
      avgQuizScore: 94,
      learningSpeed: "Fast-Paced (Level 3)",
      currentTopic: "Linear Equations & Practical Balance"
    },
    enrolledCourses: [
      { id: "c7-math", name: "Pre-Algebra & Geometry - Grade 7", code: "MTH-701", progress: 86, mastery: "Mastery", currentChapter: "Simple Linear Equations" },
      { id: "c7-sci", name: "Physical & Life Science", code: "SCI-701", progress: 92, mastery: "Mastery", currentChapter: "Nutrition in Plants & Animals" },
      { id: "c7-eng", name: "Literature & Active Vocabulary", code: "ENG-701", progress: 89, mastery: "Advanced", currentChapter: "Poetic Devices & Prose" },
      { id: "c7-soc", name: "History & Our Environment", code: "SST-701", progress: 85, mastery: "Proficient", currentChapter: "Medieval India & Governance" }
    ],
    adaptiveTasks: [
      { id: "t3", title: "Equation Balancer Simulator", subject: "Math", due: "Today", status: "In Progress", difficulty: "High Challenge" },
      { id: "t4", title: "Photosynthesis Stepwise Flowchart", subject: "Science", due: "Thursday", status: "Completed", difficulty: "Medium" }
    ],
    strengths: ["Algebraic Simplification", "Plant Physiology", "English Essay Structure"],
    weaknesses: ["Word Problems on Speed & Distance", "Historical Timelines"]
  },
  {
    id: "std-8",
    role: "student",
    name: "Rohan Verma",
    rollNo: "220803", // Joined 2022, Class 8, Roll 03
    joiningYear: 2022,
    grade: "Class 8",
    gradeNum: 8,
    password: "Rohan@2022",
    email: "rohan.verma@vnrvjiet.edu.in",
    elo: 1288,
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    academicSummary: {
      overallProgress: 71,
      studyStreakDays: 3,
      completedModules: 18,
      totalModules: 26,
      avgQuizScore: 76,
      learningSpeed: "Reflective (Level 1)",
      currentTopic: "Mensuration: Area & Surface Dimensions"
    },
    enrolledCourses: [
      { id: "c8-math", name: "Mathematics & Mensuration", code: "MTH-801", progress: 68, mastery: "Developing", currentChapter: "Surface Area & Volumes" },
      { id: "c8-phy", name: "Physics: Force & Pressure", code: "PHY-801", progress: 74, mastery: "Intermediate", currentChapter: "Friction & Pressure in Fluids" },
      { id: "c8-chm", name: "Chemistry: Synthetic Materials", code: "CHM-801", progress: 78, mastery: "Intermediate", currentChapter: "Metals & Non-Metals Reactions" },
      { id: "c8-bio", name: "Biology: Cell Structure & Microbes", code: "BIO-801", progress: 64, mastery: "Developing", currentChapter: "Microorganisms: Friend & Foe" }
    ],
    adaptiveTasks: [
      { id: "t5", title: "3D Cylinder & Cone Volume Lab", subject: "Math", due: "Tomorrow", status: "Pending", difficulty: "Adaptive Foundation" },
      { id: "t6", title: "Friction vs Surface Types Experiment", subject: "Physics", due: "Saturday", status: "In Progress", difficulty: "Medium" }
    ],
    strengths: ["Physical Concepts of Force", "Metals Reactivity series"],
    weaknesses: ["Solid Surface Geometry Calculations", "Cell Organelle Functions"]
  },
  {
    id: "std-9",
    role: "student",
    name: "Ananya Iyer",
    rollNo: "210904", // Joined 2021, Class 9, Roll 04
    joiningYear: 2021,
    grade: "Class 9",
    gradeNum: 9,
    password: "Ananya@2021",
    email: "ananya.iyer@vnrvjiet.edu.in",
    elo: 1410,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    academicSummary: {
      overallProgress: 92,
      studyStreakDays: 19,
      completedModules: 31,
      totalModules: 34,
      avgQuizScore: 96,
      learningSpeed: "Accelerated (Level 4)",
      currentTopic: "Newtonian Laws & Work-Energy Theorem"
    },
    enrolledCourses: [
      { id: "c9-math", name: "Advanced Polynomials & Geometry", code: "MTH-901", progress: 95, mastery: "Mastery", currentChapter: "Coordinate Geometry & Circles" },
      { id: "c9-phy", name: "Physics: Motion, Gravitation & Work", code: "PHY-901", progress: 91, mastery: "Mastery", currentChapter: "Work, Energy & Power" },
      { id: "c9-chm", name: "Chemistry: Atoms & Chemical Reactions", code: "CHM-901", progress: 94, mastery: "Mastery", currentChapter: "Structure of the Atom & Isotopes" },
      { id: "c9-bio", name: "Biology: Tissues & Diversity", code: "BIO-901", progress: 88, mastery: "Advanced", currentChapter: "Plant & Animal Tissues" }
    ],
    adaptiveTasks: [
      { id: "t7", title: "Work-Energy Theorem Real-World Scenarios", subject: "Physics", due: "Friday", status: "In Progress", difficulty: "Olympiad Level" },
      { id: "t8", title: "Coordinate Proofs for Cyclic Quadrilaterals", subject: "Math", due: "Monday", status: "Completed", difficulty: "High Challenge" }
    ],
    strengths: ["Algebraic Proofs", "Newtonian Kinematics", "Bohr-Rutherford Atomic Models"],
    weaknesses: ["Epithelial Tissue Sub-classifications"]
  },
  {
    id: "std-10",
    role: "student",
    name: "Vihaan Reddy",
    rollNo: "201005", // Joined 2020, Class 10, Roll 05
    joiningYear: 2020,
    grade: "Class 10",
    gradeNum: 10,
    password: "Vihaan@2020",
    email: "vihaan.reddy@vnrvjiet.edu.in",
    elo: 1562,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    academicSummary: {
      overallProgress: 89,
      studyStreakDays: 8,
      completedModules: 38,
      totalModules: 42,
      avgQuizScore: 91,
      learningSpeed: "Targeted Board Prep",
      currentTopic: "Electromagnetism: Motor & Induction"
    },
    enrolledCourses: [
      { id: "c10-math", name: "Board Prep: Trigonometry & Calculus Intro", code: "MTH-1001", progress: 93, mastery: "Mastery", currentChapter: "Applications of Trigonometry" },
      { id: "c10-phy", name: "Physics: Electricity & Magnetic Effects", code: "PHY-1001", progress: 87, mastery: "Advanced", currentChapter: "Electromagnetic Induction & Flemming's Rules" },
      { id: "c10-chm", name: "Chemistry: Carbon Compounds & Acids", code: "CHM-1001", progress: 90, mastery: "Mastery", currentChapter: "Carbon & Its Allotropes / Nomenclature" },
      { id: "c10-bio", name: "Biology: Heredity, Evolution & Life Processes", code: "BIO-1001", progress: 86, mastery: "Advanced", currentChapter: "Mendelian Genetics & Monohybrid Cross" }
    ],
    adaptiveTasks: [
      { id: "t9", title: "Heights & Distances Multi-angle Trigonometry", subject: "Math", due: "Tomorrow", status: "In Progress", difficulty: "High Challenge" },
      { id: "t10", title: "Lenz's Law & Solenoid Flux Simulation", subject: "Physics", due: "Friday", status: "Completed", difficulty: "Target Board" }
    ],
    strengths: ["Trigonometric Heights & Distances", "Organic Functional Groups", "Ohm's Law Circuits"],
    weaknesses: ["Right Hand Thumb vs Left Hand Rule in Complex Motors"]
  },

  // 1 TEACHER (Larger roll number: 11 digits)
  {
    id: "tch-1",
    role: "teacher",
    name: "Dr. Priya Sundaram",
    rollNo: "20180940211", // Extended faculty ID (11 digits: Joined 2018, Dept 09, Faculty #40211)
    joiningYear: 2018,
    designation: "Senior Lead Educator & Adaptive Curriculum Director",
    department: "Secondary STEM & Computational Pedagogy",
    password: "Teacher@2024",
    email: "priya.sundaram@vnrvjiet.edu.in",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    stats: {
      totalStudentsMonitored: 5,
      activeClasses: ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"],
      averageCohortMastery: "87.2%",
      totalAdaptiveInterventions: 18,
      weeklyQuizzesEvaluated: 46
    },
    systemAnnouncements: [
      { id: "a1", date: "Today, 10:30 AM", title: "Mid-Term Adaptive Diagnostics Released", priority: "High" },
      { id: "a2", date: "Yesterday", title: "Updated Class 10 Board prep simulation bank", priority: "Normal" }
    ]
  }
];
