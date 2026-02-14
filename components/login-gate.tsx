'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Heart, Lock, Sparkles } from 'lucide-react'

const CODE = '272496'
const PASSWORD = 'architkisonaji'
const DIGITS = 6

function NumberWheel({
  value,
  onChange,
  disabled,
}: {
  value: number
  onChange: (n: number) => void
  disabled?: boolean
}) {
  const [isDragging, setIsDragging] = useState(false)
  const startY = useRef(0)
  const startVal = useRef(0)

  const cycle = (delta: number) => {
    const next = (value + delta + 10) % 10
    onChange(next)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled) return
    setIsDragging(true)
    startY.current = e.touches[0].clientY
    startVal.current = value
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || disabled) return
    const dy = e.touches[0].clientY - startY.current
    const steps = Math.floor(dy / 28)
    if (steps !== 0) {
      const next = (startVal.current - steps + 100) % 10
      onChange(next)
      startY.current = e.touches[0].clientY
      startVal.current = next
    }
  }

  const handleTouchEnd = () => setIsDragging(false)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return
    e.preventDefault()
    setIsDragging(true)
    startY.current = e.clientY
    startVal.current = value
  }

  useEffect(() => {
    if (!isDragging) return
    const onMouseMove = (e: MouseEvent) => {
      const dy = e.clientY - startY.current
      const steps = Math.floor(dy / 28)
      if (steps !== 0) {
        const next = (startVal.current - steps + 100) % 10
        onChange(next)
        startY.current = e.clientY
        startVal.current = next
      }
    }
    const onMouseUp = () => setIsDragging(false)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [isDragging, value, onChange])

  return (
    <div className="flex flex-col items-center gap-0.5">
      <button
        type="button"
        onClick={() => cycle(1)}
        disabled={disabled}
        className="text-white/70 hover:text-white disabled:opacity-50 p-1 -mb-1 transition-transform hover:scale-110"
        aria-label="Previous digit"
      >
        <svg width="20" height="12" viewBox="0 0 20 12" fill="currentColor">
          <path d="M10 0L0 12h20L10 0z" />
        </svg>
      </button>
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        className="w-11 h-12 sm:w-12 sm:h-14 rounded-xl flex items-center justify-center select-none touch-none border-2 border-white/30 bg-white/10 shadow-inner cursor-ns-resize active:cursor-grabbing"
        style={{
          boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.2)',
        }}
      >
        <span
          className="text-2xl sm:text-3xl font-bold tabular-nums text-white drop-shadow-md"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          {value}
        </span>
      </div>
      <button
        type="button"
        onClick={() => cycle(-1)}
        disabled={disabled}
        className="text-white/70 hover:text-white disabled:opacity-50 p-1 -mt-1 transition-transform hover:scale-110 rotate-180"
        aria-label="Next digit"
      >
        <svg width="20" height="12" viewBox="0 0 20 12" fill="currentColor">
          <path d="M10 0L0 12h20L10 0z" />
        </svg>
      </button>
    </div>
  )
}

export function LoginGate({ onUnlock }: { onUnlock: () => void }) {
  const [digits, setDigits] = useState([0, 0, 0, 0, 0, 0])
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [unlocking, setUnlocking] = useState(false)
  const [success, setSuccess] = useState(false)

  const setDigit = (index: number, value: number) => {
    setDigits((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })
    setError('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const codeStr = digits.join('')
    if (codeStr !== CODE) {
      setError('Wrong combination — try again!')
      return
    }
    if (password !== PASSWORD) {
      setError('Wrong password — try again!')
      return
    }
    setError('')
    setUnlocking(true)
    setTimeout(() => {
      setSuccess(true)
      setTimeout(onUnlock, 800)
    }, 600)
  }

  return (
    <AnimatePresence mode="wait">
      {!success ? (
        <motion.div
          key="gate"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1a0033 0%, #2d1b4e 40%, #3d2d5c 70%, #B57EDC 100%)',
          }}
        >
          {/* Soft orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-40 bg-[#CFA9FF]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-30 bg-[#F6C1CC]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-20 bg-[#B57EDC]" />

          {/* Stars */}
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                width: Math.random() * 2 + 1 + 'px',
                height: Math.random() * 2 + 1 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                opacity: Math.random() * 0.5 + 0.3,
                animationDelay: Math.random() * 2 + 's',
              }}
            />
          ))}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 w-full max-w-sm mx-4"
          >
            <div
              className="rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl"
              style={{
                background: 'linear-gradient(180deg, rgba(255,246,251,0.15) 0%, rgba(232,223,255,0.1) 100%)',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.2)',
              }}
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-2xl bg-white/10 border border-white/20">
                  <Lock className="w-8 h-8 text-white/90" />
                </div>
              </div>
              <h1
                className="text-center text-xl sm:text-2xl font-bold text-white mb-1"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                Open the treasure
              </h1>
              <p className="text-center text-white/70 text-sm mb-6 font-dancing">
                Unlock our story
              </p>

              {/* Combination wheels */}
              <div className="flex justify-center gap-2 sm:gap-3 mb-6">
                {digits.map((d, i) => (
                  <NumberWheel
                    key={i}
                    value={d}
                    onChange={(v) => setDigit(i, v)}
                    disabled={unlocking}
                  />
                ))}
              </div>
              <p className="text-center text-white/60 text-xs mb-4">Rotate the wheels — passkey</p>

              <form onSubmit={handleSubmit} className="space-y-0">
              {/* Password */}
              <div className="mb-5">
                <label htmlFor="login-password" className="block text-white/70 text-sm mb-2 font-medium">
                  Password
                </label>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError('')
                  }}
                  placeholder="Enter the secret word"
                  disabled={unlocking}
                  className="w-full px-4 py-3 rounded-xl border-2 border-white/25 bg-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all"
                  style={{ fontFamily: '"Dancing Script", cursive' }}
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-rose-200 text-sm mb-4"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={unlocking}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
                style={{
                  background: 'linear-gradient(135deg, #B57EDC 0%, #CFA9FF 100%)',
                  boxShadow: '0 8px 24px rgba(181, 126, 220, 0.45)',
                }}
              >
                {unlocking ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-pulse" />
                    Opening...
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5 fill-current" />
                    Unlock
                  </>
                )}
              </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-b from-[#1a0033] to-[#B57EDC]"
        >
          <div className="text-center text-white">
            <Heart className="w-20 h-20 mx-auto fill-current animate-pulse" />
            <p className="mt-4 text-xl font-dancing">Welcome in! 💕</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
