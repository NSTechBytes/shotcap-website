
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Command, CommandInput, CommandList, CommandGroup, CommandItem } from '@/components/ui/command';

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

  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    // Filter examples based on search query
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

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-github-card/80 border border-github-border text-github-text/70 hover:text-github-text transition-colors"
      >
        <Search className="w-4 h-4" />
        <span>Search commands...</span>
        <span className="text-xs border border-github-border rounded px-1.5 py-0.5 ml-auto opacity-70">
          Ctrl K
        </span>
      </button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 gap-0 border-github-border bg-github-card max-w-2xl">
          <Command className="rounded-lg">
            <div className="flex items-center border-b border-github-border p-2">
              <Search className="w-4 h-4 mr-2 shrink-0 text-github-text/40" />
              <CommandInput
                ref={inputRef}
                placeholder="Search for commands..."
                value={searchQuery}
                onValueChange={setSearchQuery}
                className="flex-1 outline-none border-0 focus:ring-0 text-github-text"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="p-1">
                  <X className="w-4 h-4 text-github-text/40" />
                </button>
              )}
            </div>
            
            <CommandList className="max-h-[60vh] overflow-y-auto">
              {searchQuery && results.length === 0 && (
                <div className="px-4 py-8 text-center text-github-text/60">
                  No results found for "{searchQuery}"
                </div>
              )}
              
              {results.length > 0 && (
                <CommandGroup heading="Commands">
                  {results.map((result) => (
                    <CommandItem
                      key={result.id}
                      onSelect={() => handleSelectResult(result.id)}
                      className="cursor-pointer px-4 py-3 hover:bg-github-dark/20"
                    >
                      <div className="flex flex-col gap-1">
                        <div className="font-medium text-github-text">{result.title}</div>
                        <div className="text-xs text-github-text/70 line-clamp-1">{result.description}</div>
                        <code className="mt-1 text-xs bg-github-dark/30 px-2 py-1 rounded text-github-accent">
                          {result.command}
                        </code>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              
              {!searchQuery && (
                <div className="p-4 text-center text-github-text/60">
                  <p>Type to search for commands</p>
                  <p className="text-xs mt-1">Try searching for "capture", "delay", or "window"</p>
                </div>
              )}
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UsageSearch;
