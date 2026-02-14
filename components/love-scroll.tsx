'use client'

import ScrollStack, { ScrollStackItem } from '@/components/scroll-stack'

const loveItems = [
  { src: '/images/1000053995.jpg.jpeg', text: 'I LOVE YOU' },
  { src: '/images/1000053997.jpg.jpeg', text: 'I LOVE YOU' },
  { src: '/images/1000053998.jpg.jpeg', text: 'I LOVE YOU' }
]

export function LoveScroll() {
  return (
    <section
      className="w-full h-screen flex flex-col overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFF6FB 0%, #E8DFFF 100%)'
      }}
    >
      <div className="flex-shrink-0 py-4 text-center px-4 space-y-1">
        <p className="text-sm text-primary/80">Scroll here — photos stack as you scroll</p>
        <p className="text-xs text-primary/60">At the top, scroll up to go back</p>
      </div>
      <div className="flex-1 min-h-0 w-full h-full">
        <ScrollStack
          useWindowScroll={false}
          className="h-full w-full"
          itemDistance={80}
          itemScale={0.03}
          itemStackDistance={28}
          stackPosition="20%"
          scaleEndPosition="10%"
          baseScale={0.88}
          blurAmount={0}
        >
          {loveItems.map((item, index) => (
            <ScrollStackItem key={index}>
              <div
                className="w-full h-full min-h-[100dvh] flex flex-col items-center justify-center px-4 py-8"
                style={{
                  background:
                    index % 2 === 0
                      ? 'linear-gradient(135deg, #FFF6FB 0%, #E8DFFF 100%)'
                      : 'linear-gradient(135deg, #E8DFFF 0%, #FFF6FB 100%)'
                }}
              >
                <h2
                  className="text-3xl sm:text-4xl md:text-6xl font-bold text-primary drop-shadow-lg text-center mb-6 md:mb-8"
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    letterSpacing: '0.02em',
                    lineHeight: '1.15'
                  }}
                >
                  {item.text}
                </h2>
                <div className="w-full max-w-[min(320px,88vw)] mx-auto flex-1 flex items-center justify-center min-h-0">
                  <div
                    className="relative rounded-2xl overflow-hidden shadow-2xl w-full"
                    style={{
                      boxShadow: '0 24px 48px rgba(181, 126, 220, 0.35)',
                      aspectRatio: '3/4'
                    }}
                  >
                    <img
                      src={item.src}
                      alt=""
                      className="w-full h-full object-cover"
                      sizes="(max-width: 640px) 88vw, 320px"
                      loading={index === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  )
}
