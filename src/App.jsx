import { useState, useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import {
  ThemeProvider,
  useTheme,
} from './components/ThemeProvider/ThemeProvider';
import {
  LanguageProvider,
  useLanguage,
} from './components/LanguageProvider/LanguageProvider';
import { Button } from './components/ui/button/Button';
import { Input } from './components/ui/input/Input';
import { InstallPrompt } from './components/InstallPrompt/InstallPrompt';
import { Select } from './components/ui/select/Select/Select';
import { SkipLink } from './components/SkipLink/SkipLink';
import {
  Table,
  TableBody,
  TableCell,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from './components/ui/table';

const Header = () => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 p-4 border-b">
      <div className="flex flex-wrap items-center gap-4">
        <Select
          className="w-[140px]"
          value={theme}
          onValueChange={setTheme}
          aria-label={t('theme.system')}
        >
          <option value="light">{t('theme.light')}</option>
          <option value="dark">{t('theme.dark')}</option>
          <option value="system">{t('theme.system')}</option>
        </Select>

        <Select
          className="w-[140px]"
          value={language}
          onValueChange={setLanguage}
          aria-label={t('language.label', { defaultValue: 'Language' })}
        >
          <option value="en">English</option>
          <option value="ru">Русский</option>
        </Select>
      </div>
    </header>
  );
};

