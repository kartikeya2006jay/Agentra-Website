import ContactForm from "@/components/forms/contact-form"

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-32">
      <h1 className="text-4xl font-semibold">Contact</h1>
      <p className="mt-4 text-gray-400">
        Let’s talk about your project.
      </p>
      <div className="mt-12">
        <ContactForm />
      </div>
    </main>
  )
}