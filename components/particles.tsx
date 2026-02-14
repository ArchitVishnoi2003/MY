'use client'

import { useEffect, useRef } from 'react'

export function ParticleSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      life: number
      type: 'sparkle' | 'heart' | 'glow'
    }> = []

    function createParticles() {
      for (let i = 0; i < 3; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const type = Math.random() > 0.7 ? 'heart' : Math.random() > 0.5 ? 'glow' : 'sparkle'
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.5,
          vy: Math.random() * 0.3 - 0.1,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.3,
          life: 1,
          type,
        })
      }
    }

    function drawParticle(p: (typeof particles)[0]) {
      ctx.globalAlpha = p.opacity * p.life
      
      if (p.type === 'sparkle') {
        ctx.fillStyle = '#B57EDC'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      } else if (p.type === 'glow') {
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3)
        gradient.addColorStop(0, 'rgba(207, 169, 255, 0.6)')
        gradient.addColorStop(1, 'rgba(207, 169, 255, 0)')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
        ctx.fill()
      } else if (p.type === 'heart') {
        ctx.fillStyle = '#F6C1CC'
        ctx.font = '20px Arial'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('♥', p.x, p.y)
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.life -= 0.005
        p.vy += 0.02

        if (p.life <= 0) {
          particles.splice(i, 1)
        } else {
          drawParticle(p)
        }
      }

      if (particles.length < 50) {
        createParticles()
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
    />
  )
}
