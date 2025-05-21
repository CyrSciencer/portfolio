import { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import "./App.css";
//imports internes
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Contact from "./pages/contact/Contact";
import ParticulesBackground from "./components/particules/ParticulesBackground";

const App: FC = () => {
  return (
    <>
      <Router>
        <header>
          <Header />
          <ParticulesBackground />
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </>
  );
}

export default App; 