import Link from "next/link";
import { ArrowLeft, ArrowRight, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function SermonHeader({ archive = false }) {
  return (
    <header className="border-b border-border bg-secondary/30 py-12 md:py-16">
      <div className="container mx-auto max-w-5xl px-4 md:px-6">
        <p className="eyebrow flex items-center gap-2">
          <Headphones className="h-4 w-4" aria-hidden="true" />
          Listen & grow
        </p>
        <div className="mt-4 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              {archive ? "Sermon library" : "Faith for everyday life."}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {archive
                ? "Find a message, explore the Scriptures, and listen at your own pace."
                : "Biblical teaching from our church family. Listen to the latest message or find encouragement in the library."}
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="shrink-0 self-start sm:self-auto"
          >
            <Link href={archive ? "/sermons" : "/sermons/all-sermons"}>
              {archive && (
                <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              )}
              {archive ? "Latest messages" : "Browse all sermons"}
              {!archive && (
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              )}
            </Link>
          </Button>
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          “Thy word is a lamp unto my feet, and a light unto my path.”{" "}
          <span className="inline-block text-foreground">
            Psalm 119:105 KJV
          </span>
        </p>
      </div>
    </header>
  );
}
