import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export async function GET() {
  try {
    const keys = await kv.keys('booking:*')

    if (!keys.length) {
      return NextResponse.json([])
    }

    const bookings = await Promise.all(
      keys.map(async (key) => {
        const booking = await kv.get(key)
        return booking
      })
    )

    const slots = bookings
      .filter(Boolean)
      .map((booking: any) => ({
        date: booking.date,
        time: booking.time,
        status: booking.status ?? 'confirmed',
      }))

    return NextResponse.json(slots)
  } catch (error) {
    console.error('Failed to fetch booked slots:', error)
    return NextResponse.json([], { status: 500 })
  }
}
