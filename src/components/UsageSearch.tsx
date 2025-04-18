
import React, { useState, useEffect, useRef } from 'react';
import { Search, XCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Command, CommandInput, CommandList, CommandGroup, CommandItem, CommandEmpty } from '@/components/ui/command';
import { useIsMobile } from '@/hooks/use-mobile';

interface SearchResult {
  title: string;
  command: string;
  description: string;
  id: number;
}

interface UsageSearchProps {
  usageExamples: {
    title: string;
    description: string;
    command: string;
    output?: string;
  }[];
}

const UsageSearch = ({ usageExamples }: UsageSearchProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  // Reset search when dialog opens/closes
  useEffect(() => {
    if (!open) {
      setSearchQuery('');
      setResults([]);
    } else {
      // When dialog opens, show all examples by default
      const allResults = usageExamples.map((example, index) => ({
        ...example,
        id: index,
      }));
      setResults(allResults);
    }
  }, [open, usageExamples]);

  useEffect(() => {
    // Add keyboard shortcut for search (Ctrl+K or Cmd+K)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
      
      // Close on escape
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    // Focus input when dialog opens
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  // Update search results immediately as user types
  useEffect(() => {
    if (!searchQuery.trim()) {
      // Show all results if search query is empty
      const allResults = usageExamples.map((example, index) => ({
        ...example,
        id: index,
      }));
      setResults(allResults);
      return;
    }

    const filtered = usageExamples
      .map((example, index) => ({
        ...example,
        id: index,
      }))
      .filter(example => 
        example.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        example.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        example.command.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    setResults(filtered);
  }, [searchQuery, usageExamples]);

  const handleSelectResult = (id: number) => {
    setOpen(false);
    
    // Scroll to the selected example
    setTimeout(() => {
      const element = document.getElementById(`example-${id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Add a highlight effect
        element.classList.add('bg-github-accent/10');
        setTimeout(() => {
          element.classList.remove('bg-github-accent/10');
        }, 2000);
      }
    }, 100);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-github-card/80 border border-github-border text-github-text/70 hover:text-github-text transition-colors w-full"
      >
        <Search className="w-4 h-4" />
        <span className="text-left flex-1">Search commands...</span>
        <span className="text-xs border border-github-border rounded px-1.5 py-0.5 opacity-70">
          Ctrl K
        </span>
      </button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent 
          hideCloseButton={true}
          className="p-0 gap-0 border-github-border bg-github-card max-w-3xl mx-auto w-[calc(100%-2rem)] sm:w-auto sm:min-w-[500px] sm:max-w-[90vw]"
        >
          <DialogTitle className="sr-only">Search Commands</DialogTitle>
          <Command className="rounded-lg">
            <div className="flex items-center border-b border-github-border p-3 relative">
              <Search className="w-5 h-5 mr-2 shrink-0 text-github-text/40" />
              <CommandInput
                ref={inputRef}
                placeholder="Search for commands..."
                value={searchQuery}
                onValueChange={handleSearchChange}
                className="flex-1 outline-none border-0 focus:ring-0 text-github-text text-base w-full pr-10"
                showIcon={false}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-github-dark/20 rounded"
                  aria-label="Clear search"
                  title="Clear search"
                >
                  <XCircle className="w-5 h-5 text-github-text/60 hover:text-github-text" />
                </button>
              )}
            </div>
            
            <CommandList className="max-h-[50vh] md:max-h-[70vh] overflow-y-auto py-2">
              <CommandEmpty className="py-6 text-center text-github-text/60">
                No results found for "{searchQuery}"
              </CommandEmpty>
              
              {results.length > 0 && (
                <CommandGroup heading="Commands" className="px-2">
                  {results.map((result) => (
                    <CommandItem
                      key={result.id}
                      onSelect={() => handleSelectResult(result.id)}
                      className="cursor-pointer px-4 py-3 hover:bg-github-dark/20 rounded-md mb-1 transition-colors"
                    >
                      <div className="flex flex-col gap-1 w-full">
                        <div className="font-medium text-github-text flex items-center">
                          <span className="mr-2">{result.title}</span>
                          <span className="text-xs bg-github-dark/40 px-2 py-0.5 rounded-full text-github-accent/80 ml-auto">
                            Command
                          </span>
                        </div>
                        <div className="text-sm text-github-text/70 line-clamp-1">{result.description}</div>
                        <code className="mt-1.5 text-xs bg-github-dark/30 px-2 py-1.5 rounded text-github-accent block w-full overflow-x-auto">
                          {result.command}
                        </code>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
          
          {/* Add a dedicated close button at the bottom for better mobile UX */}
          <div className="p-3 border-t border-github-border flex justify-center">
            <button 
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded-md bg-github-dark/30 hover:bg-github-dark/50 text-github-text/80 hover:text-github-text transition-all"
              aria-label="Close search"
            >
              Close Search
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UsageSearch;
