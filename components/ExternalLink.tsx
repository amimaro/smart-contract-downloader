import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import React from "react";

type ExternalLinkProps = {
  href: string;
  children: React.ReactNode;
};

export default function ExternalLink({ href, children }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex gap-1 font-semibold"
    >
      {children}
      <ArrowTopRightOnSquareIcon width={16} />
    </a>
  );
}
