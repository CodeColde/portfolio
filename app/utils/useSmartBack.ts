import { useRouter, usePathname } from "next/navigation";

const useSmartBack = (sectionRoot: `/${string}`) => {
  const router = useRouter();
  const pathname = usePathname();

  return () => {
    if (pathname === sectionRoot) {
      router.back();
      return;
    }

    const referrer = document.referrer;
    const sameOrigin = referrer && new URL(referrer).origin === window.location.origin;

    const refInsideSection = sameOrigin && referrer.includes(sectionRoot);

    if (refInsideSection) {
      router.back();
      return;
    }

    router.push(sectionRoot);
  };
}

export default useSmartBack;