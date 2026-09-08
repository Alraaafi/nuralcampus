# 🎓 NuralCampus: The Intelligent Academic Ecosystem

**Live Demo:** [https://nuralcampus.vercel.app/](https://nuralcampus.vercel.app/)

## 📖 Overview
NuralCampus is an intelligent, community-driven academic resource management platform designed to centralize and streamline access to educational materials for university students and educators. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with Next.js for server-side rendering, it provides a secure, feature-rich environment where students can upload, discover, and download semester-wise course resources including books, notes, and slides. The platform addresses the fragmentation of study materials across multiple sources and introduces a recognized system for rewarding academic contributors.

---

## 🎯 Problem Statement & Objectives
Students frequently struggle with fragmented study materials distributed across emails, personal drives, and informal chat groups. High-quality materials shared by senior students often disappear between academic years, and there is no structured mechanism to recognize peer contributors.

**Primary Objectives:**
*   Provide a centralized, searchable E-Library for academic resources filtered by department, year, semester, and course.
*   Enable authenticated users to upload resources (books, notes, slides) with rich metadata and public download links.
*   Implement a contributor leaderboard to gamify and incentivize resource sharing.
*   Support per-resource reactions, comments, and nested replies to facilitate academic discussion.
*   Deliver a responsive, dark-mode-capable interface accessible on all devices.

---

## 💻 Tech Stack & Architecture

The project uses the MVC (Model-View-Controller) pattern for clean separation of concerns. 

**Frontend:**
*   React.js (Vite)
*   Bootstrap CDN & React Icons
*   State Management: React useState / useEffect
*   Notifications: React-Toastify

**Backend & SSR:**
*   Next.js (App Router)
*   Node.js & Express.js
*   Authentication: JWT (JSON Web Tokens) & bcrypt

**Database:**
*   MongoDB Atlas (via Mongoose ODM)

**System Architecture Flow:**
The system follows a client-server architecture with Next.js providing both SSR (Server-Side Rendering) for SEO-critical pages and CSR (Client-Side Rendering) for interactive components. The backend exposes a RESTful API consumed by the React frontend. Protected routes verify JWT tokens via middleware before serving content.

---

## 🚀 Key Features & Modules

### 1. Authentication System
*   Secure JWT-based authentication system requiring Full Name, Email, Username, Password, Institute, and Department for registration.
*   Profile picture defaults to a random formal emoji, which users can update.

### 2. Centralized E-Library
*   Full-text search by resource title, course, or topic.
*   Advanced filter dropdowns for Department, Year, Semester, Resource Type (Book/Note/Slide/Others), and Course Name.
*   Grid and List view toggles with pagination (maximum 10 cards per page).

### 3. Individual Resource & Discussion Pages
*   Detailed view containing cover images, type badges, and metadata cards.
*   Direct download links to Google Drive, Mega, or MediaFire.
*   Interactive discussion section featuring comment boxes, nested replies (one level deep), and actions like Like, Edit, and Delete.

### 4. Resource Upload System
*   Structured upload form allowing users to select Resource Type, Department, Year, Semester, and Course Name.
*   Cover image upload with live preview before submission.
*   Automatically increments the uploader's contribution count and updates platform analytics.

### 5. Gamified Leaderboard
*   Top 3 contributors are displayed as prominent cards with gold, silver, and bronze rank badges.
*   A complete leaderboard table ranks users based on their total upload count dynamically.

### 6. Comprehensive User Profiles
*   Personalized profile banner showcasing user stats, department, institute, and join date.
*   Contributor Stats panel with a progress bar tracking total uploads.
*   Achievements section highlighting unlocked badges like 'First Upload' and 'Rising Star'.
*   Paginated list of all resources uploaded by the user.

### 7. Site-Wide Reviews
*   Users can submit 0-5 star ratings with review titles and bodies.
*   Homepage displays a "Top Rated Reviews" section and an aggregate average rating for community feedback.

---

## 🗄️ Database Schema

*   **User Collection:** Stores `name`, `username` (Primary Key), hashed `password`, `email`, `department`, `institute`, `uploadCount`, and `profilePic`.
*   **Resource Collection:** Stores `title` (Primary Key), `coverImage`, `department`, `year`, `semester`, `courseName`, `downloadLink`, `type`, `uploaderUsername` (Foreign Key), and `reactionCount`.
*   **Analytics Collection:** Tracks `totalParticipants`, `totalBooks`, `totalSlides`, `totalNotes`, and `totalResources`.
*   **Additional Collections:** `Comments` (supports nested replies via `parentCommentId`), `Reviews`, and `Reactions`.

---

## 🗺️ Roadmap & Future Scope

*   **Smart Video Hub:** Embed YouTube lectures organized by course and track watch progress per user.
*   **Software & File Section:** A dedicated area for downloading development tools and academic software.
*   **AI CGPA Predictor:** Analyze quiz scores and attendance data to predict final semester results.
*   **LLM Campus Assistant:** A chatbot trained on university rules, notices, and FAQs for 24/7 support.
*   **Alumni Connect:** Verified graduate profiles with mentorship and resume review options.

---

## 👨‍💻 Credits & Author

**Md. Tanvir Ahmed**
*Computer Science and Engineering (CSE)*
*Jamalpur Science and Technology University (JSTU)*

*This project was developed in partial fulfillment of the requirements for the degree of Bachelor of Science in Computer Science and Engineering, under the supervision of Mohammad Hasan, Assistant Professor, Department of CSE, JSTU.*
