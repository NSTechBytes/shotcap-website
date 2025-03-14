
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type CodeExampleProps = {
  title: string;
  description: string;
  command: string;
  output?: string;
};

const CodeExample = ({ title, description, command, output }: CodeExampleProps) => {
  const exampleRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      },
      { threshold: 0.2 }
    );

    if (exampleRef.current) {
      observer.observe(exampleRef.current);
    }

    return () => {
      if (exampleRef.current) {
        observer.unobserve(exampleRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={exampleRef} 
      className="mb-10 opacity-0 translate-y-8 transition-all duration-700 ease-out"
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-github-text/70 mb-4">{description}</p>
      
      <div className="code-block mb-3">
        <div className="flex items-center mb-2">
          <div className="h-3 w-3 rounded-full bg-red-500 opacity-75"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500 opacity-75 ml-2"></div>
          <div className="h-3 w-3 rounded-full bg-green-500 opacity-75 ml-2"></div>
          <div className="ml-4 text-xs text-github-muted">terminal</div>
        </div>
        <code className="text-white">$ {command}</code>
      </div>
      
      {output && (
        <div className="code-block bg-github-dark border border-github-border">
          <code className="text-github-text/80 whitespace-pre-wrap">{output}</code>
        </div>
      )}
    </div>
  );
};

const Usage = () => {
  const usageExamples = [
    {
      title: "Capture Full Screen",
      description: "Take a screenshot of your entire screen and save it with a timestamp.",
      command: "shotcap --full --output ~/Screenshots/screen-$(date +%Y%m%d%H%M%S).png",
      output: "Screenshot saved to: /home/user/Screenshots/screen-20230615123045.png"
    },
    {
      title: "Capture Active Window",
      description: "Take a screenshot of only the currently focused window.",
      command: "shotcap --window --active",
      output: "Screenshot saved to: /home/user/shotcap_window_20230615123045.png"
    },
    {
      title: "Capture Specific Region",
      description: "Select a specific region by specifying coordinates.",
      command: "shotcap --region 100,100,500,400",
      output: "Screenshot saved with dimensions 500x400 from origin (100,100)"
    },
    {
      title: "Delayed Capture",
      description: "Give yourself time to prepare the screen before capture.",
      command: "shotcap --delay 5 --full",
      output: "Waiting 5 seconds before capture...\nScreenshot saved to: /home/user/shotcap_full_20230615123045.png"
    }
  ];

  return (
    <section id="usage" className="py-20 md:py-32 bg-gradient-to-b from-github-dark to-github-dark/95">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Usage Examples</h2>
          <p className="text-github-text/70 max-w-2xl mx-auto">
            See how ShotCap can be used in various scenarios through these simple command examples
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {usageExamples.map((example, index) => (
            <CodeExample
              key={index}
              title={example.title}
              description={example.description}
              command={example.command}
              output={example.output}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Usage;
