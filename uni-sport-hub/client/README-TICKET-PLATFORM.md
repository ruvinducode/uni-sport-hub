# Sports Ticket Booking Platform – Frontend Specification

## 1. Project Overview

This project is a web-based sports ticket booking platform that allows users to:

- Browse upcoming sports matches/events
- View detailed match information
- Select seats or ticket categories
- Add tickets to cart
- Complete checkout and payment
- Receive booking confirmation (e-ticket)
- Manage their bookings

The goal is to provide a **fast, intuitive, and user-friendly booking experience** across devices.

---

## 2. Target Users

- Sports fans (casual + frequent)
- First-time visitors
- Returning users
- Mobile-heavy users
- Desktop users (office/home)

---

## 3. Main User Journeys

### 3.1 Booking Flow

1. Browse matches
2. Select match
3. View match details
4. Select seats or ticket type
5. Add to cart
6. Login/Register (if required)
7. Checkout
8. Payment
9. Booking confirmation

### 3.2 Returning User Flow

1. Login
2. View "My Bookings"
3. Download e-ticket

---

## 4. Required Pages

### 4.1 Home Page

- Hero section (featured matches)
- Upcoming matches
- Search bar
- Categories (sport type)
- CTA: "Browse Matches"

### 4.2 Match Listing Page

- Filters:
  - Date
  - Sport type
  - Location
  - Team
- Match cards:
  - Teams
  - Date/time
  - Venue
  - Price starting from
- CTA: "View Details"

### 4.3 Match Details Page

- Match info:
  - Teams
  - Venue
  - Date/time
  - Description
- Ticket types or seat map
- Pricing
- CTA: "Select Seats" / "Book Now"

### 4.4 Seat Selection Page

- Seat map / seat grid
- Seat states:
  - Available
  - Selected
  - Reserved
  - Booked
- Ticket quantity selector
- Booking summary (sticky)
- CTA: "Proceed to Checkout"

### 4.5 Cart Page

- Selected tickets
- Quantity
- Price breakdown
- Remove/edit items
- CTA: "Checkout"

### 4.6 Checkout Page

- User details form
- Booking summary
- Payment options
- CTA: "Pay Now"

### 4.7 Booking Confirmation Page

- Success message
- Booking ID
- Match details
- QR code / e-ticket
- CTA: "Download Ticket"

### 4.8 Authentication Pages

- Login
- Register

### 4.9 User Dashboard

- Profile info
- My bookings
- Ticket history

---

## 5. Core UI Components

- Navbar
- Footer
- Hero banner
- Match card
- Search bar
- Filter panel
- Seat map / seat grid
- Ticket selector
- Booking summary panel
- Form inputs
- Buttons (primary, secondary)
- Alerts (success/error)
- Modal dialogs
- Loader/skeleton

---

## 6. Component States

Each component must support:

- Loading
- Empty
- Error
- Success
- Disabled
- Selected
- Unavailable

### Example: Seat Component

- Available → clickable
- Selected → highlighted
- Booked → disabled
- Reserved → temporarily locked

---

## 7. UX Requirements

- Simple, linear booking flow
- Minimal steps to complete booking
- Clear CTA buttons
- Visible pricing before checkout
- Booking summary always visible (especially in checkout)
- Progress indicator for multi-step flow
- Instant feedback on actions
- Prevent user confusion in seat selection

---

## 8. Responsive Design

- Mobile-first approach
- Fully responsive (mobile, tablet, desktop)
- Sticky CTA on mobile
- Scrollable seat selection
- Readable typography on small screens
- Touch-friendly buttons

---

## 9. Accessibility Requirements

- Semantic HTML
- Keyboard navigation support
- Proper labels for inputs
- Clear error messages
- Visible focus states
- Sufficient color contrast
- Avoid color-only indicators (use icons/labels too)

---

## 10. Design System Guidelines

### Colors

- Primary: Brand color (sports-themed)
- Success: Green (available)
- Error: Red (booked/error)
- Warning: Yellow (limited)
- Info: Blue (selected)

### Typography

- Bold headings
- Clear hierarchy
- Readable body text

### Spacing

- Consistent padding/margin scale
- Use grid system

### Components

- Rounded cards
- Consistent button styles
- Uniform form inputs

---

## 11. Tech Stack

- React (Vite or Create React App)
- Tailwind CSS
- React Router
- Context API / Redux (optional)
- Mock API / JSON data initially

---

## 12. Suggested Folder Structure

```
src/
  index.js
  App.js
  index.css
  context/
    TicketContext.js          # Cart, fan user, bookings
  data/
    matches.js                # Mock matches / catalog
  components/
    TicketProtectedRoute.js
    HomeNavbar.js
    tickets/
      TicketNavbar.js
      PublicLayout.js
      BookingLayout.js
      SectionHeading.js
      StepIndicator.js
      MatchCard.js
      SeatMap.js
  pages/
    home/
      HomePage.js
    auth/
      Login.js
      Register.js
    tickets/
      MatchListPage.js
      MatchDetailPage.js
      SeatSelectionPage.js
      CartPage.js
      CheckoutPage.js
      BookingConfirmationPage.js
      TicketLoginPage.js
      TicketRegisterPage.js
      MyBookingsPage.js
  hooks/                      # Optional shared hooks
  services/                   # Optional API clients
  utils/
```

---

## 13. Ticket routes (reference)

| Path | Purpose |
|------|---------|
| `/matches` | Match listing |
| `/matches/:matchId` | Match details |
| `/matches/:matchId/seats` | Seat selection |
| `/cart` | Cart |
| `/checkout` | Checkout |
| `/booking/:bookingId/confirmation` | Confirmation |
| `/tickets/login` | Fan login (local demo) |
| `/tickets/register` | Fan register |
| `/my-bookings` | Dashboard (protected) |

---

*This document describes the frontend specification for the sports ticket booking module. Implementation may evolve; keep this file updated when flows or routes change.*
