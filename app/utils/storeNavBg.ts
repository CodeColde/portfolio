export const stgname = "navbg";

const storeNavBg = (state: boolean) => {
	return state
		? sessionStorage.setItem("navbg", "true")
		: sessionStorage.removeItem("navbg");
};

export default storeNavBg;
