import { Button, buttonVariants } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Sparkles } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
            <div className="h-9 w-9 rounded-xl bg-linear-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/20">
              <Sparkles className="text-primary-foreground h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70">
              Kōsatsu
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-1">
            <Link 
              href="/" 
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors hover:text-primary rounded-full hover:bg-primary/5"
              )}
            >
              Dashboard
            </Link>
            <Link 
              href="/candidates" 
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors hover:text-primary rounded-full hover:bg-primary/5"
              )}
            >
              Candidates
            </Link>
          </nav>
        </div>
        
        <div className="flex-1 px-8 hidden md:block max-w-md">
          <div className="relative group">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="search"
              placeholder="Search evaluations..."
              className="w-full bg-muted/40 pl-10 pr-4 py-2 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 h-10 text-sm transition-all focus:bg-muted/60"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            href="/upload" 
            className={buttonVariants({ 
              size: "sm", 
              className: "rounded-full px-5 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all font-semibold" 
            })}
          >
            Analyze New
          </Link>
          <div className="h-8 w-[1px] bg-border mx-2" />
          <Avatar className="h-9 w-9 border-2 border-background shadow-md hover:scale-105 transition-transform cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-primary/10 text-primary">NS</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
