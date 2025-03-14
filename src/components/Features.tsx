
import React, { useEffect, useRef } from 'react';
import { Camera, Command, Layout, Layers, Maximize, PanelTopOpen, Clock, TerminalSquare } from 'lucide-react';

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
};

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-4');
          }, delay);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  return (
    <div 
      ref={cardRef} 
      className="feature-card opacity-0 translate-y-4 transition-all duration-500 ease-out"
    >
      <div className="flex flex-col h-full">
        <div className="mb-4 p-2 w-10 h-10 rounded-md bg-github-accent/10 text-github-accent flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-github-text/70 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

const Features = () => {
  const featuresData = [
    {
      icon: <Maximize />,
      title: "Full Screen Capture",
      description: "Capture your entire desktop with a single command. Perfect for documentation and presentations."
    },
    {
      icon: <Layout />,
      title: "Window Selection",
      description: "Capture specific application windows without manual cropping. Maintains window boundaries perfectly."
    },
    {
      icon: <PanelTopOpen />,
      title: "Region Selection",
      description: "Select and capture only the regions you need with precise coordinate selection."
    },
    {
      icon: <Command />,
      title: "Command-line Interface",
      description: "Powerful CLI that integrates with your existing workflow and automation scripts."
    },
    {
      icon: <Clock />,
      title: "Timed Captures",
      description: "Set up delayed captures to prepare your screen exactly how you want it."
    },
    {
      icon: <Layers />,
      title: "Multiple Output Formats",
      description: "Save your screenshots in PNG, JPG, or other formats based on your needs."
    },
    {
      icon: <TerminalSquare />,
      title: "Scriptable & Automatable",
      description: "Easily incorporate into shell scripts and automation workflows."
    },
    {
      icon: <Camera />,
      title: "Multi-Monitor Support",
      description: "Seamlessly capture content across multiple displays with proper handling."
    }
  ];

  return (
    <section id="features" className="py-20 md:py-32 bg-github-dark relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-github-text/70 max-w-2xl mx-auto">
            ShotCap provides a robust set of features for capturing perfect screenshots directly from your terminal
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuresData.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
