'use client'

import { motion } from 'motion/react'

const memories = [
  {
    id: 1,
    caption: 'From Chosing Outfit😗💞',
    subCaption: null,
    color: 'from-purple-400 to-pink-300',
    image: '/images/1000054018.jpeg',
    emoji: '👗'
  },
  {
    id: 2,
    caption: 'To our First Meet🥺💞',
    subCaption: null,
    color: 'from-indigo-400 to-purple-300',
    image: '/images/1000054016.jpg.jpeg',
    emoji: '✨'
  },
  {
    id: 3,
    caption: 'Us after Silly fights🤪❤️',
    subCaption: null,
    color: 'from-red-300 to-pink-300',
    image: '/images/1000053996.jpeg',
    emoji: '😄',
    objectFit: 'contain' as const
  },
  {
    id: 4,
    caption: 'My permanent booking😗❤️',
    subCaption: null,
    color: 'from-blue-400 to-indigo-300',
    image: '/images/20260213_203329.jpeg',
    emoji: '💌'
  },
  {
    id: 5,
    caption: 'My Favourite Day🤭❤️',
    subCaption: null,
    color: 'from-amber-400 to-orange-300',
    image: '/images/1000054011.jpeg',
    emoji: '⭐'
  },
  {
    id: 6,
    caption: 'The smile I live for🥺❤️',
    subCaption: null,
    color: 'from-yellow-400 to-amber-300',
    image: '/images/1000054004.jpeg',
    emoji: '😊'
  },
  {
    id: 7,
    caption: 'Ayyee Hayyeee So Sundar Meri Joru Ji🙈🤪💞',
    subCaption: null,
    color: 'from-yellow-400 to-amber-300',
    image: '/images/10000540101112.JPG',
    emoji: '😗',
    objectPosition: 'top center' as const
  },
  {
    id: 8,
    caption: 'Us forever❤️',
    subCaption: null,
    color: 'from-rose-400 to-pink-300',
    image: '/images/1000054013.jpg.jpeg',
    emoji: '💕'
  }
]

export function SpecialMemories() {
  return (
    <section
      className="w-full min-h-screen py-8 sm:py-12 md:py-20 px-3 sm:px-4 flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-12"
      style={{ background: 'linear-gradient(180deg, #FFF6FB 0%, #F0E8FF 100%)' }}
    >
      {/* Title - mobile first */}
      <motion.div
        className="text-center mb-2 sm:mb-4 px-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2
          className="text-2xl sm:text-3xl md:text-5xl font-bold text-primary mb-2 sm:mb-3"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          Special Memories
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-foreground opacity-70 max-w-2xl mx-auto">
          Moments that made our love story unforgettable
        </p>
      </motion.div>

      {/* Grid - single column on mobile for accurate image display */}
      <div className="w-full max-w-2xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {memories.map((memory, index) => (
            <motion.article
              key={memory.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {/* Image - mobile optimized aspect ratio and sizing */}
              <div className="relative w-full aspect-[4/3] sm:aspect-square overflow-hidden bg-gradient-to-br from-muted to-muted/80">
                <img
                  src={memory.image}
                  alt={memory.caption}
                  className={`w-full h-full ${(memory as { objectFit?: string }).objectFit === 'contain' ? 'object-contain' : 'object-cover'}`}
                  style={(memory as { objectPosition?: string }).objectPosition ? { objectPosition: (memory as { objectPosition: string }).objectPosition } : undefined}
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 48vw, 33vw"
                  loading="lazy"
                  decoding="async"
                />
                {/* Gradient overlay for caption readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                {/* Caption on image for mobile */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
                  <p className="font-semibold text-sm sm:text-base leading-tight drop-shadow-md font-dancing">
                    {memory.caption}
                  </p>
                  {memory.subCaption && (
                    <p className="text-xs sm:text-sm opacity-90 mt-0.5">
                      {memory.subCaption}
                    </p>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <motion.p
        className="text-center text-xs sm:text-sm md:text-base text-muted-foreground max-w-2xl px-3 sm:px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Scroll down to see more of our beautiful moments together
      </motion.p>
    </section>
  )
}
