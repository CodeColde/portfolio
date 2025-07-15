import { getHomepageData } from "./queries";
import CaseSummaryItem from "../components/CaseSummaryItem";

const page = async () => {
	const homepageData = await getHomepageData();

	return (
		<main className="w-full bg-red-800">
			{homepageData.map((caseDetails, idx) => (
				<CaseSummaryItem caseDetails={caseDetails} idx={idx} key={caseDetails.slug.current} />
			))}
		</main>
	);
}

export default page;