import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/work" element={<Work />} />
          {caseMeta.map(el => {
            const CaseComponent = el.component;
            return (
              <Route
                exact
                key={el.link}
                path={`/work${el.link}`}
                element={<CaseComponent />}
              />
            );
          })}
          <Route exact path="/blog" element={<Blog />} />
          {blogMeta.map(el => {
            const BlogEntryComponent = el.component;
            return (
              <Route
                exact
                key={el.link}
                path={`/blog${el.link}`}
                element={<BlogEntryComponent />}
              />
            )
          })}
          <Route element={NotFound} />
        </Routes>
      </Router>
    </div>
  );
};

const rootElement = document.getElementById("root");
createRoot(rootElement).render(<App />);

//https://medium.com/@ItsMeDannyZ/how-to-build-a-progress-bar-with-react-8c5e79731d1f
