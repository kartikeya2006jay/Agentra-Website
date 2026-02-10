"use client"

import { useState } from "react"
import emailjs from "@emailjs/browser"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import Textarea from "@/components/ui/textarea"

export default function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget

    await emailjs.sendForm(
      "service_zhbg7ua",
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      form,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    )

    setLoading(false)
    setDone(true)
    form.reset()
  }

  if (done) {
    return (
      <p className="text-center text-sm text-gray-400">
        Message sent successfully.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-6">
      <Input name="name" placeholder="Your name" required />
      <Input name="email" type="email" placeholder="Email address" required />
      <Textarea
        name="message"
        rows={5}
        placeholder="Tell us about your project"
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Sending…" : "Send message"}
      </Button>
    </form>
  )
}