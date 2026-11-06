import { ArrowUpRight } from "lucide-react";
import { HoverLink } from "@/components/motion/hover-link";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  actionLabel,
  actionHref,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center md:text-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
        <h2 className="text-4xl text-ink sm:text-5xl lg:text-6xl">{title}</h2>
        {description ? (
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft">
            {description}
          </p>
        ) : null}
      </div>
      {actionLabel && actionHref ? (
        <HoverLink
          href={actionHref}
          wrapperClassName="shrink-0"
          className="group inline-flex items-center gap-2 border-b border-ink/30 pb-1 text-sm font-medium text-ink transition-colors hover:border-action hover:text-action"
        >
          {actionLabel}
          <ArrowUpRight
            className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </HoverLink>
      ) : null}
    </div>
  );
}
