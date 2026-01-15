import apiUrl from '@/lib/env'

export interface Court {
  id: string
  name: string
  description: string
  price_per_hour: number
  image: string
  features: string[]
}

export interface Booking {
  id: string
  court_id: string
  date: string
  time_slot: string
  customer_name: string
  customer_contact: string
  customer_email: string
  total_price: number
  payment_type: 'dp' | 'full'
  amount_paid: number
  remaining_amount: number
  payment_status: 'paid' | 'unpaid' | 'expired'
  payment_deadline: string
  status: 'pending' | 'confirmed' | 'cancelled'
}

export const TimeSlotHours = [
  '08.00 - 09.00',
  '09.00 - 10.00',
  '10.00 - 11.00',
  '11.00 - 12.00',
  '12.00 - 13.00',
  '13.00 - 14.00',
  '14.00 - 15.00',
  '15.00 - 16.00',
  '16.00 - 17.00',
  '17.00 - 18.00',
  '18.00 - 19.00',
  '19.00 - 20.00',
  '20.00 - 21.00',
  '21.00 - 22.00',
  '22.00 - 23.00',
]

const fetchBookings = async (): Promise<Booking[]> => {
  try {
    const res = await fetch(`${apiUrl}/bookings`)
    if (!res.ok) {
      throw new Error('Failed to fetch bookings')
    }
    const json = await res.json()
    return Array.isArray(json.data) ? json.data : []
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return []
  }
}

async function fetchCourts(): Promise<Court[]> {
  try {
    const res = await fetch(`${apiUrl}/courts`)
    if (!res.ok) {
      throw new Error('Failed to fetch courts')
    }
    const json = await res.json()
    return Array.isArray(json.data) ? json.data : []
  } catch (error) {
    return error instanceof Error ? [] : []
  }
}
export const getCourts = async () => {
  return await fetchCourts()
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}

export const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = []
  for (let hour = 8; hour <= 22; hour++) {
    slots.push({
      id: `slot-${hour}`,
      time: `${hour.toString().padStart(2, '0')}:00 - ${(hour + 1).toString().padStart(2, '0')}:00`,
      available: true,
    })
  }
  return slots
}

export const getBookedSlots = async (fieldId: string, date: string): Promise<string[]> => {
  const bookings = await fetchBookings()
  return bookings
    .filter(b => b.court_id === fieldId && b.date === date && b.status !== 'cancelled')
    .map(b => b.time_slot)
}
