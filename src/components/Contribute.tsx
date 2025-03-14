
import React from 'react';
import { Github, FileCode, Bug, Heart } from 'lucide-react';

const Contribute = () => {
  return (
    <section id="contribute" className="py-20 md:py-32 bg-gradient-to-b from-github-dark to-github-dark/95">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Contribute to ShotCap</h2>
          <p className="text-github-text/70 max-w-2xl mx-auto">
            ShotCap is an open-source project and welcomes contributions from the community
          </p>
        </div>

        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="feature-card">
            <FileCode className="w-8 h-8 text-github-accent mb-4" />
            <h3 className="text-xl font-semibold mb-2">Submit Code</h3>
            <p className="text-github-text/70 mb-4">
              Help improve ShotCap by submitting pull requests. Fix bugs, add features, or improve documentation.
            </p>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-github-accent hover:text-github-accent/80 inline-flex items-center"
            >
              <span>View open issues</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
                <path d="M6.5 3.5L11 8L6.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          <div className="feature-card">
            <Bug className="w-8 h-8 text-github-accent mb-4" />
            <h3 className="text-xl font-semibold mb-2">Report Issues</h3>
            <p className="text-github-text/70 mb-4">
              Found a bug or have a feature request? Open an issue on GitHub to help us improve.
            </p>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-github-accent hover:text-github-accent/80 inline-flex items-center"
            >
              <span>Open an issue</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
                <path d="M6.5 3.5L11 8L6.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          <div className="feature-card md:col-span-2">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-6 md:mb-0 md:mr-6">
                <Heart className="w-8 h-8 text-github-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">Support the Project</h3>
                <p className="text-github-text/70 mb-4">
                  There are many ways to support ShotCap. Star the repository, spread the word, or contribute documentation.
                </p>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-primary inline-flex items-center"
                >
                  <Github className="w-4 h-4 mr-2" />
                  <span>Star on GitHub</span>
                </a>
              </div>
              
              <div className="md:w-1/2 p-4 bg-github-card rounded-lg border border-github-border">
                <h4 className="font-medium mb-2 text-github-text">MIT License</h4>
                <p className="text-xs text-github-text/70 mb-2">
                  ShotCap is open-source software licensed under the MIT license.
                </p>
                <div className="code-block text-xs h-32 overflow-y-auto">
                  <code className="text-github-text/90">
                    MIT License<br/><br/>
                    Copyright (c) 2023 ShotCap Contributors<br/><br/>
                    Permission is hereby granted, free of charge, to any person obtaining a copy
                    of this software and associated documentation files (the "Software"), to deal
                    in the Software without restriction, including without limitation the rights
                    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                    copies of the Software, and to permit persons to whom the Software is
                    furnished to do so, subject to the following conditions:
                    ...
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contribute;
