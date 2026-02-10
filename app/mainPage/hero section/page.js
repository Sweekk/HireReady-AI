export default function HeroSection() {
  return (
    <section className="bg-amber-50">
      <div className="flex flex-col md:flex-row items-center gap-10 px-6 py-16 md:px-12 md:py-24 max-w-7xl mx-auto">
        
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Craft Your{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Career Story</span>
              <span className="absolute inset-0 bg-green-200/50 -skew-y-1 rounded"></span>
            </span>{" "}
            with AI Resume Builder
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Transform your job search with AI that makes you 3× more likely to
            land interviews. From AI resume creation to job tracking, LinkedIn
            optimization, and interview preparation – your complete career toolkit.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold w-full sm:w-auto">
              Build Resume with AI
            </button>

            <button className="border-2 border-gray-800 text-gray-800 px-8 py-4 rounded-lg font-semibold w-full sm:w-auto">
              Check ATS Score
            </button>
          </div>

          <p className="text-gray-500 italic text-sm md:text-base">
            95% of candidates land interviews with tailored resumes
          </p>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="https://resumeup.ai/_next/image?url=%2Fresume-up-hero.png&w=1200&q=75"
            alt="Resume template preview"
            className="w-full max-w-lg shadow-xl"
          />
        </div>

      </div>
    </section>
  );
}
