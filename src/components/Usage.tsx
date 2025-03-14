
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type CodeExampleProps = {
  title: string;
  description: string;
  command: string;
  output?: string;
};

const CodeExample = ({ title, description, command, output }: CodeExampleProps) => {
  const exampleRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      },
      { threshold: 0.2 }
    );

    if (exampleRef.current) {
      observer.observe(exampleRef.current);
    }

    return () => {
      if (exampleRef.current) {
        observer.unobserve(exampleRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={exampleRef} 
      className="mb-10 opacity-0 translate-y-8 transition-all duration-700 ease-out"
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-github-text/70 mb-4">{description}</p>
      
      <div className="code-block mb-3">
        <div className="flex items-center mb-2">
          <div className="h-3 w-3 rounded-full bg-red-500 opacity-75"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500 opacity-75 ml-2"></div>
          <div className="h-3 w-3 rounded-full bg-green-500 opacity-75 ml-2"></div>
          <div className="ml-4 text-xs text-github-muted">cmd.exe</div>
        </div>
        <code className="text-white">{"> "}{command}</code>
      </div>
      
      {output && (
        <div className="code-block bg-github-dark border border-github-border">
          <code className="text-github-text/80 whitespace-pre-wrap">{output}</code>
        </div>
      )}
    </div>
  );
};

const Usage = () => {
  const usageExamples = [
    {
      title: "Capture Full Screen",
      description: "Take a screenshot of your entire screen and save it with a custom filename.",
      command: "ShotCap.exe -f desktop_capture.png",
      output: "Screenshot saved to: C:\\Users\\username\\desktop_capture.png"
    },
    {
      title: "Capture Active Window",
      description: "Take a screenshot of only the currently focused window.",
      command: "ShotCap.exe -active -f active_window.png",
      output: "Captured active window: 'Document - Notepad'\nScreenshot saved to: C:\\Users\\username\\active_window.png"
    },
    {
      title: "Capture Specific Region",
      description: "Select a specific region by specifying coordinates (x, y, width, height).",
      command: "ShotCap.exe -r 100,100,500,400 -f region.png",
      output: "Captured region (100,100,500,400)\nScreenshot saved to: C:\\Users\\username\\region.png"
    },
    {
      title: "Interactive Region Selection",
      description: "Select a region interactively using your mouse.",
      command: "ShotCap.exe -select -f selection.png",
      output: "Selected region (215,340,640,480)\nScreenshot saved to: C:\\Users\\username\\selection.png"
    },
    {
      title: "Delayed Capture",
      description: "Set a 5-second delay before capturing the screen.",
      command: "ShotCap.exe -d 5 -f delayed.png",
      output: "Waiting 5 seconds before capture...\nScreenshot saved to: C:\\Users\\username\\delayed.png"
    },
    {
      title: "Capture with Timestamp",
      description: "Add a timestamp overlay to your screenshot.",
      command: "ShotCap.exe -timestamp -f timestamped.png",
      output: "Added timestamp: 2023-06-15 12:30:45\nScreenshot saved to: C:\\Users\\username\\timestamped.png"
    },
    {
      title: "Copy to Clipboard",
      description: "Capture and copy directly to clipboard without saving a file.",
      command: "ShotCap.exe -clipboard",
      output: "Screenshot copied to clipboard"
    },
    {
      title: "Timelapse Capture",
      description: "Take 5 screenshots at 10-second intervals.",
      command: "ShotCap.exe -repeat 10 5 -dir C:\\timelapse",
      output: "Timelapse mode activated:\nCapture 1/5 saved to: C:\\timelapse\\screenshot_1.png\nWaiting 10 seconds...\n..."
    }
  ];

  return (
    <section id="usage" className="py-20 md:py-32 bg-gradient-to-b from-github-dark to-github-dark/95">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Usage Examples</h2>
          <p className="text-github-text/70 max-w-2xl mx-auto">
            See how ShotCap can be used in various scenarios through these simple command examples
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {usageExamples.map((example, index) => (
            <CodeExample
              key={index}
              title={example.title}
              description={example.description}
              command={example.command}
              output={example.output}
            />
          ))}

          <div className="mt-16 p-6 bg-github-card rounded-xl border border-github-border">
            <h3 className="text-xl font-semibold mb-4">Command Reference</h3>
            <div className="code-block overflow-x-auto">
              <code className="text-sm text-github-text/90 whitespace-pre">
{`Usage: ShotCap.exe [options]
Options:
  -f <filename>         Output file name (default: screenshot.png)
  -dir <directory>      Output directory (default: current directory)
  -d <delay>            Delay in seconds before capturing (default: 0)
  -r <x,y,w,h>          Capture region (default: full screen)
  -select               Interactively select a region with the mouse (overrides -r)
  -format <format>      Image format: png, jpg, bmp (default: png)
  -quality <0-100>      JPEG quality (only for -format jpg, default: 90)
  -w <window_title>     Capture a specific window by its title
  -active               Capture the active (foreground) window
  -m <monitor_index>    Capture a specific monitor (0-based index)
  -clipboard            Copy captured image to clipboard
  -show                 Open the captured image after saving
  -p                    Include the mouse pointer in the screenshot
  -timestamp            Annotate screenshot with current date/time
  -repeat <i> <n>       Repeat capture every i seconds for n times
  -listmonitors         List available monitors and exit
  -listwindows          List visible top-level windows and exit
  -v                    Enable verbose logging
  -h, --help            Display this help message`}
              </code>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Usage;
