import { formatPriceLabel } from "@/lib/format/currency";
import { cn } from "@/lib/utils";
import type { PricingType } from "@/types/domain";

export function PriceLabel({
  price,
  pricingType,
  className,
}: {
  price: number;
  pricingType: PricingType;
  className?: string;
}) {
  return (
    <span className={cn("font-medium tabular-nums text-ink", className)}>
      {formatPriceLabel(price, pricingType)}
    </span>
  );
}
