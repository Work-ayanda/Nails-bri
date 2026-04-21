import type { Service, Addon } from './types'

// ========================
// SERVICES BY CATEGORY
// ========================

export const HANDS_SERVICES: Service[] = [
  {
    id: 'acrylic-tips',
    name: 'Acrylic Tips',
    description: 'Classic acrylic extension service',
    duration: 120,
    price: 400,
    category: 'hands',
    deposit: 100,
  },
  {
    id: 'gel-overlay',
    name: 'Gel Overlay',
    description: 'Clean gel overlay on natural nails',
    duration: 75,
    price: 280,
    category: 'hands',
    deposit: 100,
  },
  {
    id: 'acrylic-overlay',
    name: 'Acrylic Overlay',
    description: 'Acrylic overlay for strength and structure',
    duration: 90,
    price: 350,
    category: 'hands',
    deposit: 100,
  },
  {
    id: 'builder-gel-tips',
    name: 'Builder Gel with Tips',
    description: 'Builder gel extensions with tips',
    duration: 120,
    price: 400,
    category: 'hands',
    deposit: 100,
  },
  {
    id: 'sculpturing-nails',
    name: 'Sculpturing Nails',
    description: 'Custom sculpted nail extensions',
    duration: 150,
    price: 550,
    category: 'hands',
    deposit: 100,
  },
  {
    id: 'manicure-gel',
    name: 'Manicure with Gel',
    description: 'Full manicure finished with gel polish',
    duration: 75,
    price: 350,
    category: 'hands',
    deposit: 100,
  },
  {
    id: 'mini-manicure',
    name: 'Mini Manicure',
    description: 'Quick manicure refresh',
    duration: 45,
    price: 200,
    category: 'hands',
    deposit: 100,
  },
  {
    id: 'ombre-nails',
    name: 'Ombré Nails',
    description: 'Soft gradient ombré finish',
    duration: 120,
    price: 450,
    category: 'hands',
    deposit: 100,
  },
  {
    id: 'french-gel',
    name: 'French Gel',
    description: 'Classic French gel finish',
    duration: 75,
    price: 300,
    category: 'hands',
    deposit: 100,
  },
  {
    id: 'french-acrylic',
    name: 'French Acrylic Tips',
    description: 'French tip acrylic extension set',
    duration: 120,
    price: 480,
    category: 'hands',
    deposit: 100,
  },
  {
    id: 'buff-shine',
    name: 'Buff and Shine',
    description: 'Natural nail buff and shine finish',
    duration: 30,
    price: 180,
    category: 'hands',
    deposit: 100,
  },
  {
    id: 'soak-off-acrylic',
    name: 'Soak Off (Acrylic)',
    description: 'Acrylic removal only',
    duration: 30,
    price: 120,
    category: 'hands',
    deposit: 100,
  },
]

export const TOES_SERVICES: Service[] = [
  {
    id: 'gel-toes',
    name: 'Gel Toes',
    description: 'Gel polish for toes',
    duration: 45,
    price: 200,
    category: 'toes',
    deposit: 100,
  },
  {
    id: 'gel-pedi',
    name: 'Gel Pedicure',
    description: 'Full pedicure finished with gel',
    duration: 90,
    price: 450,
    category: 'toes',
    deposit: 100,
  },
  {
    id: 'mini-pedicure',
    name: 'Mini Pedicure',
    description: 'Quick pedicure refresh',
    duration: 45,
    price: 250,
    category: 'toes',
    deposit: 100,
  },
]

// ========================
// ADD-ONS
// ========================

export const ADDONS: Addon[] = [
  {
    id: 'nail-art',
    name: 'Nail Art (per nail)',
    price: 20,
    duration: 10,
    description: 'Detailed nail art charged per nail',
  },
  {
    id: 'extreme-nail-art',
    name: 'Extreme Nail Art',
    price: 35,
    duration: 15,
    description: 'Advanced statement nail art',
  },
]

// ========================
// BUSINESS HOURS
// ========================

export const BUSINESS_HOURS: Record<
  string,
  { open: string; close: string; closed: boolean }
> = {
  monday: { open: '09:00', close: '18:00', closed: false },
  tuesday: { open: '09:00', close: '18:00', closed: false },
  wednesday: { open: '09:00', close: '18:00', closed: false },
  thursday: { open: '09:00', close: '18:00', closed: false },
  friday: { open: '09:00', close: '18:00', closed: false },
  saturday: { open: '08:00', close: '15:00', closed: false },
  sunday: { open: '', close: '', closed: true },
}

export const TIME_SLOTS = [
  '09:00','09:30','10:00','10:30','11:00','11:30',
  '12:00','12:30','13:00','13:30','14:00','14:30',
  '15:00','15:30','16:00','16:30','17:00','17:30'
]

export const SATURDAY_TIME_SLOTS = [
  '08:00','08:30','09:00','09:30','10:00','10:30',
  '11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30'
]

// ========================
// NAIL PREFERENCES
// ========================

export const NAIL_SHAPES = [
  { value: 'square', label: 'Square' },
  { value: 'coffin', label: 'Coffin' },
  { value: 'almond', label: 'Almond' },
  { value: 'stiletto', label: 'Stiletto' },
  { value: 'round', label: 'Round' },
]

export const NAIL_LENGTHS = [
  { value: 'short', label: 'Short' },
  { value: 'medium', label: 'Medium' },
  { value: 'long', label: 'Long' },
  { value: 'xl', label: 'XL' },
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
  prefillMessage:
    "Hi Bridget, I've just submitted a booking request with Nails @ Bri's and would like to confirm my appointment.",
}

// ========================
// POLICIES
// ========================

export const POLICIES = [
  'Minimum R100 deposit required to secure your appointment',
  'Deposits go toward the final total',
  'Late cancellations or missed appointments may forfeit the deposit',
  'Arrivals more than 15 minutes late may require rescheduling',
]

// ========================
// MINIMUM DEPOSIT
// ========================

export const MINIMUM_DEPOSIT = 100
