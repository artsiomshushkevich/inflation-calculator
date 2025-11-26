import { forwardRef } from "react"
import { cn } from "../../../../lib/utils"

const TableFooter = forwardRef(({ className, ...props }, ref) => (
  <tfoot ref={ref} className={cn("bg-primary font-medium text-primary-foreground", className)} {...props} />
))

TableFooter.displayName = "TableFooter"

export { TableFooter }

