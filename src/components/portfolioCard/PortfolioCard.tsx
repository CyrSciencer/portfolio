import { FC, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './PortfolioCard.css';

interface PortfolioCardProps {
  title: string;
  description: string;
  link: string;

  descriptionList?: string[];
  backgroundColor?: string;
  logo: string;
  logoSize?: number;
}

const PortfolioCard: FC<PortfolioCardProps> = ({
  title,
  description,
  link,
  descriptionList,
  logo,
  logoSize = 32,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const logoRef = useRef<HTMLImageElement>(null);
  const timeoutRef = useRef<number>();

  const linkClick = (url: string) => {
    window.open(url);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  const triggerVibration = () => {
    if (logoRef.current) {
      logoRef.current.style.animation = 'none';
      logoRef.current.offsetHeight; // Force reflow
      logoRef.current.style.animation = 'randomVibrate 0.5s ease-in-out';
    }
  };

  useEffect(() => {
    const scheduleNextVibration = () => {
      const randomDelay = Math.random() * 3000 + 2000; // Entre 2 et 5 secondes
      timeoutRef.current = window.setTimeout(() => {
        triggerVibration();
        scheduleNextVibration();
      }, randomDelay);
    };

    scheduleNextVibration();

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="card-logo-container" onClick={handleClick}>
        <img
          ref={logoRef}
          src={logo}
          alt="logo"
          style={{ width: logoSize, height: logoSize }}
          className="card-logo"
        />
        <div className="title-container">
          <h3 className="card-title">{title}</h3>
        </div>
      </div>

      {isOpen &&
        createPortal(
          <div className="popup-overlay" onClick={handleClose}>
            <div className="popup-content" onClick={e => e.stopPropagation()}>
              <div className="popup-header">
                <img
                  src={logo}
                  alt="logo"
                  style={{ width: logoSize * 1.5, height: logoSize * 1.5 }}
                  className="popup-logo"
                />
                <h2 className="popup-title">{title}</h2>
                <button className="popup-close" onClick={handleClose}>
                  ×
                </button>
              </div>
              <div className="popup-body">
                <p>{description}</p>
                {descriptionList && (
                  <div className="popup-list">
                    <ul>
                      {descriptionList.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="popup-footer">
                <button className="popup-button" onClick={() => linkClick(link)}>
                  Voir le projet ➠
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default PortfolioCard;
