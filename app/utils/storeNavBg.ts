export const stgname = "navbg";

const hasStorage = () =>
	typeof window !== "undefined" &&
	typeof window.sessionStorage?.getItem === "function";

const storeNavBg = (state: boolean) => {
	if (!hasStorage()) {
		return;
	}
	if (state) {
		window.sessionStorage.setItem("navbg", "true");
	} else {
		window.sessionStorage.removeItem("navbg");
	}
};

export default storeNavBg;
