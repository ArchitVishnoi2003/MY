'use client'

import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ProposalScene({ onYes }: { onYes: () => void }) {
  const [showConfetti, setShowConfetti] = useState(false)
  const [petals, setPetals] = useState<Array<{ id: number; left: number; delay: number }>>([])

  useEffect(() => {
    const newPetals = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
    }))
    setPetals(newPetals)
  }, [])

  const handleYes = () => {
    setShowConfetti(true)
    onYes()
  }

  const handleNo = () => {
    alert('Badi Aayiii😤')
  }

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
         style={{
           background: 'linear-gradient(180deg, #1a0033 0%, #2d1b4e 50%, #3d2d5c 100%)',
         }}>
      
      {/* Starfield background */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-sparkle"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: Math.random() * 0.7 + 0.3,
              animationDelay: Math.random() * 2 + 's',
            }}
          />
        ))}
      </div>

      {/* Moon glow */}
      <div className="absolute top-8 sm:top-12 md:top-20 right-8 sm:right-12 md:right-20 w-32 sm:w-40 md:w-48 h-32 sm:h-40 md:h-48 rounded-full blur-3xl opacity-30"
           style={{ background: 'rgba(207, 169, 255, 0.6)' }} />

      {/* Main content */}
      <div className="relative z-20 text-center px-4 max-w-2xl">
        {/* Animated heart shape made of stars */}
        <div className="mb-6 sm:mb-8 md:mb-12 flex justify-center">
          <div className="relative w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40">
            {/* Simple animated heart visualization */}
            <Heart className="w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40 text-accent animate-pulse" style={{ animationDuration: '2s' }} />
            
            {/* Glowing particles around heart */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full animate-float"
                style={{
                  background: '#CFA9FF',
                  left: '50%',
                  top: '50%',
                  transform: `rotate(${(i / 8) * 360}deg) translateY(-60px)`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Main text */}
        <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-12">
          <p className="text-base sm:text-xl md:text-2xl text-white opacity-90 font-dancing">
            From the moment I met you...
          </p>
          
          <h1 className="text-3xl sm:text-3xl md:text-5xl font-bold text-white mb-2 sm:mb-5"
              style={{ fontFamily: '"Playfair Display", serif', lineHeight: '1.2' }}>
            My world turned Sona🤪💘
          </h1>

          <p className="text-lg sm:text-2xl md:text-3xl text-accent font-dancing">
            Will you be mine forever?
          </p>
        </div>

        {/* Yes and No buttons */}
        <div className="flex flex-col gap-3 sm:gap-4 items-center justify-center mb-6 sm:mb-8">
          <div className="flex flex-wrap gap-3 sm:gap-4 items-center justify-center">
            <Button
              onClick={handleYes}
              size="lg"
              className="px-6 sm:px-10 md:px-12 py-4 sm:py-6 md:py-8 text-lg sm:text-xl md:text-2xl rounded-full font-bold gap-2 sm:gap-3 transform transition-all hover:scale-110 animate-pulse-glow"
              style={{
                background: 'linear-gradient(135deg, #B57EDC 0%, #CFA9FF 100%)',
                color: 'white',
                border: 'none',
              }}
            >
              <Heart className="w-5 sm:w-6 h-5 sm:h-6 fill-current" />
              YES!
            </Button>
            <Button
              onClick={handleNo}
              size="lg"
              className="px-6 sm:px-10 md:px-12 py-4 sm:py-6 md:py-8 text-lg sm:text-xl md:text-2xl rounded-full font-bold gap-2 sm:gap-3 transform transition-all hover:scale-110"
              style={{
                background: 'linear-gradient(135deg, #8B0000 0%, #C41E3A 50%, #DC143C 100%)',
                color: 'white',
                border: 'none',
                boxShadow: '0 0 20px rgba(220, 20, 60, 0.5)',
              }}
            >
              No🤨
            </Button>
          </div>

          <p className="text-xs sm:text-sm text-white opacity-60 mt-2 sm:mt-4">
            Meri Aee ji Oo ji Kardo naah Haanjiiii🥺👉👈❤️
          </p>
        </div>
      </div>

      {/* Falling petals */}
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute top-0 w-4 h-4 rounded-full pointer-events-none animate-float"
          style={{
            left: petal.left + '%',
            background: 'rgba(246, 193, 204, 0.8)',
            animation: `fall 4s linear ${petal.delay}s infinite`,
          }}
        />
      ))}

      {/* Confetti effect when yes is clicked */}
      {showConfetti && (
        <>
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="fixed animate-float pointer-events-none"
              style={{
                left: Math.random() * 100 + '%',
                top: '-10px',
                width: Math.random() * 8 + 4 + 'px',
                height: Math.random() * 8 + 4 + 'px',
                background: ['#B57EDC', '#F6C1CC', '#CFA9FF', '#FADADD'][
                  Math.floor(Math.random() * 4)
                ],
                borderRadius: Math.random() > 0.5 ? '50%' : '0',
                animation: `confetti 3s ease-out forwards`,
                animationDelay: Math.random() * 0.5 + 's',
              }}
            />
          ))}
        </>
      )}

      {/* Fireflies */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-sparkle pointer-events-none"
          style={{
            width: '3px',
            height: '3px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            background: '#CFA9FF',
            boxShadow: '0 0 8px #CFA9FF',
            animationDelay: Math.random() * 2 + 's',
          }}
        />
      ))}

      {/* CSS animations */}
      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes confetti {
          to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
