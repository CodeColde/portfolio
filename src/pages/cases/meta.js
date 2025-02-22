import CaseOne from "../../assets/cases/shuttershare/shuttershare-hero.jpg";
import CaseTwo from "../../assets/cases/adscope/adscope-hero.jpg";
import CaseThree from "../../assets/cases/tiptopmusic/tiptopmusic-hero.jpg";
import CaseFour from "../../assets/cases/schoolforjustice/schoolforjustice-hero.jpg";
import CaseFive from "../../assets/cases/amongustool/cover.jpg";

import ShutterShare from "./ShutterShare";
import Adscope from "./Adscope";
import TiptopMusic from "./TiptopMusic";
import SchoolForJustice from "./SchoolForJustice";
import AmongUsTool from "./AmongUsTool";

export default [
  {
    title: "Among Us Sus Tool",
    tools: ["UX", "Front-End"],
    location: "Personal",
    coverImg: CaseFive,
    link: "/amongustool",
    component: AmongUsTool,
    date: "October 2020",
    live: "https://www.amongustool.com"
  },
  {
    title: "ShutterShare",
    tools: ["Back-End"],
    location: "Northumbria University",
    coverImg: CaseOne,
    link: "/shuttershare",
    component: ShutterShare,
    date: "February 2017",
  },
  {
    title: "Adscope",
    tools: ["UX", "Back-End"],
    location: "Northumbria University",
    coverImg: CaseTwo,
    link: "/adscope",
    component: Adscope,
    date: "April 2017",
  },
  {
    title: "Tip Top Music",
    tools: ["Full Stack", "Product Management", "UX"],
    location: "Northumbria University",
    coverImg: CaseThree,
    link: "/tiptopmusic",
    component: TiptopMusic,
    date: "May 2017",
  },
  {
    title: "School for Justice",
    tools: ["Front-End"],
    location: "J. Walter Thompson Amsterdam",
    coverImg: CaseFour,
    link: "/schoolforjustice",
    component: SchoolForJustice,
    date: "June 2017"
  },
];