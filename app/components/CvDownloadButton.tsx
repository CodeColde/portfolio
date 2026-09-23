import type { CvType } from "@/app/types/cv.types";

interface Props {
  cv: CvType;
}

const DEFAULT_LABEL = "Download my CV";
const DEFAULT_FILENAME = "Hayo-Friese-CV.pdf";

const buildDownloadUrl = (url: string, filename: string) => {
  const downloadUrl = new URL(url);
  downloadUrl.searchParams.set("dl", filename);
  return downloadUrl.toString();
};

const CvDownloadButton = ({ cv }: Props) => {
  if (!cv?.url) {
    return null;
  }

  const filename = cv.filename || DEFAULT_FILENAME;

  return (
    <a
      href={buildDownloadUrl(cv.url, filename)}
      download={filename}
      className="self-start border-2 max-sm:border-1 border-white text-white px-6 py-3 max-md:px-5 max-md:py-2 font-bold rounded-4xl text-md max-md:text-sm max-sm:text-xs uppercase inline-block hover:bg-red-800 hover:border-red-800 transition-[background,color,border] duration-300 ease-in-out"
    >
      {cv.label || DEFAULT_LABEL}
    </a>
  );
};

export default CvDownloadButton;
