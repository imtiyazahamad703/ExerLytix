import React, { useState } from "react";
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.send(
      "service_guw7w5b",
      "template_d7d00bo",
      {
        user_name: formData.name,
        user_email: formData.email,
        subject: "Message from ExerLytix",
        message: formData.message,
      },
      "cDpAN3cTIyHo04PwZ"
    ).then(() => {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 3000);
    }).catch((error) => console.error("EmailJS Error:", error));
  };

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
            {isSubmitted && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                Thank you! Your message has been sent.
              </div>
            )}
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1 transition-colors">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="input-field"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1 transition-colors">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="input-field"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1 transition-colors">
                  Message
                </label>
                <textarea
                  required
                  placeholder="Write your message..."
                  rows="4"
                  className="input-field"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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
