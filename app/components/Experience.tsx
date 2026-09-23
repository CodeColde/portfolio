import type { EducationEntryType } from "../types/education.types";
import type { ExperienceEntryType } from "../types/experience.types";
import type { ExtraEntryType } from "../types/extras.types";
import CompanyHeader from "./CompanyHeader";
import DateAbout from "./DateAbout";
import ExperienceHeader from "./ExperienceHeader";

interface Props {
  experience?: ExperienceEntryType;
  education?: EducationEntryType;
  extra?: ExtraEntryType;
}

const Experience = ({ experience, education, extra }: Props) => {
  const title = experience?.role || education?.degree || extra?.certification;
  const company = experience?.company || education?.school || extra?.company;
  const companyUrl = experience?.companyUrl || education?.schoolUrl || extra?.companyUrl || undefined;
  const startDate = experience?.startDate || education?.startDate || undefined;
  const endDate = experience?.endDate || education?.endDate || undefined;
  const year = extra?.year || undefined;
  const details = experience?.details || education?.details || extra?.details;

  return (
    <div className="mb-4">
      <div className="flex items-start justify-between mb-4 max-">
        <div>
          <ExperienceHeader>{title}</ExperienceHeader>
          <CompanyHeader href={companyUrl}>{company}</CompanyHeader>
          <div className="min-md:hidden">
            <DateAbout start={startDate} end={endDate} year={year} />
          </div>
        </div>
        <div className="max-md:hidden">
          <DateAbout start={startDate} end={endDate} year={year} />
        </div>
      </div>
      <p className="text-white text-lg mb-12 font-normal">{details}</p>
    </div>
  );
};

export default Experience;
