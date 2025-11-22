import { useRef, useState } from 'react';
import gsap from 'gsap';

interface ProjectImageProps {
  src: string;
  alt: string;
  emoji: string;
}

const ProjectImage = ({ src, alt, emoji }: ProjectImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const container = containerRef.current;
    const image = imageRef.current;
    const glare = glareRef.current;

    if (!container || !image) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    gsap.to(container, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      duration: 0.3,
      ease: 'power2.out',
    });

    gsap.to(image, {
      scale: 1.1,
      duration: 0.3,
    });

    if (glare) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3) 0%, transparent 50%)`;
      glare.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    const container = containerRef.current;
    const image = imageRef.current;
    const glare = glareRef.current;

    gsap.to(container, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    });

    if (image) {
      gsap.to(image, {
        scale: 1,
        duration: 0.5,
      });
    }

    if (glare) {
      glare.style.opacity = '0';
    }
  };

  return (
    <div
      className="project-image-container"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {!imageError ? (
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          className="project-image"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="project-image-fallback">
          <span className="fallback-emoji">{emoji}</span>
        </div>
      )}
      <div className="project-image-glare" ref={glareRef}></div>
      <div className="project-image-border"></div>
    </div>
  );
};

export default ProjectImage;
