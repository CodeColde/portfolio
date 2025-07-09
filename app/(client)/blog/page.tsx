const page = () => {
	return (
		<main className="flex relative w-full h-screen bg-yellow-800 pt-[24vh] pl-[4vw]">
			<article className="relative float-left w-1/2 h-full overflow-hidden px-8 opacity-0 animate-load-in">
				<h1 className="text-[16rem] max-xl:text-[12rem] max-lg:text-[9rem] max-md:text-[10rem] max-sm:text-[6rem] font-bold uppercase text-white leading-none">
					Blog
				</h1>
				<h2 className="text-[7rem] max-xl:text-[12rem] max-lg:text-[9rem] max-md:text-[10rem] max-sm:text-[6rem] font-bold uppercase text-white leading-none">
					Coming Soon...
				</h2>
			</article>
		</main>
	);
};

export default page;
