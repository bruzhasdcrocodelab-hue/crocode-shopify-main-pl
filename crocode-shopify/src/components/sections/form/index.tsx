'use client'

import styles from './styles.module.scss'
import { Section, Text, Input, Button } from "@/components/ui"
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'

type FormData = {
  firstName: string
  lastName: string
  companyName: string
  email: string
  phone: string
  budget: string
  project: string
  newsletter: boolean
}

type FormErrors = Partial<Record<keyof FormData, string>>
type TouchedFields = Record<keyof FormData, boolean>

type TProps = {
  className?: string
}

const Form = ({ className }: TProps) => {
  const t = useTranslations('ContactPage.form')

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    phone: '',
    budget: '',
    project: '',
    newsletter: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<TouchedFields>({
    firstName: false,
    lastName: false,
    companyName: false,
    email: false,
    phone: false,
    budget: false,
    project: false,
    newsletter: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasValidationErrors, setHasValidationErrors] = useState(false)

  const validateForm = (data: FormData, touched?: Partial<TouchedFields>) => {
  const errors: FormErrors = {}
  let hasErrors = false

  const shouldValidate = (field: keyof FormData) =>
    !touched || touched[field]

  if (shouldValidate('firstName')) {
    if (!data.firstName.trim()) errors.firstName = t('inputs.firstName.errors.required')
    else if (data.firstName.trim().length < 2)
      errors.firstName = t('inputs.firstName.errors.minLen')
  }

  if (shouldValidate('lastName')) {
    if (!data.lastName.trim()) errors.lastName = t('inputs.lastName.errors.required')
    else if (data.lastName.trim().length < 2)
      errors.lastName = t('inputs.lastName.errors.minLen')
  }

  if (shouldValidate('companyName')) {
    if (!data.companyName.trim()) errors.companyName = t('inputs.companyName.errors.required')
  }

  if (shouldValidate('email')) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!data.email.trim()) errors.email = t('inputs.email.errors.required')
    else if (!emailRegex.test(data.email))
      errors.email = t('inputs.email.errors.notValid')
  }

  if (shouldValidate('phone')) {
    const phoneRegex = /^\+?[\d\s-()]{10,}$/
    if (!data.phone.trim()) errors.phone = t('inputs.phone.errors.required')
    else if (!phoneRegex.test(data.phone.replace(/\s/g, '')))
      errors.phone = t('inputs.phone.errors.notValid')
  }

  if (shouldValidate('budget')) {
    if (!data.budget.trim()) errors.budget = t('inputs.budget.errors.required')
  }

  hasErrors = Object.keys(errors).length > 0
  return { errors, hasErrors }
}

  useEffect(() => {
    const { errors, hasErrors } = validateForm(formData, touched)
    setErrors(errors)
    setHasValidationErrors(hasErrors)
  }, [formData, touched])

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (!touched[field]) {
      setTouched(prev => ({ ...prev, [field]: true }))
    }
  }

  const handleCheckboxToggle = () => {
    setFormData(prev => ({ ...prev, newsletter: !prev.newsletter }))
    if (!touched.newsletter) {
      setTouched(prev => ({ ...prev, newsletter: true }))
    }
  }

  const handleBlur = (field: keyof FormData) => {
    setTouched(prev => ({ ...prev, [field]: true }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const allTouched = Object.keys(touched).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {} as TouchedFields
    )
    setTouched(allTouched)

    const { errors, hasErrors } = validateForm(formData)
    setErrors(errors)
    if (hasErrors) return

    setIsSubmitting(true)
    try {
      console.log('Form data:', formData)
      alert('Form submitted successfully!')
      setFormData({
        firstName: '',
        lastName: '',
        companyName: '',
        email: '',
        phone: '',
        budget: '',
        project: '',
        newsletter: false,
      })
      setTouched({
        firstName: false,
        lastName: false,
        companyName: false,
        email: false,
        phone: false,
        budget: false,
        project: false,
        newsletter: false,
      })
    } catch (err) {
      console.error('Error submitting form:', err)
      alert('Error submitting form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isSubmitDisabled = hasValidationErrors || isSubmitting

  return (
    <Section className={`${styles.section} ${className || ''}`}>
      <div className={styles.section__inner}>
        <Text className={styles.section__title} tag='p' text={t('title')} style='big' />

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <Input
            as='input'
            type='text'
            value={formData.firstName}
            errorText={errors.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            onBlur={() => handleBlur('firstName')}
            label={t('inputs.firstName.label')}
            placeholder={t('inputs.firstName.placeholder')}
          />

          <Input
            as='input'
            type='text'
            value={formData.lastName}
            errorText={errors.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            onBlur={() => handleBlur('lastName')}
            label={t('inputs.lastName.label')}
            placeholder={t('inputs.lastName.placeholder')}
          />

          <Input
            as='input'
            type='text'
            value={formData.companyName}
            errorText={errors.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
            onBlur={() => handleBlur('companyName')}
            label={t('inputs.companyName.label')}
            placeholder={t('inputs.companyName.placeholder')}
          />

          <Input
            as='input'
            type='email'
            value={formData.email}
            errorText={errors.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            label={t('inputs.email.label')}
            placeholder={t('inputs.email.placeholder')}
          />

          <Input
            as='input'
            type='tel'
            value={formData.phone}
            errorText={errors.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            onBlur={() => handleBlur('phone')}
            label={t('inputs.phone.label')}
            placeholder={t('inputs.phone.placeholder')}
          />

          <Input
            as='input'
            type='text'
            value={formData.budget}
            errorText={errors.budget}
            onChange={(e) => handleInputChange('budget', e.target.value)}
            onBlur={() => handleBlur('budget')}
            label={t('inputs.budget.label')}
            placeholder={t('inputs.budget.placeholder')}
          />

          <div className={styles.form__input_wrapper}>
            <Input
              as='textarea'
              rows={6}
              value={formData.project}
              errorText={errors.project}
              onChange={(e) => handleInputChange('project', e.target.value)}
              onBlur={() => handleBlur('project')}
              label={t('inputs.aboutProject.label')}
              placeholder={t('inputs.aboutProject.placeholder')}
            />

            <Input
              as='checkbox'
              isActive={formData.newsletter}
              handlerToggle={handleCheckboxToggle}
              errorText={errors.newsletter}
              label={t('inputs.checkbox.label')}
            />
          </div>

          <div className={styles.form__button_wrapper}>
            <span className={`${styles.form__error} ${isSubmitDisabled ? styles['form__error--active'] : styles['form__error--hidden']}`}>
              {t('button.errors.required')}
            </span>
            <Button
              as='button'
              type='submit'
              className={styles.form__button}
              text={isSubmitting ? t('button.submitting') : t('button.text')}
              disabled={isSubmitDisabled}
            />
          </div>
        </form>
      </div>
    </Section>
  )
}

export default Form