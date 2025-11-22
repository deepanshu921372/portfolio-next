import { personalData } from '../data/portfolio';

const Footer = () => {
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
