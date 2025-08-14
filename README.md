# Go Travel Itinerary

A simple, scalable travel itinerary platform built with **Next.js App Router**. Search and manage flights, hotels, and activities using the [Booking API](https://rapidapi.com/booking-com/api/booking-com15/) from RapidAPI.com.

---

## Features

- **Search Flights, Hotels, Activities:**  
  Find options using Booking API (RapidAPI).  
  _Only the top 5 results are shown for each search._

- **Add/Delete to Itinerary:**  
  Save or remove items from your personal itinerary.

- **Flight Mock Option:**  
  Due to frequent API failures, a mock flight option is available for demo/testing.

- **Local Storage:**  
 Itinerary is saved to local storage using Zustand for persistence.

---

## Tech Stack

- **Next.js (App Router)**
- **TypeScript + Zod** (for schema validation & types)
- **React Query** (data fetching & caching)
- **Axios** (API requests)
- **Zustand** (state management & local storage)
- **React Hook Form** (forms & validation)

---

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/go-travel-itinerary.git
   cd go-travel-itinerary
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**  
   Create a `.env.local` file:

   ```env
   RAPIDAPI_KEY=your_api_key
   RAPIDAPI_HOST=booking-com15.p.rapidapi.com
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

- **Search:**  
  Use the forms to search for flights, hotels, or activities.  
  _If the flight API fails, use mock option to view layout structure._

- **Add/Delete:**  
  Click to add or remove items from your itinerary.

- **Persistence:**  
  Flights are stored in local storage for a seamless experience.

---

## Code Structure

- **/components** – UI components for flights, hotels, activities, itinerary, etc.
- **/hooks** – Custom hooks for API calls and state.
- **/lib/schemas** – Zod schemas for type-safe validation.
- **/app** – Next.js App Router pages and API routes.

---

## Live Demo

[gotravelsco.vercel.app](https://gotravelsco.vercel.app)

---

## Notes

- **Mock Flights:**  
  If the Booking API fails, mock flight data is used for reliability.
- **Scalable:**  
  Easily extendable to more features or providers.
---
