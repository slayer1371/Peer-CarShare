export default function Testimonials() {
    return <>
              <div id="testimonials" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Thousands of happy users are sharing and renting cars on our platform.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-800 font-medium">JD</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">John D.</h4>
                  <p className="text-gray-600">Car Owner</p>
                </div>
              </div>
              <p className="text-gray-700">
                "I was paying $250/month just to park my car, which I only used on weekends. Now it pays for itself and I'm even making a profit!"
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-800 font-medium">SM</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Sarah M.</h4>
                  <p className="text-gray-600">Renter</p>
                </div>
              </div>
              <p className="text-gray-700">
                "So much easier than traditional rentals! I found a car just two blocks from my apartment, and the owner was super friendly."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-800 font-medium">RT</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">Robert T.</h4>
                  <p className="text-gray-600">Car Owner & Renter</p>
                </div>
              </div>
              <p className="text-gray-700">
                "I share my sedan during the week and rent an SUV for weekend trips. The platform saves me money and gives me access to the perfect vehicle when I need it."
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
}