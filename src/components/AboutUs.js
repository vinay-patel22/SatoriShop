import React from "react";
import { FaHistory, FaPeopleArrows, FaRocket } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4 tracking-wide">
            About Us
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At SatoriShop, we bring you the finest selection of sweets from
            around the world, with a mission to deliver joy through quality and
            taste.
          </p>
        </div>

        {/* About Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Our Story */}
          <div className="bg-white p-8 rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
            <div className="text-center mb-6">
              <FaHistory className="text-blue-500 text-5xl mx-auto mb-4" />
              <h2 className="text-3xl font-semibold text-gray-800">
                Our Story
              </h2>
            </div>
            <p className="text-gray-600 text-lg">
              Founded in 2024, our journey started with a simple passion for
              sweets. We have curated the best products to share our love for
              all things sweet.
            </p>
          </div>

          {/* Our Team */}
          <div className="bg-white p-8 rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
            <div className="text-center mb-6">
              <FaPeopleArrows className="text-green-500 text-5xl mx-auto mb-4" />
              <h2 className="text-3xl font-semibold text-gray-800">Our Team</h2>
            </div>
            <p className="text-gray-600 text-lg">
              Our team is made up of experienced professionals with a shared
              passion for sweets. We work together to ensure every product meets
              our high standards.
            </p>
          </div>

          {/* Our Vision */}
          <div className="bg-white p-8 rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
            <div className="text-center mb-6">
              <FaRocket className="text-red-500 text-5xl mx-auto mb-4" />
              <h2 className="text-3xl font-semibold text-gray-800">
                Our Vision
              </h2>
            </div>
            <p className="text-gray-600 text-lg">
              We aim to become the leading online sweet shop, known for
              exceptional quality and innovation. We are committed to bringing
              new delights to our customers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
