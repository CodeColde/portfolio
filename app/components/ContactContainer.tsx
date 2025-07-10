interface Props {
  isOpen: boolean;
}

const ContactContainer = ({ isOpen }: Props) => {
  return (
    <div
      className={`absolute bottom-[2%] left-[2%] opacity-0 z-1 px-[9px] ${isOpen ? "block animate-load-contact" : "hidden"}`}
    >
      <h5 className="text-white max-sm:text-xs">
        For business enquiries,{" "}
        <a href="mailto:hayo.web@gmail.com" className="text-blue-300">
          email me
        </a>
        .
      </h5>
    </div>
  )
}

export default ContactContainer;