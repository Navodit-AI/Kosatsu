import { Button, buttonVariants } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search } from "lucide-react"
import Link from "next/link"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">K</span>
          </div>
          <span className="text-xl font-bold tracking-tight">Kōsatsu</span>
        </div>
        
        <div className="flex-1 px-8 hidden md:block max-w-xl">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search candidates..."
              className="w-full bg-muted/50 pl-9 pr-4 py-2 rounded-full border-none focus:ring-2 focus:ring-primary h-9 text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            href="/" 
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            Dashboard
          </Link>
          <Link 
            href="/candidates" 
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            Candidates
          </Link>
          <Link 
            href="/upload" 
            className={buttonVariants({ size: "sm" })}
          >
            Analyze New
          </Link>
          <Separator orientation="vertical" className="h-6" />
          <Avatar className="h-8 w-8 hover:cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>NS</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}

function Separator({ orientation, className }: { orientation?: string, className?: string }) {
  return <div className={`bg-border ${orientation === 'vertical' ? 'w-[1px] h-full' : 'h-[1px] w-full'} ${className}`} />
}
