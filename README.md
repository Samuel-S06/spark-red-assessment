# Spark Red Movie Project

A Netflix-inspired movie discovery application powered by the TMDB API, built with Next.js, TypeScript, Tailwind v4, and Supabase authentication.

---

## Project Summary

This application provides a seamless movie discovery experience where users can search thousands of titles, explore detailed metadata, and interact with a polished cinematic interface. The focus of this project was to simulate a production-style frontend that handles real API data, authentication, performance optimization, and resilient UI states.

---

## Key Features

- **Supabase Authentication** — Protected routes using Next.js route groups
- **Optimized Search** — Input debouncing to reduce API overhead
- **Smart Caching** — In-memory cache with 5-minute TTL to avoid redundant API calls
- **Dynamic Sorting** — Client-side sorting by Rating, Year, and Relevance
- **Favorites System** — localStorage persistence across sessions
- **Skeleton Loading States** — Prevents UI freezing during fetches
- **Error & Empty States** — Graceful handling of API failures and no-result searches
- **Framer Motion Animations** — Fluid grid/list transitions
- **Responsive Tailwind v4 UI** — Custom “Spark Red” theme

---

## Technical Stack

- **Frontend:** Next.js, React, TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Authentication:** Supabase
- **API:** TMDB (The Movie Database)
- **Icons:** Lucide React

---

## Development Time

**Total:** ~8–9 hours

- Setup & API Integration — 2h
- UI/UX & Tailwind Styling — 4h
- Performance Features & State Handling — 3h

---

## Live Demo

**Deployment:** https://spark-red-movies.vercel.app/login

**Video Demo:**  
https://drive.google.com/file/d/1V44y0eIuu_EmeyF0jCKvBvhVumWFprYg/view

---

## Local Setup Instructions

### 1. Prerequisites

- Node.js 18+
- npm
- TMDB API key
- Supabase project credentials

### 2. Clone and Install

```bash
git clone https://github.com/Samuel-S06/spark-red-assessment.git
cd spark-red-assessment
npm install
