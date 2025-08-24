import React from "react";

const Contact = () => {
  return (
    <div className="w-full bg-gradient-to-r from-gray-100 via-white to-gray-100 text-gray-900 pt-32 pb-20">
      
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide">
          Get in <span className="text-blue-600">Touch</span> With{" "}
          <span className="text-amber-500">Us</span>
        </h1>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
          Have questions, suggestions, or just want to connect? We’d love to hear from you.  
          Reach out and our team will get back to you as soon as possible.
        </p>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Left - Contact Info */}
          <div className="bg-white shadow-lg rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Contact Information
            </h2>
            <p className="text-gray-600 mb-4">
              Feel free to reach us through any of the following ways:
            </p>
            <ul className="space-y-4">
              <li>
                <span className="font-semibold text-blue-600">📍 Address:</span>{" "}
                123 Fitness St, Wellness City, India
              </li>
              <li>
                <span className="font-semibold text-blue-600">📧 Email:</span>{" "}
                support@exerlytix.com
              </li>
              <li>
                <span className="font-semibold text-blue-600">📞 Phone:</span>{" "}
                +91 98765 43210
              </li>
            </ul>
          </div>

          {/* Right - Contact Form */}
          <div className="bg-white shadow-lg rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Send Us a Message
            </h2>
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  placeholder="Write your message..."
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;
