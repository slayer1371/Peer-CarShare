export default function Faq() {
    return <>
        <div id="faq" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Got questions? We've got answers.
            </p>
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Is my car insured when someone else is driving it?</h3>
                <p className="mt-2 text-gray-700">
                  Yes! All rentals include comprehensive insurance coverage. Our policy covers the car for the entire duration of the rental period.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900">How does the key handover work?</h3>
                <p className="mt-2 text-gray-700">
                  You can meet the renter/owner in person, or use our secure lockbox option for contactless handover.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900">What if the car gets damaged?</h3>
                <p className="mt-2 text-gray-700">
                  Our insurance covers damage to the vehicle. We also have a straightforward claims process to ensure quick resolution.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900">How much can I earn by sharing my car?</h3>
                <p className="mt-2 text-gray-700">
                  Earnings vary based on your car model, location, and availability. On average, car owners earn $300-$800 per month.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
}