
const checkAvailableRoutes = () => {
  const availablePathes = [
    "/",
    "/about",
    "/work",
    "/blog",
    "/shuttershare",
    "/adscope",
    "/tiptopmusic",
    "/schoolforjustice",
    "/ziggodamtotdamloop"
  ];
  return !!availablePathes.find(x => x.indexOf(window.location.pathname) >= 0);
}

export default checkAvailableRoutes;