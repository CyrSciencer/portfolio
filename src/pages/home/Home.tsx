import { FC } from "react";
import { useNavigate } from "react-router-dom";
import PortfolioCard from "../../components/portfolioCard/PortfolioCard";
import "./home.css";

const Home: FC = () => {
  const navigate = useNavigate();
  const contactDoor = () => {
    navigate("/contact");
  };

  return (
    <>
      <main>
        <div className="projectsContainer">
          <div className="exercices">
            <h2>
              Exercices fait durant la formation
              <span style={{ color: "#5C47D3" }}> "le reacteur."</span>
            </h2>
            <div className="exercice-container">
              <PortfolioCard
                title="deliveroo-like"
                description="Exercice de reproduction d'une page web restaurant sur deliveroo, contenant:"
                link="https://delivre00.netlify.app"
                descriptionList={[
                  "La description du restaurant.",
                  "Une liste de repas et leurs prix.",
                  "Un panier de commande interactif.",
                ]}
                backgroundColor="rgba(44, 177, 186, 0.7)"
              />    
              <PortfolioCard
                title="vinted-like"
                description="Exercice de reproduction du site vinted, contenant:"
                link="https://vintedlike.netlify.app"
                descriptionList={[
                  "Une page d'accueil, avec des offres de vente.",
                  "Une page d'inscription.",
                  "Une page de connexion.",
                  "Une page pour vendre un article.",
                  "Une page personnalisée pour chaque article.",
                  "Une page de de transaction bancaire via link.",
                ]}
                backgroundColor="rgb(96,192,183,0.7)"
              />
              <PortfolioCard
                title="marvel-archive"
                description="Exercice de creation d'un wiki Marvel, contenant:"
                link="https://marvel-archive.netlify.app"
                descriptionList={[
                  "Une page d'accueil, avec avec des lien vers les personnages ou les comics.",
                  "Une page avec la liste des personnages sur plusieurs pages.",
                  "Une page avec la liste des comics sur plusieurs pages.",
                  "Une page personnalisée pour chaque comics.",
                  "Une page personnalisée pour chaque personnage avec un lien vers une page contenant les comics dans lesquels le personnage apparait.",
                  "Une page d'inscription et de connexion.",
                  "Une possibilité pour les utilisateurs connectés de mettre en favoris les personnages et les comics.",
                  "Une page contenant les favoris, disponible uniquement pour les utilisateurs connectés.",
                ]}
                backgroundColor="rgb(237,29,36,0.7)"
              />
            </div>
          </div>
          <div className="projet-perso">
            <h2>Projets perso</h2>
            <div className="projet-perso-container">
              <PortfolioCard
                title="Alchimie des couleurs"
                description="un site qui permet d'expérimenter et composer avec les couleurs, à utiliser pour des projets ou par simple curiosité."
                link="https://alchimie-des-couleurs.com"
                backgroundColor="rgb(200,29,100,0.7)"
              />
            </div>
          </div>
          <div className="réseaux">
            <h2>Réseaux</h2>
            <div className="réseaux-container">
              <PortfolioCard
                title="Github"
                description="Mon github"
                link="https://github.com/CyrSciencer"
                backgroundColor="rgb(125, 125, 125,0.7)"
              />
              <PortfolioCard
                title="Linkedin"
                description="Mon linkedin"
                link="https://www.linkedin.com/in/cyr-rouyrre-a55b0535a/"
                backgroundColor="rgb(10, 102, 194,0.7)"
              />
            </div>
          </div>
        </div>
      </main>
      <footer>
        <div className="contactContainer">
          <p onClick={contactDoor}>Contact</p>
        </div>
      </footer>
    </>
  );
};

export default Home; 