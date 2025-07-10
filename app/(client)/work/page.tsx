import Carousel from "@/app/components/Carousel";
import { getCases } from "./queries";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

const page = async () => {
	const cases = await getCases();

	return (
		<main className="block relative w-screen h-screen bg-red-800 overflow-hidden">
			<div className="px-4 h-full text-center relative">
				<Carousel length={cases.length}>
					{cases.map((caseItem) => (
						<div key={caseItem._id}>
							<div className={slideContainerStyles}>
								<article
								  className={linkStyles}
								>
									<Image
										src={urlFor(caseItem.coverImage).width(1200).height(1000).url()}
										alt={caseItem.title}
										fill
										className="absolute opacity-40 object-cover object-center top-0 left-0 w-full h-full z-1"
									/>
									<div
										className="absolute top-1/2 left-1/2 translate-x-[-50%] text-center z-10 w-[90%]"
										style={{ height: "auto" }}
									>
										<Link
											href={`/work/${caseItem.slug.current}`}
											className="hover:cursor-pointer hover:[&>h2]:-skew-x-20 hover:[&>h2]:text-red-800"
										>
											<h2 className="text-8xl max-md:text-6xl max-sm:text-5xl max-xs:text-4xl font-bold italic mb-[24px] transition-[transform,color] transition-duration-500 ease-in-out">{caseItem.title}</h2>
											<p className="uppercase text-xl max-sm:text-sm italic">{caseItem.client}</p>
										</Link>
									</div>
								</article>
							</div>
						</div>
					))}
				</Carousel>
			</div>
		</main>
	);
};

export default page;

const linkStyles = `
	h-[70%]
	w-[75%]
	block
	absolute
	top-1/2
	left-1/2
	translate-x-[-50%]
	translate-y-[-50%]
	text-white
	bg-black
	hover:[&_img]:opacity-40
`;

const slideContainerStyles = `
	relative
	block
	w-full
	mx-auto
	my-0
	[&.draggable:hover]:cursor-grab
	active:cursor-grabbing
`;