import { FC } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header: FC = () => {
  return (
    <div className="header-div">
      <Link to="/">
        <h1>Portfolio de Cyr ROUYRRE</h1>
      </Link>
    </div>
  );
};

export default Header; 