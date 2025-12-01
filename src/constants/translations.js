export const translations = {
  en: {
    translation: {
      app: {
        title: 'Inflation Calculator',
        description:
          'This calculator shows how inflation affects your money over time. The "<strong>Purchasing Power</strong>" column shows how much your money will be worth in the future, while the "<strong>Future Value</strong>" column shows how much you would need to have the same purchasing power as your initial amount.',
        descriptionPlain:
          'This calculator shows how inflation affects your money over time. The Purchasing Power column shows how much your money will be worth in the future, while the Future Value column shows how much you would need to have the same purchasing power as your initial amount.',
      },
      form: {
        amount: 'Initial Amount',
        inflation: 'Inflation Rate (%)',
        submit: 'Calculate',
        requiredError: 'Please fill out this field.',
        inflationTooHighError: 'Inflation rate cannot exceed 100%.',
        negativeAmountError:
          'Initial amount must be greater than or equal to 0.',
        negativeInflationError:
          'Inflation rate must be greater than or equal to 0.',
      },
      table: {
        year: 'Year',
        purchasingPower: 'Purchasing Power',
        futureValue: 'Future Value',
        caption:
          'Inflation calculation results showing purchasing power and future value over time',
        resultsAnnouncement:
          'Calculation complete for initial amount {{initialAmount}} with inflation rate {{inflationRate}}%. Showing {{count}} years of results.',
        requiredError: 'Please fill out this field.',
        inflationTooHighError: 'Inflation rate cannot exceed 100%.',
        negativeAmountError:
          'Initial amount must be greater than or equal to 0.',
        negativeInflationError:
          'Inflation rate must be greater than or equal to 0.',
      },
      theme: {
        light: 'Light',
        dark: 'Dark',
        system: 'System',
      },
      install: {
        title: 'Install App',
        prompt:
          "Install this app on your device for quick and easy access when you're on the go.",
        button: 'Install App',
        close: 'Close install prompt',
      },
      skipToMain: 'Skip to main content',
    },
  },
  ru: {
    translation: {
      app: {
        title: 'Калькулятор инфляции',
        description:
          'Этот калькулятор показывает, как инфляция влияет на ваши деньги с течением времени. Колонка "<strong>Покупательная способность</strong>" показывает, сколько будут стоить ваши деньги в будущем, а колонка "<strong>Будущая стоимость</strong>" показывает, сколько вам нужно будет иметь, чтобы сохранить ту же покупательную способность, что и начальная сумма.',
        descriptionPlain:
          'Этот калькулятор показывает, как инфляция влияет на ваши деньги с течением времени. Колонка Покупательная способность показывает, сколько будут стоить ваши деньги в будущем, а колонка Будущая стоимость показывает, сколько вам нужно будет иметь, чтобы сохранить ту же покупательную способность, что и начальная сумма.',
      },
      form: {
        amount: 'Начальная сумма',
        inflation: 'Уровень инфляции (%)',
        submit: 'Рассчитать',
        requiredError: 'Пожалуйста, заполните это поле.',
        inflationTooHighError: 'Уровень инфляции не может превышать 100%.',
        negativeAmountError: 'Начальная сумма должна быть больше или равна 0.',
        negativeInflationError:
          'Уровень инфляции должен быть больше или равен 0.',
      },
      table: {
        year: 'Год',
        purchasingPower: 'Покупательная способность',
        futureValue: 'Будущая стоимость',
        caption:
          'Результаты расчета инфляции, показывающие покупательную способность и будущую стоимость с течением времени',
        resultsAnnouncement:
          'Расчет завершен для начальной суммы {{initialAmount}} с уровнем инфляции {{inflationRate}}%. Показано {{count}} лет результатов.',
        requiredError: 'Пожалуйста, заполните это поле.',
        inflationTooHighError: 'Уровень инфляции не может превышать 100%.',
        negativeAmountError: 'Начальная сумма должна быть больше или равна 0.',
        negativeInflationError:
          'Уровень инфляции должен быть больше или равен 0.',
      },
      theme: {
        light: 'Светлая',
        dark: 'Темная',
        system: 'Системная',
      },
      install: {
        title: 'Установить приложение',
        prompt:
          'Установите это приложение на ваше устройство для быстрого и удобного доступа в пути.',
        button: 'Установить приложение',
        close: 'Закрыть подсказку об установке',
      },
      skipToMain: 'Перейти к основному содержимому',
    },
  },
};
