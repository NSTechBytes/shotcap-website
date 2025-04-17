
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Usage from '@/components/Usage';
import { DialogDescription } from '@/components/ui/dialog';

const UsagePage = () => {
  useEffect(() => {
    // Change page title
    document.title = 'Usage - ShotCap';
  }, []);

  return (
    <div className="min-h-screen bg-github-dark text-github-text flex flex-col w-full">
      <Header />
      <main className="pt-20 flex-1">
        <Usage />
      </main>
      {/* Hidden DialogDescription to handle the dialog accessibility warning */}
      <div className="hidden">
        <DialogDescription id="search-dialog-description">
          Search for commands and usage examples
        </DialogDescription>
      </div>
    </div>
  );
};

export default UsagePage;
