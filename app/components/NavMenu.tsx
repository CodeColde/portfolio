"use client";
import { useCallback, useEffect, useState } from "react";
import storeNavBg, { stgname } from "../utils/storeNavBg";
import useBgHook from "../utils/useBgHook";
import { } from "./Icons";
import NavButton from "./NavButton";
import { sendGAEvent } from "@next/third-parties/google";
import {
	bodyCloseStyle,
	bodyOpenStyle,
	bodyStyle,
	closeWrapperAnimateStyle,
	navContainerCloseStyle,
	navContainerOpenStyle,
	navContainerStyle,
	navWrapperStyle,
	openWrapperAnimateStyle,
	closeWrapperNoAnimateStyle,
	settledNavStyle,
	unsettledNavStyle,
} from "../styles/NavMenu.styles";
import NavPageItem from "./NavPageItem";
import pageIndex from "../constants/pageIndex";
import type { PageKeys } from "../constants/pageIndex";
import { usePathname } from "next/navigation";
import SocialContainer from "./SocialContainer";
import ContactContainer from "./ContactContainer";

const NavMenu = () => {
	const [isOpen, toggleOpen] = useState(false);
	const [hasSettled, setHasSettled] = useState(true);
	const [isFadingOut, setIsFadingOut] = useState(false);
	const [shouldAnimate, setShouldAnimate] = useState(false);

	const pathName = usePathname();
	const bg = useBgHook(stgname);

	const toggleNavigation = () => {
		sendGAEvent("event", "navigationMenuToggled", {})
		setShouldAnimate(true);
		toggleOpen(prev => {
			const closing = prev;
			if (closing) {
				setHasSettled(false);
				setTimeout(() => setHasSettled(true), 600);
			}
			return !prev;
		});
	};

	const holdNavOpen = useCallback(() => {
		setShouldAnimate(false);
	}, []);

	useEffect(() => {
		if (!isOpen) {
			setIsFadingOut(true);
			const timeout = setTimeout(() => {
				setIsFadingOut(false);
			}, 300);
			return () => clearTimeout(timeout);
		}
	}, [isOpen])

	useEffect(() => {
		toggleOpen(false);
		setShouldAnimate(false);
		storeNavBg(false);

		void pathName;
	}, [pathName])

	const pages = Object.keys(pageIndex) as PageKeys[];
	return (
		<nav
			className={`${navWrapperStyle} ${isOpen
				? openWrapperAnimateStyle
				: !shouldAnimate
				? closeWrapperNoAnimateStyle
				: closeWrapperAnimateStyle} ${hasSettled ? settledNavStyle : unsettledNavStyle}`}
			aria-label="Primary"
		>
			<button
				type="button"
				tabIndex={0}
				aria-expanded={isOpen}
				aria-controls="primary-nav"
				onClick={toggleNavigation}
				className={`${navContainerStyle} ${
					isOpen
						? shouldAnimate
							? `${navContainerOpenStyle} ${bg ? "bg-black" : "bg-transparent"}`
							: `${navContainerCloseStyle} bg-transparent`
						: navContainerCloseStyle
				}`}
				style={{
					transition: `background-color ${isOpen ? "0.4s" : "0.1s"} ease-in-out, border-radius ${isOpen ? "0.9s" : "0.1s"} ease-in-out`,
				}}
			>
				<NavButton open={isOpen} />
				<span className="sr-only">
					{isOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
				</span>
			</button>
			<div className={`${bodyStyle} ${isOpen ? bodyOpenStyle : isFadingOut && shouldAnimate ? bodyCloseStyle : "hidden"}`}>
				{pages.map((pageName) => {
					return (
						<NavPageItem
							key={pageName}
							holdNavOpen={holdNavOpen}
							page={pageName}
							isOpen={isOpen}
						/>
					)
				})}
			</div>
			<ContactContainer isOpen={isOpen} />
			<SocialContainer isOpen={isOpen} />
		</nav>
	);
};

export default NavMenu;