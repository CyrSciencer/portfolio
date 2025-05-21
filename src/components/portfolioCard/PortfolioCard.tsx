import { FC, useState } from "react";
import "./PortfolioCard.css";

interface PortfolioCardProps {
  title: string;
  description: string;
  link: string;

  descriptionList?: string[];
  backgroundColor?: string;
}

const PortfolioCard: FC<PortfolioCardProps> = ({
  title,
  description,
  link,
  descriptionList,
  backgroundColor,
}) => {
  const linkClick = (url: string) => {
    window.open(url);
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="card" onClick={() => setIsOpen(!isOpen)} style={{ "--UniqueColor": backgroundColor } as React.CSSProperties}>
        <h3 className="card-title">{title}</h3>
      {isOpen && (
        <>
        <button className="card-button" onClick={() => linkClick(link)}>➠</button>
        <p>{description}</p>
        {descriptionList && (
            <div className="card-list"><ul>
            {descriptionList.map((item, index) => <li key={index}>{item}</li>)}
          </ul></div>
          
        )}
        </>
      )}
    </div>
  );
};

export default PortfolioCard; 