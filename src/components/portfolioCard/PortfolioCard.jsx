import Door from "../../components/door/Door";
import Particules from "../../components/particules/Particules";
import "./PortfolioCard.css";
const PortfolioCard = ({
  title,
  description,
  link,
  particulesColor,
  modelColor,
  descriptionList,
  backgroundColor,
}) => {
  const linkClick = (url) => {
    window.open(url);
  };
  return (
    <div className="card" style={{ backgroundColor: backgroundColor }}>
      <div className="doorContainer">
        <Particules colorParticule={particulesColor} />
        <Door modelColor={modelColor} onPressing={() => linkClick(link)} />
        <p className="card-title">{title}</p>
      </div>
      <p>{description}</p>
      <ul>
        {descriptionList &&
          descriptionList.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    </div>
  );
};

export default PortfolioCard;
