"use client";

import { Button, buttonVariants } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Sparkles, Command } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export function Navbar() {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/60 backdrop-blur-2xl px-4 md:px-0"
    >
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-3 transition-all hover:scale-105 active:scale-95 group">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_20px_oklch(0.65_0.25_260/0.3)] group-hover:shadow-[0_0_40px_oklch(0.65_0.25_260/0.6)] transition-all">
              <Sparkles className="text-black h-5 w-5" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase">
              Kōsatsu
            </span>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-2">
            {[
              { label: "Dashboard", href: "/" },
              { label: "Candidates", href: "/candidates" },
              { label: "Settings", href: "#" },
            ].map((item) => (
              <Link 
                key={item.label}
                href={item.href} 
                className="px-5 py-2 text-sm font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors hover:bg-white/5 rounded-full"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="hidden xl:block flex-1 max-w-sm ml-10">
          <div className="relative group">
            <Search className="absolute left-4 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Command + K to search..."
              className="w-full bg-white/5 pl-12 pr-4 py-3 rounded-2xl border border-white/5 focus:border-primary/50 focus:ring-0 text-sm font-bold transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Link 
            href="/upload" 
            className={buttonVariants({ 
              className: "rounded-full px-8 h-12 shadow-[0_0_20px_oklch(0.65_0.25_260/0.2)] font-black uppercase tracking-widest text-xs" 
            })}
          >
            New Analysis
          </Link>
          <div className="h-6 w-px bg-white/10 mx-2" />
          <Avatar className="h-10 w-10 border-2 border-white/10 shadow-lg hover:scale-110 transition-transform cursor-pointer ring-2 ring-primary/20">
            <AvatarImage src="https://github.com/navodit-ai.png" />
            <AvatarFallback className="bg-primary/20 text-primary font-bold">NS</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </motion.header>
  )
}
