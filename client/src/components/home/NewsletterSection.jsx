export default function NewsletterSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="bg-gray-900 text-white rounded-[2rem] p-10 md:p-16 text-center">
        <p className="text-orange-400 font-semibold mb-3">
          Join Our Newsletter
        </p>

        <h2 className="text-4xl font-bold mb-4">
          Get Latest Offers & Updates
        </h2>

        <p className="text-gray-300 mb-8">
          Subscribe and never miss new arrivals and special discounts.
        </p>

        <div className="max-w-xl mx-auto flex flex-col md:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-5 py-4 rounded-xl text-gray-900 outline-none"
          />

          <button className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-xl font-semibold">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}