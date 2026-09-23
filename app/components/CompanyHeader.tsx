interface Props {
  children: React.ReactNode;
  href?: string;
}

const CompanyHeader = ({ children, href }: Props) => {
  return (
    <h4 className={styles}>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={linkStyles}>
          {children}
        </a>
      ) : (
        children
      )}
    </h4>
  );
};

export default CompanyHeader;

const styles = `
  mt-[2px]
  text-white
  text-sm
  uppercase
  italic
  max-md:font-light
`;

const linkStyles = `
  underline
  underline-offset-4
  decoration-1
  decoration-white/50
  hover:text-red-800
  hover:decoration-red-800
  focus-visible:text-red-800
  transition-colors
  duration-300
  ease-in-out
`;
