

interface Props {
  children: React.ReactNode;
}

const WelcomeText = ({
  children
}: Props) => {
  return (
    <h1 className="font-bold uppercase text-white leading-none absolute left-full top-[35%] animate-load-main-header -translate-y-[35%]">
      {children}
    </h1>
  )
}

export default WelcomeText;