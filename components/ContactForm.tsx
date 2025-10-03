'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'

interface ContactFormData {
  name: string
  email: string
  phone?: string
  message: string
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>()

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      const result = await response.json()
      console.log('Form submitted successfully:', result)

      setSubmitStatus('success')
      reset()

      // Auto-hide success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus(null), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const whatsappNumber = '491234567890' // Replace with actual number
  const whatsappMessage = encodeURIComponent('שלום, אני מעוניין/ת לקבל מידע נוסף')

  return (
    <div className="w-full" dir="rtl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" aria-label="טופס יצירת קשר">
        {/* Full Name */}
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white">
            שם מלא <span aria-label="שדה חובה">*</span>
          </label>
          <input
            id="name"
            type="text"
            {...register('name', {
              required: 'שדה חובה',
              minLength: { value: 2, message: 'השם חייב להכיל לפחות 2 תווים' }
            })}
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={`w-full rounded-lg border-2 bg-white px-4 py-3 text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:bg-gray-800 dark:text-white ${
              errors.name
                ? 'border-red-500 focus:border-red-600 focus:ring-red-500'
                : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700'
            }`}
            placeholder="הכנס את שמך המלא"
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white">
            אימייל *
          </label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'שדה חובה',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'כתובת אימייל לא תקינה'
              }
            })}
            className={`w-full rounded-lg border-2 bg-white px-4 py-3 text-gray-900 transition-colors focus:outline-none dark:bg-gray-800 dark:text-white ${
              errors.email
                ? 'border-red-500 focus:border-red-600'
                : 'border-gray-200 focus:border-blue-500 dark:border-gray-700'
            }`}
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
          )}
        </div>

        {/* Phone (Optional) */}
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white">
            טלפון (אופציונלי)
          </label>
          <input
            id="phone"
            type="tel"
            {...register('phone', {
              pattern: {
                value: /^[0-9+\-\s()]{8,}$/,
                message: 'מספר טלפון לא תקין'
              }
            })}
            className={`w-full rounded-lg border-2 bg-white px-4 py-3 text-gray-900 transition-colors focus:outline-none dark:bg-gray-800 dark:text-white ${
              errors.phone
                ? 'border-red-500 focus:border-red-600'
                : 'border-gray-200 focus:border-blue-500 dark:border-gray-700'
            }`}
            placeholder="050-1234567"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone.message}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-semibold text-gray-900 dark:text-white">
            הודעה *
          </label>
          <textarea
            id="message"
            rows={5}
            {...register('message', {
              required: 'שדה חובה',
              minLength: { value: 10, message: 'ההודעה חייבת להכיל לפחות 10 תווים' }
            })}
            className={`w-full resize-none rounded-lg border-2 bg-white px-4 py-3 text-gray-900 transition-colors focus:outline-none dark:bg-gray-800 dark:text-white ${
              errors.message
                ? 'border-red-500 focus:border-red-600'
                : 'border-gray-200 focus:border-blue-500 dark:border-gray-700'
            }`}
            placeholder="כתוב את הודעתך כאן..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 rounded-full bg-blue-600 px-8 py-4 font-bold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                שולח...
              </span>
            ) : (
              'שלח הודעה'
            )}
          </button>

          {/* WhatsApp Quick Contact */}
          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-green-500 px-6 py-4 font-bold text-white shadow-lg transition-all hover:bg-green-600 hover:shadow-xl"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span className="hidden sm:inline">וואטסאפ</span>
          </a>
        </div>
      </form>

      {/* Toast Notifications */}
      <AnimatePresence>
        {submitStatus && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-4 left-4 right-4 z-50 rounded-lg p-4 shadow-xl sm:left-auto sm:right-4 sm:w-96 ${
              submitStatus === 'success'
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              {submitStatus === 'success' ? (
                <svg className="h-6 w-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="h-6 w-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              <p className="font-semibold">
                {submitStatus === 'success'
                  ? 'ההודעה נשלחה בהצלחה! נחזור אליך בהקדם'
                  : 'שגיאה בשליחת ההודעה. אנא נסה שוב'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
