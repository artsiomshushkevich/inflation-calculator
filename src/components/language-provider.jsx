import { createContext, useContext, useEffect, useState } from "react"
import i18n from "i18next"
import { initReactI18next } from "react-i18next"

const LanguageProviderContext = createContext({
  language: "ru",
  setLanguage: () => null,
})

const resources = {
  en: {
    translation: {
      "app.title": "Inflation Calculator",
      "form.amount": "Amount",
      "form.inflation": "Inflation Rate (%)",
      "form.submit": "Calculate",
      "table.year": "Year",
      "table.amount": "Amount",
      "theme.light": "Light",
      "theme.dark": "Dark",
      "theme.system": "System",
    },
  },
  ru: {
    translation: {
      "app.title": "Калькулятор Инфляции",
      "form.amount": "Сумма",
      "form.inflation": "Уровень Инфляции (%)",
      "form.submit": "Рассчитать",
      "table.year": "Год",
      "table.amount": "Сумма",
      "theme.light": "Светлая",
      "theme.dark": "Темная",
      "theme.system": "Системная",
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: "ru",
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false,
  },
})

export function LanguageProvider({
  children,
  defaultLanguage = "ru",
  storageKey = "vite-ui-language",
}) {
  const [language, setLanguage] = useState(
    () => localStorage.getItem(storageKey) || defaultLanguage
  )

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])

  const value = {
    language,
    setLanguage: (language) => {
      localStorage.setItem(storageKey, language)
      setLanguage(language)
    },
  }

  return (
    <LanguageProviderContext.Provider value={value}>
      {children}
    </LanguageProviderContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext)

  if (context === undefined)
    throw new Error("useLanguage must be used within a LanguageProvider")

  return context
} 