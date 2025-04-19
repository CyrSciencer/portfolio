import { Link } from "react-router";
import "./Header.css";

const Header = () => {
  return (
    <div className="header-div">
      <Link to="/">
        <h1>Portfolio de Cyr ROUYRRE</h1>
      </Link>
    </div>
  );
};

export default Header;
