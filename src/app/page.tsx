"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { NotesSection } from "@/components/notes-section"
import { TasksSection } from "@/components/tasks-section"
import { SearchBar } from "@/components/search-bar"
import { SettingsModal } from "@/components/settings-modal"
import { SignInModal } from "@/components/signin-modal"
import { useStore } from "@/store/useStore"
import { Button } from "@/components/ui/button"
import { 
  Star, 
  CheckCircle, 
  Circle, 
  Calendar,
  Flag,
  MoreVertical,
  Sparkles,
  Trash2
} from "lucide-react"

export default function Home() {
  const [activeTab, setActiveTab] = useState<'notes' | 'tasks'>('notes')
  const { searchFilters, setSearchFilters, user, setUser, addTask } = useStore()
  const [showNewNoteModal, setShowNewNoteModal] = useState(false)
  const [showNewTaskModal, setShowNewTaskModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [showSignInModal, setShowSignInModal] = useState(false)

  // Auto-sign in demo user if no user is signed in
  useEffect(() => {
    // Clear any corrupted localStorage data
    try {
      const stored = localStorage.getItem('notes-app-storage')
      if (stored) {
        const parsed = JSON.parse(stored)
        // Check if dates are strings (corrupted data)
        if (parsed.notes && parsed.notes.length > 0 && typeof parsed.notes[0].createdAt === 'string') {
          localStorage.removeItem('notes-app-storage')
          console.log('Cleared corrupted localStorage data')
        }
      }
    } catch (error) {
      localStorage.removeItem('notes-app-storage')
      console.log('Cleared invalid localStorage data')
    }

    if (!user) {
      const demoUser = {
        id: 'demo-user',
        email: 'demo@example.com',
        name: 'Demo User',
        image: undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      setUser(demoUser)
    }
  }, [user, setUser])

  const handleNewNote = () => {
    console.log('Opening new note modal');
    setShowNewNoteModal(true)
  }

  const handleNewTask = () => {
    console.log('handleNewTask called')
    setShowNewTaskModal(true)
  }

  const handleSearch = () => {
    alert('Search functionality coming soon!')
  }

  const handleSettings = () => {
    setShowSettingsModal(true)
  }

  const handleSignIn = () => {
    setShowSignInModal(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        activeTab={activeTab}
        onNewNote={handleNewNote}
        onNewTask={handleNewTask}
        onSearch={handleSearch}
        onOpenSettings={handleSettings}
        onSignIn={handleSignIn}
      />
      
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onNewNote={handleNewNote}
          onNewTask={handleNewTask}
        />
        <main className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="p-4 border-b">
              <SearchBar
                value={searchFilters.query}
                onChange={(query) => setSearchFilters({ query })}
              />
            </div>
            <div className="flex-1 overflow-auto p-4">
              {activeTab === 'notes' ? (
                <NotesSection
                  showNewNoteModal={showNewNoteModal}
                  setShowNewNoteModal={setShowNewNoteModal}
                />
              ) : (
                <TasksSection
                  showNewTaskModal={showNewTaskModal}
                  setShowNewTaskModal={setShowNewTaskModal}
                />
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      <SettingsModal 
        isOpen={showSettingsModal} 
        onClose={() => setShowSettingsModal(false)} 
      />
      <SignInModal 
        isOpen={showSignInModal} 
        onClose={() => setShowSignInModal(false)} 
      />
    </div>
  )
}