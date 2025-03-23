export default function HeroSection() {
    return <>
    {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Rent a neighbor's car or share yours to earn
            </h1>
            <p className="mt-6 text-xl text-blue-100">
              Join thousands of people who are saving money and reducing idle cars through peer-to-peer car sharing.
            </p>
            <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <button className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium text-lg shadow-md">
                Find a Car
              </button>
              <button className="bg-blue-500 text-white hover:bg-blue-400 px-6 py-3 rounded-lg font-medium text-lg shadow-md">
                Share Your Car
              </button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative rounded-xl bg-white p-4 shadow-xl">
              <img src="/api/placeholder/600/400" alt="Car sharing" className="rounded-lg w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
}