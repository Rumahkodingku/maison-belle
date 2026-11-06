import type { HTMLAttributes } from "react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type SectionProps = HTMLAttributes<HTMLElement> & {
  id?: string;
  tone?: "ivory" | "blush" | "ink";
  container?: boolean;
  reveal?: boolean;
};

export function Section({
  id,
  tone = "ivory",
  container = true,
  reveal = true,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "section-pad scroll-mt-24",
        tone === "blush" && "bg-blush/55",
        tone === "ink" && "bg-deep text-on-deep",
        className,
      )}
      {...props}
    >
      {container ? (
        <Container>{reveal ? <Reveal>{children}</Reveal> : children}</Container>
      ) : reveal ? (
        <Reveal>{children}</Reveal>
      ) : (
        children
      )}
    </section>
  );
}
