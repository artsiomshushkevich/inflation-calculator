import { forwardRef } from "react"
import { cn } from "../../../../lib/utils"
import { useSelectContext } from "../context"

const SelectTrigger = forwardRef(({ className, children, ...props }, ref) => {
  const { value, setValue, options, placeholder, disabled, name, id } = useSelectContext()

  return (
    <div
      className={cn(
        "relative flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-within:outline-none focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      data-disabled={disabled ? "" : undefined}
    >
      <select
        ref={ref}
        className="absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-md bg-transparent opacity-0"
        value={value ?? ""}
        onChange={(event) => setValue(event.target.value)}
        disabled={disabled}
        name={name}
        id={id}
        aria-label={placeholder || "Select option"}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none flex w-full items-center justify-between">
        <span className="flex-1 truncate text-left">{children}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 opacity-50"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  )
})
SelectTrigger.displayName = "SelectTrigger"

export { SelectTrigger }

