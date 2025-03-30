"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Linkedin, Github } from "lucide-react";
import { personalData } from "@/data/portfolio";
import Link from "next/link";
import { toast } from "sonner";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.name || formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.message || formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Create a hidden form for FormSubmit.co submission
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://formsubmit.co/sharmadeepanshu1005@gmail.com';
    form.style.display = 'none';
    
    // Add form data
    Object.entries(formData).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });
    
    // Add FormSubmit.co configuration
    const configFields = {
      '_subject': `New message from ${formData.name}`,
      '_captcha': 'false',
      '_template': 'table',
      '_next': window.location.href
    };
    
    Object.entries(configFields).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });
    
    document.body.appendChild(form);
    
    // Submit the form
    form.submit();
    
    // Show success message
    toast.success("Message sent successfully!");
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      message: ""
    });
    
    setIsSubmitting(false);
  };

  return (
    <div className="container py-16 px-4 md:px-6 lg:h-[85vh] lg:mt-12">
      <SectionHeading
        title="Contact Me"
        subtitle="Get in touch with me for any questions or opportunities"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-1">
          <h3 className="text-2xl font-semibold mb-6">Get In Touch</h3>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium">Email</h4>
                <p className="text-muted-foreground">{personalData.email}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium">Location</h4>
                <p className="text-muted-foreground">{personalData.location}</p>
              </div>
            </div>
          </div>
          
          <h3 className="text-2xl font-semibold mb-4">Connect With Me</h3>
          <div className="flex gap-4">
            <Link 
              href={personalData.socialLinks.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card hover:bg-muted transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link 
              href={personalData.socialLinks.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card hover:bg-muted transition-colors"
            >
              <Github className="h-5 w-5" />
            </Link>
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="transition-all duration-300 hover:translate-x-1">
              <label className="block text-sm font-medium mb-1">Name</label>
              <Input 
                name="name"
                placeholder="Your name" 
                value={formData.name}
                onChange={handleChange}
                className="transition-all duration-300 focus:border-primary"
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>
            
            <div className="transition-all duration-300 hover:translate-x-1">
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input 
                name="email"
                placeholder="Your email" 
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="transition-all duration-300 focus:border-primary"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>
            
            <div className="transition-all duration-300 hover:translate-x-1">
              <label className="block text-sm font-medium mb-1">Message</label>
              <Textarea
                name="message"
                placeholder="Your message"
                value={formData.message}
                onChange={handleChange}
                className="min-h-32 transition-all duration-300 focus:border-primary"
              />
              {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
            </div>
            
            <Button 
              type="submit" 
              className="w-full transition-all duration-300 hover:scale-105" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}