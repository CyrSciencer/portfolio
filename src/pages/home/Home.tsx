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
          <div className="upper-row">
            <div className="exercices">
              <h2>Exercices fait durant la formation "le reacteur"</h2>
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
            <div className="about-me">
              <div className="about-me-header">
                <h3>À propos</h3>
                <img src={profile} alt="profile" />
              </div>
              <div className="about-content">
                <p>
                  Cyr ROUYRRE, 24 ans.
                  <br /> Développeur fullstack, formé par "le reacteur" à paris au printemps 2025.
                  <br />
                  Passionné par le développement d'applications en tout genre (web, mobile,
                  desktop,...).
                  <br />
                  Elabore en parallele pour son plaisir un jeu video comprenant:
                  <ul>
                    <li>Personnages 3d</li>
                    <li>Environnement 3d</li>
                    <li>Animations</li>
                    <li>Logiques de jeu type: rpg, rogueLike, metroidania, et d'autres ...</li>
                  </ul>
                </p>
                <h2>Compétences:</h2>
                <div className="tech-stack">
                  <div className="tech-category">
                    <h4>Langages </h4>
                    <div className="tech-tags">
                      <a href="https://developer.mozilla.org/fr/docs/Web/HTML">
                        <span className="tech-tag">HTML</span>
                      </a>
                      <a href="https://developer.mozilla.org/fr/docs/Web/CSS">
                        <span className="tech-tag">CSS</span>
                      </a>
                      <a href="https://developer.mozilla.org/fr/docs/Web/JavaScript">
                        <span className="tech-tag">JavaScript</span>
                      </a>
                      <a href="https://www.typescriptlang.org/">
                        <span className="tech-tag">TypeScript</span>
                      </a>
                      <a href="https://dotnet.microsoft.com/fr-fr/languages/csharp">
                        <span className="tech-tag">C# (en cours)</span>
                      </a>
                    </div>
                  </div>
                  <div className="tech-category">
                    <h4>Frameworks</h4>
                    <div className="tech-tags">
                      <a href="https://www.w3schools.com/react">
                        <span className="tech-tag">React</span>
                      </a>
                      <a href="https://nextjs.org/">
                        <span className="tech-tag">Next.js</span>
                      </a>
                      <a href="https://reactnative.dev/">
                        <span className="tech-tag">React Native</span>
                      </a>
                      <a href="https://redux.js.org/">
                        <span className="tech-tag">Redux</span>
                      </a>
                    </div>
                  </div>
                  <div className="tech-category">
                    <h4>Outils & Bases de données</h4>
                    <div className="tech-tags">
                      <a href="https://nodejs.org/en">
                        <span className="tech-tag">Node.js</span>
                      </a>

                      <a href="https://www.mongodb.com/">
                        <span className="tech-tag">MongoDB</span>
                      </a>
                      <a href="https://jestjs.io/">
                        <span className="tech-tag">Jest</span>
                      </a>
                      <a href="https://expo.dev/">
                        <span className="tech-tag">Expo</span>
                      </a>
                      <a href="https://godotengine.org/">
                        <span className="tech-tag">Godot (C#)</span>
                      </a>
                    </div>
                  </div>
                  <div className="tech-category">
                    <h4>Langues</h4>
                    <div className="tech-tags">
                      <a href="https://fr.wikipedia.org/wiki/Fran%C3%A7ais">
                        <span className="tech-tag">Français</span>
                      </a>
                      <a href="https://en.wikipedia.org/wiki/English_language">
                        <span className="tech-tag">Anglais</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lower-row">
            <div className="projet-perso">
              <h2>Projets perso</h2>
              <div className="projet-perso-container">
                <PortfolioCard
                  title="Alchimie des couleurs"
                  description="un site qui permet d'expérimenter et composer avec les couleurs, à utiliser pour des projets ou par simple curiosité."
                  link="https://alchimie-des-couleurs.com"
                  logo={alchimieDesCouleursLogo}
                  logoSize={50}
                />
              </div>
            </div>
          </div>{' '}
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
