
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, CheckCircle } from 'lucide-react';
import { incrementDownloadCount } from '@/services/downloadService';

interface DownloadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DownloadDialog: React.FC<DownloadDialogProps> = ({ open, onOpenChange }) => {
  const handleDownloadAgain = async () => {
    try {
      // Increment download count when "Download Again" is clicked
      await incrementDownloadCount();
      console.log('Manual download clicked and count incremented');
      
      // In a real implementation, you would redirect to the download file
      // window.location.href = '/download/ShotCap.exe';
    } catch (error) {
      console.error("Failed to increment download count:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-github-accent" />
          </div>
          <DialogTitle className="text-center text-xl">Thanks for downloading ShotCap!</DialogTitle>
          <DialogDescription className="text-center pt-2">
            Your download is starting now. If it doesn't start automatically, 
            click the download button below.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4 py-4">
          <p className="text-sm text-github-text/70 text-center">
            ShotCap is an open-source project. If you find it useful, please consider 
            starring our repository on GitHub to help others discover it.
          </p>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-center gap-2">
          <Button
            onClick={handleDownloadAgain}
            className="w-full sm:w-auto"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Again
          </Button>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadDialog;
