// components/NewsletterForm.js

import React, { useState } from "react";
import { Button } from "../ui/button";

const NewsletterForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form data submitted:", formData);
  };

  return (
    <section
      id="newsletter"
      className="py-12 px-5 bg-custom-radial-black border-4 border-black rounded-xl"
    >
      <div className="container mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-2 items-center">
        {/* Form Section */}
        <div className="bg-white bg-opacity-70 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">
            Join the HandbookTree Community!
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500"
                required
              />
            </div>
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
        {/* Justification Section */}
        <div className="p-8 ">
          <h2 className="text-2xl font-bold mb-6">
            Join the HandbookTree Community!
          </h2>
          <p className="mb-4">
            Want to make hosting a breeze and give your guests an unforgettable
            experience? Sign up for our newsletter and be the first to know
            about our latest tips, exclusive features, and special offers!
          </p>
          <h3 className="text-xl font-semibold mb-2">
            🌟 <span className="font-bold">Why Subscribe?</span>
          </h3>
          <ul className="list-disc list-inside mb-4">
            <li>Get insider hosting tips & tricks</li>
            <li>Discover new features before anyone else</li>
            <li>Receive exclusive discounts & offers</li>
            <li>Join a community of savvy hosts</li>
          </ul>
          <h3 className="text-xl font-semibold mb-2">
            📬 <span className="font-bold">Stay in the Loop!</span>
          </h3>
          <p>
            Ready to take your hosting game to the next level? Enter your email
            below and start your journey with HandbookTree today!
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterForm;
