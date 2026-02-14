'use client'

export function HeroSection() {
  return (
    <div
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #B57EDC 0%, #DCC6FF 50%, #F6C1CC 100%)',
      }}
    >
      {/* Animated background overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full blur-3xl animate-pulse" 
             style={{ background: 'rgba(207, 169, 255, 0.8)' }} />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse"
             style={{ background: 'rgba(181, 126, 220, 0.6)', animationDelay: '1s' }} />
      </div>

      {/* Main content */}
      <div className="relative z-20 text-center px-4 max-w-4xl">
        {/* Decorative line above title */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-1 rounded-full" style={{ background: 'rgba(255, 255, 255, 0.5)' }} />
        </div>

        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 sm:mb-6 animate-fade-in drop-shadow-lg text-balance"
            style={{ fontFamily: '"Playfair Display", serif', lineHeight: '1.2' }}>
          Happy Valentine's Day Meri Joru Ji🫣🤪❤️
          {/* <span className="block text-3xl sm:text-4xl md:text-6xl mt-2 sm:mt-4">❤️</span> */}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-2xl text-white mb-8 sm:mb-12 animate-fade-in drop-shadow-md"
           style={{ animationDelay: '0.2s' }}>
          I LOVE YOU SO SO SO.... MUCH MERI SONA JI🥺❤️
        </p>

        {/* CTA Text */}
        <p className="text-sm sm:text-base md:text-lg text-white opacity-90 mb-8 sm:mb-16 animate-fade-in"
           style={{ animationDelay: '0.4s' }}>
          
        </p>
      </div>

      {/* Light rays effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-1 h-96 bg-gradient-to-b from-white to-transparent opacity-20 animate-pulse"
             style={{ animationDelay: '0s' }} />
        <div className="absolute top-0 right-1/3 w-1 h-80 bg-gradient-to-b from-white to-transparent opacity-15 animate-pulse"
             style={{ animationDelay: '1s' }} />
        <div className="absolute top-0 right-1/4 w-1 h-72 bg-gradient-to-b from-white to-transparent opacity-10 animate-pulse"
             style={{ animationDelay: '2s' }} />
      </div>
    </div>
  )
}
