import React from "react";

/**
 * Inner-page title and optional scripture on a quiet neutral surface.
 */
const PageHeader = ({ eyebrow, title, quote, reference, children }) => {
  return (
    <section className="border-b border-border/50 bg-secondary/40">
      <div className="container mx-auto px-6 py-16 md:py-24 text-center">
        {eyebrow && <span className="eyebrow justify-center">{eyebrow}</span>}
        <h1 className="mx-auto mt-4 max-w-4xl font-sans text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.08] text-balance">
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
