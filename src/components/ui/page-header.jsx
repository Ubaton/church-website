import React from "react";

/**
 * Premium inner-page header band: eyebrow, serif title, optional scripture
 * quote + reference, sitting on a subtle warm gradient with grain.
 */
const PageHeader = ({ eyebrow, title, quote, reference, children }) => {
  return (
    <section className="relative overflow-hidden border-b border-border/70 bg-gradient-to-b from-secondary/60 to-background">
      <div className="absolute inset-0 bg-grain opacity-50" />
      <div className="relative container mx-auto px-4 pt-32 pb-16 md:pt-40 md:pb-20 text-center">
        {eyebrow && (
          <span className="eyebrow justify-center">
            <span className="h-px w-6 bg-primary/60" />
            {eyebrow}
          </span>
        )}
        <h1 className="mx-auto mt-4 max-w-4xl font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.08] text-balance">
          {title}
        </h1>
        {quote && (
          <figure className="mx-auto mt-8 max-w-2xl">
            <blockquote className="font-serif text-xl md:text-2xl italic text-foreground/80 text-pretty">
              &ldquo;{quote}&rdquo;
            </blockquote>
            {reference && (
              <figcaption className="mt-3 text-sm font-medium uppercase tracking-widest text-primary">
                {reference}
              </figcaption>
            )}
          </figure>
        )}
        {children}
      </div>
    </section>
  );
};

export default PageHeader;
