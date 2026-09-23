import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex min-h-screen w-full flex-col justify-center bg-blue-800 px-[8vw] py-[15vh] opacity-0 animate-load-in">
      <h1 className="text-[12rem] max-xl:text-[10rem] max-lg:text-[7rem] max-md:text-[10rem] max-sm:text-[6rem] font-bold uppercase text-white leading-none mb-8">
        404
      </h1>
      <p className="text-2xl max-lg:text-xl max-md:text-lg font-bold text-white w-[90%] max-md:w-full mb-12">
        This page doesn&apos;t exist. It may have moved, or the link is broken.
      </p>
      <Link
        href="/"
        className="w-fit text-2xl max-lg:text-xl max-md:text-lg font-bold uppercase text-blue-400 underline hover:text-red-800 transition-colors duration-100 ease-in-out"
      >
        Back to my work
      </Link>
    </main>
  );
};

export default NotFound;
