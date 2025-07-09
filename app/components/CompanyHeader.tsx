interface Props {
  children: React.ReactNode;
}

const CompanyHeader = ({ children }: Props) => {
  return (
    <h4 className={styles}>
      {children}
    </h4>
  )
}

export default CompanyHeader;

const styles = `
  mt-[2px]
  text-white
  text-sm
  uppercase
  italic
  max-md:font-light
`;