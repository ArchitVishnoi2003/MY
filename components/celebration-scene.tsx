'use client'

import { useEffect, useState } from 'react'

export function CelebrationScene() {
  const [floatingRoses, setFloatingRoses] = useState<Array<{ id: number; left: number; duration: number }>>([])

  useEffect(() => {
    const roses = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: Math.random() * 3 + 5,
    }))
    setFloatingRoses(roses)
  }, [])

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden py-20 px-4"
         style={{
           background: 'linear-gradient(180deg, #2d1b4e 0%, #1a0033 50%, #2d1b4e 100%)',
         }}>
      
      {/* Lanterns rising effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-8 h-8 rounded-full"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(207, 169, 255, 0.8) 0%, transparent 70%)',
              left: Math.random() * 100 + '%',
              bottom: '-40px',
              animation: `rise ${5 + i}s ease-in-out infinite`,
              animationDelay: i * 0.8 + 's',
              boxShadow: '0 0 20px rgba(207, 169, 255, 0.6)',
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-20 text-center max-w-3xl">
        
        {/* Decorative line */}
        <div className="flex justify-center mb-12">
          <div className="w-32 h-1 rounded-full" style={{ background: 'rgba(207, 169, 255, 0.4)' }} />
        </div>

        {/* Main message */}
        <div className="space-y-8 mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white animate-fade-in"
              style={{ fontFamily: '"Playfair Display", serif' }}>
            She Said YES!
          </h1>

          <p className="text-2xl md:text-3xl text-accent font-dancing animate-fade-in"
             style={{ animationDelay: '0.3s' }}>
            Our forever begins now...
          </p>

          <div className="space-y-4 mt-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <p className="text-lg text-white opacity-90">
              From the moment I met you… my world turned Sona...
              Aur tumse dur yeh jagg soona soonaa🥺👉👈
            </p>
            <p className="text-lg text-white opacity-70">
              I LOVE YOU MY FOREVER VALENTINE MERI PYAARI SONA🥺❤️
            </p>
          </div>
        </div>

        {/* Rose animation */}
        <div className="mb-16">
          <div className="inline-block text-8xl animate-float">🌹</div>
        </div>

        {/* Heart shower */}
        <div className="grid grid-cols-5 gap-4 justify-center mb-12">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="text-4xl animate-float"
              style={{ animationDelay: i * 0.1 + 's' }}
            >
              ❤️
            </div>
          ))}
        </div>

        {/* Closing text */}
        <div className="space-y-6 border-t border-b border-purple-400 border-opacity-30 py-8 px-4">
          <p className="text-xl text-white font-dancing">
            Thank you for saying yes to forever.
          </p>
          <p className="text-sm text-white opacity-60">
            This is just the beginning of our magical love story.
          </p>
        </div>
      </div>

      {/* Floating rose petals */}
      {floatingRoses.map((rose) => (
        <div
          key={rose.id}
          className="absolute top-0 pointer-events-none text-2xl"
          style={{
            left: rose.left + '%',
            animation: `fall-petal ${rose.duration}s linear infinite`,
            opacity: 0.7,
          }}
        >
          🌹
        </div>
      ))}

      {/* Bokeh lights */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: Math.random() * 100 + 60 + 'px',
            height: Math.random() * 100 + 60 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            background: 'radial-gradient(ellipse at center, rgba(207, 169, 255, 0.3) 0%, transparent 70%)',
            filter: 'blur(40px)',
            animation: `pulse 4s ease-in-out infinite`,
            animationDelay: i * 0.3 + 's',
          }}
        />
      ))}

      {/* CSS animations */}
      <style jsx>{`
        @keyframes rise {
          to {
            transform: translateY(-100vh) translateX(100px);
            opacity: 0;
          }
        }

        @keyframes fall-petal {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
