'use client'

import { useRef, useState } from 'react'
import { HeroSection } from '@/components/hero-section'
import { RoyalDiary } from '@/components/royal-diary'
import { SpecialMemories } from '@/components/special-memories'
import { PhotoAlbum } from '@/components/photo-album'
import { LoveYouBoxes } from '@/components/love-you-boxes'
import { ProposalScene } from '@/components/proposal-scene'
import { ParticleSystem } from '@/components/particles'
import { MicroInteractions } from '@/components/micro-interactions'
import { CelebrationScene } from '@/components/celebration-scene'

export default function Page() {
  const diaryRef = useRef<HTMLDivElement>(null)
  const memoriesRef = useRef<HTMLDivElement>(null)
  const albumRef = useRef<HTMLDivElement>(null)
  const proposalRef = useRef<HTMLDivElement>(null)
  const celebrationRef = useRef<HTMLDivElement>(null)
  const [diaryOpened, setDiaryOpened] = useState(false)
  const [proposalOpened, setProposalOpened] = useState(false)
  const [celebrationOpened, setCelebrationOpened] = useState(false)

  const handleScrollIndicatorClick = () => {
    if (diaryRef.current) {
      diaryRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleDiaryOpen = () => {
    setDiaryOpened(true)
    setTimeout(() => {
      if (memoriesRef.current) {
        memoriesRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }, 1000)
  }

  const handleProposal = () => {
    setProposalOpened(true)
    setTimeout(() => {
      if (proposalRef.current) {
        proposalRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }, 500)
  }

  const handleCelebration = () => {
    setCelebrationOpened(true)
    setTimeout(() => {
      if (celebrationRef.current) {
        celebrationRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }, 500)
  }

  return (
    <main className="relative w-full overflow-x-hidden bg-background">
      {/* Particle system */}
      <ParticleSystem />
      
      {/* Micro interactions */}
      <MicroInteractions />

      {/* Hero section */}
      <HeroSection onScrollIndicatorClick={handleScrollIndicatorClick} />

      {/* Diary section */}
      <div ref={diaryRef}>
        <RoyalDiary onOpen={handleDiaryOpen} />
      </div>

      {/* Special Memories section */}
      {diaryOpened && (
        <div ref={memoriesRef} className="scroll-mt-0">
          <SpecialMemories />
        </div>
      )}

      {/* Photo Album section */}
      {diaryOpened && (
        <div ref={albumRef} className="scroll-mt-0">
          <PhotoAlbum />
        </div>
      )}

      {/* I LOVE YOU — 3 boxes with images and captions */}
      {diaryOpened && (
        <div className="scroll-mt-0">
          <LoveYouBoxes />
        </div>
      )}

      {/* Proposal Scene */}
      {proposalOpened && (
        <div ref={proposalRef} className="scroll-mt-0">
          <ProposalScene onYes={handleCelebration} />
        </div>
      )}

      {/* Celebration Scene */}
      {celebrationOpened && (
        <div ref={celebrationRef} className="scroll-mt-0">
          <CelebrationScene />
        </div>
      )}

      {/* Call to action for proposal */}
      {diaryOpened && !proposalOpened && (
        <div className="w-full py-12 md:py-20 px-4 flex items-center justify-center"
             style={{ background: 'linear-gradient(180deg, #E8DFFF 0%, #FFF6FB 100%)' }}>
          <button
            onClick={handleProposal}
            className="px-6 sm:px-10 md:px-12 py-4 sm:py-6 rounded-full text-base sm:text-lg md:text-xl font-bold text-white transition-all transform hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #B57EDC 0%, #CFA9FF 100%)',
              boxShadow: '0 8px 24px rgba(181, 126, 220, 0.4)',
            }}
          >
            Continue to the Surprise
          </button>
        </div>
      )}
    </main>
  )
}
