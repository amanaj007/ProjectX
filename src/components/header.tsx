"use client"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserMenu } from "@/components/user-menu"
import { Search, Plus, Menu } from "lucide-react"
import { useStore } from "@/store/useStore"

interface HeaderProps {
  activeTab: 'notes' | 'tasks'
  onNewNote: () => void
  onNewTask: () => void
}

export function Header({ activeTab, onNewNote, onNewTask }: HeaderProps) {
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
          <Button variant="ghost" size="icon" onClick={() => {
            // Focus on search bar or toggle search
            console.log('Search clicked')
          }}>
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => {
            if (activeTab === 'notes') {
              onNewNote()
            } else {
              onNewTask()
            }
          }}>
            <Plus className="h-5 w-5" />
          </Button>
          <ThemeToggle />
          {user ? (
            <UserMenu user={user} />
          ) : (
            <Button variant="outline" size="sm" onClick={() => {
              // For demo purposes, let's create a mock user
              const mockUser = {
                id: 'demo-user',
                email: 'demo@example.com',
                name: 'Demo User',
                image: undefined,
                createdAt: new Date(),
                updatedAt: new Date()
              }
              useStore.getState().setUser(mockUser)
            }}>
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  )
} 