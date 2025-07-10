const ContentParagraph = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="text-xl max-sm:text-lg leading-7 mb-6">
      {children}
    </p>
  );
};

export default ContentParagraph;