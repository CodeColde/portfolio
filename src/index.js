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
import NotFound from "./pages/404";
import checkAvailableRoutes from "./utils/availableRoutes";
import Blog from "./pages/Blog";
import blogMeta from "./pages/blog/meta";
import caseMeta from "./pages/cases/meta";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [loading]);

  const isAvailableRoute = checkAvailableRoutes();
  return (
    <div className="App">
      <Router>
        {isAvailableRoute && <NavigationMenu firstTime={loading} />}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/work" component={Work} />
          {caseMeta.map(el => (
            <Route
              exact
              key={el.link}
              path={`/work${el.link}`}
              component={el.component}
            />
          ))}
          <Route exact path="/blog" component={Blog} />
          {blogMeta.map(el => (
            <Route
              exact
              key={el.link}
              path={`/blog${el.link}`}
              component={el.component}
            />
          ))
          }
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

//https://medium.com/@ItsMeDannyZ/how-to-build-a-progress-bar-with-react-8c5e79731d1f
