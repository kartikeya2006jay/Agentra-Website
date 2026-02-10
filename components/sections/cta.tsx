"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
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
  month: number
  day: number
  available: boolean
  currentMonth: boolean
}

interface ScheduleData {
  date: Date | null
  time: string | null
  timezone: "IST" | "GMT"
}

export default function CTA() {
  const router = useRouter()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [showSchedule, setShowSchedule] = useState(false)
  const [scheduleData, setScheduleData] = useState<ScheduleData>({
    date: null,
    time: null,
    timezone: "IST"
  })

  // Generate calendar for February 2026
  const generateCalendar = (): CalendarDay[] => {
    const days: CalendarDay[] = []
    const year = 2026
    const month = 1 // February (0-indexed)
    
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startDay = firstDay.getDay()
    
    // Previous month days
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
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i)
      const dayOfWeek = currentDate.getDay()
      const available = dayOfWeek >= 1 && dayOfWeek <= 5
      
      days.push({
        date: i,
        month: month,
        day: dayOfWeek,
        available,
        currentMonth: true
      })
    }
    
    // Next month days
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
      setScheduleData(prev => ({
        ...prev,
        date: selected,
        time: null // Reset time when date changes
      }))
    }
  }

  const handleTimeSelect = (time: string, timezone: "IST" | "GMT") => {
    if (scheduleData.date) {
      setScheduleData(prev => ({
        ...prev,
        time,
        timezone
      }))
    }
  }

  const handleProceedToContact = () => {
    if (scheduleData.date && scheduleData.time) {
      // Store schedule data in localStorage for contact page
      const scheduleInfo = {
        date: scheduleData.date.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        time: scheduleData.time,
        timezone: scheduleData.timezone,
        timestamp: scheduleData.date.getTime()
      }
      
      localStorage.setItem('meetingSchedule', JSON.stringify(scheduleInfo))
      
      // Navigate to contact page
      router.push('/contact')
    }
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
            const isSelected = scheduleData.date && 
              scheduleData.date.getDate() === day.date && 
              scheduleData.date.getMonth() === day.month
            const isToday = day.date === 15 && day.month === 1
            
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
    const filteredSlots = timeSlots.filter(slot => slot.timezone === scheduleData.timezone)
    
    return (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">Select Time Slot (2-hour duration)</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setScheduleData(prev => ({ ...prev, timezone: "IST", time: null }))}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                scheduleData.timezone === "IST" 
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              IST (India)
            </button>
            <button
              onClick={() => setScheduleData(prev => ({ ...prev, timezone: "GMT", time: null }))}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                scheduleData.timezone === "GMT" 
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
              disabled={!scheduleData.date}
              className={`
                relative px-4 py-3 rounded-xl text-center transition-all duration-300
                ${!scheduleData.date ? 'opacity-50 cursor-not-allowed' : ''}
                ${scheduleData.time === slot.time ? 
                  'bg-gradient-to-r from-blue-500 to-cyan-500 text-white scale-105' : 
                  'bg-white/5 hover:bg-white/10 text-gray-300'
                }
              `}
            >
              {slot.time}
              <div className="text-xs mt-1 opacity-70">
                {slot.timezone}
              </div>
              {scheduleData.time === slot.time && (
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white animate-ping" />
              )}
            </button>
          ))}
        </div>
      </div>
    )
  }

  const renderScheduleInterface = () => {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-3xl font-bold text-white">Schedule a Discovery Call</h3>
          <button
            onClick={() => {
              setShowSchedule(false)
              setScheduleData({ date: null, time: null, timezone: "IST" })
            }}
            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 transition-colors duration-300"
          >
            ← Back
          </button>
        </div>
        
        {renderCalendar()}
        {renderTimeSlots()}
        
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 border border-white/10">
          <h4 className="text-xl font-semibold text-white mb-4">Meeting Summary</h4>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="text-sm text-gray-400 mb-2">Selected Date</div>
              <div className="text-lg text-white">
                {scheduleData.date ? scheduleData.date.toDateString() : "Not selected"}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-2">Selected Time</div>
              <div className="text-lg text-white">
                {scheduleData.time ? `${scheduleData.time} (${scheduleData.timezone})` : "Not selected"}
              </div>
            </div>
          </div>
          
          <div className="pt-6 border-t border-white/10">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Duration: 2 hours
            </div>
            <Button
              onClick={handleProceedToContact}
              disabled={!scheduleData.date || !scheduleData.time}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {scheduleData.date && scheduleData.time ? "Proceed to Contact Form" : "Select Date & Time"}
            </Button>
            <p className="text-sm text-gray-400 mt-4 text-center">
              You'll fill in your details on the next page
            </p>
          </div>
        </div>
      </div>
    )
  }

  const renderMainContent = () => {
    if (showSchedule) {
      return renderScheduleInterface()
    }

    return (
      <>
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