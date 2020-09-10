import CaseOne from "../../assets/cases/case-1-shuttershare/shuttershare-hero.jpg";
import CaseTwo from "../../assets/cases/case-2-adscope/adscope-hero.jpg";
import CaseThree from "../../assets/cases/case-3-tiptopmusic/tiptopmusic-hero.jpg";
import CaseFour from "../../assets/cases/case-4-schoolforjustice/schoolforjustice-hero.jpg";
import CaseFive from "../../assets/cases/case-5-ziggodamtotdamloop/damtotdamloop-hero.jpg";

import ShutterShare from "./ShutterShare";
import Adscope from "./Adscope";
import TiptopMusic from "./TiptopMusic";
import SchoolForJustice from "./SchoolForJustice";
import ZiggoDamTotDamLoop from "./ZiggoDamTotDamLoop";

export default [
  {
    title: "ShutterShare",
    tools: ["Back-End"],
    location: "Northumbria University",
    coverImg: CaseOne,
    link: "/shuttershare",
    component: ShutterShare
  },
  {
    title: "Adscope",
    tools: ["UX", "Back-End"],
    location: "Northumbria University",
    coverImg: CaseTwo,
    link: "/adscope",
    component: Adscope
  },
  {
    title: "TipTop Music",
    tools: ["Front-End"],
    location: "Northumbria University",
    coverImg: CaseThree,
    link: "/tiptopmusic",
    component: TiptopMusic
  },
  {
    title: "School for Justice",
    tools: ["Front-End"],
    location: "J. Walter Thompson Amsterdam",
    coverImg: CaseFour,
    link: "/schoolforjustice",
    component: SchoolForJustice
  },
  {
    title: "Ziggo Dam Tot Dam Loop",
    tools: ["Conceptualization"],
    location: "J. Walter Thompson Amsterdam",
    coverImg: CaseFive,
    link: "/ziggodamtotdamloop",
    component: ZiggoDamTotDamLoop
  },
];