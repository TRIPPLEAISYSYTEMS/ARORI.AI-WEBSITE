import React from 'react';
import { Bot, Zap, BarChart3 } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: <Bot className="w-6 h-6 text-cyan-400" />,
      title: "Custom AI Agent Engineering",
      description: "We design and deploy intelligent AI agents tailored to your specific workflows, enabling your team to focus on high-value work while automation handles repetitive tasks with precision."
    },
    {
      icon: <Zap className="w-6 h-6 text-cyan-400" />,
      title: "Managed Automation Pipelines",
      description: "From lead generation to customer service, we build end-to-end automation systems that integrate seamlessly with your existing tools, delivering consistent results 24/7."
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-cyan-400" />,
      title: "Performance Analytics",
      description: "Gain complete visibility into your operations with real-time dashboards that track KPIs, reveal optimization opportunities, and provide actionable insights to drive decisions."
    }
  ];

  return (
    <section id="services" className="py-20 px-4 bg-slate-900/50 backdrop-blur-sm relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Everything You Need In One Place</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
            Comprehensive AI automation solutions tailored to drive your business growth
            </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
                key={index} 
                className="bg-slate-800/50 border border-cyan-500/20 rounded-xl p-8 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1 backdrop-blur-sm"
            >
              <div className="w-14 h-14 bg-slate-900 rounded-lg flex items-center justify-center mb-6 border border-cyan-500/30 shadow-inner">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;