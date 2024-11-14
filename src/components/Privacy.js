import React from "react";
import {
  FaInfoCircle,
  FaShieldAlt,
  FaSyncAlt,
  FaEnvelope,
} from "react-icons/fa";

const Privacy = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4 tracking-wide">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your privacy is important to us. This Privacy Policy explains how we
            collect, use, and protect your personal information while using
            SatoriShop.
          </p>
        </div>

        {/* Privacy Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 lg:p-12">
          {/* Section 1 - Information We Collect */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <FaInfoCircle className="text-blue-500 text-2xl mr-3" />
              <h2 className="text-3xl font-semibold text-gray-800">
                1. Information We Collect
              </h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              We collect personal data you provide to us directly, such as your
              name, email address, and payment information. Additionally, we
              collect data about your interactions with our services to improve
              the user experience.
            </p>
          </div>

          {/* Section 2 - How We Use Your Information */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <FaSyncAlt className="text-purple-500 text-2xl mr-3" />
              <h2 className="text-3xl font-semibold text-gray-800">
                2. How We Use Your Information
              </h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              We use your information to process transactions, personalize your
              experience, and communicate important updates. If you've opted in,
              we may also send you marketing emails to keep you informed of new
              products or promotions.
            </p>
          </div>

          {/* Section 3 - Data Security */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <FaShieldAlt className="text-green-500 text-2xl mr-3" />
              <h2 className="text-3xl font-semibold text-gray-800">
                3. Data Security
              </h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              We employ advanced security measures to safeguard your data.
              However, despite our efforts, no internet transmission is
              completely secure, so we cannot guarantee total protection of your
              information.
            </p>
          </div>

          {/* Section 4 - Changes to This Policy */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <FaSyncAlt className="text-yellow-500 text-2xl mr-3" />
              <h2 className="text-3xl font-semibold text-gray-800">
                4. Changes to This Policy
              </h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              We may update this Privacy Policy periodically. Any significant
              changes will be communicated through prominent notices on our
              website to ensure you're aware of any modifications.
            </p>
          </div>

          {/* Section 5 - Contact Us */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <FaEnvelope className="text-red-500 text-2xl mr-3" />
              <h2 className="text-3xl font-semibold text-gray-800">
                5. Contact Us
              </h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              If you have any questions or concerns about this Privacy Policy,
              feel free to reach out to us at{" "}
              <span className="font-semibold">support@SatoriShop.com</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
