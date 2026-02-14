'use client'

import { motion } from 'motion/react'

const boxes = [
  {
    image: '/images/1000053995.jpeg',
    caption: 'I LOVE YOU!❤️'
  },
  {
    image: '/images/1000053997.jpeg',
    caption: 'I LOVE YOU!🥺❤️'
  },
  {
    image: '/images/1000053998.jpeg',
    caption: 'I LOVE YOU! I LOVE YOU! I LOVE YOU SABSE JYAADA!🥺❤️'
  }
]

export function LoveYouBoxes() {
  return (
    <section
      className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6"
      style={{
        background: 'linear-gradient(180deg, #FFF6FB 0%, #E8DFFF 100%)'
      }}
    >
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 sm:gap-8">
        {boxes.map((item, index) => (
          <motion.article
            key={index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative w-full rounded-xl overflow-hidden border border-white/80 shadow-lg"
            style={{
              boxShadow: '0 4px 20px rgba(0,0,0,0.08), 0 2px 8px rgba(181, 126, 220, 0.15)',
              aspectRatio: '16/10'
            }}
          >
            {/* Full-bleed image */}
            <img
              src={item.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
            {/* Dark gradient behind caption for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            {/* Caption: small, white, bottom-middle */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-3 sm:pb-4 px-4">
              <p className="text-white text-sm sm:text-base font-medium text-center drop-shadow-md max-w-full">
                {item.caption}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
