'use client'

import { FormError } from '@/components/forms/form-error'
import { FormItem } from '@/components/forms/form-item'
import { Message } from '@/components/common/message'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User } from '@/payload-types'
import { useAuth } from '@/providers/auth'
import { useRouter } from 'next/navigation'
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { cn } from '@/utilities/cn'
import styles from '@/components/forms/forms.module.css'
import proseStyles from '@/components/common/rich-text/rich-text.module.css'

type FormData = {
  email: string
  name: User['name']
  password: string
  passwordConfirm: string
}

export const AccountForm: React.FC = () => {
  const { setUser, user } = useAuth()
  const [changePassword, setChangePassword] = useState(false)

  const {
    formState: { errors, isLoading, isSubmitting, isDirty },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<FormData>()

  const password = useRef({})
  password.current = watch('password', '')

  const router = useRouter()

  const onSubmit = useCallback(
    async (data: FormData) => {
      if (user) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${user.id}`, {
          body: JSON.stringify(data),
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PATCH',
        })

        if (response.ok) {
          const json = await response.json()
          setUser(json.doc)
          toast.success('Successfully updated account.')
          setChangePassword(false)
          reset({
            name: json.doc.name,
            email: json.doc.email,
            password: '',
            passwordConfirm: '',
          })
        } else {
          toast.error('There was a problem updating your account.')
        }
      }
    },
    [user, setUser, reset],
  )

  useEffect(() => {
    if (user === null) {
      router.push(
        `/login?error=${encodeURIComponent(
          'You must be logged in to view this page.',
        )}&redirect=${encodeURIComponent('/account')}`,
      )
    }

    if (user) {
      reset({
        name: user.name,
        email: user.email,
        password: '',
        passwordConfirm: '',
      })
    }
  }, [user, router, reset, changePassword])

  return (
    <form className={styles['form--md']} onSubmit={handleSubmit(onSubmit)}>
      {!changePassword ? (
        <Fragment>
          <div className={cn(proseStyles.prose, styles['mb-8'])}>
            <p>
              {'Change your account details below, or '}
              <Button
                className={styles.linkBtn}
                onClick={() => setChangePassword(!changePassword)}
                type="button"
                variant="link"
              >
                click here
              </Button>
              {' to change your password.'}
            </p>
          </div>

          <div className={styles.fieldGroup}>
            <FormItem>
              <Label htmlFor="email" className={styles['mb-2']}>
                Email Address
              </Label>
              <Input
                id="email"
                {...register('email', { required: 'Please provide an email.' })}
                type="email"
              />
              {errors.email && <FormError message={errors.email.message} />}
            </FormItem>

            <FormItem>
              <Label htmlFor="name" className={styles['mb-2']}>
                Name
              </Label>
              <Input
                id="name"
                {...register('name', { required: 'Please provide a name.' })}
                type="text"
              />
              {errors.name && <FormError message={errors.name.message} />}
            </FormItem>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className={cn(proseStyles.prose, styles['mb-8'])}>
            <p>
              {'Change your password below, or '}
              <Button
                className={styles.linkBtn}
                onClick={() => setChangePassword(!changePassword)}
                type="button"
                variant="link"
              >
                cancel
              </Button>
              .
            </p>
          </div>

          <div className={styles.fieldGroup}>
            <FormItem>
              <Label htmlFor="password" className={styles['mb-2']}>
                New password
              </Label>
              <Input
                id="password"
                {...register('password', { required: 'Please provide a new password.' })}
                type="password"
              />
              {errors.password && <FormError message={errors.password.message} />}
            </FormItem>

            <FormItem>
              <Label htmlFor="passwordConfirm" className={styles['mb-2']}>
                Confirm password
              </Label>
              <Input
                id="passwordConfirm"
                {...register('passwordConfirm', {
                  required: 'Please confirm your new password.',
                  validate: (value) => value === password.current || 'The passwords do not match',
                })}
                type="password"
              />
              {errors.passwordConfirm && <FormError message={errors.passwordConfirm.message} />}
            </FormItem>
          </div>
        </Fragment>
      )}
      <Button disabled={isLoading || isSubmitting || !isDirty} type="submit" variant="default">
        {isLoading || isSubmitting
          ? 'Processing'
          : changePassword
            ? 'Change Password'
            : 'Update Account'}
      </Button>
    </form>
  )
}