const InflationCalculator = () => {
  const { t } = useTranslation();
  const [amount, setAmount] = useState('');
  const [inflationRate, setInflationRate] = useState('');
  const [results, setResults] = useState([]);
  const [amountError, setAmountError] = useState('');
  const [inflationError, setInflationError] = useState('');
  const [lastCalculation, setLastCalculation] = useState({
    initialAmount: null,
    inflationRate: null,
  });

  const calculateInflation = (e) => {
    e.preventDefault();

    const initialAmount = parseFloat(amount);
    const rate = parseFloat(inflationRate) / 100;
    const years = 50;

    const newResults = Array.from({ length: years }, (_, i) => {
      const year = new Date().getFullYear() + i;
      const calculatedAmount = initialAmount * Math.pow(1 - rate, i + 1);
      const futureValue = initialAmount * Math.pow(1 + rate, i + 1);
      return {
        year,
        amount: calculatedAmount.toFixed(2),
        futureValue: futureValue.toFixed(2),
      };
    });

    setResults(newResults);
    setAmountError('');
    setInflationError('');
    setLastCalculation({
      initialAmount: initialAmount,
      inflationRate: parseFloat(inflationRate),
    });
  };

  useEffect(() => {
    const liveRegion = document.getElementById('live-region');
    if (
      liveRegion &&
      results.length > 0 &&
      lastCalculation.initialAmount !== null
    ) {
      const announcement = t('table.resultsAnnouncement', {
        defaultValue: `Calculation complete for initial amount ${lastCalculation.initialAmount} with inflation rate ${lastCalculation.inflationRate}%. Showing ${results.length} years of results.`,
        count: results.length,
        initialAmount: lastCalculation.initialAmount.toLocaleString(),
        inflationRate: lastCalculation.inflationRate,
      })
        .replace('{{count}}', results.length)
        .replace(
          '{{initialAmount}}',
          lastCalculation.initialAmount.toLocaleString()
        )
        .replace('{{inflationRate}}', lastCalculation.inflationRate.toString());
      liveRegion.textContent = announcement;
    } else if (liveRegion) {
      liveRegion.textContent = '';
    }
  }, [results, lastCalculation, t]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">{t('app.title')}</h1>

      <div className="max-w-2xl mx-auto mb-8 text-center text-muted-foreground">
        <p className="mb-4">
          <span aria-hidden="true">
            <Trans
              i18nKey="app.description"
              components={{
                strong: <span className="font-bold" />,
              }}
            />
          </span>
          <span className="sr-only">{t('app.descriptionPlain')}</span>
        </p>
      </div>

      <form onSubmit={calculateInflation} className="max-w-md mx-auto mb-8">
        <div className="space-y-4">
          <div>
            <label htmlFor="amount" className="block mb-2">
              {t('form.amount')}
            </label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setAmountError('');
              }}
              onInvalid={(e) => {
                if (e.target.validity.rangeUnderflow) {
                  const error = t('form.negativeAmountError');
                  e.target.setCustomValidity(error);
                  setAmountError(error);
                } else if (e.target.validity.valueMissing) {
                  const error = t('form.requiredError');
                  e.target.setCustomValidity(error);
                  setAmountError(error);
                } else {
                  e.target.setCustomValidity('');
                  setAmountError('');
                }
              }}
              onInput={(e) => {
                e.target.setCustomValidity('');
                setAmountError('');
              }}
              required
              min="0"
              step="0.01"
              inputMode="decimal"
              pattern="[0-9]*[.,]?[0-9]*"
              lang="en"
              aria-label={t('form.amount')}
              aria-invalid={amountError ? 'true' : 'false'}
              aria-describedby={amountError ? 'amount-error' : undefined}
            />
            {amountError && (
              <div
                id="amount-error"
                role="alert"
                className="mt-1 text-sm text-destructive"
                aria-live="polite"
              >
                {amountError}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="inflation" className="block mb-2">
              {t('form.inflation')}
            </label>
            <Input
              id="inflation"
              type="number"
              value={inflationRate}
              onChange={(e) => {
                setInflationRate(e.target.value);
                setInflationError('');
              }}
              onInvalid={(e) => {
                if (e.target.validity.rangeOverflow) {
                  const error = t('form.inflationTooHighError');
                  e.target.setCustomValidity(error);
                  setInflationError(error);
                } else if (e.target.validity.rangeUnderflow) {
                  const error = t('form.negativeInflationError');
                  e.target.setCustomValidity(error);
                  setInflationError(error);
                } else if (e.target.validity.valueMissing) {
                  const error = t('form.requiredError');
                  e.target.setCustomValidity(error);
                  setInflationError(error);
                } else {
                  e.target.setCustomValidity('');
                  setInflationError('');
                }
              }}
              onInput={(e) => {
                e.target.setCustomValidity('');
                setInflationError('');
              }}
              required
              min="0"
              max="100"
              step="0.01"
              inputMode="decimal"
              pattern="[0-9]*[.,]?[0-9]*"
              lang="en"
              aria-label={t('form.inflation')}
              aria-invalid={inflationError ? 'true' : 'false'}
              aria-describedby={inflationError ? 'inflation-error' : undefined}
            />
            {inflationError && (
              <div
                id="inflation-error"
                role="alert"
                className="mt-1 text-sm text-destructive"
                aria-live="polite"
              >
                {inflationError}
              </div>
            )}
          </div>

          <Button type="submit" className="w-full">
            {t('form.submit')}
          </Button>
        </div>
      </form>

      <div className="overflow-x-auto">
        <Table>
          <TableCaption>
            {t('table.caption', {
              defaultValue:
                'Inflation calculation results showing purchasing power and future value over time',
            })}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">{t('table.year')}</TableHead>
              <TableHead scope="col" className="text-right">
                {t('table.purchasingPower')}
              </TableHead>
              <TableHead scope="col" className="text-right">
                {t('table.futureValue')}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.length > 0
              ? results.map(({ year, amount, futureValue }) => (
                  <TableRow key={year}>
                    <TableCell>{year}</TableCell>
                    <TableCell className="text-right">{amount}</TableCell>
                    <TableCell className="text-right">{futureValue}</TableCell>
                  </TableRow>
                ))
              : Array.from({ length: 5 }, (_, i) => (
                  <TableRow key={i} className="opacity-50">
                    <TableCell>{new Date().getFullYear() + i}</TableCell>
                    <TableCell className="text-right">-</TableCell>
                    <TableCell className="text-right">-</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const AppContent = () => {
  const { language } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SkipLink />
      <Header />
      <main id="main-content">
        <InflationCalculator />
      </main>
      <InstallPrompt />
    </div>
  );
};

export const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
