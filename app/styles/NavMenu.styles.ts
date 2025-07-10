export const navWrapperStyle = `
  z-5
  fixed
  opacity-100
  transition-(--transition-nav-container)
`;
export const openWrapperAnimateStyle = `
  animate-nav-wrapper-open
`;
export const closeWrapperNoAnimateStyle = `
  bg-transparent
  w-[56px]
  h-[56px]
`;

export const settledNavStyle = `
  right-[2%]
  top-[2%]
  w-[56px]
  h-[56px]
`;
export const unsettledNavStyle = `
  right-0
  top-0
  w-full
  h-full
  rounded-none
`;

export const closeWrapperAnimateStyle = `
  bg-black
  animate-nav-wrapper-close
`;

export const navContainerStyle = `
  relative
  left-[2%]
  top-[2%]
  w-[56px]
  h-[56px]
  rounded-[0px]
  hover:cursor-pointer
  hover:bg-black
  hover:rounded-[56px]
`;
export const navContainerOpenStyle = `
  z-5
`;
export const navContainerCloseStyle = `
  z-1
`;

export const bodyStyle = `
  z-2
  opacity-0
  absolute
  top-1/2
  left-1/2
  -translate-x-[50%]
  -translate-y-[50%]
  text-center
  transition-(--transition-nav-body)
  flex
  flex-col
  items-center
  justify-center
`;
export const bodyOpenStyle = `
  block
  animate-nav-body-open
`;
export const bodyCloseStyle = `
  block
  animate-nav-close
`;

export const pageSectionStyle = `
  relative
  text-white
  text-9xl
  my-2
  uppercase
  font-bold
  transition-duration-700
  ease-in-out
  hover:cursor-pointer
  hover:[&>h3]:opacity-100
  hover:[&>h3]:-skew-x-20
  focus-within:[&>h3]:opacity-100
  focus-within:[&>h3]:-skew-x-20
`;

export const nonAnimatingPageHoverStyles = `
  hover:[&>span]:w-[120%]
  hover:[&>span]:z-8
  hover:[&>span]:transition-(--transition-nav-span-hover)
`;

export const linkStyle = `
  block
  opacity-70
  no-underline
	transition-[transform,width]
  transition-duration-500
	ease-in-out
  max-sm:text-7xl
`;
export const spanStyle = `
  w-[0]
  h-[20px]
  absolute
  top-1/2
  left-1/2
  -translate-x-1/2
  -translate-y-1/2
`;
export const activeSpanStyle = `
  z-99
  transition-[width,height]
  duration-400
  ease-in-out
`;

export const openSpanStyle = `
  w-[2000%]
  h-[3000%]
`;

export const contactContainerStyle = `
  absolute
  bottom-[2.2%]
  right-[2%]
  list-none
  opacity-0
  z-1
  text-white
  flex
  flex-row
`;
export const contactContainerOpenStyle = `
  block
  animate-load-contact
`;
export const contactContainerCloseStyle = `
  hidden
`;
export const socialItemStyle = `
  left
  h-[30px]
  w-[30px]
  max-sm:h-[24px]
  max-sm:w-[24px]
  mx-2
  [&:first-child]:p-0 p-right-[10px]
  hover:[&>a]:opacity-100
`;
