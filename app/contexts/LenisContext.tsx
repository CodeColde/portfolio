"use client";

import { ReactLenis, useLenis } from "lenis/react";
import type { ReactNode } from "react";

export { useLenis };

export const LenisProvider = ({ children }: { children: ReactNode }) => (
  <ReactLenis root options={{ duration: 1.2, smoothWheel: true }}>
    {children}
  </ReactLenis>
);
