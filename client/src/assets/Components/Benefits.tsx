import { Car, DollarSign, Shield, Calendar, Users} from "lucide-react";

export default function Benefits() {
    return <>
              <div id="benefits" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose CarShare?</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform offers unique advantages for both car owners and renters.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Car Owners */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Car className="h-6 w-6 mr-2 text-blue-600" />
                For Car Owners
              </h3>
              <ul className="space-y-4">
                <li className="flex">
                  <DollarSign className="h-6 w-6 mr-3 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Earn extra income from your car when you're not using it</span>
                </li>
                <li className="flex">
                  <Shield className="h-6 w-6 mr-3 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Comprehensive insurance coverage for peace of mind</span>
                </li>
                <li className="flex">
                  <Calendar className="h-6 w-6 mr-3 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Flexible scheduling - share your car on your terms</span>
                </li>
              </ul>
            </div>

            {/* Renters */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Users className="h-6 w-6 mr-2 text-blue-600" />
                For Renters
              </h3>
              <ul className="space-y-4">
                <li className="flex">
                  <DollarSign className="h-6 w-6 mr-3 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Save money compared to traditional rental companies</span>
                </li>
                <li className="flex">
                  <Car className="h-6 w-6 mr-3 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Wide variety of vehicles to choose from in your neighborhood</span>
                </li>
                <li className="flex">
                  <Calendar className="h-6 w-6 mr-3 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">Convenient pickup locations and flexible rental periods</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
}