import workMeta from "../pages/cases/meta";
import blogMeta from "../pages/blog/meta";

const checkAvailableRoutes = () => {
  const cases = workMeta.map(el => `/work${el.link}`);
  const posts = blogMeta.map(el => `/blog${el.link}`);
  const availablePathes = [
    "/",
    "/about",
    "/work",
    "/blog",
    ...cases,
    ...posts,
  ];
  return !!availablePathes.find(x => x.indexOf(window.location.pathname) >= 0);
}

export default checkAvailableRoutes;