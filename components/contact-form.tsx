"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });
    
    formData.append("_subject", `New message from ${values.name}`);
    formData.append("_captcha", "false");
    formData.append("_template", "table");
    formData.append("_next", window.location.href);
    
    fetch("https://formsubmit.co/sharmadeepanshu1005@gmail.com", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Message sent successfully!");
          form.reset();
        } else {
          toast.error("Failed to send message. Please try again.");
        }
      })
      .catch(() => {
        toast.error("Error sending message.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="transition-all duration-300 hover:translate-x-1">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Your name" 
                  {...field} 
                  className="transition-all duration-300 focus:border-primary"
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
            <FormItem className="transition-all duration-300 hover:translate-x-1">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Your email" 
                  type="email" 
                  {...field} 
                  className="transition-all duration-300 focus:border-primary"
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
            <FormItem className="transition-all duration-300 hover:translate-x-1">
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your message"
                  className="min-h-32 transition-all duration-300 focus:border-primary"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className="w-full transition-all duration-300 hover:scale-105" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Form>
  );
}