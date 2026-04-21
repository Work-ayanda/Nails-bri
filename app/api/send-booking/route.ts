import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { kv } from '@vercel/kv'

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

    const {
      clientDetails,
      service,
      addons,
      date,
      time,
      deposit,
      subtotal,
      remainingBalance,
    } = booking

    if (!date || !time) {
      return NextResponse.json(
        { success: false, message: 'Missing date or time' },
        { status: 400 }
      )
    }

    const bookingDate = new Date(date)
    const dateKey = bookingDate.toISOString().split('T')[0]
    const slotKey = `booking:${dateKey}:${time}`

    const existingBooking = await kv.get(slotKey)

    if (existingBooking) {
      return NextResponse.json(
        { success: false, message: 'Time slot already booked' },
        { status: 409 }
      )
    }

    const bookingToStore = {
      ...booking,
      date: dateKey,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    }

    await kv.set(slotKey, bookingToStore)

    const addonsHtml =
      addons && addons.length > 0
        ? `
          <p><strong>Add-ons:</strong></p>
          <ul style="padding-left:18px; margin-top:6px;">
            ${addons
              .map(
                (addon: { name: string; price: number }) =>
                  `<li>${addon.name} — R${addon.price}</li>`
              )
              .join('')}
          </ul>
        `
        : '<p><strong>Add-ons:</strong> None</p>'

    await resend.emails.send({
      from: "Nails @ Bri's <onboarding@resend.dev>",
      to: 'delivered@resend.dev',
      subject: 'TEST BOOKING',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
          <h2 style="margin-bottom: 8px;">Hi ${clientDetails.fullName},</h2>
          <p style="margin-top: 0;">Your booking request with <strong>Nails @ Bri's</strong> has been received.</p>

          <div style="background:#f8f3ed; border:1px solid #e7d8c7; border-radius:16px; padding:20px; margin:24px 0;">
            <p><strong>Service:</strong> ${service?.name ?? 'Not selected'}</p>
            <p><strong>Date:</strong> ${bookingDate.toLocaleDateString('en-ZA', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}</p>
            <p><strong>Time:</strong> ${time ?? 'Not selected'}</p>
            ${addonsHtml}
            <p><strong>Deposit:</strong> R${deposit}</p>
            <p><strong>Total:</strong> R${subtotal}</p>
            <p><strong>Remaining Balance:</strong> R${remainingBalance}</p>
          </div>

          <p>Bridget will contact you shortly to finalise your appointment.</p>
          <p>Thank you for choosing <strong>Nails @ Bri's</strong>.</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Resend / booking error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to save booking or send confirmation.' },
      { status: 500 }
    )
  }
}
