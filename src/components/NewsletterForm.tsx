"use client";

import React, { useState } from 'react'
import { Mail, Check, AlertCircle, Loader2 } from 'lucide-react'

interface NewsletterFormProps {
  className?: string
  variant?: 'default' | 'footer'
}

export default function NewsletterForm({ className = '', variant = 'default' }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      setStatus('error')
      setMessage('Please enter a valid email address')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(data.message || 'Please check your email for a confirmation link')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  const isFooter = variant === 'footer'

  if (status === 'success') {
    return (
      <div className={`text-center space-y-4 ${className}`}>
        <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
          <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {isFooter ? 'Check your email!' : 'Almost there!'}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {message}
          </p>
        </div>
        <button
          onClick={() => {
            setStatus('idle')
            setMessage('')
          }}
          className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
        >
          Subscribe another email
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div>
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={isFooter ? "Enter your email" : "Enter your email"}
            className={`block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
              status === 'error' ? 'border-red-300 dark:border-red-600' : ''
            }`}
            disabled={status === 'loading'}
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className={`w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isFooter
            ? 'bg-white text-indigo-600 hover:bg-gray-50 focus:ring-white/50'
            : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Subscribing...
          </>
        ) : (
          <>
            {isFooter ? 'Subscribe' : 'Subscribe to Updates'}
          </>
        )}
      </button>

      {status === 'error' && message && (
        <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{message}</span>
        </div>
      )}

      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
        No spam, unsubscribe anytime. We respect your privacy.
      </p>
    </form>
  )
}
