import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Copy, Check } from 'lucide-react';
import UsageSearch from './UsageSearch';

type CodeExampleProps = {
  title: string;
  description: string;
  command: string;
  output?: string;
  id: number;
};

const CodeExample = ({ title, description, command, output, id }: CodeExampleProps) => {
  const exampleRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  
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

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div 
      id={`example-${id}`}
      ref={exampleRef} 
      className="mb-10 opacity-0 translate-y-8 transition-all duration-700 ease-out rounded-lg p-4 hover:bg-github-dark/20"
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-github-text/70 mb-4">{description}</p>
      
      <div className="code-block mb-3 relative group">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-red-500 opacity-75"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500 opacity-75 ml-2"></div>
            <div className="h-3 w-3 rounded-full bg-green-500 opacity-75 ml-2"></div>
            <div className="ml-4 text-xs text-github-muted">cmd.exe</div>
          </div>
          <button 
            onClick={() => copyToClipboard(command)}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-github-text/70 hover:text-github-accent rounded"
            title="Copy to clipboard"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
        <code className="text-white">{"> "}{command}</code>
      </div>
      
      {output && (
        <div className="code-block bg-github-dark border border-github-border relative group">
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => copyToClipboard(output)}
              className="p-1.5 text-github-text/70 hover:text-github-accent rounded"
              title="Copy to clipboard"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
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
    },
    {
      title: "Capture Specific Window",
      description: "Take a screenshot of a window with a specific title.",
      command: "ShotCap.exe -w \"Calculator\" -f calc_window.png",
      output: "Captured window: 'Calculator'\nScreenshot saved to: C:\\Users\\username\\calc_window.png"
    },
    {
      title: "Multiple Monitor Capture",
      description: "Capture a specific monitor in a multi-monitor setup.",
      command: "ShotCap.exe -m 1 -f second_monitor.png",
      output: "Capturing monitor 1 (1920x1080)\nScreenshot saved to: C:\\Users\\username\\second_monitor.png"
    },
    {
      title: "Include Mouse Pointer",
      description: "Include the mouse pointer in your screenshot.",
      command: "ShotCap.exe -p -f with_cursor.png",
      output: "Including mouse pointer in capture\nScreenshot saved to: C:\\Users\\username\\with_cursor.png"
    },
    {
      title: "Save as JPEG with Quality",
      description: "Save the screenshot as JPEG with custom quality settings.",
      command: "ShotCap.exe -format jpg -quality 85 -f screenshot.jpg",
      output: "Using format: JPEG (quality: 85)\nScreenshot saved to: C:\\Users\\username\\screenshot.jpg"
    },
    {
      title: "Auto-Open After Saving",
      description: "Automatically open the screenshot after it's saved.",
      command: "ShotCap.exe -show -f preview.png",
      output: "Screenshot saved to: C:\\Users\\username\\preview.png\nOpening image with default viewer..."
    },
    {
      title: "List Available Monitors",
      description: "List all available monitors and their details.",
      command: "ShotCap.exe -listmonitors",
      output: "Available monitors:\nMonitor 0: Primary (1920x1080)\nMonitor 1: Secondary (1440x900)"
    },
    {
      title: "List Visible Windows",
      description: "List all visible top-level windows.",
      command: "ShotCap.exe -listwindows",
      output: "Visible windows:\n1. 'ShotCap Documentation - Google Chrome'\n2. 'Untitled - Notepad'\n3. 'File Explorer'\n4. 'Settings'"
    },
    {
      title: "Check Installation",
      description: "Verify ShotCap installation and check the version.",
      command: "ShotCap -v",
      output: "ShotCap v1.3\nInstalled successfully"
    },
    {
      title: "Enable Verbose Logging",
      description: "Run any command with detailed logging for troubleshooting.",
      command: "ShotCap -vl -f screenshot.png",
      output: "Verbose logging enabled\nInitializing capture...\nChecking display settings...\nCapturing screen...\nProcessing image...\nSaving to: C:\\Users\\username\\screenshot.png\nScreenshot saved successfully"
    }
  ];

  const [copySuccess, setCopySuccess] = useState(false);
  
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <section id="usage" className="py-20 md:py-32 bg-gradient-to-b from-github-dark to-github-dark/95">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Usage Examples</h2>
          <p className="text-github-text/70 max-w-2xl mx-auto mb-8">
            See how ShotCap can be used in various scenarios through these simple command examples
          </p>
          
          <div className="max-w-md mx-auto">
            <UsageSearch usageExamples={usageExamples} />
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          {usageExamples.map((example, index) => (
            <CodeExample
              key={index}
              id={index}
              title={example.title}
              description={example.description}
              command={example.command}
              output={example.output}
            />
          ))}

          <div className="mt-16 p-6 bg-github-card rounded-xl border border-github-border relative group">
            <h3 className="text-xl font-semibold mb-4">Command Reference</h3>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => copyToClipboard(`Usage: ShotCap.exe [options]
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
  -vl                   Enable verbose logging
  -v, --version         Display version information and exit
  -h, --help            Display this help message`)}
                className="p-1.5 text-github-text/70 hover:text-github-accent rounded"
                title="Copy to clipboard"
              >
                {copySuccess ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
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
  -vl                   Enable verbose logging
  -v, --version         Display version information and exit
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
