import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
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

    const formattedDate = date
      ? new Date(date).toLocaleDateString('en-ZA', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : 'Not selected'

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

    // Email to client
    await resend.emails.send({
      from: "Nails @ Bri's <onboarding@resend.dev>",
      to: 'delivered@resend.dev',
      subject: "Booking Confirmation — Nails @ Bri's",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
          <h2 style="margin-bottom: 8px;">Hi ${clientDetails.fullName},</h2>
          <p style="margin-top: 0;">Your booking request with <strong>Nails @ Bri's</strong> has been received.</p>

          <div style="background:#f8f3ed; border:1px solid #e7d8c7; border-radius:16px; padding:20px; margin:24px 0;">
            <p><strong>Service:</strong> ${service?.name ?? 'Not selected'}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
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

    // Email to owner
    await resend.emails.send({
      from: "Nails @ Bri's <onboarding@resend.dev>",
      to: 'delivered@resend.dev',
      subject: 'New Booking Request — Nails @ Bri’s',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
          <h2 style="margin-bottom: 8px;">New booking received</h2>

          <div style="background:#f8f3ed; border:1px solid #e7d8c7; border-radius:16px; padding:20px; margin:24px 0;">
            <p><strong>Client:</strong> ${clientDetails.fullName}</p>
            <p><strong>Mobile:</strong> ${clientDetails.mobile}</p>
            <p><strong>Email:</strong> ${clientDetails.email}</p>
            <p><strong>Preferred Contact:</strong> ${clientDetails.preferredContact}</p>
            <p><strong>Service:</strong> ${service?.name ?? 'Not selected'}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${time ?? 'Not selected'}</p>
            ${addonsHtml}
            <p><strong>Deposit:</strong> R${deposit}</p>
            <p><strong>Total:</strong> R${subtotal}</p>
            <p><strong>Remaining Balance:</strong> R${remainingBalance}</p>
            <p><strong>Notes:</strong> ${clientDetails.specialNotes || 'None'}</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Resend error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to send booking confirmation email.' },
      { status: 500 }
    )
  }
}
