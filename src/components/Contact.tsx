
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
      window.emailjs.init("_MEtUe82K5jtpJSGz");
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
      const response = await window.emailjs.send("service_43un05n", "template_k34ftbx", {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      });
      
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
          className="opacity-0 translate-y-8 transition-all duration-700 ease-out max-w-3xl mx-auto"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h2>
            <p className="text-github-text/70 mx-auto">
              Have questions or feedback about ShotCap? We'd love to hear from you! 
              Reach out to us through any of the channels below or use the contact form.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <div className="flex flex-col items-center p-6 bg-github-card rounded-xl border border-github-border transition-all duration-300 hover:border-github-accent/50 hover:shadow-md">
              <Mail className="w-10 h-10 text-github-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-github-text/70 text-center mb-4">
                Send us an email with your questions or feedback
              </p>
              <a 
                href="mailto:contact@shotcap.com" 
                className="text-github-accent hover:underline"
              >
                contact@shotcap.com
              </a>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-github-card rounded-xl border border-github-border transition-all duration-300 hover:border-github-accent/50 hover:shadow-md">
              <Github className="w-10 h-10 text-github-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">GitHub</h3>
              <p className="text-github-text/70 text-center mb-4">
                Report issues or contribute to the project
              </p>
              <a 
                href="https://github.com/shotcap" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-github-accent hover:underline"
              >
                github.com/shotcap
              </a>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-github-card rounded-xl border border-github-border transition-all duration-300 hover:border-github-accent/50 hover:shadow-md">
              <Twitter className="w-10 h-10 text-github-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Twitter</h3>
              <p className="text-github-text/70 text-center mb-4">
                Follow us for updates and quick support
              </p>
              <a 
                href="https://twitter.com/shotcapapp" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-github-accent hover:underline"
              >
                @shotcapapp
              </a>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-github-card p-8 rounded-xl border border-github-border mb-10">
            <h3 className="text-xl font-semibold mb-6 text-center">Send us a Message</h3>
            
            {submitError && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{submitError}</AlertDescription>
              </Alert>
            )}
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-github-text">Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your name" 
                            className="bg-github-dark border-github-border text-github-text" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-github-text">Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your email" 
                            type="email" 
                            className="bg-github-dark border-github-border text-github-text" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-github-text">Subject</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Message subject" 
                          className="bg-github-dark border-github-border text-github-text" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-github-text">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Your message" 
                          className="bg-github-dark border-github-border text-github-text min-h-[150px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
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
          
          <div className="bg-github-card p-8 rounded-xl border border-github-border">
            <h3 className="text-xl font-semibold mb-6 text-center">Frequently Asked Questions</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium mb-2">Is ShotCap free to use?</h4>
                <p className="text-github-text/70">Yes, ShotCap is completely free and open source. You can download and use it without any charges.</p>
              </div>
              
              <div>
                <h4 className="text-lg font-medium mb-2">Can I use ShotCap commercially?</h4>
                <p className="text-github-text/70">Absolutely! ShotCap is available under the MIT license, which allows for commercial use.</p>
              </div>
              
              <div>
                <h4 className="text-lg font-medium mb-2">Is ShotCap available for macOS or Linux?</h4>
                <p className="text-github-text/70">Currently, ShotCap is Windows-only. We may consider other platforms in the future based on community interest.</p>
              </div>
              
              <div>
                <h4 className="text-lg font-medium mb-2">How can I contribute to ShotCap?</h4>
                <p className="text-github-text/70">Check out our GitHub repository and the Contribute page for ways to help improve ShotCap.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
