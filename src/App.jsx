import { useState } from "react"
import { useTranslation } from "react-i18next"
import { ThemeProvider, useTheme } from "./components/theme-provider"
import { LanguageProvider, useLanguage } from "./components/language-provider"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table"

function Header() {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const { t } = useTranslation()

  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-4">
        <Select value={theme} onValueChange={setTheme}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t("theme.system")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">{t("theme.light")}</SelectItem>
            <SelectItem value="dark">{t("theme.dark")}</SelectItem>
            <SelectItem value="system">{t("theme.system")}</SelectItem>
          </SelectContent>
        </Select>

        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Русский" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="ru">Русский</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </header>
  )
}

function InflationCalculator() {
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
              required
              min="0"
              step="0.01"
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
              required
              min="0"
              max="100"
              step="0.01"
              aria-label={t("form.inflation")}
            />
          </div>

          <Button type="submit" className="w-full">
            {t("form.submit")}
          </Button>
        </div>
      </form>

      {results.length > 0 && (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("table.year")}</TableHead>
                <TableHead className="text-right">{t("table.amount")}</TableHead>
                <TableHead className="text-right">{t("table.futureValue")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map(({ year, amount, futureValue }) => (
                <TableRow key={year}>
                  <TableCell>{year}</TableCell>
                  <TableCell className="text-right">{amount}</TableCell>
                  <TableCell className="text-right">{futureValue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Header />
          <main>
            <InflationCalculator />
          </main>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
