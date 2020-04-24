import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

// import Preloader from "./pages/Preloader";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Work from "./pages/Work";

import "./styles/root.css";
import "./styles/media.css";
import NavigationMenu from "./pages/Nav";
import ShutterShare from "./pages/cases/ShutterShare";
import Adscope from "./pages/cases/Adscope";
import TiptopMusic from "./pages/cases/TiptopMusic";
import SchoolForJustice from "./pages/cases/SchoolForJustice";
import ZiggoDamTotDamLoop from "./pages/cases/ZiggoDamTotDamLoop";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [navBackground, setNavBack] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [loading]);

  return (
    <Router>
      <div className="App">
        <NavigationMenu
          firstTime={loading}
          hasBackground={navBackground}
          setBackground={state => setNavBack(state)}
        />
        <Route path="/" exact component={Home} />
        <Route path="/contact" component={Contact} />
        <Route path="/about" component={About} />
        <Route path="/work" component={Work} />
        <Route
          path="/shuttershare"
          component={() => (
            <ShutterShare setNavBackground={state => setNavBack(state)} />
          )}
        />
        <Route
          path="/adscope"
          component={() => (
            <Adscope setNavBackground={state => setNavBack(state)} />
          )}
        />
        <Route
          path="/tiptopmusic"
          component={() => (
            <TiptopMusic setNavBackground={state => setNavBack(state)} />
          )}
        />
        <Route
          path="/schoolforjustice"
          component={() => (
            <SchoolForJustice setNavBackground={state => setNavBack(state)} />
          )}
        />
        <Route
          path="/ziggodamtotdamloop"
          component={() => (
            <ZiggoDamTotDamLoop setNavBackground={state => setNavBack(state)} />
          )}
        />
      </div>
    </Router>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

//https://medium.com/@ItsMeDannyZ/how-to-build-a-progress-bar-with-react-8c5e79731d1f
