import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { FaqItem } from '../types';

const faqs: FaqItem[] = [
  {
    question: "How long does implementation take?",
    answer: "Most projects move from discovery to deployment in 6-12 weeks, depending on complexity and scope. We use an agile approach that allows you to see working solutions early, with continuous refinement throughout the process."
  },
  {
    question: "Who owns the AI solutions and data?",
    answer: "You do. All custom AI agents, automation pipelines, and data remain your intellectual property. We build solutions specifically for your business, and you maintain complete ownership and control."
  },
  {
    question: "How does your pricing work?",
    answer: "We offer transparent, value-based pricing tailored to your specific needs. After our discovery session, we provide a detailed proposal with fixed project costs or flexible retainer options. No hidden fees."
  },
  {
    question: "Will this replace my existing team?",
    answer: "No. Our AI solutions are designed to augment your team, not replace them. We automate repetitive, time-consuming tasks so your people can focus on strategic work and creative problem-solving."
  },
  {
    question: "How do you ensure data security?",
    answer: "Security is foundational. We follow industry-best practices for data encryption, access control, and compliance (GDPR, SOC 2). We work with your IT team to ensure all solutions meet your security standards."
  }
];

const FAQ: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-4 relative z-10">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-400 text-center mb-12">
          Everything you need to know about working with Arori.AI
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-slate-800/50 border rounded-lg overflow-hidden backdrop-blur-sm transition-all duration-300 ${activeFaq === index ? 'border-cyan-500/50 shadow-lg shadow-cyan-900/20' : 'border-cyan-500/20'}`}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-slate-800/70 transition"
              >
                <span className="font-semibold text-lg text-gray-200">{faq.question}</span>
                <ChevronRight
                  className={`w-5 h-5 text-cyan-400 transition-transform duration-300 ${activeFaq === index ? 'rotate-90' : ''}`}
                />
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === index ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 pb-6 text-gray-400 border-t border-gray-700/30 pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;