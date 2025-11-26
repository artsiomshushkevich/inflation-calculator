import { Children, useEffect } from "react"
import { useSelectContext } from "../context"

const getLabelFromChildren = (children) =>
  Children.toArray(children)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") {
        return child
      }
      return ""
    })
    .join("")
    .trim()

const SelectItem = ({ value, children, label: labelProp, disabled = false }) => {
  const { registerOption } = useSelectContext()
  const label = (labelProp ?? getLabelFromChildren(children) ?? "").toString()

  useEffect(() => {
    const unregister = registerOption({ value, label, disabled })
    return unregister
  }, [value, label, disabled, registerOption])

  return null
}

SelectItem.displayName = "SelectItem"

export { SelectItem }

