"use client";
import { useEffect, useState } from "react";

const useBgHook = (stgname: string) => {
	const [bg, setBg] = useState<boolean>(false);

	useEffect(() => {
		if (window) {
			const storedValue = !!window.sessionStorage.getItem("navbg");
			setBg(storedValue);
		}
	}, []);

	useEffect(() => {
		if (window) {
			const storageHandler = () => {
				const storedValue = !!sessionStorage.getItem(stgname);
				if (bg !== storedValue) {
					setBg(storedValue);
				}
			};

			window.addEventListener("scroll", storageHandler);

			return () => {
				window.removeEventListener("scroll", storageHandler);
			};
		}
		return;
	}, [bg, stgname]);

	return bg;
};

export default useBgHook;
