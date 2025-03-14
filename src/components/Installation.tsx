
import React, { useEffect, useRef } from 'react';
import { Check, DownloadCloud } from 'lucide-react';

const Installation = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="installation" 
      ref={sectionRef}
      className="py-20 md:py-32 bg-github-dark opacity-0 transition-opacity duration-1000"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Installation</h2>
          <p className="text-github-text/70 max-w-2xl mx-auto">
            Get started with ShotCap in minutes. Follow these simple installation instructions.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="mb-10 bg-github-card rounded-xl border border-github-border p-6">
            <h3 className="text-xl font-semibold mb-4">Prerequisites</h3>
            <ul className="space-y-2 text-github-text/80">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-github-accent mt-0.5 mr-2 flex-shrink-0" />
                <span>
                  <strong className="font-medium text-github-text">Python 3.6+</strong>
                  <span className="block text-sm mt-1">Make sure you have Python 3.6 or higher installed on your system.</span>
                </span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-github-accent mt-0.5 mr-2 flex-shrink-0" />
                <span>
                  <strong className="font-medium text-github-text">pip</strong>
                  <span className="block text-sm mt-1">The Python package installer to install dependencies.</span>
                </span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-github-accent mt-0.5 mr-2 flex-shrink-0" />
                <span>
                  <strong className="font-medium text-github-text">Git</strong>
                  <span className="block text-sm mt-1">Required if installing directly from the repository.</span>
                </span>
              </li>
            </ul>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-4">Installation Methods</h3>
            
            {/* Method 1 */}
            <div className="mb-8">
              <h4 className="text-lg font-medium mb-3">Method 1: Install using pip</h4>
              <div className="code-block mb-2">
                <code className="text-white">$ pip install shotcap</code>
              </div>
              <p className="text-sm text-github-text/70">
                This is the simplest method and will install the latest stable release from PyPI.
              </p>
            </div>
            
            {/* Method 2 */}
            <div className="mb-8">
              <h4 className="text-lg font-medium mb-3">Method 2: Install from source</h4>
              <div className="code-block mb-2">
                <code className="text-white">$ git clone https://github.com/username/shotcap.git<br/>
                $ cd shotcap<br/>
                $ pip install -e .</code>
              </div>
              <p className="text-sm text-github-text/70">
                This method allows you to install the latest development version with the newest features.
              </p>
            </div>
            
            {/* Method 3 */}
            <div>
              <h4 className="text-lg font-medium mb-3">Method 3: Download binary release</h4>
              <a 
                href="#download" 
                className="inline-flex items-center text-github-accent hover:text-github-accent/90 mb-4 transition-colors"
              >
                <DownloadCloud className="w-5 h-5 mr-2" />
                Download pre-built binary for your platform
              </a>
              <div className="code-block mb-2">
                <code className="text-white">$ chmod +x shotcap<br/>
                $ sudo mv shotcap /usr/local/bin/</code>
              </div>
              <p className="text-sm text-github-text/70">
                For Linux/macOS users. Windows users can download the executable and add it to their PATH.
              </p>
            </div>
          </div>

          <div id="download" className="mt-12 p-6 bg-gradient-to-r from-github-card to-github-card/80 rounded-xl border border-github-border">
            <h3 className="text-xl font-semibold mb-4">Download Binary Releases</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a 
                href="#" 
                className="p-4 bg-github-dark rounded-lg border border-github-border hover:border-github-accent/70 transition-colors flex flex-col items-center text-center"
              >
                <DownloadCloud className="w-6 h-6 text-github-accent mb-2" />
                <span className="font-medium">Linux</span>
                <span className="text-xs text-github-text/70 mt-1">x86_64</span>
              </a>
              <a 
                href="#" 
                className="p-4 bg-github-dark rounded-lg border border-github-border hover:border-github-accent/70 transition-colors flex flex-col items-center text-center"
              >
                <DownloadCloud className="w-6 h-6 text-github-accent mb-2" />
                <span className="font-medium">macOS</span>
                <span className="text-xs text-github-text/70 mt-1">Universal</span>
              </a>
              <a 
                href="#" 
                className="p-4 bg-github-dark rounded-lg border border-github-border hover:border-github-accent/70 transition-colors flex flex-col items-center text-center"
              >
                <DownloadCloud className="w-6 h-6 text-github-accent mb-2" />
                <span className="font-medium">Windows</span>
                <span className="text-xs text-github-text/70 mt-1">x64</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Installation;
