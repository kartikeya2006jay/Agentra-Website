import Hero from "@/components/hero/hero"
import Services from "@/components/sections/services"
import Process from "@/components/sections/process"
import Projects from "@/components/sections/projects"
import CTA from "@/components/sections/cta"   

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <Projects />
      <CTA /> 
    </>
  )
}