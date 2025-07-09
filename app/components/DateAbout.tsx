interface Props {
  start?: string;
  end?: string;
  year?: string;
}

const DateAbout = ({ start, end, year }: Props) => {
  const startYear = start ? new Date(start).getFullYear() : undefined;
  const endYear = end ? new Date(end).getFullYear() : undefined;
  const generalYear = year
    ? new Date(year).getFullYear()
    : startYear === endYear
    ? startYear
    : undefined;

  return (
    <h5 className={styles}>
      {generalYear
        ? generalYear
        : `${startYear}${endYear ? ` - ${endYear}` : " (current)"}`
      }
    </h5>
  )
}

export default DateAbout;

const styles = `
  text-white
  pb-0
  text-4xl
  font-bold
  max-lg:text-2xl
  max-md:text-sm
  max-md:italic
  max-md:font-light
`;