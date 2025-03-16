
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink } from 'lucide-react';
import { incrementDownloadCount } from '@/services/downloadService';

interface DownloadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  downloadUrl?: string;
}

const DownloadDialog = ({ open, onOpenChange, downloadUrl = "https://github.com/NSTechBytes/ShotCap/releases/download/v1.0/ShotCap.exe" }: DownloadDialogProps) => {
  const [showLicenseTerms, setShowLicenseTerms] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const handleDownload = async () => {
    try {
      // Prevent multiple count increments
      if (isDownloading) return;
      
      setIsDownloading(true);
      
      // Increment the download count
      await incrementDownloadCount();
      
      // Trigger the download
      window.location.href = downloadUrl;
      
      // Close the dialog after a short delay
      setTimeout(() => {
        onOpenChange(false);
        setIsDownloading(false);
      }, 1000);
    } catch (error) {
      console.error("Error during download:", error);
      setIsDownloading(false);
    }
  };

  const handleLicenseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowLicenseTerms(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md bg-github-card border-github-border">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Download ShotCap</DialogTitle>
            <DialogDescription className="text-github-text/70">
              You're downloading the latest version of ShotCap for Windows
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col space-y-4 py-4">
            <div className="bg-github-dark/50 p-4 rounded-lg">
              <p className="text-sm text-github-text/80 mb-2">Make sure to:</p>
              <ul className="list-disc pl-5 text-sm text-github-text/80 space-y-1">
                <li>Run the executable as administrator for full functionality</li>
                <li>Check the documentation for command usage</li>
                <li>Consider adding the directory to your PATH for easier access</li>
              </ul>
            </div>
            
            <div className="bg-github-dark/50 p-4 rounded-lg">
              <p className="text-sm text-github-text/80">
                By downloading, you agree to the <a href="#" onClick={handleLicenseClick} className="text-github-accent hover:underline">license terms</a>.
              </p>
            </div>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-3">
            <Button 
              variant="outline"
              className="w-full sm:w-auto" 
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button 
              className="w-full sm:w-auto bg-github-accent hover:bg-github-accent/90 text-white gap-2"
              onClick={handleDownload}
              disabled={isDownloading}
            >
              <Download className="w-4 h-4" />
              {isDownloading ? 'Downloading...' : 'Download Now'}
            </Button>
            <a 
              href="https://github.com/NSTechBytes/ShotCap/releases" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-github-text/60 hover:text-github-text flex items-center gap-1"
            >
              <ExternalLink className="w-3 h-3" />
              All releases
            </a>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* License Terms Dialog */}
      <Dialog open={showLicenseTerms} onOpenChange={setShowLicenseTerms}>
        <DialogContent className="bg-github-card border-github-border max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">ShotCap License Terms</DialogTitle>
            <DialogDescription className="text-github-text/70">
              Please read these terms carefully before downloading
            </DialogDescription>
          </DialogHeader>
          
          <div className="text-sm text-github-text/90 space-y-4">
            <p>MIT License</p>
            <p>Copyright (c) 2023 NSTechBytes</p>
            <p>
              Permission is hereby granted, free of charge, to any person obtaining a copy
              of this software and associated documentation files (the "Software"), to deal
              in the Software without restriction, including without limitation the rights
              to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
              copies of the Software, and to permit persons to whom the Software is
              furnished to do so, subject to the following conditions:
            </p>
            <p>
              The above copyright notice and this permission notice shall be included in all
              copies or substantial portions of the Software.
            </p>
            <p>
              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
              IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
              FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
              AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
              LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
              OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
              SOFTWARE.
            </p>
          </div>
          
          <DialogFooter>
            <Button 
              className="bg-github-accent hover:bg-github-accent/90 text-white"
              onClick={() => setShowLicenseTerms(false)}
            >
              I Understand
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DownloadDialog;
