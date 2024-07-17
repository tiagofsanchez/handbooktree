// components/HomePageGuides.js

import Image from "next/image";

const HomePageLocals = () => {
  return (
    <section id="local_guides" className="py-10 px-5 ">
      <div className="text-center mb-6">
        <p className="inline-block px-4 py-2 bg-slate-50 border-pink-600 border rounded-full mb-8">
          <span className="font-extrabold">Local Guides:</span> Your Guests'
          Adventure Awaits!
        </p>
        <h1 className="text-4xl lg:text-5xl font-bold mb-6">Local Guides</h1>

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
        <div className="bg-white p-10 rounded-2xl border bg-opacity-70">
          <h3 className="text-xl font-semibold mb-4">
            Unlock the Best Local Experiences
          </h3>
          <p>
            Want your guests to fall in love with the area as much as you have?
            Enter Local Guides, your guests' passport to the best local
            experiences! Share insider tips on the top attractions, hidden gems,
            and must-try spots around your property.
          </p>
        </div>

        <div className="bg-white p-10 rounded-2xl border bg-opacity-70">
          <h3 className="text-xl font-semibold mb-4">
            Personalized Recommendations at Their Fingertips
          </h3>
          <p>
            Whether it's the best brunch café, a scenic hiking trail, or the
            coolest local events, Local Guides helps you showcase why your
            region is amazing. Your guests will have personalized
            recommendations right at their fingertips.
          </p>
        </div>

        <div className="bg-white p-10 rounded-2xl border bg-opacity-70">
          <h3 className="text-xl font-semibold mb-4">
            Craft Unforgettable Adventures
          </h3>
          <p>
            Just upload your local recommendations, and let HandbookTree craft
            an unforgettable adventure for your guests. It's like having a
            friendly local tour guide, without ever leaving home!
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomePageLocals;
