import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-28 w-full resize-y rounded-md border border-line-strong bg-field px-3 py-2.5 text-base text-ink transition-colors placeholder:text-ink-soft/65 focus-visible:border-action focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action/25 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-error aria-[invalid=true]:focus-visible:ring-error/20",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
