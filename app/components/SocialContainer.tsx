import {
  contactContainerCloseStyle,
  contactContainerOpenStyle,
  contactContainerStyle,
  socialItemStyle
} from "../styles/NavMenu.styles"
import {
  Github,
  Instagram,
  LinkedIn,
  Medium
} from "./Icons"

interface Props {
  isOpen: boolean;
}

const SocialContainer = ({ isOpen }: Props) => {
  return (
    <ul
      className={`${contactContainerStyle} ${isOpen ? contactContainerOpenStyle : contactContainerCloseStyle}`}
    >
      <li className={socialItemStyle}>
        <LinkedIn />
      </li>
      <li className={socialItemStyle}>
        <Instagram />
      </li>
      <li className={socialItemStyle}>
        <Github />
      </li>
      <li className={socialItemStyle}>
        <Medium />
      </li>
    </ul>
  )
}

export default SocialContainer;