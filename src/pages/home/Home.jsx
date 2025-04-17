import { Link } from "react-router";
import Door from "../../components/door/Door";
import { useNavigate } from "react-router-dom";
import Particules from "../../components/particules/Particules";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();
  const contactDoor = () => {
    navigate("/contact");
  };

  return (
    <>
      <main>
        <h1>Home</h1>
        <div className="doorContainer">
          <Particules colorParticule="#008080" />
          <Door modelColor="#40826d" />
          <p>Projects</p>
        </div>
      </main>
      <footer>
        <div className="doorContainer">
          <Particules colorParticule="#008080" />
          <Door modelColor="#40826d" onPressing={contactDoor} />
          <p>Contact</p>
        </div>
      </footer>
    </>
  );
};

export default Home;
