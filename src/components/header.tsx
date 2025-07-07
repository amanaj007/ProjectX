"use client"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserMenu } from "@/components/user-menu"
import { Search, Plus, Menu, Settings } from "lucide-react"
import { useStore } from "@/store/useStore"

interface HeaderProps {
  activeTab: 'notes' | 'tasks'
  onNewNote: () => void
  onNewTask: () => void
  onOpenSettings?: () => void // Optional settings handler
  onSearch?: () => void // Optional search handler
  onSignIn?: () => void // Optional sign-in handler
}

export function Header({
  activeTab,
  onNewNote,
  onNewTask,
  onOpenSettings,
  onSearch,
  onSignIn,
}: HeaderProps) {
  const { user } = useStore()

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">N</span>
            </div>
            <h1 className="text-xl font-bold">Notes & Tasks</h1>
          </div>
        </div>
        
        <div className="flex-1" />
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onSearch ? onSearch : () => { console.log('Search clicked') }}
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (activeTab === 'notes') {
                onNewNote()
              } else {
                onNewTask()
              }
            }}
            aria-label="New"
          >
            <Plus className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenSettings ? onOpenSettings : () => { alert('Settings clicked') }}
            aria-label="Settings"
          >
            <Settings className="h-5 w-5" />
          </Button>
          <ThemeToggle />
          {user ? (
            <UserMenu 
              user={user} 
              onSettings={onOpenSettings}
              onSignOut={() => useStore.getState().setUser(null)}
            />
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={onSignIn ? onSignIn : () => {
                // Fallback to demo user if no handler provided
                const mockUser = {
                  id: 'demo-user',
                  email: 'demo@example.com',
                  name: 'Demo User',
                  image: undefined,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                }
                useStore.getState().setUser(mockUser)
              }}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}