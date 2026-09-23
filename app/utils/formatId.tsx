const formatId = (caseTitle: string): string => {
  return caseTitle
    .toLowerCase()
    .split(" ")
    .join("-");
}

export default formatId;