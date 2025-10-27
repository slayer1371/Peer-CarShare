export default function Cta() {
    return <>
             <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Ready to join the car sharing revolution?</h2>
            <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
              Start sharing or renting cars today and join our community of thousands.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-3 rounded-lg font-medium text-lg shadow-md cursor-pointer">
                Sign Up Now
              </button>
              <button className="bg-blue-500 text-white hover:bg-blue-400 border border-blue-300 px-8 py-3 rounded-lg font-medium text-lg shadow-md cursor-pointer">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
}