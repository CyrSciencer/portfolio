import { FC, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import './App.css';
//imports internes
import Home from './pages/home/Home';
import Header from './components/header/Header';
import Contact from './pages/contact/Contact';
import Enter from './pages/Enter';
import { ColorProvider } from './context/ColorContext';

const App: FC = () => {
  const [pageLink, setPageLink] = useState('home');
  return (
    <ColorProvider>
      <Router>
        <header>
          <Header pageLink={pageLink} />
        </header>

        <Routes>
          <Route path="/" element={<Enter />} />
          <Route path="/home" element={<Home setPageLink={setPageLink} />} />
          <Route path="/contact" element={<Contact setPageLink={setPageLink} />} />
        </Routes>
      </Router>
    </ColorProvider>
  );
};

export default App;
