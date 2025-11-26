import { forwardRef } from "react"
import { cn } from "../../../../lib/utils"

const SelectGroup = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-1", className)} {...props} />
))

SelectGroup.displayName = "SelectGroup"

export { SelectGroup }

