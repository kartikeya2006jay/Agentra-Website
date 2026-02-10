"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import emailjs from "@emailjs/browser"
import Button from "@/components/ui/button"

interface MeetingSchedule {
  date: string
  time: string
  timezone: "IST" | "GMT"
  timestamp: number
}

export default function ContactForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [meetingSchedule, setMeetingSchedule] = useState<MeetingSchedule | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectDetails: "",
    phone: "",
    company: ""
  })

  useEffect(() => {
    // Get meeting schedule from localStorage
    const savedSchedule = localStorage.getItem('meetingSchedule')
    if (savedSchedule) {
      try {
        const schedule = JSON.parse(savedSchedule) as MeetingSchedule
        setMeetingSchedule(schedule)
      } catch (error) {
        console.error('Error parsing schedule:', error)
      }
    }
  }, [])

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "QJOob4ebC-RgwOWPO")
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    try {
      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        company: formData.company,
        project_details: formData.projectDetails,
        meeting_date: meetingSchedule?.date || "Not specified",
        meeting_time: meetingSchedule?.time 
          ? `${meetingSchedule.time} (${meetingSchedule.timezone})`
          : "Not specified",
        meeting_duration: "2 hours",
        subject: `New Meeting Scheduled: ${formData.name} from ${formData.company}`,
        timestamp: new Date().toISOString(),
        reply_to: formData.email
      }

      // Send email using EmailJS
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_zhbg7ua",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_pdhyb9o",
        templateParams
      )

      console.log('Email sent successfully:', result.text)
      
      // Clear localStorage
      localStorage.removeItem('meetingSchedule')
      
      setDone(true)
      
      // Reset form
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          projectDetails: "",
          phone: "",
          company: ""
        })
        router.push('/') // Redirect to home after success
      }, 3000)

    } catch (error) {
      console.error('Failed to send email:', error)
      alert("Failed to send message. Please try again or contact us directly.")
    } finally {
      setLoading(false)
    }
  }

  const handleBackToSchedule = () => {
    router.back()
  }

  if (done) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-3xl font-bold text-white mb-4">Meeting Scheduled Successfully!</h3>
        <p className="text-gray-400 mb-6">
          We've received your details and will send a confirmation email shortly.
        </p>
        
        {meetingSchedule && (
          <div className="bg-white/5 rounded-xl p-6 mb-8">
            <h4 className="text-lg font-semibold text-white mb-4">Meeting Summary</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex justify-between">
                <span>Date:</span>
                <span className="text-white">{meetingSchedule.date}</span>
              </div>
              <div className="flex justify-between">
                <span>Time:</span>
                <span className="text-white">{meetingSchedule.time} ({meetingSchedule.timezone})</span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span className="text-white">2 hours</span>
              </div>
            </div>
          </div>
        )}
        
        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors duration-300"
        >
          ← Back to Home
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={handleBackToSchedule}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors duration-300"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Schedule
        </button>
        
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Complete Your Meeting Request
        </h2>
        <p className="text-gray-400">
          Please fill in your details to confirm the meeting schedule.
        </p>
      </div>

      {/* Meeting Summary */}
      {meetingSchedule && (
        <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-xl p-6 mb-8 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-3">Selected Meeting Time</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-gray-400">Date</div>
              <div className="font-medium text-white">{meetingSchedule.date}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Time</div>
              <div className="font-medium text-white">
                {meetingSchedule.time} ({meetingSchedule.timezone})
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Duration</div>
              <div className="font-medium text-white">2 hours</div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors duration-300"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors duration-300"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors duration-300"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Company / Organization
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors duration-300"
              placeholder="Your Company"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Project Details / What would you like to discuss? *
          </label>
          <textarea
            required
            rows={5}
            value={formData.projectDetails}
            onChange={(e) => setFormData({...formData, projectDetails: e.target.value})}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors duration-300 resize-none"
            placeholder="Tell us about your project, goals, and what you'd like to achieve..."
          />
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleBackToSchedule}
            className="flex-1"
          >
            ← Back
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Scheduling...
              </span>
            ) : "Confirm & Schedule Meeting"}
          </Button>
        </div>
      </form>
    </div>
  )
}