export interface User {
  id: string
  email: string
  name: string
  image?: string
  createdAt: Date
  updatedAt: Date
}

export interface Note {
  id: string
  title: string
  content: string
  userId: string
  tags: string[]
  isPinned: boolean
  isArchived: boolean
  color?: string
  createdAt: Date
  updatedAt: Date
  lastAccessedAt: Date
  accessCount: number
}

export interface Task {
  id: string
  title: string
  description?: string
  userId: string
  isCompleted: boolean
  priority: 'low' | 'medium' | 'high'
  dueDate?: Date
  tags: string[]
  isPinned: boolean
  createdAt: Date
  updatedAt: Date
  completedAt?: Date
}

export interface AIResponse {
  content: string
  type: 'summary' | 'correction' | 'suggestion' | 'completion'
}

export interface SearchFilters {
  query: string
  type: 'all' | 'notes' | 'tasks'
  tags: string[]
  dateRange?: {
    start: Date
    end: Date
  }
  priority?: 'low' | 'medium' | 'high'
  status?: 'completed' | 'pending' | 'archived'
}

export interface Theme {
  mode: 'light' | 'dark' | 'system'
}

export interface AppState {
  user: User | null
  notes: Note[]
  tasks: Task[]
  searchFilters: SearchFilters
  theme: Theme
  isLoading: boolean
  error: string | null
} 