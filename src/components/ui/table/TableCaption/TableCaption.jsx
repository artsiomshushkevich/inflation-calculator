import { forwardRef } from "react"
import { cn } from "../../../../utils"

export const TableCaption = forwardRef(({ className, ...props }, ref) => (
  <caption ref={ref} className={cn("mt-4 text-sm text-muted-foreground", className)} {...props} />
))

TableCaption.displayName = "TableCaption"


