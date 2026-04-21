import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  console.log('API ROUTE HIT')

  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('Missing RESEND_API_KEY')
      return NextResponse.json(
        { success: false, message: 'Missing RESEND_API_KEY' },
        { status: 500 }
      )
    }

    const booking = await req.json()
    console.log('BOOKING PAYLOAD:', booking)

    const result = await resend.emails.send({
      from: "Nails @ Bri's <onboarding@resend.dev>",
      to: 'delivered@resend.dev',
      subject: 'TEST BOOKING',
      html: '<p>Email system is working.</p>',
    })

    console.log('RESEND RESULT:', result)

    return NextResponse.json({ success: true, result })
  } catch (error) {
    console.error('Resend error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to send booking confirmation email.' },
      { status: 500 }
    )
  }
}
