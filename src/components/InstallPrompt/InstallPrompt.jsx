import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button/Button';

export const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    setDeferredPrompt(null);
    setShowInstallButton(false);

    console.log(`User response to the install prompt: ${outcome}`);
  };

  if (!showInstallButton) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-background border rounded-lg shadow-lg p-4">
      <p className="mb-2">{t('install.prompt')}</p>
      <Button onClick={handleInstallClick}>{t('install.button')}</Button>
    </div>
  );
};
