import { forwardRef } from "react"
import { cn } from "../../../../lib/utils"

const TableCell = forwardRef(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
))

TableCell.displayName = "TableCell"

export { TableCell }

