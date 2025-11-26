import { forwardRef } from "react"
import { cn } from "../../../../utils"

export const TableRow = forwardRef(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
))

TableRow.displayName = "TableRow"


