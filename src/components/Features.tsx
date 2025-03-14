
import React, { useEffect, useRef } from 'react';
import { 
  Monitor, 
  MousePointer, 
  Clock, 
  Copy, 
  Search, 
  Maximize, 
  Layout, 
  Calendar, 
  Image, 
  FolderOpen, 
  Play, 
  RepeatIcon, 
  List, 
  Terminal 
} from 'lucide-react';

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
      title: "Full Desktop Capture",
      description: "Capture your entire desktop with a single command. Perfect for documentation and presentations."
    },
    {
      icon: <Search />,
      title: "Region Capture",
      description: "Capture a specific region using predefined coordinates or select interactively with a crosshair cursor."
    },
    {
      icon: <Layout />,
      title: "Window Capture",
      description: "Capture specific windows by title or capture the active foreground window automatically."
    },
    {
      icon: <Monitor />,
      title: "Monitor Selection",
      description: "Capture a specific monitor by index, perfect for multi-display setups."
    },
    {
      icon: <Clock />,
      title: "Delay Capture",
      description: "Set a countdown delay before capturing to prepare your screen exactly how you want it."
    },
    {
      icon: <MousePointer />,
      title: "Mouse Pointer Capture",
      description: "Include or exclude the mouse cursor in your screenshots as needed."
    },
    {
      icon: <Calendar />,
      title: "Timestamp Annotation",
      description: "Automatically overlay the current date and time on your screenshots for reference."
    },
    {
      icon: <Image />,
      title: "Multiple Output Formats",
      description: "Save screenshots as PNG, JPEG (with quality control), or BMP based on your needs."
    },
    {
      icon: <FolderOpen />,
      title: "Output Directory Control",
      description: "Specify where to save your screenshots and control file naming."
    },
    {
      icon: <Copy />,
      title: "Clipboard Support",
      description: "Copy screenshots directly to clipboard for immediate use in other applications."
    },
    {
      icon: <Play />,
      title: "Auto-Open Feature",
      description: "Automatically open captured images after saving for immediate review."
    },
    {
      icon: <RepeatIcon />,
      title: "Timelapse Mode",
      description: "Capture multiple screenshots at set intervals for time-based documentation."
    },
    {
      icon: <List />,
      title: "System Listing",
      description: "Easily list available monitors or visible windows to target your captures accurately."
    },
    {
      icon: <Terminal />,
      title: "Command-line Interface",
      description: "Powerful CLI that integrates with your scripts and automation workflows."
    }
  ];

  return (
    <section id="features" className="py-20 md:py-32 bg-github-dark relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-github-text/70 max-w-2xl mx-auto">
            ShotCap provides a robust set of features for capturing perfect screenshots directly from your Windows command line
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
