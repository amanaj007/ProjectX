"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { NotesSection } from "@/components/notes-section"
import { TasksSection } from "@/components/tasks-section"
import { SearchBar } from "@/components/search-bar"
import { useStore } from "@/store/useStore"

export default function Home() {
  const [activeTab, setActiveTab] = useState<'notes' | 'tasks'>('notes')
  const { searchFilters, setSearchFilters } = useStore()
  const [showNewNoteModal, setShowNewNoteModal] = useState(false)
  const [showNewTaskModal, setShowNewTaskModal] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Header 
        activeTab={activeTab}
        onNewNote={() => setShowNewNoteModal(true)}
        onNewTask={() => setShowNewTaskModal(true)}
      />
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          onNewNote={() => setShowNewNoteModal(true)}
          onNewTask={() => setShowNewTaskModal(true)}
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
    </div>
  )
} 