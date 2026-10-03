interface Props {
  href: string;
}

const ProjectLink = ({ href }: Props) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="border-2 max-sm:border border-white px-6 py-3 max-md:px-5 max-md:py-2 font-bold rounded-4xl text-md max-md:text-sm max-sm:text-xs uppercase mt-8 inline-block hover:bg-red-800 hover:text-white hover:border-red-800 transition-[background,color,border,transform] duration-(--motion-fast) ease-in-out"
    >
      Go to project
    </a>
  );
};

export default ProjectLink;
