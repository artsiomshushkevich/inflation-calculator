import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/button'

export const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showInstallButton, setShowInstallButton] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const handler = (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault()
      // Stash the event so it can be triggered later
      setDeferredPrompt(e)
      // Update UI to notify the user they can add to home screen
      setShowInstallButton(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    // Show the install prompt
    deferredPrompt.prompt()

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice

    // We no longer need the prompt. Clear it up
    setDeferredPrompt(null)

    // Hide the install button
    setShowInstallButton(false)

    // Optionally, send analytics event with outcome
    console.log(`User response to the install prompt: ${outcome}`)
  }

  if (!showInstallButton) return null

  return (
    <div className="fixed bottom-4 right-4 bg-background border rounded-lg shadow-lg p-4">
      <p className="mb-2">{t('install.prompt')}</p>
      <Button onClick={handleInstallClick}>
        {t('install.button')}
      </Button>
    </div>
  )
}

