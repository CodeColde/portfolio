export const stgname = "navbg";

export default (state) => {
  state ? sessionStorage.setItem(stgname, "true") : sessionStorage.removeItem(stgname);
}

