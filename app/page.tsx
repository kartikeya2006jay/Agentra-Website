import Hero from "@/components/hero/hero"
import Services from "@/components/sections/services"
import Process from "@/components/sections/process"
import Testimonials from "@/components/sections/testimonials"
import CallToAction from "@/components/sections/call-to-action"
import Footer from "@/components/sections/footer"

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <Hero />
      <Services />
      <Process />
      <Testimonials />
      <CallToAction />
      <Footer />
    </main>
  )
}