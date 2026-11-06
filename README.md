# CampusFind — College Lost & Found Platform

**CampusFind** is an official, centralized digital recovery platform exclusively designed for university campuses. It enables students, faculty, and authorized campus staff to report lost belongings, view recovered items, and securely claim property through verified administration workflows.

> *"Every lost belonging deserves a way back home."*

---

## 🎨 Visual Identity & Design System

- **Deep Burgundy (`#681D35`)**: Primary institutional accent for brand authority, primary buttons, and key badges.
- **Muted Burgundy (`#8C4058`)**: Secondary accent for icon frames, subheaders, and hover highlights.
- **Warm Cream (`#F7F3EF`)**: Soft, welcoming campus background replacing harsh clinical whites.
- **Card Background (`#FFFFFF`)**: Clean, rounded cards with refined drop shadows.
- **Dark Charcoal (`#282326`)**: High-contrast, legible typography using *Plus Jakarta Sans* and *Playfair Display*.
- **Soft Grey (`#777078`)**: Secondary captions, timestamps, and locations.

---

## 🚀 Key Functional Modules

### 1. Homepage (`/`)
- **Hero Section**: *"Lost Something? Let's Find It."* with prominent dual CTA buttons:
  - `I Lost Something` → Direct access to Student Lost Report form.
  - `I Found Something` → Direct access to Staff Found Item registration.
- **Dynamic Live Statistics**: Real-time counter metrics for:
  - *Total Items Found*
  - *Items Successfully Returned*
  - *Active Lost Reports*
  - *Items Awaiting Claims*
- **Recently Found Items**: Curated image cards showing item photograph, title, category, building location, date recovered, and status.

### 2. Found Items Directory (`Browse Found Items`)
- Search by item name or description keywords.
- Multi-dimensional filtering:
  - **Category**: Electronics, Books and Notes, Bags, Clothing, ID Cards, Accessories, Water Bottles, Keys, Other.
  - **Campus Location**: Library, Science Block, Engineering Complex, Cafeteria, Sports Gym, etc.
  - **Availability Status**: *Available to Claim*, *Claim Under Review*, *Returned*.
  - **Date Recovered**: Specific date filter.
- **Item Detail Modal**: Large photograph, location context, staff ID notes, and the **"Claim This Item"** button.

### 3. Student Lost Report Form (`Report Lost Item`)
- Easy-to-use form with image upload, item category, date lost, last seen location, and private distinguishing features.
- Generates a unique tracking ID (`LST-2026-XXXX`).
- **Smart Matching Detection**: Automatically runs algorithm upon submission. If a potential match exists in the campus database, alerts the student with match confidence score and direct link.

### 4. Staff Found Item Registration (`Report Found Item`)
- Exclusively authorized for campus security and staff.
- Includes custody registration fields: exact building/room, confidential internal verification notes (e.g., serial numbers, wallet cash amounts, markings).
- Immediately scans pending student lost reports and dispatches in-app notifications to matching students.

### 5. Secure Item Claiming Workflow
- **Claim Form**: Claimant specifies unique identifying characteristics, answers security verification questions, and uploads reference proof (receipt, past photo).
- **Human Verification Requirement**: No automatic handover based purely on image similarity. All claims are placed in `"Pending Verification"`.
- **Side-by-Side Admin Review**: Administrators compare the found item photo with the claimant's reference photo, inspect answers, and either:
  - **Approve Claim**: Dispatches official collection office instructions (e.g., Admin Block, Room 102).
  - **Reject Claim**: Safely notifies claimant with reason note without exposing sensitive catalog info.
  - **Confirm Handed Over**: Marks both the found item and corresponding lost report as `"Returned"`.

### 6. My Reports Dashboard (`My Reports`)
- **My Lost Reports**: Status tracker bar (*Submitted* → *Scanning* → *Claim Under Review* → *Returned*).
- **My Claims**: Real-time claim status and pickup office details.
- **Potential Matches Tab**: Suggestions tailored to user's reports.
- **Notification Center**: Real-time alerts with unread badges.

### 7. Administrative Control Center (`Admin Dashboard`)
- Complete claims verification queue with side-by-side photographic comparison.
- Full catalog management: edit, view, or remove listings.
- Student lost reports registry.
- Staff custody permissions directory.

---

## 👥 Campus Identity Switcher

A quick-switch demo bar is included at the top of the interface to test all roles:
- **Student Mode (`Alex Mercer`)**: Submit lost reports, browse catalog, submit claims, view personal dashboard.
- **Staff Mode (`Officer Rajesh Kumar`)**: Register found items, log security custody notes.
- **Administrator Mode (`Dean Arthur Campbell`)**: Full approval authority, side-by-side photo review, and inventory deletion.

---

## 💻 Tech Stack

- **Frontend**: React 18, Vite 5, Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Database Layer**: LocalStorage / State engine with full CRUD and seed data

---

## 🛠️ How to Run & Build

```bash
# 1. Install dependencies
npm install

# 2. Start Vite dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```
Visit **`http://localhost:3000/`** in your browser.
