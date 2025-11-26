import { forwardRef } from "react"
import { cn } from "../../../../lib/utils"

const SelectSeparator = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
))

SelectSeparator.displayName = "SelectSeparator"

export { SelectSeparator }

