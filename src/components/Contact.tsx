import React, { useEffect, useRef, useState } from 'react';
import { Mail, Github, Twitter, Check, AlertCircle } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

// Get environment variables with fallbacks for development
const EMAILJS_USER_ID = import.meta.env.VITE_EMAILJS_USER_ID || "_MEtUe82K5jtpJSGz";
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_43un05n";
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_k34ftbx";

const Contact = () => {
  const contactRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    },
  });
  
  useEffect(() => {
    // Initialize EmailJS with your Public Key
    if (window.emailjs) {
      window.emailjs.init(EMAILJS_USER_ID);
      console.log("EmailJS initialized");
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      },
      { threshold: 0.2 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);
  
  const sendEmailWithEmailJS = async (data: z.infer<typeof formSchema>) => {
    if (!window.emailjs) {
      console.error("EmailJS not loaded");
      throw new Error("Email service is not available");
    }

    try {
      const response = await window.emailjs.send(
        EMAILJS_SERVICE_ID, 
        EMAILJS_TEMPLATE_ID, 
        {
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        }
      );
      
      console.log("EmailJS response:", response);
      return response;
    } catch (error) {
      console.error('Error sending email with EmailJS:', error);
      throw error;
    }
  };
  
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      await sendEmailWithEmailJS(data);
      
      form.reset();
      setIsSuccess(true);
      
      // Use only sonner toast
      toast("Message sent successfully! We'll get back to you soon.", {
        icon: <Check className="h-4 w-4" />,
      });
      
      // Reset success state after a while to clear the button state
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setSubmitError(errorMessage);
      toast("Failed to send message. Please try again later.", {
        icon: <AlertCircle className="h-4 w-4" />,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-gradient-to-b from-github-dark to-github-dark/95">
      <div className="container mx-auto px-4 md:px-6">
        <div 
          ref={contactRef} 
          className="opacity-0 translate-y-8 transition-all duration-700 ease-out max-w-5xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-github-accent to-github-accent/70 bg-clip-text text-transparent">Contact Us</h2>
            <p className="text-github-text/70 max-w-2xl mx-auto">
              Have questions or feedback about ShotCap? We'd love to hear from you! 
              Reach out to us through any of the channels below or use the contact form.
            </p>
          </div>
          
          {/* Main content wrapper */}
          <div className="grid md:grid-cols-12 gap-10">
            {/* Left side: Contact cards and FAQ */}
            <div className="md:col-span-5 space-y-8">
              {/* Contact cards grid */}
              <div className="space-y-4">
                <div className="p-6 bg-github-card rounded-xl border border-github-border hover:border-github-accent/50 transition-all duration-300 hover:shadow-md group">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 rounded-full bg-github-dark/50 group-hover:bg-github-accent/10">
                      <Mail className="w-6 h-6 text-github-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Email</h3>
                      <p className="text-github-text/70 text-sm mb-2">Send us an email with your questions</p>
                      <a 
                        href="mailto:nstechbytes@gmail.com" 
                        className="text-github-accent hover:underline text-sm inline-flex items-center"
                      >
                        nstechbytes@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-github-card rounded-xl border border-github-border hover:border-github-accent/50 transition-all duration-300 hover:shadow-md group">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 rounded-full bg-github-dark/50 group-hover:bg-github-accent/10">
                      <Github className="w-6 h-6 text-github-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">GitHub</h3>
                      <p className="text-github-text/70 text-sm mb-2">Report issues or contribute</p>
                      <a 
                        href="https://github.com/NSTechBytes/ShotCap" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-github-accent hover:underline text-sm inline-flex items-center"
                      >
                        github.com/ShotCap
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-github-card rounded-xl border border-github-border hover:border-github-accent/50 transition-all duration-300 hover:shadow-md group">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 rounded-full bg-github-dark/50 group-hover:bg-github-accent/10">
                      <Twitter className="w-6 h-6 text-github-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Youtube</h3>
                      <p className="text-github-text/70 text-sm mb-2">Subscribe us for updates</p>
                      <a 
                        href="https://youtube.com/@nstechbytes" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-github-accent hover:underline text-sm inline-flex items-center"
                      >
                        @nstechbytes
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* FAQ section */}
              <div className="bg-github-card p-6 rounded-xl border border-github-border">
                <h3 className="text-lg font-semibold mb-4 border-b border-github-border pb-2">Frequently Asked Questions</h3>
                
                <div className="space-y-4 mt-4">
                  <div className="space-y-1">
                    <h4 className="font-medium text-github-text">Is ShotCap free to use?</h4>
                    <p className="text-github-text/70 text-sm">Yes, ShotCap is completely free and open source.</p>
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="font-medium text-github-text">Can I use ShotCap commercially?</h4>
                    <p className="text-github-text/70 text-sm">Absolutely! ShotCap is available under the MIT license.</p>
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="font-medium text-github-text">Is ShotCap available for macOS/Linux?</h4>
                    <p className="text-github-text/70 text-sm">Currently, ShotCap is Windows-only. We may consider other platforms in the future.</p>
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="font-medium text-github-text">How can I contribute?</h4>
                    <p className="text-github-text/70 text-sm">Check out our GitHub repository and the Contribute page.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right side: Contact Form */}
            <div className="md:col-span-7">
              <div className="bg-github-card p-8 rounded-xl border border-github-border shadow-sm">
                <h3 className="text-xl font-semibold mb-6 text-center bg-gradient-to-r from-github-accent to-github-accent/70 bg-clip-text text-transparent">Send us a Message</h3>
                
                {submitError && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{submitError}</AlertDescription>
                  </Alert>
                )}
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-github-text text-sm">Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your name" 
                                className="bg-github-dark border-github-border text-github-text focus-visible:ring-github-accent/50" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-github-text text-sm">Email</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your email" 
                                type="email" 
                                className="bg-github-dark border-github-border text-github-text focus-visible:ring-github-accent/50" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-github-text text-sm">Subject</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Message subject" 
                              className="bg-github-dark border-github-border text-github-text focus-visible:ring-github-accent/50" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-github-text text-sm">Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Your message" 
                              className="bg-github-dark border-github-border text-github-text min-h-[150px] focus-visible:ring-github-accent/50" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-github-accent hover:bg-github-accent/90 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : isSuccess ? (
                        <span className="flex items-center">
                          <Check className="w-4 h-4 mr-2" />
                          Sent
                        </span>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
