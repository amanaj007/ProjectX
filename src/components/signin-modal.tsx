"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useStore } from "@/store/useStore"
import { User, Github } from "lucide-react"

interface SignInModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const { setUser } = useStore()
  const [isSignUp, setIsSignUp] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (!isOpen) return null

  const handleDemoSignIn = () => {
    const demoUser = {
      id: 'demo-user',
      email: 'demo@example.com',
      name: 'Demo User',
      image: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setUser(demoUser)
    onClose()
  }

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) {
      // For demo purposes, create a user with the provided email
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        email: email,
        name: name || email.split('@')[0],
        image: undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      setUser(user)
      onClose()
      setName('')
      setEmail('')
      setPassword('')
    }
  }

  const handleSocialSignIn = (provider: 'google' | 'github') => {
    // For demo purposes, create a mock user
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      email: `${provider}@example.com`,
      name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
      image: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setUser(user)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <User className="h-5 w-5" />
            {isSignUp ? 'Create Account' : 'Sign In'}
          </h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            ×
          </Button>
        </div>

        <form onSubmit={handleSignIn} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <Input
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={isSignUp}
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            {isSignUp ? 'Create Account' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={() => handleSocialSignIn('google')}
              className="flex items-center gap-2"
            >
              <span className="h-4 w-4">G</span>
              Google
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSocialSignIn('github')}
              className="flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              GitHub
            </Button>
          </div>

          <div className="mt-4">
            <Button
              variant="outline"
              onClick={handleDemoSignIn}
              className="w-full"
            >
              Continue as Demo User
            </Button>
          </div>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-primary hover:underline"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  )
} 