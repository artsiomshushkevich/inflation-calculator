import { forwardRef } from "react"
import { cn } from "../../../../utils"

export const Table = forwardRef(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
  </div>
))

Table.displayName = "Table"


