interface Props {
  children: React.ReactNode;
}

const Subheader = ({ children }: Props) => {
  return (
    <h2 className={styles}>
      {children}
    </h2>
  )
}

export default Subheader;

const styles = `
  text-white
  mb-[40px]
  pb-[12px]
  border-b-1
  text-5xl
  uppercase
  font-bold
`;