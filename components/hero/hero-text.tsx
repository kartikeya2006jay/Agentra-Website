import Button from "@/components/ui/button"
import Reveal from "@/components/animations/reveal"
import Magnetic from "@/components/animations/magnetic"

export default function HeroText() {
  return (
    <div className="mx-auto max-w-4xl text-center px-6">
      <Reveal>
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight">
          We build
          <span className="block text-gray-400">
            cinematic digital experiences
          </span>
        </h1>
      </Reveal>

      <Reveal delay={0.15}>
        <p className="mt-6 text-lg text-gray-400">
          Agentra is a premium digital agency focused on performance,
          motion, and immersive design.
        </p>
      </Reveal>

      <Reveal delay={0.3}>
        <div className="mt-10 flex justify-center gap-4">
          <Magnetic>
            <Button>Start a project</Button>
          </Magnetic>
          <Magnetic>
            <Button variant="secondary">View work</Button>
          </Magnetic>
        </div>
      </Reveal>
    </div>
  )
}