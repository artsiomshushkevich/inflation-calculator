import { createContext, useContext } from "react"

const SelectContext = createContext(null)
SelectContext.displayName = "SelectContext"

export const useSelectContext = () => {
  const context = useContext(SelectContext)
  if (!context) {
    throw new Error("Select components must be used within <Select>.")
  }

  return context
}

export default SelectContext

