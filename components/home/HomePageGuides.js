// components/HomePageGuides.js

import Image from "next/image";

const HomePageGuides = () => {
  return (
    <section id="house_guides" className="py-10 px-5 ">
      <div className="text-center mb-6">
        <p className="inline-block px-4 py-2 bg-custom-radial-black border-pink-600 border-4 rounded-full mb-8">
          <span className="font-extrabold">House Guides:</span> Your Guests'
          Personal Home Navigators!
        </p>
        <h1 className="text-4xl lg:text-5xl font-bold mb-6">House Guides</h1>

        <div className="flex justify-center mb-10">
          <Image
            width={800}
            height={800}
            src="https://via.placeholder.com/400x300"
            alt="House Guides"
            className="w-4/5 md:w-2/3 lg:w-1/2 rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-xl font-semibold mb-4">
            Effortlessly Share Essential Information
          </h3>
          <p>
            Ever wished you could clone yourself to help guests with all those
            little details? Meet House Guides, the ultimate sidekick for your
            short-term stays! With House Guides, you can effortlessly share
            everything your guests need to know about your home.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-xl font-semibold mb-4">
            Smooth Navigation and Facility Use
          </h3>
          <p>
            From how to find your place to navigating your facilities and
            mastering the quirks of your appliances, House Guides ensures your
            guests have all the information they need at their fingertips.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-xl font-semibold mb-4">
            Digital Concierge for a Stress-Free Experience
          </h3>
          <p>
            Just upload your tips and rules, and let HandbookTree turn them into
            a seamless, stress-free adventure for your guests. It's like having
            your very own digital concierge, making sure your guests feel right
            at home!
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomePageGuides;
