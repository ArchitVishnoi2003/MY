'use client'

import { useState } from 'react'
import { Lock } from 'lucide-react'

export function RoyalDiary({ onOpen }: { onOpen: () => void }) {
  const [isOpening, setIsOpening] = useState(false)

  const handleClick = () => {
    setIsOpening(true)
    setTimeout(onOpen, 1200)
  }

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center py-20 px-4"
         style={{ background: 'linear-gradient(180deg, #FFF6FB 0%, #DCC6FF 100%)' }}>
      <div className="relative z-20">
        {/* Diary container */}
        <div
          className={`relative w-64 sm:w-72 md:w-80 h-72 sm:h-80 md:h-96 cursor-pointer transform transition-all duration-700 ${
            isOpening ? 'scale-110 -rotate-12' : 'scale-100 rotate-0 hover:scale-105'
          }`}
          onClick={handleClick}
          style={{
            perspective: '1000px',
          }}
        >
          {/* Diary book - front cover */}
          <div
            className="absolute inset-0 rounded-lg shadow-2xl flex flex-col items-center justify-center p-8"
            style={{
              background: 'linear-gradient(135deg, #A45CFF 0%, #B57EDC 100%)',
              boxShadow: '0 20px 60px rgba(181, 126, 220, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
            }}
          >
            {/* Gold floral engravings */}
            <div className="absolute top-6 left-6 text-2xl opacity-60">✦</div>
            <div className="absolute top-6 right-6 text-2xl opacity-60">✦</div>
            <div className="absolute bottom-6 left-6 text-2xl opacity-60">✦</div>
            <div className="absolute bottom-6 right-6 text-2xl opacity-60">✦</div>

            {/* Decorative corner frames */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-yellow-300 opacity-60" />
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-yellow-300 opacity-60" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-yellow-300 opacity-60" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-yellow-300 opacity-60" />

            {/* Center content */}
            <div className="flex flex-col items-center gap-6 z-10">
              {/* Lock icon */}
              <div className={`transform transition-all duration-500 ${isOpening ? 'scale-0' : 'scale-100'}`}>
                <Lock className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 text-yellow-200 drop-shadow-lg" />
              </div>

              {/* Text */}
              <div className="text-center">
                <p className="text-yellow-100 text-xs sm:text-sm tracking-widest mb-2 opacity-80">Our Story</p>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-playfair drop-shadow-md">
                  Our
                  <br />
                  Memories
                </h2>
              </div>

              {/* Ribbon decoration */}
              <div className={`w-1 h-8 bg-rose-200 rounded transform transition-all duration-500 ${
                isOpening ? 'scale-y-0' : 'scale-y-100'
              }`} />
            </div>

            {/* Gold leaf details */}
            <div className="absolute top-1/4 left-0 w-1 h-8 bg-gradient-to-b from-yellow-300 to-transparent opacity-50" />
            <div className="absolute top-1/4 right-0 w-1 h-8 bg-gradient-to-b from-yellow-300 to-transparent opacity-50" />
          </div>

          {/* Glowing effect when hovering */}
          {!isOpening && (
            <div
              className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 animate-pulse"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(207, 169, 255, 0.3) 0%, transparent 70%)',
              }}
            />
          )}
        </div>

        {/* Opening animation glow */}
        {isOpening && (
          <div className="absolute inset-0 w-64 sm:w-72 md:w-80 h-72 sm:h-80 md:h-96 rounded-lg"
               style={{
                 background: 'radial-gradient(ellipse at center, rgba(207, 169, 255, 0.8) 0%, transparent 70%)',
                 animation: 'pulse 1s ease-out',
               }} />
        )}

        {/* Click indicator */}
        {!isOpening && (
          <p className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center text-sm text-primary whitespace-nowrap">
            Click to open our diary
          </p>
        )}
      </div>
    </div>
  )
}
