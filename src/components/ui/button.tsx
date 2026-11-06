"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { m } from "motion/react";

import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:pointer-events-none disabled:opacity-45",
  {
    variants: {
      variant: {
        primary:
          "bg-action-fill text-on-action hover:bg-action-hover active:bg-action-active",
        secondary:
          "border border-line-strong bg-transparent text-ink hover:bg-blush/60",
        ghost: "text-ink hover:bg-blush/60",
        whatsapp:
          "border border-on-deep/20 bg-deep text-on-deep hover:bg-action-hover hover:text-on-action active:bg-action-active active:text-on-action",
        link: "h-auto p-0 text-action underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-10 px-4 text-xs",
        default: "h-11 px-5",
        lg: "h-12 px-6 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof m.button>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const MotionSlot = m.create(Slot);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? MotionSlot : m.button;
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
