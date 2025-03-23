import { Calendar, Users , Car} from "lucide-react";

export default function HowItWorks(){
    return <>
              {/* How It Works Section */}
      <div id="how-it-works" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform makes it easy to find a car when you need one or earn extra income from your vehicle.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-6">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Sign Up</h3>
              <p className="mt-4 text-gray-600">
                Create an account as a car owner or a renter. Verify your identity and get approved in minutes.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-6">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Book or List</h3>
              <p className="mt-4 text-gray-600">
                Browse available cars and book one that fits your needs, or list your car with its availability calendar.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-6">
                <Car className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Drive & Earn</h3>
              <p className="mt-4 text-gray-600">
                Pick up the car and enjoy your trip, or hand over your keys and start earning passive income.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
}