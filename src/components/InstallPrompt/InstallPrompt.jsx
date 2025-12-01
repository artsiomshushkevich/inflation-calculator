import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button/Button';

export const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const { t } = useTranslation();
  const installButtonRef = useRef(null);
  const closeButtonRef = useRef(null);

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

  const handleClose = useCallback(() => {
    setDeferredPrompt(null);
    setShowInstallButton(false);
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

  useEffect(() => {
    if (showInstallButton && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [showInstallButton]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showInstallButton) {
        handleClose();
      }
    };

    if (showInstallButton) {
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [showInstallButton, handleClose]);

  if (!showInstallButton) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-labelledby="install-prompt-title"
      aria-describedby="install-prompt-description"
      className="fixed bottom-4 right-4 bg-background border rounded-lg shadow-lg p-4 max-w-sm z-50"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h2 id="install-prompt-title" className="sr-only">
          {t('install.title', { defaultValue: 'Install App' })}
        </h2>
        <p id="install-prompt-description" className="mb-0 flex-1">
          {t('install.prompt')}
        </p>
        <Button
          ref={closeButtonRef}
          variant="ghost"
          size="icon"
          onClick={handleClose}
          aria-label={t('install.close', {
            defaultValue: 'Close install prompt',
          })}
          className="h-6 w-6 flex-shrink-0"
        >
          <span aria-hidden="true">×</span>
        </Button>
      </div>
      <Button
        ref={installButtonRef}
        onClick={handleInstallClick}
        className="w-full"
      >
        {t('install.button')}
      </Button>
    </div>
  );
};
