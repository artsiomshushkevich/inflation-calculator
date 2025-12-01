import { useTranslation } from 'react-i18next';

export const SkipLink = () => {
  const { t } = useTranslation();

  return (
    <a
      href="#main-content"
      className="absolute left-[-9999px] top-4 z-50 px-4 py-2 bg-primary text-primary-foreground rounded-md outline-none ring-2 ring-ring ring-offset-2 focus:left-4"
    >
      {t('skipToMain', { defaultValue: 'Skip to main content' })}
    </a>
  );
};
