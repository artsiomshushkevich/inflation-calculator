import { forwardRef, useEffect } from "react"
import { cn } from "../../../../lib/utils"
import { useSelectContext } from "../context"

const SelectValue = forwardRef(({ placeholder, className, children }, ref) => {
  const { value, options, setPlaceholder } = useSelectContext()

  useEffect(() => {
    if (placeholder !== undefined) {
      setPlaceholder(placeholder)
    }
  }, [placeholder, setPlaceholder])

  const selected = options.find((option) => option.value === value)
  const content = selected?.label ?? placeholder ?? children ?? ""

  return (
    <span
      ref={ref}
      className={cn("pointer-events-none truncate text-left text-sm text-foreground", className)}
      aria-live="polite"
    >
      {content}
    </span>
  )
})
SelectValue.displayName = "SelectValue"

export { SelectValue }

