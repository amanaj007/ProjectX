"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Note } from "@/types"
import { useStore } from "@/store/useStore"
import { 
  Star, 
  Archive, 
  Edit, 
  Trash2, 
  MoreVertical,
  Sparkles 
} from "lucide-react"
import { formatDate, truncateText } from "@/lib/utils"

interface NotesSectionProps {
  showNewNoteModal: boolean
  setShowNewNoteModal: (show: boolean) => void
}

export function NotesSection({ showNewNoteModal, setShowNewNoteModal }: NotesSectionProps) {
  const { getFilteredNotes, pinNote, archiveNote, deleteNote, incrementAccessCount, addNote } = useStore()
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [newTags, setNewTags] = useState('')
  
  const notes = getFilteredNotes()

  const handleDragEnd = (result: any) => {
    // Handle drag and drop reordering
    if (!result.destination) return
    
    // Here you would implement the reordering logic
    console.log('Note reordered:', result)
  }

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note)
    incrementAccessCount(note.id)
  }

  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Sparkles className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No notes yet</h3>
        <p className="text-muted-foreground mb-4">
          Create your first note to get started
        </p>
        <Button onClick={() => setShowNewNoteModal(true)}>Create Note</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Notes</h2>
        <Button onClick={() => setShowNewNoteModal(true)}>New Note</Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="notes" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {notes.map((note, index) => (
                <Draggable key={note.id} draggableId={note.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`${snapshot.isDragging ? 'dragging' : ''}`}
                    >
                      <Card 
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          note.isPinned ? 'ring-2 ring-primary/20' : ''
                        }`}
                        onClick={() => handleNoteClick(note)}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-base line-clamp-2">
                              {note.title}
                            </CardTitle>
                            <div className="flex items-center space-x-1">
                              {note.isPinned && (
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  pinNote(note.id)
                                }}
                              >
                                <MoreVertical className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                            {truncateText(note.content, 120)}
                          </p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{formatDate(note.updatedAt)}</span>
                            <div className="flex items-center space-x-2">
                              {note.tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-1 bg-muted rounded-full"
                                >
                                  #{tag}
                                </span>
                              ))}
                              {note.tags.length > 2 && (
                                <span className="text-muted-foreground">
                                  +{note.tags.length - 2}
                                </span>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* New Note Modal */}
      {showNewNoteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Create New Note</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <Input
                  placeholder="Enter note title..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Content</label>
                <Textarea
                  placeholder="Enter note content..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="min-h-[200px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
                <Input
                  placeholder="work, personal, ideas..."
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowNewNoteModal(false)
                  setNewTitle('')
                  setNewContent('')
                  setNewTags('')
                }}
              >
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  if (newTitle.trim()) {
                    addNote({
                      title: newTitle.trim(),
                      content: newContent.trim(),
                      userId: 'demo', // Replace with actual user id
                      tags: newTags.split(',').map(tag => tag.trim()).filter(tag => tag),
                      isPinned: false,
                      isArchived: false,
                      color: undefined,
                    })
                    setShowNewNoteModal(false)
                    setNewTitle('')
                    setNewContent('')
                    setNewTags('')
                  }
                }}
                disabled={!newTitle.trim()}
              >
                Create Note
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Note Editor Modal */}
      {selectedNote && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg p-6 w-full max-w-2xl mx-4">
            <h3 className="text-lg font-semibold mb-4">{selectedNote.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {selectedNote.content}
            </p>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setSelectedNote(null)}>
                Close
              </Button>
              <Button>Edit</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 