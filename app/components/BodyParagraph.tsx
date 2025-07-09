const BodyParagraph = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="text-xl leading-7 mb-6">
      {children}
    </p>
  );
}

export default BodyParagraph;