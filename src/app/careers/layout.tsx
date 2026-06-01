import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Careers — Zero to Agent",
  description:
    "Open roles at Zero to Agent. Build production AI agents for founders and executives. Toronto-based, end-to-end ownership, real customers.",
};

export default function CareersLayout({ children }: { children: ReactNode }) {
  return children;
}
