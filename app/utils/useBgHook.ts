"use client";
import { useEffect, useState } from "react";

const hasStorage = () =>
	typeof window !== "undefined" &&
	typeof window.sessionStorage?.getItem === "function";

const useBgHook = (stgname: string) => {
	const [bg, setBg] = useState<boolean>(false);

	useEffect(() => {
		if (hasStorage()) {
			const storedValue = !!window.sessionStorage.getItem("navbg");
			setBg(storedValue);
		}
	}, []);

	useEffect(() => {
		if (!hasStorage()) {
			return;
		}
		const storageHandler = () => {
			const storedValue = !!window.sessionStorage.getItem(stgname);
			if (bg !== storedValue) {
				setBg(storedValue);
			}
		};

		window.addEventListener("scroll", storageHandler);
		return () => {
			window.removeEventListener("scroll", storageHandler);
		};
	}, [bg, stgname]);

	return bg;
};

export default useBgHook;
