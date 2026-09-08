# 🎓 NuralCampus: The Intelligent Academic Ecosystem[cite: 1]

**Live Demo:** [https://nuralcampus.vercel.app/](https://nuralcampus.vercel.app/)[cite: 1]

## 📖 Overview
NuralCampus is an intelligent, community-driven academic resource management platform designed to centralize and streamline access to educational materials for university students and educators.[cite: 1] Built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with Next.js for server-side rendering, it provides a secure, feature-rich environment where students can upload, discover, and download semester-wise course resources including books, notes, and slides.[cite: 1] The platform addresses the fragmentation of study materials across multiple sources and introduces a recognized system for rewarding academic contributors.[cite: 1]

---

## 🎯 Problem Statement & Objectives
Students frequently struggle with fragmented study materials distributed across emails, personal drives, and informal chat groups.[cite: 1] High-quality materials shared by senior students often disappear between academic years, and there is no structured mechanism to recognize peer contributors.[cite: 1]

**Primary Objectives:**
*   Provide a centralized, searchable E-Library for academic resources filtered by department, year, semester, and course.[cite: 1]
*   Enable authenticated users to upload resources (books, notes, slides) with rich metadata and public download links.[cite: 1]
*   Implement a contributor leaderboard to gamify and incentivize resource sharing.[cite: 1]
*   Support per-resource reactions, comments, and nested replies to facilitate academic discussion.[cite: 1]
*   Deliver a responsive, dark-mode-capable interface accessible on all devices.[cite: 1]

---

## 💻 Tech Stack & Architecture[cite: 1]

The project uses the MVC (Model-View-Controller) pattern for clean separation of concerns.[cite: 1] 

**Frontend:**
*   React.js (Vite)[cite: 1]
*   Bootstrap CDN & React Icons[cite: 1]
*   State Management: React useState / useEffect[cite: 1]
*   Notifications: React-Toastify[cite: 1]

**Backend & SSR:**
*   Next.js (App Router)[cite: 1]
*   Node.js & Express.js[cite: 1]
*   Authentication: JWT (JSON Web Tokens) & bcrypt[cite: 1]

**Database:**
*   MongoDB Atlas (via Mongoose ODM)[cite: 1]

**System Architecture Flow:**
The system follows a client-server architecture with Next.js providing both SSR (Server-Side Rendering) for SEO-critical pages and CSR (Client-Side Rendering) for interactive components.[cite: 1] The backend exposes a RESTful API consumed by the React frontend.[cite: 1] Protected routes verify JWT tokens via middleware before serving content.[cite: 1]

---

## 🚀 Key Features & Modules

### 1. Authentication System[cite: 1]
*   Secure JWT-based authentication system requiring Full Name, Email, Username, Password, Institute, and Department for registration.[cite: 1]
*   Profile picture defaults to a random formal emoji, which users can update.[cite: 1]

### 2. Centralized E-Library[cite: 1]
*   Full-text search by resource title, course, or topic.[cite: 1]
*   Advanced filter dropdowns for Department, Year, Semester, Resource Type (Book/Note/Slide/Others), and Course Name.[cite: 1]
*   Grid and List view toggles with pagination (maximum 10 cards per page).[cite: 1]

### 3. Individual Resource & Discussion Pages[cite: 1]
*   Detailed view containing cover images, type badges, and metadata cards.[cite: 1]
*   Direct download links to Google Drive, Mega, or MediaFire.[cite: 1]
*   Interactive discussion section featuring comment boxes, nested replies (one level deep), and actions like Like, Edit, and Delete.[cite: 1]

### 4. Resource Upload System[cite: 1]
*   Structured upload form allowing users to select Resource Type, Department, Year, Semester, and Course Name.[cite: 1]
*   Cover image upload with live preview before submission.[cite: 1]
*   Automatically increments the uploader's contribution count and updates platform analytics.[cite: 1]

### 5. Gamified Leaderboard[cite: 1]
*   Top 3 contributors are displayed as prominent cards with gold, silver, and bronze rank badges.[cite: 1]
*   A complete leaderboard table ranks users based on their total upload count dynamically.[cite: 1]

### 6. Comprehensive User Profiles[cite: 1]
*   Personalized profile banner showcasing user stats, department, institute, and join date.[cite: 1]
*   Contributor Stats panel with a progress bar tracking total uploads.[cite: 1]
*   Achievements section highlighting unlocked badges like 'First Upload' and 'Rising Star'.[cite: 1]
*   Paginated list of all resources uploaded by the user.[cite: 1]

### 7. Site-Wide Reviews[cite: 1]
*   Users can submit 0-5 star ratings with review titles and bodies.[cite: 1]
*   Homepage displays a "Top Rated Reviews" section and an aggregate average rating for community feedback.[cite: 1]

---

## 🗄️ Database Schema[cite: 1]

*   **User Collection:** Stores `name`, `username` (Primary Key), hashed `password`, `email`, `department`, `institute`, `uploadCount`, and `profilePic`.[cite: 1]
*   **Resource Collection:** Stores `title` (Primary Key), `coverImage`, `department`, `year`, `semester`, `courseName`, `downloadLink`, `type`, `uploaderUsername` (Foreign Key), and `reactionCount`.[cite: 1]
*   **Analytics Collection:** Tracks `totalParticipants`, `totalBooks`, `totalSlides`, `totalNotes`, and `totalResources`.[cite: 1]
*   **Additional Collections:** `Comments` (supports nested replies via `parentCommentId`), `Reviews`, and `Reactions`.[cite: 1]

---

## 🗺️ Roadmap & Future Scope[cite: 1]

*   **Smart Video Hub:** Embed YouTube lectures organized by course and track watch progress per user.[cite: 1]
*   **Software & File Section:** A dedicated area for downloading development tools and academic software.[cite: 1]
*   **AI CGPA Predictor:** Analyze quiz scores and attendance data to predict final semester results.[cite: 1]
*   **LLM Campus Assistant:** A chatbot trained on university rules, notices, and FAQs for 24/7 support.[cite: 1]
*   **Alumni Connect:** Verified graduate profiles with mentorship and resume review options.[cite: 1]

---

## 👨‍💻 Credits & Author

**Md. Tanvir Ahmed**[cite: 1]
*Computer Science and Engineering (CSE)*[cite: 1]
*Jamalpur Science and Technology University (JSTU)*[cite: 1]

*This project was developed in partial fulfillment of the requirements for the degree of Bachelor of Science in Computer Science and Engineering, under the supervision of Mohammad Hasan, Assistant Professor, Department of CSE, JSTU.*[cite: 1]
