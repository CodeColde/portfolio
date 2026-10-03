const BlogCodeBlock = ({ code }: { code: string }) => {
  return (
    <pre className={preClasses}>
      <code>{code}</code>
    </pre>
  );
};

export default BlogCodeBlock;

const preClasses = `
  my-10
  overflow-x-auto
  rounded-2xl
  bg-neutral-950
  p-6
  max-sm:p-4
  font-mono
  text-sm
  max-sm:text-xs
  leading-6
  text-neutral-100
`;
