import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Note, Task, SearchFilters, Theme, User } from '@/types'

interface AppStore {
  // User state
  user: User | null
  setUser: (user: User | null) => void
  
  // Notes state
  notes: Note[]
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt' | 'lastAccessedAt' | 'accessCount'>) => void
  updateNote: (id: string, updates: Partial<Note>) => void
  deleteNote: (id: string) => void
  pinNote: (id: string) => void
  archiveNote: (id: string) => void
  incrementAccessCount: (id: string) => void
  
  // Tasks state
  tasks: Task[]
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  toggleTaskComplete: (id: string) => void
  pinTask: (id: string) => void
  
  // Search and filters
  searchFilters: SearchFilters
  setSearchFilters: (filters: Partial<SearchFilters>) => void
  clearSearchFilters: () => void
  
  // Theme
  theme: Theme
  setTheme: (theme: Theme) => void
  
  // UI state
  isLoading: boolean
  setLoading: (loading: boolean) => void
  error: string | null
  setError: (error: string | null) => void
  
  // Computed values
  getRecentNotes: () => Note[]
  getMostUsedNotes: () => Note[]
  getPinnedNotes: () => Note[]
  getPinnedTasks: () => Task[]
  getCompletedTasks: () => Task[]
  getPendingTasks: () => Task[]
  getFilteredNotes: () => Note[]
  getFilteredTasks: () => Task[]
}

const initialSearchFilters: SearchFilters = {
  query: '',
  type: 'all',
  tags: [],
}

const initialTheme: Theme = {
  mode: 'system'
}

export const useStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // User state
      user: null,
      setUser: (user) => set({ user }),
      
      // Notes state
      notes: [],
      addNote: (noteData) => {
        const newNote: Note = {
          ...noteData,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date(),
          updatedAt: new Date(),
          lastAccessedAt: new Date(),
          accessCount: 0,
        }
        set((state) => ({ notes: [newNote, ...state.notes] }))
      },
      updateNote: (id, updates) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? { ...note, ...updates, updatedAt: new Date() }
              : note
          ),
        }))
      },
      deleteNote: (id) => {
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        }))
      },
      pinNote: (id) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, isPinned: !note.isPinned } : note
          ),
        }))
      },
      archiveNote: (id) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, isArchived: !note.isArchived } : note
          ),
        }))
      },
      incrementAccessCount: (id) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? {
                  ...note,
                  accessCount: note.accessCount + 1,
                  lastAccessedAt: new Date(),
                }
              : note
          ),
        }))
      },
      
      // Tasks state
      tasks: [],
      addTask: (taskData) => {
        console.log('Store addTask called with:', taskData)
        const newTask: Task = {
          ...taskData,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        console.log('Created new task:', newTask)
        set((state) => {
          const newState = { tasks: [newTask, ...state.tasks] }
          console.log('New tasks state:', newState.tasks.length, 'tasks')
          return newState
        })
      },
      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, ...updates, updatedAt: new Date() }
              : task
          ),
        }))
      },
      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }))
      },
      toggleTaskComplete: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  isCompleted: !task.isCompleted,
                  completedAt: !task.isCompleted ? new Date() : undefined,
                  updatedAt: new Date(),
                }
              : task
          ),
        }))
      },
      pinTask: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, isPinned: !task.isPinned } : task
          ),
        }))
      },
      
      // Search and filters
      searchFilters: initialSearchFilters,
      setSearchFilters: (filters) => {
        set((state) => ({
          searchFilters: { ...state.searchFilters, ...filters },
        }))
      },
      clearSearchFilters: () => {
        set({ searchFilters: initialSearchFilters })
      },
      
      // Theme
      theme: initialTheme,
      setTheme: (theme) => set({ theme }),
      
      // UI state
      isLoading: false,
      setLoading: (loading) => set({ isLoading: loading }),
      error: null,
      setError: (error) => set({ error }),
      
      // Computed values
      getRecentNotes: () => {
        const { notes } = get()
        return notes
          .filter((note) => !note.isArchived)
          .sort((a, b) => {
            const dateA = a.lastAccessedAt instanceof Date ? a.lastAccessedAt : new Date(a.lastAccessedAt)
            const dateB = b.lastAccessedAt instanceof Date ? b.lastAccessedAt : new Date(b.lastAccessedAt)
            return dateB.getTime() - dateA.getTime()
          })
          .slice(0, 5)
      },
      getMostUsedNotes: () => {
        const { notes } = get()
        return notes
          .filter((note) => !note.isArchived)
          .sort((a, b) => b.accessCount - a.accessCount)
          .slice(0, 5)
      },
      getPinnedNotes: () => {
        const { notes } = get()
        return notes.filter((note) => note.isPinned && !note.isArchived)
      },
      getPinnedTasks: () => {
        const { tasks } = get()
        return tasks.filter((task) => task.isPinned)
      },
      getCompletedTasks: () => {
        const { tasks } = get()
        return tasks.filter((task) => task.isCompleted)
      },
      getPendingTasks: () => {
        const { tasks } = get()
        return tasks.filter((task) => !task.isCompleted)
      },
      getFilteredNotes: () => {
        const { notes, searchFilters } = get()
        return notes.filter((note) => {
          if (searchFilters.type !== 'all' && searchFilters.type !== 'notes') return false
          if (note.isArchived && searchFilters.status !== 'archived') return false
          if (searchFilters.query) {
            const query = searchFilters.query.toLowerCase()
            if (!note.title.toLowerCase().includes(query) && !note.content.toLowerCase().includes(query)) {
              return false
            }
          }
          if (searchFilters.tags.length > 0) {
            if (!searchFilters.tags.some(tag => note.tags.includes(tag))) {
              return false
            }
          }
          return true
        })
      },
      getFilteredTasks: () => {
        const { tasks, searchFilters } = get()
        return tasks.filter((task) => {
          if (searchFilters.type !== 'all' && searchFilters.type !== 'tasks') return false
          if (searchFilters.status === 'completed' && !task.isCompleted) return false
          if (searchFilters.status === 'pending' && task.isCompleted) return false
          if (searchFilters.query) {
            const query = searchFilters.query.toLowerCase()
            if (!task.title.toLowerCase().includes(query) && !task.description?.toLowerCase().includes(query)) {
              return false
            }
          }
          if (searchFilters.priority && task.priority !== searchFilters.priority) return false
          if (searchFilters.tags.length > 0) {
            if (!searchFilters.tags.some(tag => task.tags.includes(tag))) {
              return false
            }
          }
          return true
        })
      },
    }),
    {
      name: 'notes-app-storage',
      partialize: (state) => ({
        notes: state.notes,
        tasks: state.tasks,
        theme: state.theme,
        searchFilters: state.searchFilters,
        user: state.user,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Convert date strings back to Date objects for notes
          state.notes = state.notes.map(note => ({
            ...note,
            createdAt: new Date(note.createdAt),
            updatedAt: new Date(note.updatedAt),
            lastAccessedAt: new Date(note.lastAccessedAt),
          }))
          
          // Convert date strings back to Date objects for tasks
          state.tasks = state.tasks.map(task => ({
            ...task,
            createdAt: new Date(task.createdAt),
            updatedAt: new Date(task.updatedAt),
            ...(task.completedAt && { completedAt: new Date(task.completedAt) }),
            ...(task.dueDate && { dueDate: new Date(task.dueDate) }),
          }))
          
          // Convert date strings back to Date objects for user
          if (state.user) {
            state.user = {
              ...state.user,
              createdAt: new Date(state.user.createdAt),
              updatedAt: new Date(state.user.updatedAt),
            }
          }
        }
      },
    }
  )
) 