interface Props {
	open: boolean;
}

const NavButton = ({ open }: Props) => {
	return (
		<div
			className={`${circleStyle} ${open ? openCircleStyle : closeCircleStyle}`}
		>
			<div
				className={`${barStyle} w-full ${open ? `${openBarStyle}` : closeBarStyle}`}
			/>
			<div
				className={`${barStyle} ${open ? "opacity-0 w-0" : closeBarStyle + " w-[69%]"}`}
			/>
			<div
				className={`${barStyle}  ${open ? `${openBarStyle}` : closeBarStyle + " w-[34%]"}`}
			/>
		</div>
	);
};

export default NavButton;

const circleStyle = `
  w-full
  h-full
  absolute
  flex
  flex-col
  items-end
  top-1/2
  left-1/2
  -translate-x-1/2
  -translate-y-1/2
  transition-(--transition-nav-cirle)
  hover:[&>div]:w-full
`;
const openCircleStyle = `
  py-[6px] px-[9px]
  justify-normal
  [&>div:first-child]:rotate-45
  [&>div:first-child]:mb-[-3px]
  [&>div:nth-child(2)]:opacity-0
  [&>div:nth-child(3)]:-rotate-45
  [&>div:nth-child(3)]:mt-[-3px]
`;
const closeCircleStyle = "py-[9px] px-[12px]";
const barStyle = `
  z-2
  h-[3px]
  bg-white
  transition-(--transition-nav-strip)
  float-right
  rounded-[2px]
`;
const openBarStyle = `
  relative
  my-[0px]
  w-full
  top-1/2
  left-1/2
  -translate-y-1/2
  -translate-x-1/2
`;
const closeBarStyle = `
  relative
  my-[4px]
  opacity-100
  top-0
  left-0
  first:mt-[6px]
  last:mb-[6px]
`;
