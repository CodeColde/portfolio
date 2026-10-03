import BlogPostItem from "@/app/components/BlogPostItem";
import { getBlogPosts } from "./queries";

const page = async () => {
  const posts = await getBlogPosts();

  return (
    <main className="min-h-screen w-full bg-yellow-800">
      <header className="px-[8vw] pt-[15vh] pb-[8vh] opacity-0 animate-load-in">
        <h1 className={titleClasses}>
          Blog
          {posts.length > 0 && <sup className={countClasses}>({String(posts.length).padStart(2, "0")})</sup>}
        </h1>
      </header>
      <section aria-label="Posts" className="bg-yellow-900 pb-[10vh]">
        {posts.length > 0 ? (
          <ol>
            {posts.map((post, idx) => (
              <BlogPostItem key={post._id} post={post} idx={idx} />
            ))}
          </ol>
        ) : (
          <p className="px-[8vw] pt-[8vh] text-2xl max-lg:text-xl max-md:text-lg font-bold text-white">
            Nothing published yet. Check back soon.
          </p>
        )}
      </section>
    </main>
  );
};

export default page;

const titleClasses = `
  text-[16rem]
  max-xl:text-[12rem]
  max-lg:text-[9rem]
  max-md:text-[10rem]
  max-sm:text-[6rem]
  font-bold
  uppercase
  text-white
  leading-none
`;

const countClasses = `
  top-0
  align-super
  ml-4
  max-sm:ml-2
  text-4xl
  max-lg:text-3xl
  max-sm:text-xl
  font-light
  text-white/70
`;
