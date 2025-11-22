import { useRef, type ReactNode } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
}

const MagneticButton = ({
  children,
  className = '',
  onClick,
  href,
  target,
  rel,
}: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out',
    });

    // Inner content moves more
    const inner = button.querySelector('.magnetic-inner');
    if (inner) {
      gsap.to(inner, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    const button = buttonRef.current;
    if (!button) return;

    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });

    const inner = button.querySelector('.magnetic-inner');
    if (inner) {
      gsap.to(inner, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    }
  };

  const props = {
    className: `magnetic-button ${className}`,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick,
  };

  if (href) {
    return (
      <a
        {...props}
        href={href}
        target={target}
        rel={rel}
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
      >
        <span className="magnetic-inner">{children}</span>
      </a>
    );
  }

  return (
    <button {...props} ref={buttonRef as React.RefObject<HTMLButtonElement>}>
      <span className="magnetic-inner">{children}</span>
    </button>
  );
};

export default MagneticButton;
