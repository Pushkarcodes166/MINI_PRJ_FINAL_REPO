
// This file exports an array of science career objects for use in LandingPage.jsx
const scienceCareers = [
  {
    id: 'engineering_general',
    title: 'Engineering (General)',
    description: 'Professional engineering across multiple disciplines — design, analysis, manufacturing, and technology development.',
    roadmap_steps: 'Complete 10+2 with PCM and required percentage.|Prepare for and appear in national/state engineering entrance exams (JEE Main, State CETs).|Participate in counselling/allotment; select college & branch based on rank/cutoff.|Enroll in B.E/B.Tech (4 years). Focus on projects, internships, and placements.|Optional: Pursue M.Tech/MS (2 years) or MBA/industry certifications; or enter workforce.'
  },
  {
    id: 'computer_science_it',
    title: 'Computer Science & IT',
    description: 'Software development, systems design, data engineering, AI/ML, cybersecurity and related tech roles.',
    roadmap_steps: 'Complete 12th with strong math foundation.|Prepare for entrance exams and secure admission to a reputable CS/IT program.|Complete B.Tech/B.E in CS/IT; build portfolio (projects, GitHub), internships and competitions.|Choose electives in AI, ML, Data Science, Cybersecurity, or Cloud computing.|Enter industry as SW engineer or pursue MSc/MS in specialized areas.'
  },
  {
    id: 'mechanical_engineering',
    title: 'Mechanical Engineering',
    description: 'Design, analysis, and manufacturing of mechanical systems, thermal systems and automation.',
    roadmap_steps: 'Finish 12th with PCM.|Appear for engineering entrance exams and secure a mechanical engineering seat.|Complete B.E/B.Tech in Mechanical; focus on CAD, Thermodynamics, Manufacturing labs.|Take internships in manufacturing, automotive or robotics; learn CAD/CAM tools.|Consider M.Tech in specialized areas or enter industries like automotive, aerospace, energy.'
  },
  {
    id: 'civil_engineering',
    title: 'Civil Engineering',
    description: 'Planning, designing, constructing and maintaining infrastructure: buildings, roads, bridges and water systems.',
    roadmap_steps: 'Complete 12th with PCM.|Appear for entrance exams; choose Civil branch in college.|Complete B.E/B.Tech in Civil; focus on surveying, structural analysis, materials.|Intern with construction firms; learn software (AutoCAD, STAAD Pro, ETABS).|Pursue M.Tech, structural engineering or join construction/project management roles.'
  },
  {
    id: 'electrical_electronics',
    title: 'Electrical & Electronics Engineering (EEE/ECE)',
    description: 'Work on power systems, circuits, electronics, communication systems and embedded devices.',
    roadmap_steps: 'Finish 12th with PCM.|Clear engineering entrance exams and join EEE/ECE program.|During UG, take labs in electronics, circuits, signal processing and communications.|Internships in telecom, electronics manufacturing or power utilities.|Pursue specialized PG (Power systems, VLSI) or industry roles.'
  },
  {
    id: 'aerospace_engineering',
    title: 'Aerospace & Aeronautical Engineering',
    description: 'Design and development of aircraft, spacecraft, and related systems.',
    roadmap_steps: 'Complete 12th with strong PCM performance.|Clear entrance exams and secure admission to an aerospace program.|Complete B.Tech/B.E in Aerospace; focus on aerodynamics, propulsion and structures.|Intern at aerospace companies/ISRO/DRDO or in aircraft maintenance organizations.|Pursue M.Tech or specialized roles in design, testing, or space research.'
  },
  {
    id: 'biomedical_engineering',
    title: 'Biomedical / Bioengineering',
    description: 'Application of engineering principles to healthcare: medical devices, imaging, prosthetics and biomaterials.',
    roadmap_steps: 'Complete 12th with PCM/PCB depending on institute requirements.|Secure admission into biomedical engineering program.|During UG, focus on biomedical instruments, biomechanics and clinical internships.|Collaborate with hospitals for device testing; build multidisciplinary projects.|Pursue M.Tech/M.S or clinical engineering roles; research opportunities in med-tech startups.'
  },
  {
    id: 'biotechnology',
    title: 'Biotechnology & Life Sciences',
    description: 'Study and application of biological systems for health, agriculture, industry and environment.',
    roadmap_steps: 'Complete 12th with PCB/PCM as per college requirement.|Take entrance tests and join B.Tech/B.Sc in Biotechnology or related programs.|Gain lab experience, internships in biotech firms, and project work in molecular biology.|Consider MSc/M.Tech in Biotechnology or specialized diplomas.|Pursue research, pharma/biotech industry roles or Ph.D. for academic careers.'
  },
  {
    id: 'medical_mbbs',
    title: 'Medical (MBBS/BDS/AYUSH)',
    description: 'Clinical practice and medical research; MBBS leads to physician/medical specialist careers; BDS for dentistry; AYUSH for traditional medicine.',
    roadmap_steps: 'Complete 12th with PCB with high marks.|Prepare for and clear NEET-UG; secure a seat in MBBS/BDS/AYUSH through counselling.|Complete MBBS (5.5 years including internship) or BDS (5 years) or AYUSH program.|Complete internship/house-surgeon tenure and register with Medical Council.|Optionally pursue MD/MS/DNB (3 years) specialization or practice as a general physician.'
  },
  {
    id: 'pharmacy',
    title: 'Pharmacy',
    description: 'Pharmaceutical sciences: drug development, manufacturing, clinical trials and regulatory affairs.',
    roadmap_steps: 'Complete 12th with requisite subjects.|Appear for university/state entrance exams and select B.Pharm program.|Complete B.Pharm (4 years) with practicals and internships in pharma companies.|Options: M.Pharm, Pharm.D. (clinical pharmacy), or industry roles in QA/QC, R&D.|Possibility to pursue Ph.D. or regulatory/clinical research careers.'
  },
  {
    id: 'nursing_allied',
    title: 'Nursing & Allied Health Sciences',
    description: 'Clinical support roles: nursing, physiotherapy, occupational therapy, radiography, lab technology.',
    roadmap_steps: 'Complete 12th with PCB or relevant subjects.|Apply for B.Sc Nursing, BPT (Physiotherapy), BMLT (Medical Lab Tech) or diploma courses.|Complete UG program with clinical rotations and internships in hospitals.|Register with respective councils (e.g., Nursing Council) and join healthcare settings.|Optionally pursue M.Sc, specialized certifications, or research.'
  },
  {
    id: 'architecture',
    title: 'Architecture',
    description: 'Design and planning of buildings, urban spaces; blend of creativity, technical skill and site knowledge.',
    roadmap_steps: 'Complete 12th with required subjects and build a portfolio (sketches/designs).|Appear for NATA/JEE (Paper II) and secure admission to B.Arch (5 years).|Complete B.Arch with studio projects, internships and site visits.|Register with Council of Architecture (where required) and practice as an architect.|Options: M.Arch, urban design, interior design, conservation, or start a design firm.'
  },
  {
    id: 'pure_sciences',
    title: 'Pure Sciences (Physics / Chemistry / Mathematics / Biology)',
    description: 'Academic and research-oriented careers in core scientific disciplines leading to teaching, research, and industry roles.',
    roadmap_steps: 'Select B.Sc in chosen subject(s) after 12th.|During UG, focus on rigorous coursework, labs, and undergraduate research projects.|Pursue M.Sc / M.Phil in specialized areas; clear exams like IIT JAM for admissions to premier institutes.|Undertake Ph.D. for research & academic positions or join R&D labs/industry.|Optionally move into teaching (college/university), research institutes, or interdisciplinary sectors (data science, finance).'
  },
  {
    id: 'data_science_ai',
    title: 'Data Science, AI & Analytics',
    description: 'Interdisciplinary field using statistics, programming and domain knowledge to extract insights from data and build intelligent systems.',
    roadmap_steps: 'Complete 12th with strong mathematics foundation and basic programming exposure.|Pursue B.Sc/B.Tech in CS/Statistics/Mathematics or related fields.|Learn programming (Python/R), statistics, machine learning libraries and build projects.|Internships in data/ML teams; consider specialized PG (M.Tech/ MSc (DS)/MS) or certifications.|Work as Data Analyst/Scientist/ML Engineer or pursue Ph.D. in AI/ML for research roles.'
  },
  {
    id: 'environmental_science',
    title: 'Environmental Science & Engineering',
    description: 'Study of environment, ecology, pollution control, sustainable technologies and policy.',
    roadmap_steps: 'Complete 12th with required subjects and apply for B.Sc/ B.Tech Environmental Science/Engineering.|During UG, focus on ecology, environmental chemistry, pollution control and fieldwork.|Intern with environmental NGOs, labs or government agencies.|Pursue M.Sc/M.Tech in Environmental Science or related policy/management courses.|Work in environmental consulting, research, government regulatory bodies, or sustainability roles in industry.'
  },
  {
    id: 'agriculture_horticulture',
    title: 'Agricultural Sciences & Horticulture',
    description: 'Careers in modern agriculture, crop science, agronomy, agritech and sustainable food systems.',
    roadmap_steps: 'Complete 12th and apply to agricultural universities (B.Sc Agri, B.Sc Horticulture).|Engage in practical farm training, internships and agri-projects.|Pursue M.Sc/ Ph.D. or specialized diplomas; learn agritech tools, precision agriculture.|Work in agri-based industries, research institutes, government extension services, or start agribusiness.'
  },
  {
    id: 'veterinary_science',
    title: 'Veterinary Science',
    description: 'Animal healthcare, livestock management, veterinary research and public health roles.',
    roadmap_steps: 'Complete 12th with PCB and apply to BVSc & AH programs.|Undergo practical clinical training and internships in veterinary hospitals/farms.|Graduate (BVSc) and obtain registration/licensing where required.|Pursue specialization via MVSc or Ph.D., or work in public health, research, or animal husbandry.'
  },
  {
    id: 'forensic_science',
    title: 'Forensic Science',
    description: 'Application of scientific methods to crime investigation: forensic biology, chemistry, toxicology and digital forensics.',
    roadmap_steps: 'Complete 12th and enroll in B.Sc Forensic Science or related course.|Gain practical lab experience in forensic techniques and internships with forensic labs or police departments.|Pursue M.Sc in Forensic Science or specialized certifications in forensic technology.|Work with law enforcement, forensic labs, or private consultancy; pursue Ph.D. for advanced research.'
  },
  {
    id: 'marine_science_oceanography',
    title: 'Marine Science & Oceanography',
    description: 'Study of oceans, marine life, coastal ecosystems and marine resource management.',
    roadmap_steps: 'Complete 12th and apply for B.Sc in Marine Science or related programs.|Participate in fieldwork, cruises and lab internships to gain practical oceanographic skills.|Pursue M.Sc and Ph.D. in marine science for research careers.|Work with research institutes, government marine departments, fisheries, or environmental NGOs.'
  },
  {
    id: 'geology_geosciences',
    title: 'Geology & Earth Sciences',
    description: 'Study of earth materials, natural resources, earthquakes, mineral exploration and environmental geology.',
    roadmap_steps: 'Complete 12th and enroll in B.Sc Geology or related degrees.|Field camps, mapping exercises and internships in mining/exploration companies.|Pursue M.Sc/Ph.D. for advanced research or specialized industry roles.|Work in mineral exploration, oil & gas, environmental consulting, or academia.'
  },
  {
    id: 'astronomy_astrophysics',
    title: 'Astronomy & Astrophysics',
    description: 'Study of celestial bodies, cosmology, observational and theoretical astronomy.',
    roadmap_steps: 'Complete 12th and pursue B.Sc in Physics/Applied Physics or related subject.|Take electives in astrophysics/astronomy and gain programming & data-analysis skills.|Pursue M.Sc and then Ph.D. in Astrophysics for research roles.|Work at observatories, research institutions, space agencies or academia.'
  },
  {
    id: 'interdisciplinary_science',
    title: 'Interdisciplinary / Emerging Fields (Biostatistics, Nanotechnology, Materials Science)',
    description: 'Careers at the intersection of disciplines — materials research, nanotech, bioinformatics, biostatistics.',
    roadmap_steps: 'Choose relevant UG (B.Sc/B.Tech) with strong core subject knowledge.|Engage in interdisciplinary projects, internships and lab rotations.|Pursue specialized PG degrees (M.Tech, M.Sc, MS) or research fellowships.|Work in R&D labs, high-tech manufacturing, biotech or computational research roles.'
  }
];

export default scienceCareers;
