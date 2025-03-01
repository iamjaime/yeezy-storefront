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
    }
  ]

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">
      {/* Grid Container */}
      <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 gap-1 p-1">
        {/* Grid Items */}
        {images.map((image, index) => (
          <motion.div
            key={index}
            style={{ scale }}
            className={`relative h-full overflow-hidden ${index === 2 ? 'hidden md:block' : ''}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Base dark overlay */}
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: hoveredIndex === index ? 0.3 : 0.65 }}
              transition={{ duration: 0.3 }}
            />
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover grayscale contrast-125 brightness-75 hover:brightness-90 hover:grayscale-0 transition-all duration-700"
              priority
            />
            {/* Additional gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: hoveredIndex === index ? 0.4 : 0.5 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </div>

      {/* Overlay Text */}
      <motion.div 
        style={{ opacity }}
        className="absolute inset-0 flex flex-col items-center justify-center z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center relative"
        >
          {/* Semi-transparent backdrop */}
          <motion.div 
            className="absolute inset-0 -m-8 md:-m-12 bg-black/40 backdrop-blur-sm rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          
          <motion.h1 
            className="text-7xl md:text-9xl font-bold text-white mb-6 tracking-tighter relative"
            style={{ y }}
          >
            YEEZY
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-white mb-12 tracking-wide relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            REDEFINING MODERN LUXURY
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative"
          >
            <LocalizedClientLink
              href="/store"
              className="group relative inline-block overflow-hidden bg-transparent border-2 border-white px-8 py-4"
            >
              <span className="absolute inset-0 bg-white transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></span>
              <span className="relative text-lg uppercase tracking-wider text-white group-hover:text-black transition-colors duration-300">
                Shop Collection
              </span>
            </LocalizedClientLink>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Hero
