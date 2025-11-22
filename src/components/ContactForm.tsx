import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalData } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: 'back.out(2)',
      });
    }

    if (formRef.current) {
      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Using FormSubmit.co for email - replace with your email
      const response = await fetch(`https://formsubmit.co/ajax/${personalData.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _subject: `Portfolio Contact: ${formData.subject}`,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });

        // Reset status after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-form-section" id="contact">
      <h2 className="contact-title" ref={titleRef}>
        LET'S BUILD
      </h2>
      <p className="contact-subtitle">
        Ready to create something extraordinary? Let's push boundaries together.
      </p>

      <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
            />
            <span className="form-line"></span>
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
            <span className="form-line"></span>
          </div>
        </div>

        <div className="form-group">
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="form-input"
          />
          <span className="form-line"></span>
        </div>

        <div className="form-group">
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="form-input form-textarea"
            rows={5}
          />
          <span className="form-line"></span>
        </div>

        <button
          type="submit"
          className={`form-submit ${isSubmitting ? 'submitting' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="submit-loader"></span>
          ) : (
            'Send Message'
          )}
        </button>

        {submitStatus === 'success' && (
          <div className="form-status success">
            Message sent successfully! I'll get back to you soon.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="form-status error">
            Oops! Something went wrong. Please try again or email me directly.
          </div>
        )}
      </form>

      <div className="contact-links">
        <a
          href={`mailto:${personalData.email}`}
          className="contact-link-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Email
        </a>
        <a
          href={personalData.socialLinks.linkedin}
          className="contact-link-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          href={personalData.socialLinks.github}
          className="contact-link-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          href="/resume.pdf"
          className="contact-link-btn resume-btn"
          download="Deepanshu_Sharma_Resume.pdf"
        >
          Download Resume
        </a>
      </div>
    </section>
  );
};

export default ContactForm;
