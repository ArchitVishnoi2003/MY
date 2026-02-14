'use client'

import { motion } from 'motion/react'
import dynamic from 'next/dynamic'

const CircularGallery = dynamic(() => import('@/components/CircularGallery'), {
  ssr: false,
  loading: () => (
    <div
      className="w-full flex items-center justify-center rounded-2xl bg-white/20"
      style={{ minHeight: 'min(500px, 85vmin)' }}
    >
      <p className="text-primary/80 font-dancing text-lg">Loading album...</p>
    </div>
  )
})

// Your photos — place files in public/images/images_album/ with these names
const ALBUM_ITEMS = [
  { image: '/images/images_album/1000053999.jpg.jpeg', text: 'Our moments' },
  { image: '/images/images_album/1000054000.jpg.jpeg', text: 'Together' },
  { image: '/images/images_album/1000054001.jpg.jpeg', text: 'Us' },
  { image: '/images/images_album/1000054002.jpg.jpeg', text: 'Forever' },
  { image: '/images/images_album/1000054003.jpg.jpeg', text: 'Love' },
  { image: '/images/images_album/1000054005.jpg.jpeg', text: 'Happy' },
  { image: '/images/images_album/1000054006.jpg.jpeg', text: 'Memories' },
  { image: '/images/images_album/1000054007.jpg.jpeg', text: 'Smiles' },
  { image: '/images/images_album/1000054008.jpg.jpeg', text: 'Calls' },
  { image: '/images/images_album/1000054009.jpg.jpeg', text: 'Best day' },
  { image: '/images/images_album/1000054012.webp', text: 'Us' },
  { image: '/images/images_album/1000054014.jpg.jpeg', text: 'Always' },
  { image: '/images/images_album/1000054015.jpg.jpeg', text: 'Yours' }
]

export function PhotoAlbum() {
  return (
    <section
      className="w-full min-h-screen py-8 sm:py-12 md:py-20 px-3 sm:px-4 flex flex-col items-center justify-center gap-6 sm:gap-8"
      style={{
        background: 'linear-gradient(180deg, #F0E8FF 0%, #E8DFFF 50%, #FFF6FB 100%)'
      }}
    >
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2
          className="text-2xl sm:text-3xl md:text-5xl font-bold text-primary mb-2 sm:mb-3"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          Us🥺👉👈❤️
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-foreground opacity-70 px-2">
          Scroll or drag to move through our moments
        </p>
      </motion.div>

      <div
        className="w-full rounded-2xl overflow-hidden"
        style={{
          height: 'min(600px, 85vmin)',
          maxHeight: '600px',
          position: 'relative'
        }}
      >
        <CircularGallery
          items={ALBUM_ITEMS}
          bend={3}
          textColor="#5b21b6"
          borderRadius={0.05}
          font="bold 28px Figtree, sans-serif"
          scrollSpeed={2}
          scrollEase={0.05}
        />
      </div>

      <motion.p
        className="text-center text-xs sm:text-sm text-muted-foreground max-w-2xl px-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Images move in a circular gallery — scroll or swipe to browse
      </motion.p>
    </section>
  )
}
