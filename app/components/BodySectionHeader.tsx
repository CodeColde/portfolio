const BodySectionHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <h2 className="text-3xl max-sm:text-2xl font-bold mt-16 max-sm:mt-12 mb-12 max-sm:mb-8">{children}</h2>
  );
}

export default BodySectionHeader;