'use client'

import { useEffect, useRef } from 'react'

export function MicroInteractions() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'

        // Create sparkle trail
        const sparkle = document.createElement('div')
        sparkle.className = 'absolute pointer-events-none rounded-full'
        sparkle.style.left = e.clientX + 'px'
        sparkle.style.top = e.clientY + 'px'
        sparkle.style.width = Math.random() * 6 + 3 + 'px'
        sparkle.style.height = sparkle.style.width
        sparkle.style.background = '#B57EDC'
        sparkle.style.opacity = '0.6'
        sparkle.style.animation = 'fade-sparkle 1s ease-out forwards'
        sparkle.style.transform = 'translate(-50%, -50%)'

        document.body.appendChild(sparkle)

        setTimeout(() => sparkle.remove(), 1000)
      }
    }

    const handleClick = (e: MouseEvent) => {
      // Create heart burst effect
      const x = e.clientX
      const y = e.clientY

      for (let i = 0; i < 6; i++) {
        const heart = document.createElement('div')
        heart.className = 'fixed pointer-events-none font-dancing'
        heart.textContent = '♥'
        heart.style.left = x + 'px'
        heart.style.top = y + 'px'
        heart.style.fontSize = Math.random() * 20 + 16 + 'px'
        heart.style.color = '#F6C1CC'
        heart.style.animation = 'float-up 2s ease-out forwards'
        heart.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`
        heart.style.opacity = '0.8'
        heart.style.zIndex = '50'

        const randomX = (Math.random() - 0.5) * 100
        const randomY = (Math.random() - 0.5) * 100

        heart.style.setProperty('--tx', randomX + 'px')
        heart.style.setProperty('--ty', randomY + 'px')

        document.body.appendChild(heart)

        setTimeout(() => heart.remove(), 2000)
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('click', handleClick)
    }
  }, [])

  useEffect(() => {
    // Create butterflies
    const createButterfly = () => {
      const butterfly = document.createElement('div')
      butterfly.className = 'fixed pointer-events-none'
      butterfly.innerHTML = '🦋'
      butterfly.style.fontSize = '24px'
      butterfly.style.left = Math.random() * window.innerWidth + 'px'
      butterfly.style.top = Math.random() * window.innerHeight + 'px'
      butterfly.style.animation = 'butterfly-flight 8s ease-in-out infinite'
      butterfly.style.opacity = '0.6'
      butterfly.style.transform = 'scale(' + (Math.random() * 0.5 + 0.5) + ')'
      butterfly.style.zIndex = '10'

      const randomDelay = Math.random() * 3
      butterfly.style.animationDelay = randomDelay + 's'

      document.body.appendChild(butterfly)

      setTimeout(() => butterfly.remove(), 12000)
    }

    const butterflyInterval = setInterval(createButterfly, 3000)

    return () => clearInterval(butterflyInterval)
  }, [])

  return (
    <>
      {/* Cursor glow indicator */}
      <div
        ref={cursorRef}
        className="fixed w-6 h-6 pointer-events-none rounded-full border-2 border-primary opacity-30 -translate-x-1/2 -translate-y-1/2"
        style={{ zIndex: '40' }}
      />

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes fade-sparkle {
          to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
          }
        }

        @keyframes float-up {
          to {
            transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0);
            opacity: 0;
          }
        }

        @keyframes butterfly-flight {
          0%, 100% {
            transform: translateX(0) translateY(0);
          }
          25% {
            transform: translateX(100px) translateY(-50px);
          }
          50% {
            transform: translateX(0) translateY(-100px);
          }
          75% {
            transform: translateX(-100px) translateY(-50px);
          }
        }

        /* Cursor style */
        * {
          cursor: default;
        }

        button:hover,
        [role='button']:hover {
          cursor: pointer;
        }
      `}</style>
    </>
  )
}
