import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { FaqItem } from '../types';

const faqs: FaqItem[] = [
  {
    question: "How long does it take to build and launch an automation?",
    answer: "Most custom business automations are built, tested, and live within 2 to 4 weeks. You get to test a working prototype by Week 2, allowing us to tweak it to your exact daily routine before introducing it to your team."
  },
  {
    question: "Who owns the automations, tools, and company data?",
    answer: "You own everything 100%. All custom code, workflows, connections, and business data belong entirely to you. We sign a strict confidentiality agreement (NDA) before starting, and we never keep or sell your business data."
  },
  {
    question: "How is TRIPPLE AI SYSTEMS pricing structured?",
    answer: "We offer simple, transparent pricing based on clear milestones. After a quick 15-minute conversation to see what you need automated, you receive a fixed quote with clear stages. There are no surprise hourly fees, hidden costs, or confusing subscriptions."
  },
  {
    question: "Will these AI automations replace our existing employees?",
    answer: "No. Our tools are designed to support your team, not replace them. We take over the boring, repetitive chores—like typing numbers into spreadsheets, reading invoices, and answering common customer questions—so your staff can focus on serving clients and growing your business."
  },
  {
    question: "How do you protect our private company information?",
    answer: "Your privacy is fully protected. We use bank-level encryption, and your private business information is never shared or used to train public AI models. Everything runs inside private, secured accounts that only your company controls."
  },
  {
    question: "Do we need new software or can this work with our current tools?",
    answer: "You do not need to replace anything you currently use. We connect directly with the tools you already rely on every day—including WhatsApp, Gmail, Outlook, Google Sheets, Microsoft Excel, QuickBooks, and your existing accounting or CRM software."
  }
];

const FAQ: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10" aria-label="Frequently Asked Questions">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="eyebrow-badge mb-3">07 / FREQUENTLY ASKED QUESTIONS</div>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-champagne mb-4">
            Answers &amp; <span className="gold-gradient-text">Clear Explanations</span>
          </h2>
          <p className="text-warm-gray text-base md:text-lg max-w-2xl mx-auto">
            Everything you need to know about working with TRIPPLE AI SYSTEMS to automate your everyday business work.
          </p>
        </div>

        {/* FAQ Accordion Tiles */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;

            return (
              <div
                key={index}
                className={`glass-panel rounded-3xl overflow-hidden border transition-all duration-300 ${
                  isOpen 
                    ? 'border-[oklch(0.8_0.14_82/50%)] bg-[oklch(0.18_0.02_75/65%)] shadow-xl shadow-[oklch(0.8_0.14_82/10%)]' 
                    : 'border-[oklch(0.8_0.12_82/20%)] hover:border-[oklch(0.8_0.12_82/35%)]'
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-7 py-5 text-left flex justify-between items-center transition-colors group"
                  aria-expanded={isOpen}
                >
                  <span className={`font-heading font-semibold text-base sm:text-lg transition-colors ${
                    isOpen ? 'text-gold' : 'text-champagne group-hover:text-gold'
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full border border-[oklch(0.8_0.12_82/25%)] flex items-center justify-center shrink-0 ml-4 transition-transform duration-300 ${
                    isOpen ? 'bg-gold text-black rotate-90' : 'bg-[oklch(0.14_0.015_70)] text-gold'
                  }`}>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-7 pb-6 text-warm-gray text-sm sm:text-base leading-relaxed border-t border-[oklch(0.8_0.12_82/15%)] pt-4">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Further Queries Callout */}
        <div className="mt-12 text-center text-xs text-warm-gray">
          <span>Have a custom compliance or architecture question? </span>
          <a href="mailto:givenarori77@gmail.com" className="text-gold hover:underline font-semibold ml-1">
            Speak directly with Given Arori
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;