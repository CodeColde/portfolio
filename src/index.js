import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import Preloader from "./pages/Preloader";
import Home from "./pages/Home";
import About from "./pages/About";
import Work from "./pages/Work";

import "./styles/root.css";
import "./styles/media.css";
import NavigationMenu from "./pages/Nav";
import ShutterShare from "./pages/cases/ShutterShare";
import Adscope from "./pages/cases/Adscope";
import TiptopMusic from "./pages/cases/TiptopMusic";
import SchoolForJustice from "./pages/cases/SchoolForJustice";
import ZiggoDamTotDamLoop from "./pages/cases/ZiggoDamTotDamLoop";
import NotFound from "./pages/404";
import checkAvailableRoutes from "./utils/availableRoutes";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [navBackground, setNavBack] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [loading]);

  const isAvailableRoute = checkAvailableRoutes();

  return (
    <div className="App">
      <Router>
        {isAvailableRoute && <NavigationMenu
          firstTime={loading}
          hasBackground={navBackground}
          setBackground={state => setNavBack(state)}
        />}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/work" component={Work} />
          <Route
            exact
            path="/shuttershare"
            component={() => <ShutterShare setNavBackground={state => setNavBack(state)} />}
          />
          <Route
            exact
            path="/adscope"
            component={() => <Adscope setNavBackground={state => setNavBack(state)} />}
          />
          <Route
            exact
            path="/tiptopmusic"
            component={() => <TiptopMusic setNavBackground={state => setNavBack(state)} />}
          />
          <Route
            exact
            path="/schoolforjustice"
            component={() => <SchoolForJustice setNavBackground={state => setNavBack(state)} />}
          />
          <Route
            exact
            path="/ziggodamtotdamloop"
            component={() => <ZiggoDamTotDamLoop setNavBackground={state => setNavBack(state)} />}
          /> */}
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

//https://medium.com/@ItsMeDannyZ/how-to-build-a-progress-bar-with-react-8c5e79731d1f
