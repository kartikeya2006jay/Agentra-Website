"use client"

export default function AboutPage() {
  return (
    <section className="bg-black py-40">
      <div className="mx-auto max-w-6xl px-6">
        {/* Intro */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            About Agentra
          </h1>
          <p className="mt-6 text-lg text-gray-400 leading-relaxed">
            Agentra is a four-member digital studio focused on building fast,
            reliable, and high-quality web experiences.
            <br />
            We work as a small, focused team where each member owns a clear role,
            allowing us to move quickly without sacrificing quality.
          </p>
        </div>

        {/* How we work */}
        <div className="mx-auto mt-20 max-w-4xl text-center">
          <p className="text-gray-400 leading-relaxed">
            Our process is simple and intentional. We collaborate closely,
            design with clarity, and build with performance in mind.
            Every decision is guided by usability, scalability, and long-term
            reliability.
            <br />
            <br />
            By keeping the team small, we stay aligned, reduce friction, and
            deliver consistent results without unnecessary complexity.
          </p>
        </div>

        {/* Team */}
        <div className="mt-32">
          <h2 className="text-center text-3xl font-semibold">
            The People Behind Agentra
          </h2>

          <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Team Member One", img: "img1" },
              { name: "Team Member Two", img: "img2" },
              { name: "Team Member Three", img: "img3" },
              { name: "Team Member Four", img: "img4" },
            ].map((member) => (
              <div
                key={member.name}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition hover:border-white/20 hover:bg-white/10"
              >
                {/* Image placeholder */}
                <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-xl bg-black/40 text-sm text-gray-300">
                  {member.img}
                </div>

                <h3 className="mt-6 text-lg font-medium">
                  {member.name}
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  Core contributor at Agentra
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}