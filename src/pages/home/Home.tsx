import { FC, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PortfolioCard from '../../components/portfolioCard/PortfolioCard';
import './home.css';
import profile from '../../assets/profile_pic.jpeg';
import deliverooLogo from '../../assets/deliveroo_logo.svg';
import vintedLogo from '../../assets/vinted_logo.png';
import marvelLogo from '../../assets/marvel_logo.svg';
import alchimieDesCouleursLogo from '../../assets/AdC_logo.svg';

const Home: FC<{ setPageLink: (pageLink: string) => void }> = ({ setPageLink }) => {
  const navigate = useNavigate();

  setPageLink('contact');

  return (
    <>
      <main>
        <div className="main-container">
          <div className="exercices">
            <h2>Exercices fait durant la formation "le reacteur."</h2>
            <div className="exercice-container">
              <PortfolioCard
                title="deliveroo-like"
                description="Exercice de reproduction d'une page web restaurant sur deliveroo, contenant:"
                link="https://delivre00.netlify.app"
                descriptionList={[
                  'La description du restaurant.',
                  'Une liste de repas et leurs prix.',
                  'Un panier de commande interactif.',
                ]}
                logo={deliverooLogo}
                logoSize={50}
              />
              <PortfolioCard
                title="vinted-like"
                description="Exercice de reproduction du site vinted, contenant:"
                link="https://vintedlike.netlify.app"
                descriptionList={[
                  "Une page d'accueil, avec des offres de vente.",
                  "Une page d'inscription.",
                  'Une page de connexion.',
                  'Une page pour vendre un article.',
                  'Une page personnalisée pour chaque article.',
                  'Une page de de transaction bancaire via link.',
                ]}
                logo={vintedLogo}
                logoSize={50}
              />
              <PortfolioCard
                title="marvel-archive"
                description="Exercice de creation d'un wiki Marvel, contenant:"
                link="https://marvel-archive.netlify.app"
                descriptionList={[
                  "Une page d'accueil, avec avec des lien vers les personnages ou les comics.",
                  'Une page avec la liste des personnages sur plusieurs pages.',
                  'Une page avec la liste des comics sur plusieurs pages.',
                  'Une page personnalisée pour chaque comics.',
                  'Une page personnalisée pour chaque personnage avec un lien vers une page contenant les comics dans lesquels le personnage apparait.',
                  "Une page d'inscription et de connexion.",
                  'Une possibilité pour les utilisateurs connectés de mettre en favoris les personnages et les comics.',
                  'Une page contenant les favoris, disponible uniquement pour les utilisateurs connectés.',
                ]}
                logo={marvelLogo}
                logoSize={85}
              />
            </div>
          </div>
          <div className="right-column">
            <div className="about-me">
              <div className="about-me-header">
                <h3>À propos</h3>
                <img src={profile} alt="profile" />
              </div>
              <div className="about-content">
                <p>
                  Je me nomme Cyr ROUYRRE, je suis développeur fullstack, passionné par le
                  développement d'applications en tout genre (Web, mobile, desktop,...). Je me suis
                  formé via la formation de l'école "le reacteur".
                </p>
                <div className="tech-stack">
                  <span className="tech-tag">HTML</span>
                  <span className="tech-tag">CSS</span>
                  <span className="tech-tag">JavaScript</span>
                  <span className="tech-tag">React</span>
                  <span className="tech-tag">Node.js</span>
                  <span className="tech-tag">TypeScript</span>
                  <span className="tech-tag">MongoDB</span>
                  <span className="tech-tag">Redux</span>
                  <span className="tech-tag">Jest</span>
                  <span className="tech-tag">Next.js</span>
                  <span className="tech-tag">React Native</span>
                  <span className="tech-tag">Expo</span>
                </div>
              </div>
            </div>
            <div className="projet-perso">
              <h2>Projets perso</h2>
              <div className="projet-perso-container">
                <PortfolioCard
                  title="Alchimie des couleurs"
                  description="un site qui permet d'expérimenter et composer avec les couleurs, à utiliser pour des projets ou par simple curiosité."
                  link="https://alchimie-des-couleurs.com"
                  logo={alchimieDesCouleursLogo}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Cyr ROUYRRE. Tous droits réservés.</p>
        </div>
      </footer>
    </>
  );
};

export default Home;
