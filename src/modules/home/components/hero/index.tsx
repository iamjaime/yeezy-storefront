"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">
      {/* Grid Container */}
      <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 gap-1 p-1">
        {/* Grid Items */}
        <motion.div style={{ scale }} className="relative h-full overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2000"
            alt="YEEZY Collection"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <motion.div style={{ scale }} className="relative h-full overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2000"
            alt="YEEZY Style"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <motion.div style={{ scale }} className="relative h-full overflow-hidden hidden md:block">
          <Image
            src="https://images.unsplash.com/photo-1483118714900-540cf339fd46?q=80&w=2000"
            alt="YEEZY Design"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </div>

      {/* Overlay Text */}
      <motion.div 
        style={{ opacity }}
        className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black bg-opacity-30"
      >
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tighter">
          YEEZY
        </h1>
        <p className="text-lg md:text-xl text-white mb-8 tracking-wide">
          REDEFINING MODERN LUXURY
        </p>
        <LocalizedClientLink
          href="/store"
          className="inline-block bg-white text-black px-8 py-4 text-lg uppercase tracking-wider hover:bg-gray-100 transition-colors"
        >
          Shop Collection
        </LocalizedClientLink>
      </motion.div>
    </div>
  )
}

export default Hero
