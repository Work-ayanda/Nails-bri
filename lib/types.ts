// Booking Types for Nails @ Bri's

export interface Service {
  id: string
  name: string
  description: string
  duration: string
  durationMinutes: number
  price: number
  deposit: number
  category: 'manicure' | 'pedicure' | 'art' | 'maintenance'
}

export interface AddOn {
  id: string
  name: string
  description: string
  price: number
  durationMinutes?: number
}

export interface TimeSlot {
  time: string
  available: boolean
}

export interface NailPreferences {
  shape: 'square' | 'coffin' | 'almond' | 'stiletto' | 'round' | ''
  length: 'short' | 'medium' | 'long' | 'xl' | ''
}

export interface ClientDetails {
  fullName: string
  mobile: string
  email: string
  preferredContact: 'whatsapp' | 'email' | 'sms'
  specialNotes: string
  nailPreferences: NailPreferences
}

export interface InspirationUpload {
  file: File | null
  preview: string | null
  description: string
}

export interface ReferralInfo {
  referralCode: string
  promoCode: string
  source: string
  applied: boolean
  discount: number
}

export interface ReceiptUpload {
  file: File | null
  preview: string | null
  uploaded: boolean
}

export interface BookingData {
  selectedService: Service | null
  selectedAddOns: AddOn[]
  selectedDate: Date | null
  selectedTime: string | null
  clientDetails: ClientDetails
  inspiration: InspirationUpload
  referral: ReferralInfo
  receipt: ReceiptUpload
  subtotal: number
  deposit: number
  remainingBalance: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt: Date
}

export interface Testimonial {
  id: string
  name: string
  text: string
  rating: number
}

export interface GalleryItem {
  id: string
  title: string
  category: string
  image: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface AdminStats {
  upcomingBookings: number
  depositsPending: number
  confirmedAppointments: number
  returningClients: number
  referralBookings: number
}
