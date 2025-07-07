"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useStore } from "@/store/useStore"
import { ThemeToggle } from "@/components/theme-toggle"
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette,
  Database,
  Trash2
} from "lucide-react"

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { user, setUser, theme, setTheme, notes, tasks, clearSearchFilters } = useStore()
  const [activeTab, setActiveTab] = useState<'general' | 'account' | 'data'>('general')

  if (!isOpen) return null

  const handleSignOut = () => {
    setUser(null)
    onClose()
  }

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      // Clear all data by resetting the store
      localStorage.removeItem('notes-app-storage')
      window.location.reload()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Settings
          </h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            ×
          </Button>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-48 space-y-2">
            <button
              onClick={() => setActiveTab('general')}
              className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 ${
                activeTab === 'general' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
              }`}
            >
              <Settings className="h-4 w-4" />
              General
            </button>
            <button
              onClick={() => setActiveTab('account')}
              className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 ${
                activeTab === 'account' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
              }`}
            >
              <User className="h-4 w-4" />
              Account
            </button>
            <button
              onClick={() => setActiveTab('data')}
              className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 ${
                activeTab === 'data' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
              }`}
            >
              <Database className="h-4 w-4" />
              Data
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-6">
            {activeTab === 'general' && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    Appearance
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Theme:</span>
                    <ThemeToggle />
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    Notifications
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Notification settings coming soon...
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'account' && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    User Information
                  </h4>
                  {user ? (
                    <div className="space-y-2">
                      <div>
                        <label className="text-sm font-medium">Name</label>
                        <Input value={user.name} disabled />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <Input value={user.email} disabled />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Member since</label>
                        <Input value={user.createdAt.toLocaleDateString()} disabled />
                      </div>
                      <Button variant="outline" onClick={handleSignOut}>
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No user signed in
                    </p>
                  )}
                </div>

                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Privacy & Security
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Privacy settings coming soon...
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'data' && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    Data Management
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Notes:</span>
                      <span className="text-sm font-medium">{notes.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Tasks:</span>
                      <span className="text-sm font-medium">{tasks.length}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Trash2 className="h-4 w-4" />
                    Clear Data
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    This will permanently delete all your notes and tasks.
                  </p>
                  <Button variant="destructive" onClick={handleClearData}>
                    Clear All Data
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 