import React, { createContext, useContext, useState } from 'react'

interface FooterContextType {
  footerHeight: number
  setFooterHeight(height: number): void
}

const FooterContext = createContext<FooterContextType | undefined>(undefined)

export function useFooterContext() {
  const context = useContext(FooterContext)
  if (!context) {
    throw new Error('useFooterContext must be used within a FooterProvider')
  }
  return context
}

export function FooterProvider({ children }: { children: React.ReactNode }) {
  const [footerHeight, setFooterHeight] = useState(0)

  return <FooterContext.Provider value={{ footerHeight, setFooterHeight }}>{children}</FooterContext.Provider>
}
