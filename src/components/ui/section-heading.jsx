import React from "react";
import { cn } from "@/lib/utils";

/**
 * Consistent section header: small amber eyebrow, clear title,
 * optional subtitle. Centered by default.
 */
const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}) => {
  const alignment =
    align === "left"
      ? "text-left items-start"
      : "text-center items-center mx-auto";
  return (
    <div className={cn("flex flex-col gap-4 max-w-2xl", alignment, className)}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.1] text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg text-muted-foreground text-pretty leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
