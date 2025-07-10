interface Props {
  children: React.ReactNode;
}

const ExperienceHeader = ({ children }: Props) => {
  return (
    <h3 className={styles}>
      {children}
    </h3>
  )
}

export default ExperienceHeader;

const styles = `
  text-white
  pb-0
  text-4xl
  font-bold
  max-lg:text-3xl
  max-md:text-4xl
  max-sm:text-3xl
  max-xs:text-2xl
`;