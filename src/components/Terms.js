import React from "react";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaRegQuestionCircle,
} from "react-icons/fa";

const Terms = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4 tracking-wide">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Please read these Terms of Service ("Terms", "Terms of Service")
            carefully before using our website, operated by SatoriShop. Your
            access to and use of the service is conditioned on your acceptance
            of and compliance with these terms.
          </p>
        </div>

        {/* Terms Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 lg:p-12">
          {/* Section 1 */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <FaCheckCircle className="text-green-500 text-2xl mr-3" />
              <h2 className="text-3xl font-semibold text-gray-800">
                1. Acceptance of Terms
              </h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              By accessing or using the site, you agree to be bound by these
              Terms. If you disagree with any part of the terms, you may not
              access the service. Compliance with all local laws is your
              responsibility.
            </p>
          </div>

          {/* Section 2 */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <FaRegQuestionCircle className="text-blue-500 text-2xl mr-3" />
              <h2 className="text-3xl font-semibold text-gray-800">
                2. Use of Our Services
              </h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              You may use the services only for lawful purposes and in
              accordance with these Terms. You agree not to use our services for
              any purpose that is illegal or prohibited by these Terms.
            </p>
          </div>

          {/* Section 3 */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <FaExclamationTriangle className="text-yellow-500 text-2xl mr-3" />
              <h2 className="text-3xl font-semibold text-gray-800">
                3. Intellectual Property
              </h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              All content included on this site, such as text, graphics, logos,
              images, and software, is the property of SatoriShop or its content
              suppliers and protected by copyright and other laws.
            </p>
          </div>

          {/* Section 4 */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <FaExclamationTriangle className="text-red-500 text-2xl mr-3" />
              <h2 className="text-3xl font-semibold text-gray-800">
                4. Limitation of Liability
              </h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              SatoriShop shall not be liable for any indirect, incidental,
              special, or consequential damages resulting from your use or
              inability to use the site or services.
            </p>
          </div>

          {/* Section 5 */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <FaRegQuestionCircle className="text-purple-500 text-2xl mr-3" />
              <h2 className="text-3xl font-semibold text-gray-800">
                5. Changes to Terms
              </h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              We reserve the right to modify or replace these Terms at any time.
              If a revision is material, we will provide notice prior to any new
              terms taking effect. What constitutes a material change will be
              determined at our sole discretion.
            </p>
          </div>

          {/* Section 6 */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <FaCheckCircle className="text-green-500 text-2xl mr-3" />
              <h2 className="text-3xl font-semibold text-gray-800">
                6. Contact Us
              </h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              If you have any questions about these Terms, please contact us at{" "}
              <span className="font-semibold">support@SatoriShop.com</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
