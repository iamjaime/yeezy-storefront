"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])

  const images = [
    {
      src: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2000",
      alt: "YEEZY Collection"
    },
    {
      src: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2000",
      alt: "YEEZY Style"
    },
    {
      src: "https://images.unsplash.com/photo-1483118714900-540cf339fd46?q=80&w=2000",
      alt: "YEEZY Design"
    },
    {
      src: "https://images.unsplash.com/photo-1495385794356-15371f348c31?q=80&w=2000",
      alt: "YEEZY Fashion"
    }
  ]

  return (
    <>
      <div ref={containerRef} className="h-screen w-full overflow-hidden bg-black">
        {/* Grid Container */}
        <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 gap-1 p-1">
          {/* Grid Items */}
          {images.map((image, index) => (
            <motion.div
              key={index}
              style={{ scale }}
              className="relative h-full overflow-hidden group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Base dark overlay */}
              <div
                className="absolute inset-0 bg-black opacity-65 group-hover:opacity-20 transition-opacity duration-500"
              />
              
              {/* Fancy hover effect overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-transparent to-orange-500/20 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out rotate-45 scale-150 group-hover:rotate-0 group-hover:scale-100"
              />

              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-all duration-700 ease-out scale-100 group-hover:scale-110 grayscale group-hover:grayscale-0 brightness-75 group-hover:brightness-100"
                priority
              />

              {/* Additional gradient overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent translate-y-0 group-hover:translate-y-full transition-transform duration-700 ease-in-out"
              />

              {/* Text overlay on hover */}
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <span className="text-white text-2xl font-bold tracking-wider scale-90 group-hover:scale-100 transition-transform duration-300">
                  {image.alt}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Text Box */}
      <div className="fixed top-[30vh] left-[35vw] w-[30vw] text-center z-50">
        <h1 className="text-7xl md:text-9xl font-bold text-white mb-6 tracking-tighter">
          YEEZY
        </h1>
        <p className="text-xl md:text-2xl text-white mb-12 tracking-wide">
          REDEFINING MODERN LUXURY
        </p>
        <div>
          <LocalizedClientLink
            href="/store"
            className="group relative inline-block overflow-hidden bg-transparent border-2 border-white px-8 py-4"
          >
            <span className="absolute inset-0 bg-white transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></span>
            <span className="relative text-lg uppercase tracking-wider text-white group-hover:text-black transition-colors duration-300">
              Shop Collection
            </span>
          </LocalizedClientLink>
        </div>
      </div>
    </>
  )
}

export default Hero
