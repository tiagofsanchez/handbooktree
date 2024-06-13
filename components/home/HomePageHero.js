const HomePageHero = () => {
    return (
      <section className="bg-gray-800 text-white py-20">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-5">
          {/* Left column (2/3 width on large screens) */}
          <div className="lg:w-2/3 mb-10 lg:mb-0">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Welcome to Your Website Name
            </h1>
            <p className="text-lg mb-8">
              This is the home page of Your Website Name, offering great content
              and services.
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg focus:outline-none focus:shadow-outline">
              Get Started
            </button>
          </div>
          {/* Right column (1/3 width on large screens) */}
          <div className="lg:w-1/3">
            <img
              src="https://via.placeholder.com/400x300"
              alt="Hero Image"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>
    );
}
 
export default HomePageHero;