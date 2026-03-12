# Ecoyaan Checkout Flow MVP

A streamlined, responsive checkout experience built with Next.js 14+, demonstrating Server-Side Rendering (SSR), robust form validation, and clean state management.

## 🚀 Tech Stack
- **Framework:** Next.js (App Router)
- **State Management:** Zustand (Lightweight alternative to Redux)
- **Form Handling:** React Hook Form + Zod (Type-safe validation)
- **Styling:** Tailwind CSS + Lucide Icons
- **Deployment:** Vercel

## 🛠️ Architectural Choices
1. **SSR for Data Fetching:** I utilized Next.js Server Components to fetch cart data. This ensures the initial page load is fast and SEO-friendly, as the HTML is pre-rendered with data.
2. **Zustand for State:** Since the checkout is a multi-step flow, Zustand was chosen over Prop Drilling or Context API. It provides a clean, decoupled store that persists data across steps without unnecessary re-renders.
3. **Zod Validation:** To meet the 10-digit phone and 6-digit PIN code requirements, I implemented a Zod schema. This provides real-time feedback and ensures the "Pay" button is only active when data is valid.
4. **UX/UI:** The design follows a nature-inspired palette (greens and earthy tones) consistent with Ecoyaan's branding. I included loading states and transition animations to make the flow feel premium.

## 🏁 Getting Started

1. **Clone the repo:**
   ```bash
   git clone <your-repo-link>
   cd ecoyaan-checkout
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```
Open http://localhost:3000/checkout to see the result.

---