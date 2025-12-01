import React from 'react';
import { TestimonialItem } from '../types';

const Testimonials: React.FC = () => {
  const testimonials: TestimonialItem[] = [
    {
      quote: "Arori.AI helped us reduce response time by 70% and increase lead conversion by 45%. Their AI solution didn't just automate our processes—it transformed how our entire team works. The ROI was evident within the first quarter.",
      author: "Client Name",
      role: "CEO at TechCorp"
    },
    {
      quote: "We were skeptical about AI automation, but Arori.AI took the time to understand our unique challenges. The custom solution they built has saved us 30+ hours per week and improved accuracy across our operations.",
      author: "Client Name",
      role: "Director of Ops at HealthPlus"
    },
    {
      quote: "The performance dashboard alone has been a game-changer. We now have visibility into metrics we never tracked before, and the automation pipeline has eliminated the bottlenecks that were limiting our growth.",
      author: "Client Name",
      role: "Founder at E-Comm Giants"
    }
  ];

  return (
    <section id="testimonials" className="py-20 px-4 bg-slate-900/50 backdrop-blur-sm relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Real Businesses, Real Results</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
            See how we've helped companies transform their operations
            </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-slate-800/50 border-l-4 border-cyan-500 rounded-r-lg p-8 backdrop-blur-sm hover:bg-slate-800/80 transition-colors">
              <p className="text-gray-300 italic mb-6 leading-relaxed relative">
                <span className="text-4xl text-cyan-500/20 absolute -top-4 -left-2">"</span>
                {testimonial.quote}
              </p>
              <div className="flex items-center space-x-4 border-t border-gray-700/50 pt-4">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{testimonial.author}</p>
                  <p className="text-gray-400 text-xs">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;