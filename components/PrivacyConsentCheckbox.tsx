'use client'

import { forwardRef, type InputHTMLAttributes } from 'react'
import Link from 'next/link'

interface PrivacyConsentCheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'id'> {
  /** Validation message to show; presence also marks the field as invalid. */
  error?: string
  /** Override when a page renders more than one form. */
  id?: string
}

/**
 * Privacy-policy acceptance checkbox, shared by every form that collects
 * personal details (name / email / phone / message).
 *
 * Unchecked by default and never pre-checked — consent has to be an active
 * choice. Designed to take react-hook-form's register() spread directly, so
 * the owning form controls the "required" rule and the message.
 */
const PrivacyConsentCheckbox = forwardRef<HTMLInputElement, PrivacyConsentCheckboxProps>(
  function PrivacyConsentCheckbox({ error, id = 'privacy-consent', ...inputProps }, ref) {
    const errorId = `${id}-error`

    return (
      <div>
        <div className="flex items-start gap-3">
          <input
            id={id}
            ref={ref}
            type="checkbox"
            aria-required="true"
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={`mt-1 h-5 w-5 flex-shrink-0 cursor-pointer rounded border-2 bg-white text-navy-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 dark:bg-navy-700 ${
              error ? 'border-red-500' : 'border-navy-200 dark:border-navy-600'
            }`}
            {...inputProps}
          />
          <label
            htmlFor={id}
            className="cursor-pointer text-sm leading-relaxed text-navy-700 dark:text-gray-300"
          >
            קראתי ואני מסכים/ה ל
            <Link
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              // Without this, the click bubbles to the <label> and toggles the
              // checkbox on the way to opening the policy.
              onClick={(event) => event.stopPropagation()}
              className="font-semibold text-gold-800 underline hover:text-gold-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 dark:text-gold-400 dark:hover:text-gold-300"
            >
              מדיניות הפרטיות
              <span className="sr-only"> (נפתח בחלון חדש)</span>
            </Link>{' '}
            <span aria-label="שדה חובה">*</span>
          </label>
        </div>
        {error && (
          <p id={errorId} className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)

export default PrivacyConsentCheckbox
