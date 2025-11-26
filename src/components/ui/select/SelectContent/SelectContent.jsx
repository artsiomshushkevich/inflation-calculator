import { forwardRef } from "react"

const SelectContent = forwardRef(({ children }, ref) => {
  return (
    <div ref={ref} className="sr-only" aria-hidden="true">
      {children}
    </div>
  )
})
SelectContent.displayName = "SelectContent"

export { SelectContent }

