import type { SVGProps } from 'react';

export function AulaTokenIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4" // Default size, can be overridden by props
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16V8" />
      <path d="M9 12h6" />
      <path d="M15.5 12L12 8l-3.5 4" transform="scale(0.6) translate(8, 5.3)" strokeWidth="2.5"/>
    </svg>
  );
}
