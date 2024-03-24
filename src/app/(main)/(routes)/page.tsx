import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";
 
export default function Home() {
  return (
    <div className="h-screen">
      <UserButton afterSignOutUrl="/" />
      <p>Home Page</p>
      <ModeToggle />
    </div>
  )
}