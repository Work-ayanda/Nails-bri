export type Category = 'hands' | 'toes'

export interface Service {
  id: string
  name: string
  description: string
  duration: number // in minutes
  price: number
  category: Category
  deposit: number
  priceNote?: string
}

export interface Addon {
  id: string
  name: string
  price: number
  duration: number
  description: string
}

export type NailShape = 'square' | 'coffin' | 'almond' | 'stiletto' | 'round' | ''
export type NailLength = 'short' | 'medium' | 'long' | 'xl' | ''
export type ContactMethod = 'whatsapp' | 'email'

export interface NailPreferences {
  shape: NailShape
  length: NailLength
}

export interface ClientDetails {
  fullName: string
  mobile: string
  email: string
  preferredContact: ContactMethod
  specialNotes: string
  nailPreferences: NailPreferences
}

export interface InspirationData {
  photos: string[] // base64 or object URLs
  description: string
}

export interface BookingData {
  category: Category | null
  service: Service | null
  addons: Addon[]
  date: Date | null
  time: string | null
  clientDetails: ClientDetails
  inspiration: InspirationData
  subtotal: number
  deposit: number
  remainingBalance: number
  status: 'pending' | 'confirmed' | 'cancelled'
}

export type BookingStep = 
  | 'category'
  | 'service'
  | 'addons'
  | 'datetime'
  | 'details'
  | 'inspiration'
  | 'review'
  | 'deposit'
  | 'confirmation'

export const BOOKING_STEPS: { id: BookingStep; label: string; number: number }[] = [
  { id: 'category', label: 'Category', number: 1 },
  { id: 'service', label: 'Service', number: 2 },
  { id: 'addons', label: 'Add-ons', number: 3 },
  { id: 'datetime', label: 'Date & Time', number: 4 },
  { id: 'details', label: 'Details', number: 5 },
  { id: 'inspiration', label: 'Inspiration', number: 6 },
  { id: 'review', label: 'Review', number: 7 },
  { id: 'deposit', label: 'Deposit', number: 8 }
]

// Helper to get initial booking state
export const getInitialBookingData = (): BookingData => ({
  category: null,
  service: null,
  addons: [],
  date: null,
  time: null,
  clientDetails: {
    fullName: '',
    mobile: '',
    email: '',
    preferredContact: 'whatsapp',
    specialNotes: '',
    nailPreferences: {
      shape: '',
      length: ''
    }
  },
  inspiration: {
    photos: [],
    description: ''
  },
  subtotal: 0,
  deposit: 100,
  remainingBalance: 0,
  status: 'pending'
})

// Notification placeholder functions for future integration
export const sendOwnerNotification = async (booking: BookingData): Promise<void> => {
  // TODO: Implement owner notification (email/WhatsApp)
  console.log('Owner notification placeholder:', booking)
}

export const sendClientConfirmation = async (booking: BookingData): Promise<void> => {
  // TODO: Implement client confirmation email
  console.log('Client confirmation placeholder:', booking)
}

export const sendWhatsAppNotification = async (booking: BookingData): Promise<void> => {
  // TODO: Implement WhatsApp notification
  console.log('WhatsApp notification placeholder:', booking)
}
