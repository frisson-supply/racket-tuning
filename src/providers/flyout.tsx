'use client'

import React, { createContext, useCallback, useContext, useState } from 'react'

type FlyoutContextType = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const FlyoutContext = createContext<FlyoutContextType>({
  isOpen: false,
  setIsOpen: () => null,
})

export const FlyoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpenState] = useState(false)

  const setIsOpen = useCallback((open: boolean) => {
    setIsOpenState(open)
    document.body.toggleAttribute('data-flyout-open', open)
  }, [])

  return (
    <FlyoutContext.Provider value={{ isOpen, setIsOpen }}>{children}</FlyoutContext.Provider>
  )
}

export const useFlyout = (): FlyoutContextType => useContext(FlyoutContext)
