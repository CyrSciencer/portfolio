import { FC } from 'react';
import { Link } from 'react-router-dom';
import githubLogo from '../../assets/github_logo.svg';
import linkedinLogo from '../../assets/linkedin_black_logo.svg';
import './Header.css';
import { useColor, palettes } from '../../context/ColorContext';

// Fonction pour calculer la luminosité d'une couleur
const getLuminance = (hex: string) => {
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  // Formule de luminosité relative
  return (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
};

const Header: FC<{ pageLink: string }> = ({ pageLink }) => {
  const { activePalette, updatePalette } = useColor();

  return (
    <div className="header-div">
      <h1>CR Portfolio</h1>

      <div className="header-right">
        <Link to={`/${pageLink}`} className="contact-link">
          {pageLink}
        </Link>
        <div className="social-links">
          <div className="palette-selector">
            {palettes.map((palette, index) => (
              <div
                key={index}
                className={`palette-option ${index === activePalette ? 'active' : ''}`}
                onClick={() => updatePalette(index)}
              >
                <div className="palette-colors">
                  {palette.colors.map((color, colorIndex) => (
                    <span key={colorIndex} style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <a
            href="https://github.com/CyrSciencer"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <img src={githubLogo} alt="github" />
          </a>
          <a
            href="https://www.linkedin.com/in/cyr-rouyrre-a55b0535a/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <img src={linkedinLogo} alt="linkedin" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
