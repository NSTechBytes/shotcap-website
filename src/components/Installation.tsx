
import React, { useEffect, useRef } from 'react';
import { Check, DownloadCloud, MonitorCheck, ShieldCheck, Settings } from 'lucide-react';

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
            Get started with ShotCap in minutes on your Windows system
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="mb-10 bg-github-card rounded-xl border border-github-border p-6">
            <h3 className="text-xl font-semibold mb-4">System Requirements</h3>
            <ul className="space-y-2 text-github-text/80">
              <li className="flex items-start">
                <MonitorCheck className="w-5 h-5 text-github-accent mt-0.5 mr-2 flex-shrink-0" />
                <span>
                  <strong className="font-medium text-github-text">Windows Operating System</strong>
                  <span className="block text-sm mt-1">Windows 10 or Windows 11 recommended for best experience.</span>
                </span>
              </li>
              <li className="flex items-start">
                <ShieldCheck className="w-5 h-5 text-github-accent mt-0.5 mr-2 flex-shrink-0" />
                <span>
                  <strong className="font-medium text-github-text">Administrator Rights</strong>
                  <span className="block text-sm mt-1">For certain capture methods, administrator privileges may be required.</span>
                </span>
              </li>
              <li className="flex items-start">
                <Settings className="w-5 h-5 text-github-accent mt-0.5 mr-2 flex-shrink-0" />
                <span>
                  <strong className="font-medium text-github-text">Visual C++ Redistributable</strong>
                  <span className="block text-sm mt-1">The Microsoft Visual C++ Redistributable package might be required if not already installed.</span>
                </span>
              </li>
            </ul>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-4">Installation Methods</h3>
            
            {/* Method 1 */}
            <div className="mb-8">
              <h4 className="text-lg font-medium mb-3">Method 1: Direct Download</h4>
              <p className="mb-4">Download the portable executable file directly and use it without installation:</p>
              <a 
                href="#download" 
                className="inline-flex items-center text-github-accent hover:text-github-accent/90 mb-4 transition-colors"
              >
                <DownloadCloud className="w-5 h-5 mr-2" />
                Download ShotCap.exe (64-bit)
              </a>
              <div className="code-block mb-2">
                <code className="text-white">> ShotCap.exe --help</code>
              </div>
              <p className="text-sm text-github-text/70">
                The portable version can be run directly from any location including USB drives.
              </p>
            </div>
            
            {/* Method 2 */}
            <div>
              <h4 className="text-lg font-medium mb-3">Method 2: Setup Installer</h4>
              <p className="mb-4">Download and run the installer for a complete installation with shortcuts:</p>
              <a 
                href="#download" 
                className="inline-flex items-center text-github-accent hover:text-github-accent/90 mb-4 transition-colors"
              >
                <DownloadCloud className="w-5 h-5 mr-2" />
                Download ShotCap-Setup.exe
              </a>
              <div className="code-block mb-2">
                <code className="text-white">> ShotCap-Setup.exe<br/>
                > Follow the installation wizard instructions</code>
              </div>
              <p className="text-sm text-github-text/70">
                The installer will add ShotCap to your PATH environment variable and create start menu shortcuts.
              </p>
            </div>
          </div>

          <div id="download" className="mt-12 p-6 bg-gradient-to-r from-github-card to-github-card/80 rounded-xl border border-github-border">
            <h3 className="text-xl font-semibold mb-4">Download Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a 
                href="#" 
                className="p-4 bg-github-dark rounded-lg border border-github-border hover:border-github-accent/70 transition-colors flex flex-col items-center text-center"
              >
                <DownloadCloud className="w-6 h-6 text-github-accent mb-2" />
                <span className="font-medium">ShotCap.exe</span>
                <span className="text-xs text-github-text/70 mt-1">Portable (7.2 MB)</span>
              </a>
              <a 
                href="#" 
                className="p-4 bg-github-dark rounded-lg border border-github-border hover:border-github-accent/70 transition-colors flex flex-col items-center text-center"
              >
                <DownloadCloud className="w-6 h-6 text-github-accent mb-2" />
                <span className="font-medium">ShotCap-Setup.exe</span>
                <span className="text-xs text-github-text/70 mt-1">Installer (8.5 MB)</span>
              </a>
            </div>
            
            <div className="mt-6 text-sm text-github-text/70">
              <h4 className="font-medium text-github-text mb-2">System Compatibility:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Windows 10 (all editions)</li>
                <li>Windows 11 (all editions)</li>
                <li>Windows 8.1 (limited support)</li>
                <li>Windows 7 SP1 (limited support)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Installation;
