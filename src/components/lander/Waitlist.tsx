"use client"

import { motion } from "framer-motion"
import { useToast } from "@/lib/hooks/use-toast"
import { supabase } from "@/lib/supabaseClient"
import { useState } from "react"

export default function Waitlist() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitting email:", email)

    const { error } = await supabase
      .from('waitlist')
      .insert({ email: email }) 

    if (error) {
      console.error("Supabase error:", error)
      toast({
        title: "Error",
        description: `There was an error joining the waitlist: ${error.message}`,
      })
    } else {
      toast({
        title: "Success! 🎉",
        description: "Thanks for joining the waitlist. We'll be in touch soon!",
      })
    }
  }

  return (
    <section id="waitlist" className="py-16 md:py-16 bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid-overlay.png')] bg-cover opacity-10 mix-blend-overlay"></div>

      <motion.div
        className="max-w-7xl mx-auto px-6 relative z-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            variants={item}
            className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
          >
            <span className="text-sm font-medium">Join the Future 🚀</span>
          </motion.div>

          <motion.h2 variants={item} className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-200 md:text-5xl font-display font-bold mb-4">
            Be Among the First to Experience
          </motion.h2>

          <motion.p variants={item} className="text-xl text-white/80 mb-12">
            Get early access to AI-powered insights that will revolutionize your game.
          </motion.p>

          <motion.form variants={item} onSubmit={handleSubmit} className="max-w-md mx-auto mb-16">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="px-8 py-4 rounded-full backdrop-blur-sm hover:animate-pulse bg-white/20 hover:bg-white/40 text-yellow-500 font-bold transition-all"
              >
                Join Waitlist
              </button>
            </div>
          </motion.form>
        </div>
      </motion.div>
    </section>
  )
}