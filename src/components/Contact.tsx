
import React, { useEffect, useRef } from 'react';
import { Mail, Github, Twitter } from 'lucide-react';

const Contact = () => {
  const contactRef = useRef<HTMLDivElement>(null);
  
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

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);

  return (
    <section id="contact" className="py-20 md:py-32 bg-gradient-to-b from-github-dark to-github-dark/95">
      <div className="container mx-auto px-4 md:px-6">
        <div 
          ref={contactRef} 
          className="opacity-0 translate-y-8 transition-all duration-700 ease-out max-w-3xl mx-auto"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h2>
            <p className="text-github-text/70 mx-auto">
              Have questions or feedback about ShotCap? We'd love to hear from you! 
              Reach out to us through any of the channels below.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <div className="flex flex-col items-center p-6 bg-github-card rounded-xl border border-github-border transition-all duration-300 hover:border-github-accent/50 hover:shadow-md">
              <Mail className="w-10 h-10 text-github-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-github-text/70 text-center mb-4">
                Send us an email with your questions or feedback
              </p>
              <a 
                href="mailto:contact@shotcap.com" 
                className="text-github-accent hover:underline"
              >
                contact@shotcap.com
              </a>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-github-card rounded-xl border border-github-border transition-all duration-300 hover:border-github-accent/50 hover:shadow-md">
              <Github className="w-10 h-10 text-github-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">GitHub</h3>
              <p className="text-github-text/70 text-center mb-4">
                Report issues or contribute to the project
              </p>
              <a 
                href="https://github.com/shotcap" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-github-accent hover:underline"
              >
                github.com/shotcap
              </a>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-github-card rounded-xl border border-github-border transition-all duration-300 hover:border-github-accent/50 hover:shadow-md">
              <Twitter className="w-10 h-10 text-github-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Twitter</h3>
              <p className="text-github-text/70 text-center mb-4">
                Follow us for updates and quick support
              </p>
              <a 
                href="https://twitter.com/shotcapapp" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-github-accent hover:underline"
              >
                @shotcapapp
              </a>
            </div>
          </div>
          
          <div className="bg-github-card p-8 rounded-xl border border-github-border">
            <h3 className="text-xl font-semibold mb-6 text-center">Frequently Asked Questions</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium mb-2">Is ShotCap free to use?</h4>
                <p className="text-github-text/70">Yes, ShotCap is completely free and open source. You can download and use it without any charges.</p>
              </div>
              
              <div>
                <h4 className="text-lg font-medium mb-2">Can I use ShotCap commercially?</h4>
                <p className="text-github-text/70">Absolutely! ShotCap is available under the MIT license, which allows for commercial use.</p>
              </div>
              
              <div>
                <h4 className="text-lg font-medium mb-2">Is ShotCap available for macOS or Linux?</h4>
                <p className="text-github-text/70">Currently, ShotCap is Windows-only. We may consider other platforms in the future based on community interest.</p>
              </div>
              
              <div>
                <h4 className="text-lg font-medium mb-2">How can I contribute to ShotCap?</h4>
                <p className="text-github-text/70">Check out our GitHub repository and the Contribute page for ways to help improve ShotCap.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
