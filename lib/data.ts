import type { Service, Addon } from './types'

// ========================
// SERVICES BY CATEGORY
// ========================
export const HANDS_SERVICES: Service[] = [
  {
    id: 'acrylic-full',
    name: 'Acrylic Full Set',
    description: 'Full acrylic nail enhancement with your choice of shape and length',
    duration: 120,
    price: 350,
    category: 'hands',
    deposit: 100
  },
  {
    id: 'acrylic-fill',
    name: 'Acrylic Fill',
    description: 'Maintenance fill for existing acrylic nails',
    duration: 90,
    price: 280,
    category: 'hands',
    deposit: 100
  },
  {
    id: 'gel-overlay',
    name: 'Classic Gel Overlay',
    description: 'Protective gel coating over natural nails',
    duration: 75,
    price: 250,
    category: 'hands',
    deposit: 100
  },
  {
    id: 'gel-polish',
    name: 'Gel Polish',
    description: 'Long-lasting gel polish application',
    duration: 45,
    price: 180,
    category: 'hands',
    deposit: 100
  },
  {
    id: 'soak-off',
    name: 'Soak Off',
    description: 'Safe removal of existing gel or acrylic',
    duration: 30,
    price: 80,
    category: 'hands',
    deposit: 100
  },
  {
    id: 'nail-repair',
    name: 'Nail Repair',
    description: 'Repair for broken or damaged nails',
    duration: 15,
    price: 30,
    category: 'hands',
    deposit: 100,
    priceNote: 'per nail'
  },
  {
    id: 'nail-art-basic',
    name: 'Nail Art Basic',
    description: 'Simple nail art designs and accents',
    duration: 20,
    price: 50,
    category: 'hands',
    deposit: 100
  }
]

export const TOES_SERVICES: Service[] = [
  {
    id: 'gel-toes',
    name: 'Gel Toes',
    description: 'Gel polish application for toes',
    duration: 45,
    price: 180,
    category: 'toes',
    deposit: 100
  },
  {
    id: 'french-toes',
    name: 'French Toes',
    description: 'Classic French tip pedicure',
    duration: 60,
    price: 220,
    category: 'toes',
    deposit: 100
  },
  {
    id: 'basic-pedicure',
    name: 'Basic Pedicure',
    description: 'Essential pedicure with nail shaping and polish',
    duration: 60,
    price: 250,
    category: 'toes',
    deposit: 100
  },
  {
    id: 'luxury-pedicure',
    name: 'Luxury Pedicure',
    description: 'Premium pedicure with exfoliation and massage',
    duration: 80,
    price: 320,
    category: 'toes',
    deposit: 100
  },
  {
    id: 'toe-nail-art',
    name: 'Toe Nail Art',
    description: 'Decorative nail art for toes',
    duration: 20,
    price: 50,
    category: 'toes',
    deposit: 100
  }
]

// ========================
// ADD-ONS
// ========================
export const ADDONS: Addon[] = [
  {
    id: 'french-tip',
    name: 'French Tip',
    price: 50,
    duration: 15,
    description: 'Classic French tip finish'
  },
  {
    id: 'chrome-finish',
    name: 'Chrome Finish',
    price: 80,
    duration: 10,
    description: 'Mirror-like chrome powder finish'
  },
  {
    id: 'gems',
    name: 'Gems / Rhinestones',
    price: 60,
    duration: 15,
    description: 'Crystal embellishments'
  },
  {
    id: '3d-art',
    name: '3D Art',
    price: 100,
    duration: 30,
    description: 'Dimensional nail art designs'
  },
  {
    id: 'ombre',
    name: 'Ombre',
    price: 70,
    duration: 20,
    description: 'Gradient color blend effect'
  },
  {
    id: 'extra-length',
    name: 'Extra Length',
    price: 50,
    duration: 15,
    description: 'Additional nail length'
  },
  {
    id: 'addon-soak-off',
    name: 'Soak Off',
    price: 50,
    duration: 20,
    description: 'Removal of existing product'
  },
  {
    id: 'repair-per-nail',
    name: 'Repair Per Nail',
    price: 30,
    duration: 10,
    description: 'Individual nail repair'
  },
  {
    id: 'cuticle-care',
    name: 'Cuticle Care Upgrade',
    price: 40,
    duration: 10,
    description: 'Premium cuticle treatment'
  },
  {
    id: 'luxury-finish',
    name: 'Luxury Finish',
    price: 60,
    duration: 15,
    description: 'Premium top coat with extra shine'
  }
]

// ========================
// BUSINESS HOURS
// ========================
export const BUSINESS_HOURS: Record<string, { open: string; close: string; closed: boolean }> = {
  monday: { open: '09:00', close: '18:00', closed: false },
  tuesday: { open: '09:00', close: '18:00', closed: false },
  wednesday: { open: '09:00', close: '18:00', closed: false },
  thursday: { open: '09:00', close: '18:00', closed: false },
  friday: { open: '09:00', close: '18:00', closed: false },
  saturday: { open: '08:00', close: '15:00', closed: false },
  sunday: { open: '', close: '', closed: true }
}

export const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
]

export const SATURDAY_TIME_SLOTS = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30'
]

// ========================
// NAIL PREFERENCES
// ========================
export const NAIL_SHAPES = [
  { value: 'square', label: 'Square' },
  { value: 'coffin', label: 'Coffin' },
  { value: 'almond', label: 'Almond' },
  { value: 'stiletto', label: 'Stiletto' },
  { value: 'round', label: 'Round' }
]

export const NAIL_LENGTHS = [
  { value: 'short', label: 'Short' },
  { value: 'medium', label: 'Medium' },
  { value: 'long', label: 'Long' },
  { value: 'xl', label: 'XL' }
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

// ========================
// POLICIES
// ========================
export const POLICIES = [
  'Minimum R100 deposit required to secure your appointment',
  'Deposits go toward the final total',
  'Late cancellations or missed appointments may forfeit the deposit',
  'Arrivals more than 15 minutes late may require rescheduling'
]

// ========================
// MINIMUM DEPOSIT
// ========================
export const MINIMUM_DEPOSIT = 100
