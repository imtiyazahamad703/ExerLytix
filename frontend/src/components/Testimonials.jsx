import React from "react";

const Testimonials = () => {
  return (
    <section className="bg-slate-900 py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Loved by <span className="gradient-text">Athletes</span>
          </h2>
          <p className="text-slate-400 text-lg">
            See what our users have to say about their experience with ExerLytix.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="glass-card p-8">
            <div className="flex text-yellow-400 mb-4">
              ★★★★★
            </div>
            <p className="text-slate-300 italic mb-6">
              "The real-time form correction is mind-blowing. It's like having a personal trainer right in my living room. My squat form has never been better!"
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-slate-700 mr-4"></div>
              <div>
                <h4 className="text-white font-bold">Sarah Jenkins</h4>
                <p className="text-slate-500 text-sm">Fitness Enthusiast</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="glass-card p-8">
            <div className="flex text-yellow-400 mb-4">
              ★★★★★
            </div>
            <p className="text-slate-300 italic mb-6">
              "Automated rep counting allows me to just focus on the workout. The analytics dashboard is beautiful and keeps me highly motivated."
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-slate-700 mr-4"></div>
              <div>
                <h4 className="text-white font-bold">Marcus Thorne</h4>
                <p className="text-slate-500 text-sm">Amateur Bodybuilder</p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="glass-card p-8 md:hidden lg:block">
            <div className="flex text-yellow-400 mb-4">
              ★★★★★
            </div>
            <p className="text-slate-300 italic mb-6">
              "I love how it runs completely in the browser. No extra hardware, no complicated setup. Just open the app and start sweating."
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-slate-700 mr-4"></div>
              <div>
                <h4 className="text-white font-bold">Elena Rostova</h4>
                <p className="text-slate-500 text-sm">Yoga Instructor</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
