# TODO: Enhance Career Guidance App with Data Expansion & Quality Features

## Completed Features
- [x] Create mock data files: /data/jobs.js and /data/opportunities.js with sample job and internship listings
- [x] Create JobBoardPage.jsx: New page to display job listings filtered by career, using mock data
- [x] Create ResumeBuilderPage.jsx: Form-based page for user input (personal details, skills from tests), generate PDF resume using jsPDF
- [x] Create OpportunitiesPage.jsx: Page for internship/training listings, similar to job board
- [x] Update routing in App.jsx to include new routes for JobBoard, ResumeBuilder, and Opportunities pages
- [x] Update navigation: Add links in StudentDashboard.jsx to these new features

## New Data Expansion & Quality Features
- [x] Backend Enhancements: Add Flask endpoints for admin CRUD operations on roadmaps, jobs, opportunities
- [x] Backend Enhancements: Add endpoints for user feedback/ratings storage and retrieval
- [x] Backend Enhancements: Implement authentication for admin routes
- [x] Data Expansion: Update careerRoadmaps.js to include international education paths (US/UK universities, global certifications)
- [x] Data Expansion: Expand jobs.js with international job markets and opportunities
- [x] Data Expansion: Expand opportunities.js with global opportunities
- [x] Data Expansion: Add global salary ranges and trends data
- [ ] Admin CMS: Update AdminDashboard with functional forms for editing career data
- [ ] Admin CMS: Add sections for managing international content
- [ ] User Feedback System: Add rating components to RoadmapDetails page
- [ ] User Feedback System: Implement feedback storage (localStorage initially, backend later)
- [ ] User Feedback System: Use ratings to improve career recommendations
- [ ] UI Updates: Add international filters to job/opportunity pages
- [ ] UI Updates: Update roadmap displays to show global options

## Community & Networking Features
- [x] Create MentorshipPage.jsx: Page to list mentors, enable messaging and video calls
- [x] Remove video call option from MentorshipPage.jsx, keep only chat option
- [x] Add back to home buttons to MentorshipPage.jsx and DiscussionForumsPage.jsx
- [x] Add back to home button to UserContentPage.jsx
- [x] Create DiscussionForumsPage.jsx: Q&A forums per career field with moderation
- [x] Complete DiscussionForumsPage.jsx: Make new post form toggleable and hide after submission
- [x] Create UserContentPage.jsx: Submit and display success stories, tips, custom roadmaps
- [x] Update App.jsx: Add routes for new community pages
- [x] Update StudentDashboard.jsx: Add navigation links to community features
- [x] Update backend/app.py: Add endpoints for forums, user content, mentorship connections
- [ ] Integrate Firebase for real-time messaging in mentorship platform

## Followup Steps
- [ ] Test admin CRUD operations
- [ ] Verify international data displays correctly
- [ ] Implement rating aggregation for recommendations
- [ ] Add data validation and error handling
- [ ] Test new pages for functionality and responsiveness
- [ ] Verify integration with user flow and existing features (test results, recommendations)
- [ ] Run the dev server to test the page visually
- [ ] Check responsiveness on different screen sizes
- [ ] Verify button functionalities and animations
