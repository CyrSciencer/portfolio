//imports externes
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
//imports internes
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Contact from "./pages/contact/Contact";
function App() {
  return (
    <>
      <Router>
        <header>
          <Header />
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
