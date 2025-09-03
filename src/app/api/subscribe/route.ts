import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import { Resend } from 'resend'
import { v4 as uuidv4 } from 'uuid'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const { data: existingSubscriber } = await supabase
      .from('subscribers')
      .select('*')
      .eq('email', email.toLowerCase())
      .single()

    if (existingSubscriber) {
      if (existingSubscriber.status === 'confirmed') {
        return NextResponse.json(
          { error: 'Email is already subscribed' },
          { status: 400 }
        )
      } else if (existingSubscriber.status === 'pending') {
        return NextResponse.json(
          { error: 'Please check your email for a confirmation link' },
          { status: 400 }
        )
      }
    }

    // Generate confirmation token
    const token = uuidv4()
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const confirmationUrl = `${siteUrl}/confirm?token=${token}`

    // Insert or update subscriber
    const subscriberData = {
      email: email.toLowerCase(),
      status: 'pending' as const,
      token,
    }

    if (existingSubscriber) {
      // Update existing subscriber
      await supabase
        .from('subscribers')
        .update(subscriberData)
        .eq('email', email.toLowerCase())
    } else {
      // Insert new subscriber
      await supabase
        .from('subscribers')
        .insert(subscriberData)
    }

    // Send confirmation email
    if (process.env.NODE_ENV === 'production' && process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'WorkPayTools <noreply@workpaytools.com>',
          to: [email],
          subject: 'Confirm your subscription to WorkPayTools',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #4f46e5;">Confirm your subscription</h2>
              <p>Thank you for subscribing to WorkPayTools updates!</p>
              <p>Click the button below to confirm your subscription:</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${confirmationUrl}" 
                   style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                  Confirm Subscription
                </a>
              </div>
              <p style="color: #666; font-size: 14px;">
                If the button doesn't work, copy and paste this link into your browser:<br>
                <a href="${confirmationUrl}">${confirmationUrl}</a>
              </p>
              <p style="color: #666; font-size: 14px;">
                If you didn't request this subscription, you can safely ignore this email.
              </p>
            </div>
          `,
        })
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError)
        // Don't fail the request if email sending fails
      }
    } else {
      // Development mode - log the confirmation URL
      console.log('Development mode - Confirmation URL:', confirmationUrl)
    }

    return NextResponse.json({
      success: true,
      message: 'Please check your email for a confirmation link',
    })
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    )
  }
}
