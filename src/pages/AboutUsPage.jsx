import React from "react";

const AboutUsPage = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">About Us</h1>
        <div className="bg-white rounded-2xl shadow-sm p-8 text-gray-700 leading-relaxed text-lg">
          <p className="mb-6">
            Welcome to <strong className="text-purple-700">Ansari Tools</strong>! We are dedicated to providing the best digital marketplace experience for all your software needs.
          </p>
          <p className="mb-6">
            Our mission is to empower professionals, creators, and students by giving them access to premium digital tools at unbeatable prices. Whether you need SEO tools, design software, or productivity apps, we've got you covered.
          </p>
          <p className="mb-6">
            With our 24/7 support and secure payment methods, you can shop with confidence and get instant access to the tools you need to succeed in your digital journey.
          </p>
          <p>
            Thank you for choosing Ansari Tools. We look forward to serving you!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
