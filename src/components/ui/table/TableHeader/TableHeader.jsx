import { forwardRef } from "react"
import { cn } from "../../../../utils"

export const TableHeader = forwardRef(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))

TableHeader.displayName = "TableHeader"


