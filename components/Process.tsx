import React from 'react';

const Process: React.FC = () => {
  const steps = [
    {
      id: 1,
      title: "Discovery",
      description: "We start by deeply understanding your business—your vision, pain points, existing systems, and growth objectives. Through collaborative workshops, we identify high-impact automation opportunities."
    },
    {
      id: 2,
      title: "Development",
      description: "Our team builds your custom AI solution using agile methodology. You'll see progress every step of the way, with opportunities to refine and adjust based on real-world performance."
    },
    {
      id: 3,
      title: "Deployment",
      description: "We ensure a seamless launch with comprehensive team training and documentation. Post-deployment, we continuously monitor performance and optimize results as you scale."
    }
  ];

  return (
    <section id="process" className="py-20 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Process</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
            A proven three-step approach to transform your business with AI
            </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
              <div className="bg-slate-800/30 border border-cyan-500/10 rounded-lg p-8 hover:border-cyan-500/30 transition backdrop-blur-sm h-full flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mb-6 text-white shadow-lg">
                  {step.id}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
                <p className="text-gray-400">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;