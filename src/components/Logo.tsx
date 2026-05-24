import Link from "next/link";

interface LogoProps {
  href?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ href = "/", size = "md" }: LogoProps) {
  const sizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl",
  };

  const iconSizes = {
    sm: "w-6 h-6 text-[10px]",
    md: "w-7 h-7 text-xs",
    lg: "w-9 h-9 text-sm",
  };

  const content = (
    <span className={`${sizes[size]} font-[family-name:var(--font-playfair)] font-bold tracking-tight inline-flex items-center gap-1.5`}>
      <span className={`inline-flex items-center justify-center ${iconSizes[size]} bg-black text-white font-bold rounded-sm`}>
        P
      </span>
      <span>
        Piso<span className="italic">Match</span>
      </span>
    </span>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
