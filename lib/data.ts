import type { Service, AddOn, Testimonial, FAQ, AdminStats } from './types'

// ========================
// PROMO BANNER CONFIG
// ========================
export const PROMO_BANNER = {
  enabled: true,
  message: "Midweek luxury sets now available — Book your Tuesday or Wednesday appointment",
  link: "#booking"
}

// ========================
// SERVICES
// ========================
export const SERVICES: Service[] = [
  {
    id: 'classic-gel',
    name: 'Classic Gel Overlay',
    description: 'A timeless gel overlay for natural, glossy nails with lasting shine and protection.',
    duration: '1h 15m',
    durationMinutes: 75,
    price: 250,
    deposit: 100,
    category: 'manicure'
  },
  {
    id: 'acrylic-full',
    name: 'Acrylic Full Set',
    description: 'Sculpted acrylic extensions for length and strength. Includes shaping and polish.',
    duration: '2h',
    durationMinutes: 120,
    price: 350,
    deposit: 100,
    category: 'manicure'
  },
  {
    id: 'acrylic-fill',
    name: 'Acrylic Fill',
    description: 'Maintenance fill for existing acrylic nails. Keeps your set looking fresh and flawless.',
    duration: '1h 30m',
    durationMinutes: 90,
    price: 280,
    deposit: 100,
    category: 'maintenance'
  },
  {
    id: 'gel-polish',
    name: 'Gel Polish',
    description: 'Long-lasting gel colour application on natural nails. Chip-free shine for weeks.',
    duration: '45m',
    durationMinutes: 45,
    price: 180,
    deposit: 100,
    category: 'manicure'
  },
  {
    id: 'nail-art',
    name: 'Nail Art Add-On',
    description: 'Custom nail art designs to elevate your set. From minimalist to statement pieces.',
    duration: '20m',
    durationMinutes: 20,
    price: 50,
    deposit: 50,
    category: 'art'
  },
  {
    id: 'soak-off',
    name: 'Soak Off',
    description: 'Gentle removal of gel or acrylic with nail care treatment to restore natural nails.',
    duration: '30m',
    durationMinutes: 30,
    price: 80,
    deposit: 50,
    category: 'maintenance'
  },
  {
    id: 'nail-repair',
    name: 'Nail Repair',
    description: 'Professional repair for broken or damaged nails. Restore your set seamlessly.',
    duration: '15m',
    durationMinutes: 15,
    price: 30,
    deposit: 30,
    category: 'maintenance'
  },
  {
    id: 'luxury-manicure',
    name: 'Luxury Manicure',
    description: 'An indulgent manicure experience with exfoliation, massage, and premium polish.',
    duration: '1h',
    durationMinutes: 60,
    price: 220,
    deposit: 100,
    category: 'manicure'
  }
]

// ========================
// ADD-ONS
// ========================
export const ADD_ONS: AddOn[] = [
  {
    id: 'french-tip',
    name: 'French Tip',
    description: 'Classic white tip for timeless elegance',
    price: 40,
    durationMinutes: 15
  },
  {
    id: 'chrome-finish',
    name: 'Chrome Finish',
    description: 'Mirror-like metallic finish',
    price: 60,
    durationMinutes: 10
  },
  {
    id: 'gems',
    name: 'Gems & Rhinestones',
    description: 'Sparkling accents for extra glamour',
    price: 50,
    durationMinutes: 15
  },
  {
    id: '3d-art',
    name: '3D Art',
    description: 'Dimensional nail art designs',
    price: 80,
    durationMinutes: 25
  },
  {
    id: 'extra-length',
    name: 'Extra Length',
    description: 'Extended nail length beyond standard',
    price: 50,
    durationMinutes: 15
  },
  {
    id: 'addon-soak-off',
    name: 'Soak Off',
    description: 'Remove previous gel/acrylic',
    price: 60,
    durationMinutes: 20
  },
  {
    id: 'addon-repair',
    name: 'Nail Repair',
    description: 'Fix broken or damaged nails',
    price: 30,
    durationMinutes: 10
  }
]

// ========================
// TESTIMONIALS
// ========================
export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Thandiwe M.',
    text: 'Absolutely loved my nails. Beautiful finish and amazing service. Bri really takes her time to perfect every detail.',
    rating: 5
  },
  {
    id: '2',
    name: 'Jessica K.',
    text: 'The booking process was so easy and professional. My nails have never looked better!',
    rating: 5
  },
  {
    id: '3',
    name: 'Nomvula S.',
    text: 'Luxury experience from start to finish. The attention to detail is incredible. Highly recommend!',
    rating: 5
  },
  {
    id: '4',
    name: 'Aisha P.',
    text: 'The attention to detail was amazing. My chrome set lasted three weeks without a single chip.',
    rating: 5
  }
]

