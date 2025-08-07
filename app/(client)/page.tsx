import { getHomepageData } from "./queries";
import CaseSummaryItem from "../components/CaseSummaryItem";
import CaseQuickBrowse from "../components/CaseQuickBrowse";
import formatId from "../utils/formatId";

const page = async () => {
	const homepageData = await getHomepageData();
	const quickBrowseData = homepageData.map(caseDetails => ({
		id: formatId(caseDetails.title),
		label: caseDetails.title,
	}));

	return (
		<main className="w-full">
			<CaseQuickBrowse data={quickBrowseData} />
			{homepageData.map((caseDetails, idx) => (
				<CaseSummaryItem caseDetails={caseDetails} idx={idx} key={caseDetails.slug.current} />
			))}
		</main>
	);
}

export default page;