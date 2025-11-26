import { forwardRef } from "react"
import { cn } from "../../../../utils"

export const TableBody = forwardRef(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
))

TableBody.displayName = "TableBody"


