"use client"

import { useEffect, useRef, useState } from "react"
import Reveal from "@/components/animations/reveal"
import Magnetic from "@/components/animations/magnetic"
import Button from "@/components/ui/button"

interface TimeSlot {
  id: number
  time: string
  available: boolean
  timezone: "IST" | "GMT"
}

interface CalendarDay {
  date: number
  month: number // 0-11
  day: number // 0-6 (Sunday-Saturday)
  available: boolean
  currentMonth: boolean
}

export default function CTA() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [showSchedule, setShowSchedule] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedTimezone, setSelectedTimezone] = useState<"IST" | "GMT">("IST")
  const [showContactForm, setShowContactForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectDetails: "",
    preferredDate: "",
    preferredTime: "",
    timezone: "IST"
  })

  // Generate calendar for February 2026
  const generateCalendar = (): CalendarDay[] => {
    const days: CalendarDay[] = []
    const year = 2026
    const month = 1 // February (0-indexed)
    
    // Get first day of month
    const firstDay = new Date(year, month, 1)
    // Get last day of month
    const lastDay = new Date(year, month + 1, 0)
    // Get days in month
    const daysInMonth = lastDay.getDate()
    
    // Get starting day (0 = Sunday, 1 = Monday, etc.)
    const startDay = firstDay.getDay()
    
    // Add days from previous month
    const prevMonthLastDay = new Date(year, month, 0).getDate()
    for (let i = startDay - 1; i >= 0; i--) {
      days.push({
        date: prevMonthLastDay - i,
        month: month - 1,
        day: (startDay - i - 1 + 7) % 7,
        available: false,
        currentMonth: false
      })
    }
    
    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i)
      const dayOfWeek = currentDate.getDay()
      // Make business days (Mon-Fri) available
      const available = dayOfWeek >= 1 && dayOfWeek <= 5
      
      days.push({
        date: i,
        month: month,
        day: dayOfWeek,
        available,
        currentMonth: true
      })
    }
    
    // Add days from next month to complete grid
    const totalCells = Math.ceil(days.length / 7) * 7
    let nextMonthDay = 1
    while (days.length < totalCells) {
      days.push({
        date: nextMonthDay,
        month: month + 1,
        day: (days.length) % 7,
        available: false,
        currentMonth: false
      })
      nextMonthDay++
    }
    
    return days
  }

  // Time slots for scheduling
  const timeSlots: TimeSlot[] = [
    { id: 1, time: "09:00 AM", available: true, timezone: "IST" },
    { id: 2, time: "10:00 AM", available: true, timezone: "IST" },
    { id: 3, time: "11:00 AM", available: true, timezone: "IST" },
    { id: 4, time: "02:00 PM", available: true, timezone: "IST" },
    { id: 5, time: "03:00 PM", available: true, timezone: "IST" },
    { id: 6, time: "04:00 PM", available: true, timezone: "IST" },
    { id: 7, time: "06:00 AM", available: true, timezone: "GMT" },
    { id: 8, time: "07:00 AM", available: true, timezone: "GMT" },
    { id: 9, time: "08:00 AM", available: true, timezone: "GMT" },
    { id: 10, time: "10:30 AM", available: true, timezone: "GMT" },
    { id: 11, time: "11:30 AM", available: true, timezone: "GMT" },
    { id: 12, time: "01:00 PM", available: true, timezone: "GMT" },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
    }> = []

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        color: `rgba(59, 130, 246, ${Math.random() * 0.2 + 0.1})`
      })
    }

    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 100)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      particles.forEach(particle => {
        ctx.beginPath()
        ctx.fillStyle = particle.color
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x <= 0 || particle.x >= canvas.width) particle.speedX *= -1
        if (particle.y <= 0 || particle.y >= canvas.height) particle.speedY *= -1

        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  const handleScheduleCall = () => {
    setShowSchedule(true)
  }

  const handleDateSelect = (day: CalendarDay) => {
    if (day.available && day.currentMonth) {
      const selected = new Date(2026, day.month, day.date)
      setSelectedDate(selected)
      setSelectedTime(null)
    }
  }

  const handleTimeSelect = (time: string, timezone: "IST" | "GMT") => {
    if (selectedDate) {
      setSelectedTime(time)
      setSelectedTimezone(timezone)
    }
  }

  const handleProceedToContact = () => {
    if (selectedDate && selectedTime) {
      setFormData({
        ...formData,
        preferredDate: selectedDate.toDateString(),
        preferredTime: selectedTime,
        timezone: selectedTimezone
      })
      setShowContactForm(true)
    }
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would integrate with your form submission service
    console.log("Form submitted:", formData)
    alert("Meeting scheduled successfully! We'll confirm via email.")
    // Reset everything
    setShowSchedule(false)
    setShowContactForm(false)
    setSelectedDate(null)
    setSelectedTime(null)
    setFormData({
      name: "",
      email: "",
      projectDetails: "",
      preferredDate: "",
      preferredTime: "",
      timezone: "IST"
    })
  }

  const renderCalendar = () => {
    const calendarDays = generateCalendar()
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    
    return (
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-6">Select Date - February 2026</h3>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {daysOfWeek.map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-400 py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => {
            const isSelected = selectedDate && 
              selectedDate.getDate() === day.date && 
              selectedDate.getMonth() === day.month
            const isToday = day.date === 15 && day.month === 1 // February 15, 2026
            
            return (
              <button
                key={index}
                onClick={() => handleDateSelect(day)}
                disabled={!day.available || !day.currentMonth}
                className={`
                  relative h-12 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-300
                  ${!day.currentMonth ? 'text-gray-600 cursor-default' : ''}
                  ${!day.available ? 'text-gray-500 cursor-not-allowed opacity-50' : ''}
                  ${day.currentMonth && day.available ? 'hover:bg-white/10 text-white' : ''}
                  ${isSelected ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white scale-105' : ''}
                  ${isToday ? 'ring-2 ring-blue-400' : ''}
                `}
              >
                {day.date}
                {isToday && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                )}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  const renderTimeSlots = () => {
    const filteredSlots = timeSlots.filter(slot => slot.timezone === selectedTimezone)
    
    return (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">Select Time Slot</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedTimezone("IST")}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                selectedTimezone === "IST" 
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              IST (India)
            </button>
            <button
              onClick={() => setSelectedTimezone("GMT")}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                selectedTimezone === "GMT" 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              GMT (International)
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {filteredSlots.map(slot => (
            <button
              key={slot.id}
              onClick={() => handleTimeSelect(slot.time, slot.timezone)}
              disabled={!selectedDate}
              className={`
                relative px-4 py-3 rounded-xl text-center transition-all duration-300
                ${!selectedDate ? 'opacity-50 cursor-not-allowed' : ''}
                ${selectedTime === slot.time ? 
                  'bg-gradient-to-r from-blue-500 to-cyan-500 text-white scale-105' : 
                  'bg-white/5 hover:bg-white/10 text-gray-300'
                }
              `}
            >
              {slot.time}
              <div className="text-xs mt-1 opacity-70">
                {slot.timezone}
              </div>
              {selectedTime === slot.time && (
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white animate-ping" />
              )}
            </button>
          ))}
        </div>
      </div>
    )
  }

  const renderContactForm = () => {
    return (
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div className="bg-white/5 rounded-xl p-6 mb-6">
          <h4 className="text-lg font-semibold text-white mb-3">Selected Schedule</h4>
          <div className="flex flex-col sm:flex-row gap-4 text-gray-300">
            <div className="flex-1">
              <div className="text-sm text-gray-400">Date</div>
              <div className="font-medium">{formData.preferredDate}</div>
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-400">Time</div>
              <div className="font-medium">{formData.preferredTime} ({formData.timezone})</div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Your Name *
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

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Project Details *
          </label>
          <textarea
            required
            rows={4}
            value={formData.projectDetails}
            onChange={(e) => setFormData({...formData, projectDetails: e.target.value})}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors duration-300 resize-none"
            placeholder="Tell us about your project or what you'd like to discuss..."
          />
        </div>

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setShowContactForm(false)
              setShowSchedule(true)
            }}
            className="flex-1"
          >
            ← Back
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
          >
            Confirm Schedule
          </Button>
        </div>
      </form>
    )
  }

  const renderMainContent = () => {
    if (showContactForm) {
      return (
        <div className="max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold text-white mb-2">Finalize Your Meeting</h3>
          <p className="text-gray-400 mb-8">
            Please provide your details to confirm the schedule
          </p>
          {renderContactForm()}
        </div>
      )
    }

    if (showSchedule) {
      return (
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-3xl font-bold text-white">Schedule a Call</h3>
            <button
              onClick={() => {
                setShowSchedule(false)
                setSelectedDate(null)
                setSelectedTime(null)
              }}
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 transition-colors duration-300"
            >
              ← Back
            </button>
          </div>
          
          {renderCalendar()}
          {renderTimeSlots()}
          
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 border border-white/10">
            <h4 className="text-xl font-semibold text-white mb-4">Meeting Details</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-gray-400 mb-2">Selected Date</div>
                <div className="text-lg text-white">
                  {selectedDate ? selectedDate.toDateString() : "Not selected"}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-2">Selected Time</div>
                <div className="text-lg text-white">
                  {selectedTime ? `${selectedTime} (${selectedTimezone})` : "Not selected"}
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="text-sm text-gray-400 mb-4">Duration: 2 hours</div>
              <Button
                onClick={handleProceedToContact}
                disabled={!selectedDate || !selectedTime}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {selectedDate && selectedTime ? "Proceed to Confirm" : "Select Date & Time"}
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return (
      <>
        <Reveal>
          <div className="mb-8">
            <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-400 mb-6">
              Get Started
            </span>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            <span className="block">
              Ready to
              <span className="relative inline-block mx-3">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-text">
                  elevate
                </span>
                <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full animate-pulse" />
              </span>
            </span>
            <span className="block text-gray-300 mt-2">
              your digital presence?
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-8 max-w-2xl text-xl text-gray-400 leading-relaxed">
            From concept to launch, we partner with ambitious brands to create 
            exceptional digital experiences that drive results and inspire.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">40+</div>
              <div className="text-sm text-gray-400">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">98%</div>
              <div className="text-sm text-gray-400">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-sm text-gray-400">Support</div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-12">
            <Magnetic>
              <Button 
                onClick={handleScheduleCall}
                className="relative group px-12 py-6 text-lg font-semibold rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 text-white hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                <span className="relative flex items-center gap-3">
                  <svg 
                    className="w-6 h-6 transform group-hover:rotate-12 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Schedule a Discovery Call
                </span>
              </Button>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-gray-400">Available for new projects</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-sm text-gray-400">Response within 24 hours</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                <span className="text-sm text-gray-400">Free 2-hour consultation</span>
              </div>
            </div>
          </div>
        </Reveal>
      </>
    )
  }

  return (
    <section className="relative bg-black py-40 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-purple-500/10 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        {renderMainContent()}
      </div>

      <style jsx global>{`
        @keyframes gradient-text {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient-text {
          background-size: 200% auto;
          animation: gradient-text 3s ease infinite;
        }
      `}</style>
    </section>
  )
}