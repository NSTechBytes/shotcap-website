
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

interface DownloadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DownloadDialog: React.FC<DownloadDialogProps> = ({ open, onOpenChange }) => {
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
            onClick={() => {
              // Handle direct download here
              console.log('Manual download clicked');
              // In a real implementation, you would redirect to the download file
              // window.location.href = '/download/ShotCap.exe';
            }}
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
