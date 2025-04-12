import React from "react";

const Contact = () => {
  return (
    <div className="w-full bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-slate-200 pt-32 pb-20 transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="text-center mb-16 px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide text-gray-900 dark:text-white transition-colors">
          Get in <span className="text-blue-600 dark:text-neon-blue">Touch</span> With{" "}
          <span className="text-amber-500 dark:text-neon-purple">Us</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto transition-colors">
          Have questions, suggestions, or just want to connect? We’d love to hear from you.  
          Reach out and our team will get back to you as soon as possible.
        </p>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Left - Contact Info */}
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 transition-colors">
              Contact Information
            </h2>
            <p className="text-gray-600 dark:text-slate-400 mb-4 transition-colors">
              Feel free to reach us through any of the following ways:
            </p>
            <ul className="space-y-4">
              <li className="text-gray-700 dark:text-slate-300 transition-colors">
                <span className="font-semibold text-blue-600 dark:text-neon-blue">📍 Address:</span>{" "}
                123 Fitness St, Wellness City, India
              </li>
              <li className="text-gray-700 dark:text-slate-300 transition-colors">
                <span className="font-semibold text-blue-600 dark:text-neon-blue">📧 Email:</span>{" "}
                support@exerlytix.com
              </li>
              <li className="text-gray-700 dark:text-slate-300 transition-colors">
                <span className="font-semibold text-blue-600 dark:text-neon-blue">📞 Phone:</span>{" "}
                +91 98765 43210
              </li>
            </ul>
          </div>

          {/* Right - Contact Form */}
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 transition-colors">
              Send Us a Message
            </h2>
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1 transition-colors">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1 transition-colors">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1 transition-colors">
                  Message
                </label>
                <textarea
                  placeholder="Write your message..."
                  rows="4"
                  className="input-field"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full btn-brand"
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
