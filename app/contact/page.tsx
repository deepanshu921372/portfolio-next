import { SectionHeading } from "@/components/section-heading";
import { ContactForm } from "@/components/contact-form";
import { Mail, MapPin, Linkedin, Github, Twitter } from "lucide-react";
import { personalData } from "@/data/portfolio";
import Link from "next/link";

export default function ContactPage() {
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
            {/* <Link 
              href={personalData.socialLinks.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card hover:bg-muted transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </Link> */}
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow-md">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}