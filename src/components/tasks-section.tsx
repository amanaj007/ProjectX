"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Task } from "@/types"
import { useStore } from "@/store/useStore"
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
import { formatDate } from "@/lib/utils"

interface TasksSectionProps {
  showNewTaskModal: boolean
  setShowNewTaskModal: (show: boolean) => void
}

export function TasksSection({ showNewTaskModal, setShowNewTaskModal }: TasksSectionProps) {
  const { getFilteredTasks, toggleTaskComplete, pinTask, deleteTask, addTask } = useStore()
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('medium')
  const [newDueDate, setNewDueDate] = useState('')
  const [newTags, setNewTags] = useState('')
  
  const tasks = getFilteredTasks()

  const handleDragEnd = (result: any) => {
    // Handle drag and drop reordering
    if (!result.destination) return
    
    // Here you would implement the reordering logic
    console.log('Task reordered:', result)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500'
      case 'medium':
        return 'text-yellow-500'
      case 'low':
        return 'text-green-500'
      default:
        return 'text-muted-foreground'
    }
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Sparkles className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No tasks yet</h3>
        <p className="text-muted-foreground mb-4">
          Create your first task to get started
        </p>
        <Button onClick={() => setShowNewTaskModal(true)}>Create Task</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <Button 
          onClick={() => {
            console.log('New Task button clicked')
            setShowNewTaskModal(true)
          }}
        >
          New Task
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks" isDropDisabled={false} isCombineEnabled={false} ignoreContainerClipping={false}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-2"
            >
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`${snapshot.isDragging ? 'dragging' : ''}`}
                    >
                      <Card 
                        className={`transition-all hover:shadow-md ${
                          task.isPinned ? 'ring-2 ring-primary/20' : ''
                        } ${task.isCompleted ? 'opacity-75' : ''}`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => toggleTaskComplete(task.id)}
                            >
                              {task.isCompleted ? (
                                <CheckCircle className="h-4 w-4 text-green-500 fill-current" />
                              ) : (
                                <Circle className="h-4 w-4" />
                              )}
                            </Button>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2">
                                <h3 className={`font-medium ${task.isCompleted ? 'line-through' : ''}`}>
                                  {task.title}
                                </h3>
                                {task.isPinned && (
                                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                )}
                                <Flag className={`h-4 w-4 ${getPriorityColor(task.priority)}`} />
                              </div>
                              
                              {task.description && (
                                <p className="text-sm text-muted-foreground mt-1">
                                  {task.description}
                                </p>
                              )}
                              
                              <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                                {task.dueDate && (
                                  <div className="flex items-center space-x-1">
                                    <Calendar className="h-3 w-3" />
                                    <span>{formatDate(task.dueDate)}</span>
                                  </div>
                                )}
                                <div className="flex items-center space-x-1">
                                  {task.tags.slice(0, 2).map((tag) => (
                                    <span
                                      key={tag}
                                      className="px-2 py-1 bg-muted rounded-full"
                                    >
                                      #{tag}
                                    </span>
                                  ))}
                                  {task.tags.length > 2 && (
                                    <span>+{task.tags.length - 2}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => pinTask(task.id)}
                              >
                                <Star className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-red-500 hover:text-red-700"
                                onClick={() => {
                                  if (confirm('Are you sure you want to delete this task?')) {
                                    deleteTask(task.id)
                                  }
                                }}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
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

      {/* New Task Modal */}
      {showNewTaskModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Create New Task</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <Input
                  placeholder="Enter task title..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description (optional)</label>
                <Textarea
                  placeholder="Enter task description..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Priority</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as 'low' | 'medium' | 'high')}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Due Date (optional)</label>
                  <Input
                    type="date"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
                <Input
                  placeholder="work, personal, urgent..."
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowNewTaskModal(false)
                  setNewTitle('')
                  setNewDescription('')
                  setNewPriority('medium')
                  setNewDueDate('')
                  setNewTags('')
                }}
              >
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  console.log('Create Task button clicked')
                  console.log('Title:', newTitle.trim())
                  console.log('Description:', newDescription.trim())
                  console.log('Priority:', newPriority)
                  console.log('Due Date:', newDueDate)
                  console.log('Tags:', newTags)
                  
                  if (newTitle.trim()) {
                    console.log('Creating task...')
                    addTask({
                      title: newTitle.trim(),
                      description: newDescription.trim() || undefined,
                      userId: 'demo-user',
                      isCompleted: false,
                      priority: newPriority,
                      dueDate: newDueDate ? new Date(newDueDate) : undefined,
                      tags: newTags.split(',').map(tag => tag.trim()).filter(tag => tag),
                      isPinned: false,
                    })
                    console.log('Task added to store')
                    setShowNewTaskModal(false)
                    setNewTitle('')
                    setNewDescription('')
                    setNewPriority('medium')
                    setNewDueDate('')
                    setNewTags('')
                    alert('Task created successfully!')
                  } else {
                    console.log('Title is empty, cannot create task')
                    alert('Please enter a task title')
                  }
                }}
                disabled={!newTitle.trim()}
              >
                Create Task
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Task Editor Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg p-6 w-full max-w-2xl mx-4">
            <h3 className="text-lg font-semibold mb-4">{selectedTask.title}</h3>
            {selectedTask.description && (
              <p className="text-sm text-muted-foreground mb-4">
                {selectedTask.description}
              </p>
            )}
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setSelectedTask(null)}>
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