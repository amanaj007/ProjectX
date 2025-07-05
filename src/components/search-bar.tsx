"use client"

import { Input } from "@/components/ui/input"
import { Search, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search notes and tasks..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="pl-10 pr-10"
          />
          {value && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
              onClick={() => onChange("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>
      
      {isExpanded && (
        <div className="mt-2 p-4 border rounded-lg bg-muted/50">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Type</label>
              <select className="w-full mt-1 p-2 border rounded text-sm">
                <option value="all">All</option>
                <option value="notes">Notes</option>
                <option value="tasks">Tasks</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Status</label>
              <select className="w-full mt-1 p-2 border rounded text-sm">
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 