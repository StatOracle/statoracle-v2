"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  const navItems = [
    { name: "Waitlist", href: "#waitlist" },
  ]

  const underlineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    exit: {
      scaleX: 0,
      opacity: 0,
      transition: { duration: 0.2, ease: "easeIn" }
    }
  }

  return (
    <motion.nav
      className="fixed w-full top-0 z-50 bg-black/70 backdrop-blur-md border-b border-gray-100"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/statoraclelogo.webp" alt="StatOracle Logo" width={30} height={30} className="rounded-md" />
          <span className="text-xl font-bold bg-gradient-to-r from-yellow-500 to-amber-300 bg-clip-text text-transparent">
            StatOracle
          </span>
        </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative px-5 py-1 text-gray-300 backdrop-blur-sm rounded-full hover:text-amber-300 transition-colors"
                onMouseEnter={() => setHoveredLink(item.name)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {item.name}
                <AnimatePresence>
                  {hoveredLink === item.name && (
                    <motion.div
                      className="absolute bottom-1 left-0 right-0 h-[1px] bg-gray-700 origin-center"
                      variants={underlineVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    />
                  )}
                </AnimatePresence>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Navigation menu"
          >
            <motion.div
              className="w-6 h-6 relative"
              animate={isOpen ? "open" : "closed"}
            >
              <motion.span
                className="absolute block h-[2px] w-6 bg-gray-700"
                variants={{
                  closed: { top: '0.25rem', rotate: 0 },
                  open: { top: '0.75rem', rotate: 45 }
                }}
              />
              <motion.span
                className="absolute block h-[2px] w-6 bg-gray-700"
                variants={{
                  closed: { top: '0.75rem', rotate: 0 },
                  open: { top: '0.75rem', rotate: -45 }
                }}
              />
            </motion.div>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden fixed inset-0"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
            >
              <div className="flex flex-col items-center pt-24 backdrop-blur-sm space-y-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group text-2xl font-medium text-yellow-400 hover:text-yellow-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                    <span className="block h-[1px] bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300" />
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
