"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import emailjs from "@emailjs/browser"
import Button from "@/components/ui/button"
import Reveal from "@/components/animations/reveal"

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
  const [isFormValid, setIsFormValid] = useState(false)

  // Check form validity
  useEffect(() => {
    const isValid = 
      formData.name.trim() !== "" && 
      formData.email.trim() !== "" && 
      formData.projectDetails.trim() !== "" &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    setIsFormValid(isValid)
  }, [formData])

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
    if (!isFormValid) return
    
    setLoading(true)

    try {
      // Prepare template parameters - Updated with proper meeting date/time variables
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || "Not provided",
        company: formData.company || "Not provided",
        project_details: formData.projectDetails,
        
        // CRITICAL: Add these meeting variables - they must match your EmailJS template
        meeting_date: meetingSchedule?.date || "Not specified",
        meeting_time: meetingSchedule?.time 
          ? `${meetingSchedule.time} (${meetingSchedule.timezone})`
          : "Not specified",
        meeting_duration: "2 hours",
        
        // Email details
        subject: `New Meeting Scheduled: ${formData.name} from ${formData.company || "Individual"}`,
        timestamp: new Date().toISOString(),
        reply_to: formData.email
      }

      // Debug: Log what we're sending
      console.log('Sending email with params:', templateParams)
      console.log('Meeting schedule data:', meetingSchedule)

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
      <div className="relative min-h-[80vh] flex items-center justify-center bg-black">
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated background */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent animate-pulse" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-pulse" />
          
          {/* Floating particles */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-[1px] h-[1px] bg-white rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 3}s`,
                opacity: Math.random() * 0.3 + 0.1,
              }}
            />
          ))}
        </div>

        <Reveal>
          <div className="relative max-w-2xl mx-auto text-center px-6">
            <div className="relative inline-block mb-8">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 opacity-20 blur-xl" />
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white transform scale-0 animate-scale-in" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h3 className="text-4xl font-bold text-white mb-6 animate-fade-in">
              Meeting Scheduled Successfully!
            </h3>
            <p className="text-lg text-gray-400 mb-8 animate-slide-up delay-200">
              We've received your details and will send a confirmation email shortly.
            </p>
            
            {meetingSchedule && (
              <div className="bg-white/5 rounded-2xl p-8 mb-8 backdrop-blur-sm border border-white/10 animate-slide-up delay-300">
                <h4 className="text-xl font-semibold text-white mb-6">Meeting Summary</h4>
                <div className="space-y-4 text-gray-300">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Date:</span>
                    <span className="text-white font-medium">{meetingSchedule.date}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Time:</span>
                    <span className="text-white font-medium">{meetingSchedule.time} ({meetingSchedule.timezone})</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Duration:</span>
                    <span className="text-white font-medium">2 hours</span>
                  </div>
                </div>
              </div>
            )}
            
            <button
              onClick={() => router.push('/')}
              className="group relative px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all duration-300 animate-fade-in delay-500"
            >
              <span className="relative flex items-center gap-3">
                <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Return to Homepage
              </span>
            </button>
          </div>
        </Reveal>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-black py-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse-slow delay-1000" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[1px] h-[1px] bg-white rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
              opacity: Math.random() * 0.3 + 0.1,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-4xl mx-auto px-6">
        {/* Header */}
        <Reveal>
          <div className="mb-12">
            <button
              onClick={handleBackToSchedule}
              className="group inline-flex items-center gap-3 text-gray-400 hover:text-white mb-8 transition-all duration-300"
            >
              <div className="relative">
                <div className="absolute -inset-2 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <svg className="relative w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </div>
              <span>Back to Schedule</span>
            </button>
            
            <div className="mb-8">
              <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-400 mb-4">
                Final Step
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Complete Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
                  Meeting Request
                </span>
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl">
                Please fill in your details to confirm the meeting schedule.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Meeting Summary */}
        {meetingSchedule && (
          <Reveal delay={0.1}>
            <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-2xl p-8 mb-12 border border-white/10 backdrop-blur-sm transform transition-all duration-500 hover:scale-[1.01]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">Selected Meeting Time</h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="group">
                  <div className="text-sm text-gray-400 mb-2">Date</div>
                  <div className="text-lg font-medium text-white transform transition-transform duration-300 group-hover:translate-x-1">
                    {meetingSchedule.date}
                  </div>
                </div>
                <div className="group">
                  <div className="text-sm text-gray-400 mb-2">Time</div>
                  <div className="text-lg font-medium text-white transform transition-transform duration-300 group-hover:translate-x-1">
                    {meetingSchedule.time} ({meetingSchedule.timezone})
                  </div>
                </div>
                <div className="group">
                  <div className="text-sm text-gray-400 mb-2">Duration</div>
                  <div className="text-lg font-medium text-white transform transition-transform duration-300 group-hover:translate-x-1">
                    2 hours
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span>Your selected time slot is reserved for 24 hours</span>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* Contact Form */}
        <Reveal delay={0.2}>
          <div className="bg-white/[0.02] rounded-2xl border border-white/10 p-8 backdrop-blur-sm">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-3">Your Information</h3>
              <p className="text-gray-400">Please fill in all required fields to proceed.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name & Email */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-400 mb-3">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="relative w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-400 mb-3">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="relative w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-all duration-300"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Phone & Company */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-400 mb-3">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="relative w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all duration-300"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-400 mb-3">
                    Company / Organization
                  </label>
                  <div className="relative">
                    <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm" />
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="relative w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-all duration-300"
                      placeholder="Your Company"
                    />
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-400 mb-3">
                  Project Details <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm" />
                  <textarea
                    required
                    rows={6}
                    value={formData.projectDetails}
                    onChange={(e) => setFormData({...formData, projectDetails: e.target.value})}
                    className="relative w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-all duration-300 resize-none"
                    placeholder="Tell us about your project, goals, and what you'd like to achieve during our 2-hour consultation..."
                  />
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  <span className={`transition-colors duration-300 ${formData.projectDetails.length > 50 ? 'text-emerald-400' : ''}`}>
                    {formData.projectDetails.length} characters
                  </span>
                </div>
              </div>

              {/* Form Validation */}
              <div className="pt-4">
                <div className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-300 ${
                  isFormValid 
                    ? 'bg-emerald-500/10 border border-emerald-500/20' 
                    : 'bg-amber-500/10 border border-amber-500/20'
                }`}>
                  <div className={`w-3 h-3 rounded-full animate-pulse ${
                    isFormValid ? 'bg-emerald-500' : 'bg-amber-500'
                  }`} />
                  <div className="text-sm text-white">
                    {isFormValid 
                      ? '✓ All required fields are complete'
                      : 'Please fill in all required fields (*)'
                    }
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBackToSchedule}
                  className="flex-1 group"
                >
                  <span className="flex items-center justify-center gap-3">
                    <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Schedule
                  </span>
                </Button>
                
                <Button
                  type="submit"
                  disabled={loading || !isFormValid}
                  className="group flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  <span className="relative flex items-center justify-center gap-3">
                    {loading ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Confirm & Schedule Meeting
                      </>
                    )}
                  </span>
                </Button>
              </div>
            </form>
          </div>
        </Reveal>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px); 
            opacity: 0.2;
          }
          50% { 
            transform: translateY(-20px) translateX(10px); 
            opacity: 0.5;
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        
        @keyframes slide-up {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scale-in {
          0% { transform: scale(0); }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scale-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </div>
  )
}