// ========================
// FAQ
// ========================
export const FAQS: FAQ[] = [
  {
    question: 'How much is the deposit?',
    answer: 'A minimum deposit of R100 is required to secure every booking. This goes toward your final appointment total.'
  },
  {
    question: 'Is the deposit refundable?',
    answer: 'Deposits are non-refundable for late cancellations (less than 24 hours notice) or missed appointments. With 24+ hours notice, your deposit can be transferred to a rescheduled appointment.'
  },
  {
    question: 'Can I reschedule my appointment?',
    answer: 'Yes, rescheduling is subject to availability. Please notify us at least 24 hours in advance to transfer your deposit to a new date.'
  },
  {
    question: 'Can I send an inspiration picture?',
    answer: 'Absolutely! We encourage you to share inspiration photos during booking or via WhatsApp. This helps us prepare for your appointment and ensures we achieve your desired look.'
  },
  {
    question: 'How will I be contacted after booking?',
    answer: 'You\'ll receive confirmation via your preferred contact method (WhatsApp or email) within 24 hours of booking. We\'ll confirm your appointment details and answer any questions.'
  },
  {
    question: 'Do you accept referral or promo codes?',
    answer: 'Yes! Enter any valid referral or promotional codes during the booking process. Applicable discounts will be applied to your final balance.'
  },
  {
    question: 'Can I rebook easily as a returning client?',
    answer: 'Yes, returning clients can quickly rebook using their previous preferences. We\'re also launching a loyalty programme with exclusive perks soon!'
  }
]

// ========================
// BUSINESS HOURS
// ========================
export const BUSINESS_HOURS = {
  monday: { open: '09:00', close: '18:00', closed: false },
  tuesday: { open: '09:00', close: '18:00', closed: false },
  wednesday: { open: '09:00', close: '18:00', closed: false },
  thursday: { open: '09:00', close: '18:00', closed: false },
  friday: { open: '09:00', close: '18:00', closed: false },
  saturday: { open: '08:00', close: '15:00', closed: false },
  sunday: { open: '', close: '', closed: true }
}

// ========================
// REFERRAL SOURCES
// ========================
export const REFERRAL_SOURCES = [
  'Instagram',
  'TikTok',
  'Friend referral',
  'Influencer',
  'Google search',
  'Returning client',
  'Walk-in / existing customer',
  'Other'
]

// ========================
// NAIL SHAPES
// ========================
export const NAIL_SHAPES = [
  { value: 'square', label: 'Square' },
  { value: 'coffin', label: 'Coffin' },
  { value: 'almond', label: 'Almond' },
  { value: 'stiletto', label: 'Stiletto' },
  { value: 'round', label: 'Round' }
]

// ========================
// NAIL LENGTHS
// ========================
export const NAIL_LENGTHS = [
  { value: 'short', label: 'Short' },
  { value: 'medium', label: 'Medium' },
  { value: 'long', label: 'Long' },
  { value: 'xl', label: 'XL' }
]

// ========================
// MOCK ADMIN STATS
// ========================
export const MOCK_ADMIN_STATS: AdminStats = {
  upcomingBookings: 12,
  depositsPending: 3,
  confirmedAppointments: 8,
  returningClients: 45,
  referralBookings: 7
}

// ========================
// GALLERY CATEGORIES
// ========================
export const GALLERY_CATEGORIES = [
  { id: 'nude', title: 'Nude Sets', description: 'Elegant neutral tones' },
  { id: 'bold', title: 'Bold Sets', description: 'Statement colours' },
  { id: 'art', title: 'Nail Art', description: 'Creative designs' },
  { id: 'glam', title: 'Soft Glam', description: 'Subtle sparkle' }
]

// ========================
// LOYALTY BENEFITS
// ========================
export const LOYALTY_BENEFITS = [
  {
    title: 'Priority Booking',
    description: 'Get first access to appointment slots'
  },
  {
    title: 'Exclusive Offers',
    description: 'Seasonal discounts just for loyal clients'
  },
  {
    title: 'Special Perks',
    description: 'Complimentary add-ons and upgrades'
  },
  {
    title: 'Easy Rebooking',
    description: 'Save preferences for faster booking'
  }
]

// ========================
// POLICIES
// ========================
export const POLICIES = [
  'A minimum deposit of R100 is required to secure every booking',
  'Deposits go toward the final appointment total',
  'Deposits are non-refundable for late cancellations or missed appointments',
  'Clients arriving more than 15 minutes late may need to be rescheduled',
  'Please send inspiration photos in advance where possible',
  'Rescheduling is subject to availability'
]

// ========================
// CONTACT INFO
// ========================
export const CONTACT_INFO = {
  businessName: "Nails @ Bri's",
  tagline: 'Luxury Nail Studio',
  owner: 'Bridget Chisangwa',
  whatsapp: '+27629704661',
  whatsappLink: 'https://wa.me/27629704661',
  email: 'hello@nailsatbris.co.za',
  prefillMessage: "Hi Bridget, I've just submitted a booking request with Nails @ Bri's and would like to confirm my appointment."
}
