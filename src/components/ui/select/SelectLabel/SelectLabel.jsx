import { forwardRef } from "react"
import { cn } from "../../../../lib/utils"

const SelectLabel = forwardRef(({ className, ...props }, ref) => (
  <label ref={ref} className={cn("px-2 py-1.5 text-sm font-semibold", className)} {...props} />
))

SelectLabel.displayName = "SelectLabel"

export { SelectLabel }

