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
        {
          success: false,
          message: 'Missing RESEND_API_KEY',
        },
        {
          status: 500,
        }
      )
    }

    const booking = await req.json()

    const {
      clientDetails,
      service,
      addons,
      date,
      time,
      subtotal,
    } = booking

    if (!date || !time) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing date or time',
        },
        {
          status: 400,
        }
      )
    }

    const bookingDate = new Date(date)

    const dateKey = bookingDate.toISOString().split('T')[0]

    const slotKey = `booking:${dateKey}:${time}`

    const existingBooking = await kv.get(slotKey)

    if (existingBooking) {
      return NextResponse.json(
        {
          success: false,
          message: 'Time slot already booked',
        },
        {
          status: 409,
        }
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

    // CLIENT EMAIL
    await resend.emails.send({
      from: "Nails @ Bri's <bookings@nailsbybribookings.co.za>",

      to: clientDetails.email,

      subject: "Booking Request Received — Nails @ Bri's",

      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
          
          <h2 style="margin-bottom: 8px;">
            Hi ${clientDetails.fullName},
          </h2>

          <p style="margin-top: 0;">
            Your booking request with 
            <strong>Nails @ Bri's</strong> 
            has been received.
          </p>

          <div style="background:#f8f3ed; border:1px solid #e7d8c7; border-radius:16px; padding:20px; margin:24px 0;">
            
            <p>
              <strong>Service:</strong> 
              ${service?.name ?? 'Not selected'}
            </p>

            <p>
              <strong>Date:</strong> 
              ${bookingDate.toLocaleDateString('en-ZA', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>

            <p>
              <strong>Time:</strong> 
              ${time ?? 'Not selected'}
            </p>

            ${addonsHtml}

            <p>
              <strong>Total:</strong> 
              R${subtotal}
            </p>

          </div>

          <p>
            Payment will be made in-store during your appointment.
          </p>

          <p>
            Bridget will contact you shortly to finalise your booking.
          </p>

          <a
            href="https://maps.app.goo.gl/6S96Rga1RA1DDmUu9"
            style="
              display:inline-block;
              padding:12px 20px;
              background:#111111;
              color:#ffffff;
              text-decoration:none;
              border-radius:10px;
              margin-top:16px;
            "
          >
            View Salon Location
          </a>

          <br />

          <a
            href="https://wa.me/27636236915"
            style="
              display:inline-block;
              padding:12px 20px;
              background:#25D366;
              color:#ffffff;
              text-decoration:none;
              border-radius:10px;
              margin-top:12px;
            "
          >
            Contact on WhatsApp
          </a>

        </div>
      `,
    })

    // OWNER EMAIL
    await resend.emails.send({
      from: "Nails @ Bri's <bookings@nailsbybribookings.co.za>",

      to: 'nailsbybri.bookings@gmail.com',

      subject: 'New Booking Request — Nails @ Bri’s',

      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
          
          <h2 style="margin-bottom: 8px;">
            New Booking Received
          </h2>

          <div style="background:#f8f3ed; border:1px solid #e7d8c7; border-radius:16px; padding:20px; margin:24px 0;">

            <p>
              <strong>Client:</strong> 
              ${clientDetails.fullName}
            </p>

            <p>
              <strong>Mobile:</strong> 
              ${clientDetails.mobile}
            </p>

            <p>
              <strong>Email:</strong> 
              ${clientDetails.email}
            </p>

            <p>
              <strong>Preferred Contact:</strong> 
              ${clientDetails.preferredContact}
            </p>

            <p>
              <strong>Service:</strong> 
              ${service?.name ?? 'Not selected'}
            </p>

            <p>
              <strong>Date:</strong> 
              ${bookingDate.toLocaleDateString('en-ZA', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>

            <p>
              <strong>Time:</strong> 
              ${time ?? 'Not selected'}
            </p>

            ${addonsHtml}

            <p>
              <strong>Total:</strong> 
              R${subtotal}
            </p>

            <p>
              <strong>Notes:</strong> 
              ${clientDetails.specialNotes || 'None'}
            </p>

          </div>

        </div>
      `,
    })

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error('Resend / booking error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to save booking or send confirmation.',
      },
      {
        status: 500,
      }
    )
  }
}
