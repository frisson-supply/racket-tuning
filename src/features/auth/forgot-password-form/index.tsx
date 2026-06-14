'use client'

import { FormError } from '@/components/forms/form-error'
import { FormItem } from '@/components/forms/form-item'
import { Message } from '@/components/common/message'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import React, { Fragment, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { cn } from '@/utilities/cn'
import styles from '@/components/forms/forms.module.css'
import proseStyles from '@/components/common/rich-text/rich-text.module.css'

type FormData = {
  email: string
}

export const ForgotPasswordForm: React.FC = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormData>()

  const onSubmit = useCallback(async (data: FormData) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/forgot-password`,
      {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    )

    if (response.ok) {
      setSuccess(true)
      setError('')
    } else {
      setError(
        'There was a problem while attempting to send you a password reset email. Please try again.',
      )
    }
  }, [])

  return (
    <Fragment>
      {!success && (
        <React.Fragment>
          <h1 className={styles.heading}>Forgot Password</h1>
          <div className={cn(proseStyles.prose, styles['mb-8'])}>
            <p>
              {`Please enter your email below. You will receive an email message with instructions on
              how to reset your password. To manage your all users, `}
              <Link href="/admin/collections/users">login to the admin dashboard</Link>.
            </p>
          </div>
          <form className={styles['form--sm']} onSubmit={handleSubmit(onSubmit)}>
            <Message className={styles['mb-8']} error={error} />

            <FormItem className={styles['mb-8']}>
              <Label htmlFor="email" className={styles['mb-2']}>
                Email address
              </Label>
              <Input
                id="email"
                {...register('email', { required: 'Please provide your email.' })}
                type="email"
              />
              {errors.email && <FormError message={errors.email.message} />}
            </FormItem>

            <Button type="submit" variant="default">
              Forgot Password
            </Button>
          </form>
        </React.Fragment>
      )}
      {success && (
        <React.Fragment>
          <h1 className={styles.heading}>Request submitted</h1>
          <div className={proseStyles.prose}>
            <p>Check your email for a link that will allow you to securely reset your password.</p>
          </div>
        </React.Fragment>
      )}
    </Fragment>
  )
}
