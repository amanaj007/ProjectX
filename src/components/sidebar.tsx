"use client"

import { Button } from "@/components/ui/button"
import { 
  StickyNote, 
  CheckSquare, 
  Clock, 
  Star, 
  Archive, 
  Settings,
  Plus
} from "lucide-react"
import { useStore } from "@/store/useStore"
import { cn } from "@/lib/utils"

interface SidebarProps {
  activeTab: 'notes' | 'tasks'
  setActiveTab: (tab: 'notes' | 'tasks') => void
  onNewNote: () => void
  onNewTask: () => void
}

export function Sidebar({ activeTab, setActiveTab, onNewNote, onNewTask }: SidebarProps) {
  const { 
    getRecentNotes, 
    getMostUsedNotes, 
    getPinnedNotes, 
    getPinnedTasks,
    getCompletedTasks,
    getPendingTasks 
  } = useStore()

  const recentNotes = getRecentNotes()
  const mostUsedNotes = getMostUsedNotes()
  const pinnedNotes = getPinnedNotes()
  const pinnedTasks = getPinnedTasks()
  const completedTasks = getCompletedTasks()
  const pendingTasks = getPendingTasks()

  return (
    <aside className="w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full flex-col">
        <div className="p-4">
          <Button 
            className="w-full justify-start" 
            size="sm"
            onClick={() => {
              if (activeTab === 'notes') {
                onNewNote()
              } else {
                onNewTask()
              }
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            New {activeTab === 'notes' ? 'Note' : 'Task'}
          </Button>
        </div>
        
        <div className="flex-1 overflow-auto">
          <div className="p-4 space-y-6">
            {/* Main Navigation */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Main</h3>
              <div className="space-y-1">
                <Button
                  variant={activeTab === 'notes' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('notes')}
                >
                  <StickyNote className="mr-2 h-4 w-4" />
                  Notes
                </Button>
                <Button
                  variant={activeTab === 'tasks' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('tasks')}
                >
                  <CheckSquare className="mr-2 h-4 w-4" />
                  Tasks
                </Button>
              </div>
            </div>

            {/* Quick Access */}
            {activeTab === 'notes' && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Quick Access</h3>
                <div className="space-y-1">
                  {pinnedNotes.length > 0 && (
                    <Button variant="ghost" className="w-full justify-start text-xs">
                      <Star className="mr-2 h-3 w-3" />
                      Pinned ({pinnedNotes.length})
                    </Button>
                  )}
                  {recentNotes.length > 0 && (
                    <Button variant="ghost" className="w-full justify-start text-xs">
                      <Clock className="mr-2 h-3 w-3" />
                      Recent ({recentNotes.length})
                    </Button>
                  )}
                  {mostUsedNotes.length > 0 && (
                    <Button variant="ghost" className="w-full justify-start text-xs">
                      <Star className="mr-2 h-3 w-3" />
                      Most Used ({mostUsedNotes.length})
                    </Button>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'tasks' && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Quick Access</h3>
                <div className="space-y-1">
                  {pinnedTasks.length > 0 && (
                    <Button variant="ghost" className="w-full justify-start text-xs">
                      <Star className="mr-2 h-3 w-3" />
                      Pinned ({pinnedTasks.length})
                    </Button>
                  )}
                  {pendingTasks.length > 0 && (
                    <Button variant="ghost" className="w-full justify-start text-xs">
                      <Clock className="mr-2 h-3 w-3" />
                      Pending ({pendingTasks.length})
                    </Button>
                  )}
                  {completedTasks.length > 0 && (
                    <Button variant="ghost" className="w-full justify-start text-xs">
                      <CheckSquare className="mr-2 h-3 w-3" />
                      Completed ({completedTasks.length})
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Tags</h3>
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start text-xs">
                  #work
                </Button>
                <Button variant="ghost" className="w-full justify-start text-xs">
                  #personal
                </Button>
                <Button variant="ghost" className="w-full justify-start text-xs">
                  #ideas
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t">
          <Button 
            variant="ghost" 
            className="w-full justify-start" 
            size="sm"
            onClick={() => {
              console.log('Settings clicked')
              // You can add settings modal here later
            }}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>
    </aside>
  )
} 