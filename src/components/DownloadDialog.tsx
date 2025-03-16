
import React from 'react';
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
  const handleDownload = async () => {
    try {
      // Increment the download count
      await incrementDownloadCount();
      
      // Trigger the download
      window.location.href = downloadUrl;
      
      // Close the dialog after a short delay
      setTimeout(() => {
        onOpenChange(false);
      }, 1000);
    } catch (error) {
      console.error("Error during download:", error);
    }
  };

  return (
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
              By downloading, you agree to the <a href="#" className="text-github-accent hover:underline">license terms</a>.
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
          >
            <Download className="w-4 h-4" />
            Download Now
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
  );
};

export default DownloadDialog;
