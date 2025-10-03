import { renderWithProviders, screen, userEvent, waitFor } from './utils'
import ContactForm from '@/components/ContactForm'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

describe('ContactForm Component', () => {
  it('renders all form fields', () => {
    renderWithProviders(<ContactForm />)

    expect(screen.getByLabelText(/שם מלא/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/אימייל/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/טלפון/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/הודעה/i)).toBeInTheDocument()
  })

  it('renders submit button and WhatsApp link', () => {
    renderWithProviders(<ContactForm />)

    expect(screen.getByRole('button', { name: /שלח הודעה/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /וואטסאפ/i })).toBeInTheDocument()
  })

  it('validates required fields', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ContactForm />)

    const submitButton = screen.getByRole('button', { name: /שלח הודעה/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getAllByText('שדה חובה')).toHaveLength(4)
    })
  })

  it('validates full name minimum length', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ContactForm />)

    const nameInput = screen.getByLabelText(/שם מלא/i)
    await user.type(nameInput, 'א')

    const submitButton = screen.getByRole('button', { name: /שלח הודעה/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('השם חייב להכיל לפחות 2 תווים')).toBeInTheDocument()
    })
  })

  it('validates email format', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ContactForm />)

    const emailInput = screen.getByLabelText(/אימייל/i)
    await user.type(emailInput, 'invalid-email')

    const submitButton = screen.getByRole('button', { name: /שלח הודעה/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('כתובת אימייל לא תקינה')).toBeInTheDocument()
    })
  })

  it('validates phone number format', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ContactForm />)

    const phoneInput = screen.getByLabelText(/טלפון/i)
    await user.type(phoneInput, '123')

    const submitButton = screen.getByRole('button', { name: /שלח הודעה/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('מספר טלפון לא תקין')).toBeInTheDocument()
    })
  })

  it('validates message minimum length', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ContactForm />)

    const messageInput = screen.getByLabelText(/הודעה/i)
    await user.type(messageInput, 'קצר')

    const submitButton = screen.getByRole('button', { name: /שלח הודעה/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('ההודעה חייבת להכיל לפחות 10 תווים')).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()

    renderWithProviders(<ContactForm />)

    await user.type(screen.getByLabelText(/שם מלא/i), 'דני כהן')
    await user.type(screen.getByLabelText(/אימייל/i), 'test@example.com')
    await user.type(screen.getByLabelText(/טלפון/i), '050-1234567')
    await user.type(screen.getByLabelText(/הודעה/i), 'זוהי הודעת בדיקה ארוכה')

    const submitButton = screen.getByRole('button', { name: /שלח הודעה/i })
    await user.click(submitButton)

    // Should show loading state
    await waitFor(() => {
      expect(screen.getByText('שולח...')).toBeInTheDocument()
    })

    // Should show success message
    await waitFor(
      () => {
        expect(screen.getByText('ההודעה נשלחה בהצלחה! נחזור אליך בהקדם')).toBeInTheDocument()
      },
      { timeout: 3000 }
    )

    consoleSpy.mockRestore()
  })

  it('clears form after successful submission', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ContactForm />)

    const nameInput = screen.getByLabelText(/שם מלא/i) as HTMLInputElement
    const emailInput = screen.getByLabelText(/אימייל/i) as HTMLInputElement
    const phoneInput = screen.getByLabelText(/טלפון/i) as HTMLInputElement
    const messageInput = screen.getByLabelText(/הודעה/i) as HTMLTextAreaElement

    await user.type(nameInput, 'דני כהן')
    await user.type(emailInput, 'test@example.com')
    await user.type(phoneInput, '050-1234567')
    await user.type(messageInput, 'זוהי הודעת בדיקה ארוכה')

    const submitButton = screen.getByRole('button', { name: /שלח הודעה/i })
    await user.click(submitButton)

    await waitFor(
      () => {
        expect(nameInput.value).toBe('')
        expect(emailInput.value).toBe('')
        expect(phoneInput.value).toBe('')
        expect(messageInput.value).toBe('')
      },
      { timeout: 3000 }
    )
  })

  it('has WhatsApp link with correct URL', () => {
    renderWithProviders(<ContactForm />)

    const whatsappLink = screen.getByRole('link', { name: /וואטסאפ/i })
    expect(whatsappLink).toHaveAttribute('href', expect.stringContaining('wa.me/491234567890'))
    expect(whatsappLink).toHaveAttribute('target', '_blank')
    expect(whatsappLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('disables submit button while submitting', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ContactForm />)

    await user.type(screen.getByLabelText(/שם מלא/i), 'דני כהן')
    await user.type(screen.getByLabelText(/אימייל/i), 'test@example.com')
    await user.type(screen.getByLabelText(/טלפון/i), '050-1234567')
    await user.type(screen.getByLabelText(/הודעה/i), 'זוהי הודעת בדיקה ארוכה')

    const submitButton = screen.getByRole('button', { name: /שלח הודעה/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(submitButton).toBeDisabled()
    })
  })

  it('has RTL direction', () => {
    const { container } = renderWithProviders(<ContactForm />)

    const formContainer = container.querySelector('[dir="rtl"]')
    expect(formContainer).toBeInTheDocument()
  })

  it('displays Hebrew validation messages', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ContactForm />)

    const submitButton = screen.getByRole('button', { name: /שלח הודעה/i })
    await user.click(submitButton)

    await waitFor(() => {
      const errorMessages = screen.getAllByText('שדה חובה')
      errorMessages.forEach((msg) => {
        expect(msg).toBeInTheDocument()
      })
    })
  })

  it('applies error styling to invalid fields', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ContactForm />)

    const nameInput = screen.getByLabelText(/שם מלא/i)
    const submitButton = screen.getByRole('button', { name: /שלח הודעה/i })

    await user.click(submitButton)

    await waitFor(() => {
      expect(nameInput).toHaveClass('border-red-500')
    })
  })
})
