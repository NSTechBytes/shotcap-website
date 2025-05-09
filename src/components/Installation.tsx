import React, { useEffect, useRef, useState } from 'react';
import { Check, DownloadCloud, MonitorCheck, ShieldCheck, Settings, Github, Code, ExternalLink, FileCode, Youtube } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import DownloadDialog from './DownloadDialog';
import { incrementDownloadCount } from '@/services/downloadService';
import { getLatestRelease, formatFileSize, formatDate } from '@/services/githubService';

const Installation = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const buildSectionRef = useRef<HTMLDivElement>(null);
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("https://github.com/NSTechBytes/ShotCap/releases/download/v1.0/ShotCap.exe");
  const [isSetup, setIsSetup] = useState(false);
  const [fileSize, setFileSize] = useState(0);
  const [releaseInfo, setReleaseInfo] = useState<{
    version: string,
    date: string,
    fileSize: string,
  }>({
    version: "checking..",
    date: "checking..",
    fileSize: "checking.."
  });
  const [isLoading, setIsLoading] = useState(true);
  const [downloadInfo, setDownloadInfo] = useState({
    portable: {
      url: "https://github.com/NSTechBytes/ShotCap/releases/download/v1.0/ShotCap.exe",
      size: "checking.."
    },
    standard: {
      url: "https://github.com/NSTechBytes/ShotCap/releases/download/v1.0/ShotCap_Setup_v1.0.exe",
      size: "checking.."
    }
  });

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0', 'translate-y-5');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    if (buildSectionRef.current) {
      observer.observe(buildSectionRef.current);
    }

    const fetchReleaseInfo = async () => {
      try {
        setIsLoading(true);
        const release = await getLatestRelease();
        
        if (release) {
          const portableAsset = release.assets.find(asset => asset.name === "ShotCap.exe");
          const setupAsset = release.assets.find(asset => asset.name.includes("Setup"));
          
          setDownloadInfo({
            portable: {
              url: portableAsset?.browser_download_url || downloadInfo.portable.url,
              size: portableAsset ? formatFileSize(portableAsset.size) : "checking.."
            },
            standard: {
              url: setupAsset?.browser_download_url || downloadInfo.standard.url,
              size: setupAsset ? formatFileSize(setupAsset.size) : "checking.."
            }
          });
          
          setReleaseInfo({
            version: release.tag_name.replace(/^v/, ''),
            date: formatDate(release.published_at),
            fileSize: portableAsset ? formatFileSize(portableAsset.size) : "checking.."
          });
        }
      } catch (error) {
        console.error("Failed to fetch release info:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReleaseInfo();

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleDownload = (e: React.MouseEvent, isSetupVersion: boolean, url: string, size: number = 0) => {
    e.preventDefault();
    setIsSetup(isSetupVersion);
    setDownloadUrl(url);
    setFileSize(size);
    setDownloadDialogOpen(true);
  };

  return (
    <section 
      id="installation" 
      ref={sectionRef}
      className="py-20 md:py-32 bg-github-dark opacity-0 transition-opacity duration-1000"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-github-text to-github-accent">Installation</h2>
          <p className="text-github-text/70 max-w-2xl mx-auto">
            Get started with ShotCap in minutes on your Windows system
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="mb-10 bg-github-card rounded-xl border border-github-border p-6 transition-all duration-300 hover:shadow-md hover:shadow-github-accent/10 hover:border-github-accent/30">
            <h3 className="text-xl font-semibold mb-4">System Requirements</h3>
            <ul className="space-y-2 text-github-text/80">
              <li className="flex items-start transition-transform duration-300 hover:translate-x-1">
                <MonitorCheck className="w-5 h-5 text-github-accent mt-0.5 mr-2 flex-shrink-0" />
                <span>
                  <strong className="font-medium text-github-text">Windows Operating System</strong>
                  <span className="block text-sm mt-1">Windows 10 or Windows 11 recommended for best experience.</span>
                </span>
              </li>
              <li className="flex items-start transition-transform duration-300 hover:translate-x-1">
                <ShieldCheck className="w-5 h-5 text-github-accent mt-0.5 mr-2 flex-shrink-0" />
                <span>
                  <strong className="font-medium text-github-text">Administrator Rights</strong>
                  <span className="block text-sm mt-1">For certain capture methods, administrator privileges may be required.</span>
                </span>
              </li>
              <li className="flex items-start transition-transform duration-300 hover:translate-x-1">
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
            
            <div className="mb-8 bg-github-card rounded-xl border border-github-border p-6 transition-all duration-300 hover:shadow-md hover:shadow-github-accent/10 hover:border-github-accent/30">
              <h4 className="text-lg font-medium mb-3 flex items-center">
                <DownloadCloud className="w-5 h-5 text-github-accent mr-2" />
                Direct Portable Download
              </h4>
              <p className="mb-4">Download the portable executable file directly and use it without installation:</p>
              
              {isLoading ? (
                <div className="flex items-center space-x-2 text-github-text/70 mb-4">
                  <div className="animate-spin h-4 w-4 border-2 border-github-accent/50 rounded-full border-t-transparent"></div>
                  <span>Fetching latest release...</span>
                </div>
              ) : (
                <a 
                  href="#download" 
                  className="inline-flex items-center text-github-accent hover:text-github-accent/90 mb-4 transition-colors"
                  onClick={(e) => handleDownload(e, false, downloadInfo.portable.url)}
                >
                  <DownloadCloud className="w-5 h-5 mr-2" />
                  Download ShotCap.exe ({releaseInfo.fileSize})
                </a>
              )}
              
              <div className="code-block mb-2 bg-github-dark rounded-lg p-3 overflow-x-auto transition-all duration-300 hover:bg-github-dark/90">
                <code className="text-white font-mono text-sm">{`> ShotCap.exe --help`}</code>
              </div>
              <p className="text-sm text-github-text/70">
                The portable version can be run directly from any location including USB drives.
              </p>
            </div>
          </div>
          
          <div ref={buildSectionRef} className="opacity-0 translate-y-5 transition-all duration-700 ease-out">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Code className="w-5 h-5 text-github-accent mr-2" />
              Source Code & Building ShotCap
            </h3>

            <div className="bg-github-card rounded-xl border border-github-border p-6 mb-8 transition-all duration-300 hover:shadow-md hover:shadow-github-accent/10 hover:border-github-accent/30">
              <div className="flex items-start mb-6">
                <div className="flex-shrink-0 bg-github-dark p-3 rounded-xl mr-4">
                  <FileCode className="w-8 h-8 text-github-accent" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2">Download Source Code</h4>
                  <p className="text-github-text/80 mb-4">
                    Access the complete source code to study, modify, or contribute to ShotCap.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a 
                      href="https://github.com/NSTechBytes/ShotCap" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-github-dark rounded-lg border border-github-border hover:bg-github-dark/80 hover:border-github-accent/50 transition-all duration-300"
                    >
                      <Github className="w-5 h-5" />
                      <span>GitHub Repository</span>
                    </a>
                    <a 
                      href="https://github.com/NSTechBytes/ShotCap/archive/refs/heads/main.zip" 
                      className="inline-flex items-center gap-2 px-4 py-2 bg-github-dark rounded-lg border border-github-border hover:bg-github-dark/80 hover:border-github-accent/50 transition-all duration-300"
                    >
                      <DownloadCloud className="w-5 h-5" />
                      <span>Download .zip</span>
                    </a>
                  </div>
                </div>
              </div>

              <Separator className="my-6 bg-github-border/50" />

              <h4 className="text-lg font-medium mb-4">Building ShotCap</h4>
              <ol className="space-y-6">
                <li className="bg-github-dark/50 rounded-lg p-4 transition-all duration-300 hover:bg-github-dark">
                  <h5 className="font-medium mb-2 flex items-center">
                    <span className="flex items-center justify-center w-6 h-6 bg-github-accent/20 text-github-accent rounded-full mr-2 text-sm">1</span>
                    Clone the Repository
                  </h5>
                  <div className="bg-github-dark rounded-lg p-3 overflow-x-auto font-mono text-sm">
                    <code className="text-white">git clone https://github.com/NSTechBytes/ShotCap.git</code>
                  </div>
                </li>
                
                <li className="bg-github-dark/50 rounded-lg p-4 transition-all duration-300 hover:bg-github-dark">
                  <h5 className="font-medium mb-2 flex items-center">
                    <span className="flex items-center justify-center w-6 h-6 bg-github-accent/20 text-github-accent rounded-full mr-2 text-sm">2</span>
                    Open the Project in Visual Studio
                  </h5>
                  <p className="text-github-text/80 mb-2">Open the solution file (ShotCap.sln).</p>
                </li>
                
                <li className="bg-github-dark/50 rounded-lg p-4 transition-all duration-300 hover:bg-github-dark">
                  <h5 className="font-medium mb-2 flex items-center">
                    <span className="flex items-center justify-center w-6 h-6 bg-github-accent/20 text-github-accent rounded-full mr-2 text-sm">3</span>
                    Configure Project Settings
                  </h5>
                  <ul className="list-disc ml-6 space-y-2 text-github-text/80">
                    <li><strong>Character Set:</strong> Ensure the project uses Unicode.</li>
                    <li><strong>Additional Dependencies:</strong> Under Configuration Properties &gt; Linker &gt; Input, add gdiplus.lib and Shcore.lib.</li>
                    <li><strong>Target Version:</strong> Ensure _WIN32_WINNT is defined as at least 0x0A00 (Windows 10) in your project settings or source code.</li>
                  </ul>
                </li>
                
                <li className="bg-github-dark/50 rounded-lg p-4 transition-all duration-300 hover:bg-github-dark">
                  <h5 className="font-medium mb-2 flex items-center">
                    <span className="flex items-center justify-center w-6 h-6 bg-github-accent/20 text-github-accent rounded-full mr-2 text-sm">4</span>
                    Build the Project
                  </h5>
                  <p className="text-github-text/80">Build the solution (e.g., press Ctrl+Shift+B) to produce ShotCap.exe.</p>
                </li>
              </ol>
            </div>
          </div>

          <div id="download" className="mt-12 p-6 bg-gradient-to-r from-github-card to-github-card/80 rounded-xl border border-github-border transition-all duration-300 hover:shadow-lg hover:shadow-github-accent/10">
            <h3 className="text-xl font-semibold mb-4">Download Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {isLoading ? (
                <div className="p-4 bg-github-dark rounded-lg border border-github-border flex items-center justify-center col-span-2">
                  <div className="animate-spin h-5 w-5 border-2 border-github-accent/50 rounded-full border-t-transparent mr-3"></div>
                  <span>Loading release information...</span>
                </div>
              ) : (
                <>
                  <a 
                    href={downloadInfo.standard.url} 
                    onClick={(e) => handleDownload(e, true, downloadInfo.standard.url)}
                    className="p-4 bg-github-dark rounded-lg border border-github-border hover:border-github-accent/70 transition-all duration-300 hover:scale-105 flex flex-col items-center text-center"
                  >
                    <DownloadCloud className="w-6 h-6 text-github-accent mb-2" />
                    <span className="font-medium">ShotCap Setup</span>
                    <span className="text-xs text-github-text/70 mt-1">Installer ({downloadInfo.standard.size})</span>
                    <span className="text-xs text-github-text/70 mt-1">Released: {releaseInfo.date}</span>
                  </a>
                  <a 
                    href={downloadInfo.portable.url} 
                    onClick={(e) => handleDownload(e, false, downloadInfo.portable.url)}
                    className="p-4 bg-github-dark rounded-lg border border-github-border hover:border-github-accent/70 transition-all duration-300 hover:scale-105 flex flex-col items-center text-center"
                  >
                    <DownloadCloud className="w-6 h-6 text-github-accent mb-2" />
                    <span className="font-medium">ShotCap Portable</span>
                    <span className="text-xs text-github-text/70 mt-1">Portable ({downloadInfo.portable.size})</span>
                    <span className="text-xs text-github-text/70 mt-1">Released: {releaseInfo.date}</span>
                  </a>
                </>
              )}
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

      <DownloadDialog 
        open={downloadDialogOpen} 
        onOpenChange={setDownloadDialogOpen}
        downloadUrl={downloadUrl}
        isSetup={isSetup}
        fileSize={fileSize}
      />
    </section>
  );
};

export default Installation;
