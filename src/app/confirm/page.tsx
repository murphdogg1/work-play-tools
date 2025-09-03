import { Suspense } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import PageHeading from '@/components/PageHeading'
import Container from '@/components/Container'

interface ConfirmPageProps {
  searchParams: Promise<{ token?: string }>
}

async function ConfirmSubscription({ token }: { token: string }) {
  if (!token) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Invalid Link</h2>
        <p className="text-gray-600 dark:text-gray-400">
          This confirmation link is invalid or has expired.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Return to Homepage
        </Link>
      </div>
    )
  }

  try {
    // Find subscriber with this token
    const { data: subscriber, error: fetchError } = await supabase
      .from('subscribers')
      .select('*')
      .eq('token', token)
      .single()

    if (fetchError || !subscriber) {
      return (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Invalid Token</h2>
          <p className="text-gray-600 dark:text-gray-400">
            This confirmation link is invalid or has expired.
          </p>
          <Link 
            href="/" 
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      )
    }

    if (subscriber.status === 'confirmed') {
      return (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Already Confirmed</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Your email {subscriber.email} is already confirmed and subscribed to our updates.
          </p>
          <Link 
            href="/" 
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      )
    }

    // Update subscriber status to confirmed
    const { error: updateError } = await supabase
      .from('subscribers')
      .update({ 
        status: 'confirmed',
        confirmed_at: new Date().toISOString()
      })
      .eq('token', token)

    if (updateError) {
      throw updateError
    }

    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Subscription Confirmed!</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Thank you for confirming your subscription! You&apos;ll now receive updates about new calculators, 
          templates, and HR resources from WorkPayTools.
        </p>
        <div className="space-y-2">
          <Link 
            href="/" 
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors mr-4"
          >
            Return to Homepage
          </Link>
          <Link 
            href="/calculators/overtime-pay" 
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Try Our Calculators
          </Link>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Confirmation error:', error)
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Confirmation Failed</h2>
        <p className="text-gray-600 dark:text-gray-400">
          There was an error confirming your subscription. Please try again or contact support.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Return to Homepage
        </Link>
      </div>
    )
  }
}

export default async function ConfirmPage({ searchParams }: ConfirmPageProps) {
  const { token } = await searchParams

  return (
    <Container>
      <div className="py-16">
        <PageHeading 
          title="Confirm Subscription" 
          subtitle="Validating your email subscription"
        />
        
        <div className="max-w-md mx-auto mt-8">
          <Suspense fallback={
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-400">Validating your subscription...</p>
            </div>
          }>
            <ConfirmSubscription token={token || ''} />
          </Suspense>
        </div>
      </div>
    </Container>
  )
}
