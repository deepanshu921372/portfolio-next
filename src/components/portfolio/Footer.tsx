'use client';

import type { PersonalData } from '@/types/portfolio';

interface FooterProps {
  personalData: PersonalData;
}

const Footer = ({ personalData }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer-text">
        © {currentYear} <span>{personalData.name}</span>.
      </p>
    </footer>
  );
};

export default Footer;
