import { useState } from "react"
import { useTranslation, Trans } from "react-i18next"
import { ThemeProvider, useTheme } from "./components/ThemeProvider/ThemeProvider"
import { LanguageProvider, useLanguage } from "./components/LanguageProvider/LanguageProvider"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { InstallPrompt } from "./components/InstallPrompt/InstallPrompt"
import { Select } from "./components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table"

const Header = () => {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const { t } = useTranslation()

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 p-4 border-b">
      <div className="flex flex-wrap items-center gap-4">
        <Select
          className="w-[140px]"
          value={theme}
          onValueChange={setTheme}
          aria-label={t("theme.system")}
        >
          <option value="light">{t("theme.light")}</option>
          <option value="dark">{t("theme.dark")}</option>
          <option value="system">{t("theme.system")}</option>
        </Select>

        <Select
          className="w-[140px]"
          value={language}
          onValueChange={setLanguage}
          aria-label={t("language.label", { defaultValue: "Language" })}
        >
          <option value="en">English</option>
          <option value="ru">Русский</option>
        </Select>
      </div>
    </header>
  )
}

const InflationCalculator = () => {
  const { t } = useTranslation()
  const [amount, setAmount] = useState("")
  const [inflationRate, setInflationRate] = useState("")
  const [results, setResults] = useState([])

  const calculateInflation = (e) => {
    e.preventDefault()

    const initialAmount = parseFloat(amount)
    const rate = parseFloat(inflationRate) / 100
    const years = 50

    const newResults = Array.from({ length: years }, (_, i) => {
      const year = new Date().getFullYear() + i
      const calculatedAmount = initialAmount * Math.pow(1 - rate, i + 1)
      const futureValue = initialAmount * Math.pow(1 + rate, i + 1)
      return {
        year,
        amount: calculatedAmount.toFixed(2),
        futureValue: futureValue.toFixed(2),
      }
    })

    setResults(newResults)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">{t("app.title")}</h1>
      
      <div className="max-w-2xl mx-auto mb-8 text-center text-muted-foreground">
        <p className="mb-4">
          <Trans i18nKey="app.description" />
        </p>
      </div>

      <form onSubmit={calculateInflation} className="max-w-md mx-auto mb-8">
        <div className="space-y-4">
          <div>
            <label htmlFor="amount" className="block mb-2">
              {t("form.amount")}
            </label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onInvalid={(e) => {
                if (e.target.validity.rangeUnderflow) {
                  e.target.setCustomValidity(t('form.negativeAmountError'));
                } else if (e.target.validity.valueMissing) {
                  e.target.setCustomValidity(t('form.requiredError'));
                } else {
                  e.target.setCustomValidity('');
                }
              }}
              onInput={(e) => e.target.setCustomValidity('')}
              required
              min="0"
              step="0.01"
              inputMode="decimal"
              pattern="[0-9]*[.,]?[0-9]*"
              lang="en"
              aria-label={t("form.amount")}
            />
          </div>
          
          <div>
            <label htmlFor="inflation" className="block mb-2">
              {t("form.inflation")}
            </label>
            <Input
              id="inflation"
              type="number"
              value={inflationRate}
              onChange={(e) => setInflationRate(e.target.value)}
              onInvalid={(e) => {
                if (e.target.validity.rangeOverflow) {
                  e.target.setCustomValidity(t('form.inflationTooHighError'));
                } else if (e.target.validity.rangeUnderflow) {
                  e.target.setCustomValidity(t('form.negativeInflationError'));
                } else if (e.target.validity.valueMissing) {
                  e.target.setCustomValidity(t('form.requiredError'));
                } else {
                  e.target.setCustomValidity('');
                }
              }}
              onInput={(e) => e.target.setCustomValidity('')}
              required
              min="0"
              max="100"
              step="0.01"
              inputMode="decimal"
              pattern="[0-9]*[.,]?[0-9]*"
              lang="en"
              aria-label={t("form.inflation")}
            />
          </div>

          <Button type="submit" className="w-full">
            {t("form.submit")}
          </Button>
        </div>
      </form>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("table.year")}</TableHead>
              <TableHead className="text-right">{t("table.purchasingPower")}</TableHead>
              <TableHead className="text-right">{t("table.futureValue")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.length > 0 ? (
              results.map(({ year, amount, futureValue }) => (
                <TableRow key={year}>
                  <TableCell>{year}</TableCell>
                  <TableCell className="text-right">{amount}</TableCell>
                  <TableCell className="text-right">{futureValue}</TableCell>
                </TableRow>
              ))
            ) : (
              Array.from({ length: 5 }, (_, i) => (
                <TableRow key={i} className="opacity-50">
                  <TableCell>{new Date().getFullYear() + i}</TableCell>
                  <TableCell className="text-right">-</TableCell>
                  <TableCell className="text-right">-</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Header />
          <main>
            <InflationCalculator />
          </main>
          <InstallPrompt />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
