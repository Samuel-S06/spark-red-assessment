# Spark Red Movie Project

---

<<<<<<< HEAD
### 1. Project Summary
This application provides a seamless movie discovery experience powered by the TMDB (The Movie Database) API. It allows users to search for thousands of titles, explore genres, and view detailed movie metadata in a sleek, "Netflix-inspired" cinematic interface.
=======
### Project Summary
This website provides a seamless movie discovery experience powered by TMDB (The Movie Database) API. It allows users to search for thousands of titles, explore genres, and view detailed movie metadata in a "Netflix-inspired" dark-red-ish mode interface.
>>>>>>> 2a89160 (Adding caching, skeleton loading, and error resilience)

### Key Features
* **Supabase Authentication:** Secure user sign-in and protected route handling using Next.js route groups.
* **Tailwind v4 Cinematic UI:** Custom "Spark Red" branding with responsive grid-to-list layout toggles.
* **Optimized Search:** Real-time movie discovery with input debouncing to minimize API overhead.
<<<<<<< HEAD
* **Fluid Data Handling:** Dynamic client-side sorting (Rating/Year/Relevance) and Framer Motion layout animations.

### 3. Development Time
* **Total Time:** Approximately 7–8 hours.
* **Breakdown:** * Setup & API Integration: 2 hours
    * UI/UX Styling & Tailwind v4 Migration: 4 hours
    * Refining TypeScript logic & Sorting: 2 hours

---

### 4. Project Access & Running Instructions

#### Live Deployment
**Link:** https://spark-red-movies.vercel.app/login
=======
* **Fluid Data Handling:** Dynamic client-side sorting (Rating/Year/Relevance) and Framer Motion layout animations!
* **Smart Caching:** In-memory cache with 5-minute TTL to reduce API calls and improve performance.
* **Skeleton Loading:** Beautiful shimmer effects while loading to prevent UI freezing.
* **Favorites System:** Client-side persistence using localStorage with visual feedback.
* **Error Resilience:** Multiple retry mechanisms with clear error states.

### Enhanced User Experience
* **Performance Optimized:** Intelligent caching reduces network costs and improves load times
* **Graceful Error Handling:** UI never freezes with proper loading and retry mechanisms  
* **Persistent Preferences:** User favorites survive across browser sessions
* **Modern Animations:** Smooth transitions and micro-interactions using Framer Motion
* **Responsive Design:** Works beautifully on desktop, tablet, and mobile devices

### Technical Stack
* **Frontend:** Next.js 16.1.4, React 19.2.3, TypeScript
* **Styling:** Tailwind CSS v4 with custom theme variables
* **Animations:** Framer Motion for fluid transitions
* **Authentication:** Supabase for secure user management
* **API:** TMDB (The Movie Database) integration
* **Icons:** Lucide React for consistent iconography

### ⏱Development Time
* **Total Time:** Approximately 8-9 hours.
* **Breakdown:** 
  * **Setup & API Integration:** 2 hours
  * **UI/UX Styling & Tailwind v4 Migration:** 4 hours
  * **Advanced Features Implementation:** 3 hours

---

## Detailed Local Setup Instructions
>>>>>>> 2a89160 (Adding caching, skeleton loading, and error resilience)

#### Video Demo
**Link:** [Google Drive Demo Video](https://drive.google.com/file/d/1V44y0eIuu_EmeyF0jCKvBvhVumWFprYg/view?usp=sharing)

<<<<<<< HEAD
#### Detailed Local Setup Instructions

**Prerequisites:**
=======
### 1. Prerequisites
>>>>>>> 2a89160 (Adding caching, skeleton loading, and error resilience)
* **Node.js 18.20.0** or higher
* **npm**
* TMDB API Key and Supabase Project credentials

<<<<<<< HEAD
**Installation:**
=======
### 2. Clone and Install
>>>>>>> 2a89160 (Adding caching, skeleton loading, and error resilience)
```bash
# Clone the repository
git clone [https://github.com/Samuel-S06/spark-red-assessment.git](https://github.com/Samuel-S06/spark-red-assessment.git)

# Navigate into the directory
cd spark-red-assessment

# Install all dependencies
npm install
<<<<<<< HEAD
=======
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory:

```env
# TMDB API — https://www.themoviedb.org/settings/api
TMDB_API_KEY=your_actual_api_key_here

# Supabase (for auth) — https://supabase.com/dashboard
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here
```

### 4. Run Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000` (or next available port).
>>>>>>> 2a89160 (Adding caching, skeleton loading, and error resilience)
