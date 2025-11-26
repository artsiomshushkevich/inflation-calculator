import { useCallback, useEffect, useMemo, useState } from "react"
import { cn } from "../../../../lib/utils"
import SelectContext from "../context"

const Select = ({
  value,
  defaultValue,
  onValueChange,
  children,
  disabled = false,
  placeholder: placeholderProp,
  name,
  id,
  className,
  ...props
}) => {
  const isValueControlled = value !== undefined
  const [internalValue, setInternalValue] = useState(defaultValue ?? "")
  const [options, setOptions] = useState([])
  const [placeholder, setPlaceholder] = useState(placeholderProp ?? "")

  useEffect(() => {
    if (placeholderProp !== undefined) {
      setPlaceholder(placeholderProp)
    }
  }, [placeholderProp])

  const selectedValue = isValueControlled ? value : internalValue

  const setValue = useCallback(
    (nextValue) => {
      if (disabled) return
      if (!isValueControlled) {
        setInternalValue(nextValue)
      }
      onValueChange?.(nextValue)
    },
    [disabled, isValueControlled, onValueChange]
  )

  const registerOption = useCallback((option) => {
    setOptions((prev) => {
      const exists = prev.findIndex((item) => item.value === option.value)
      if (exists !== -1) {
        const updated = [...prev]
        updated[exists] = option
        return updated
      }
      return [...prev, option]
    })

    return () => {
      setOptions((prev) => prev.filter((item) => item.value !== option.value))
    }
  }, [])

  const contextValue = useMemo(
    () => ({
      value: selectedValue ?? "",
      setValue,
      options,
      registerOption,
      placeholder,
      setPlaceholder,
      disabled,
      name,
      id,
    }),
    [
      selectedValue,
      setValue,
      options,
      registerOption,
      placeholder,
      disabled,
      name,
      id,
    ]
  )

  return (
    <SelectContext.Provider value={contextValue}>
      <div className={cn("relative w-full", className)} {...props}>
        {children}
      </div>
    </SelectContext.Provider>
  )
}

export { Select }

