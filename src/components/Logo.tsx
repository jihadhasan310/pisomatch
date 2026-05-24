import Link from "next/link";

interface LogoProps {
  href?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ href = "/", size = "md" }: LogoProps) {
  const sizes = {
    sm: "text-lg gap-1.5",
    md: "text-xl gap-2",
    lg: "text-3xl gap-2.5",
  };

  const iconSizes = {
    sm: "w-6 h-6 text-[10px]",
    md: "w-7 h-7 text-[11px]",
    lg: "w-9 h-9 text-sm",
  };

  const content = (
    <span className={`${sizes[size]} font-[family-name:var(--font-playfair)] font-bold tracking-tight inline-flex items-center`}>
      <span className={`inline-flex items-center justify-center ${iconSizes[size]} bg-black text-white font-bold`}>
        P
      </span>
      <span>
        Piso<span className="italic font-normal">Match</span>
      </span>
    </span>
  );

  if (href) {
    return <Link href={href} className="hover:opacity-80 transition-opacity">{content}</Link>;
  }

  return content;
}
