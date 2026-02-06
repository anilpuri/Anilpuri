'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Mail, MapPin } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createOne } from '@/lib/payload.client'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'

import { insertMessageSchema, InsertMessage } from '@/lib/validations/contact'

export default function Contact({ form: formConfig, id, quote, visibility, personalDetails }) {
  const [successOpen, setSuccessOpen] = useState(false)
  const [errorOpen, setErrorOpen] = useState(false)

  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: 'Connecting from Portfolio portal',
      message: '',
    },
  })

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form

  const onSubmit = async (data: InsertMessage) => {
    try {
      await createOne('connects', data)
      reset()
      setSuccessOpen(true)
    } catch (error) {
      setErrorOpen(true)
    }
  }

  return (
    <>
      <section id="contact" className="section-bottom-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-12 bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100">
            {/* LEFT */}
            <div className="md:col-span-2 space-y-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Contact Information</h3>
                {visibility?.showForm && (
                  <p className="text-slate-500 mb-6">
                    Fill out the form and I'll get back to you within 24 hours.
                  </p>
                )}

                <div className="space-y-4">
                  {visibility?.showEmail && personalDetails?.email && (
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-white rounded-lg shadow-sm text-primary">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">Email</p>
                        <a
                          href="mailto:hello@anilpuri.dev"
                          className="text-sm text-slate-500 hover:text-primary transition-colors"
                        >
                          {personalDetails?.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {visibility?.showLocation && personalDetails?.location && (
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-white rounded-lg shadow-sm text-primary">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">Location</p>
                        <p className="text-sm text-slate-500">{personalDetails?.location}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {visibility?.showQuote && quote && (
                <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                  <p className="text-primary font-medium italic">{quote}</p>
                </div>
              )}
            </div>

            {/* FORM */}
            <div className="md:col-span-3">
              <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>{formConfig?.nameLabel ?? 'Full Name'}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Your full name"
                            className={
                              fieldState.invalid ? 'border-red-500 focus-visible:ring-red-500' : ''
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>{formConfig?.emailLabel ?? 'Email'}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="Your email address"
                            className={
                              fieldState.invalid ? 'border-red-500 focus-visible:ring-red-500' : ''
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>{formConfig?.messageLabel ?? 'Message'}</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder={
                              formConfig?.messagePlaceholder ?? 'Write your message here…'
                            }
                            className={`min-h-[150px] ${
                              fieldState.invalid ? 'border-red-500 focus-visible:ring-red-500' : ''
                            }`}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-xl"
                  >
                    {isSubmitting ? 'Sending...' : (formConfig?.buttonText ?? 'Send Message')}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

      {/* SUCCESS DIALOG */}
      <AlertDialog open={successOpen} onOpenChange={setSuccessOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Message Sent 🎉</AlertDialogTitle>
            <AlertDialogDescription>
              Thanks for reaching out! I’ll get back to you within 24 hours.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogAction>Okay</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>

      {/* ERROR DIALOG */}
      <AlertDialog open={errorOpen} onOpenChange={setErrorOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Something went wrong ❌</AlertDialogTitle>
            <AlertDialogDescription>
              Please try again later or contact me directly via email.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogAction>Okay</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
