'use client'

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react'

export type HeaderTheme = 'light' | 'dark'

interface HeaderThemeContextType {
  theme: HeaderTheme
  setTheme: (theme: HeaderTheme) => void
  isDark: boolean
  isLight: boolean
  hasBackgroundImage: boolean
  setHasBackgroundImage: (hasImage: boolean) => void
}

const HeaderThemeContext = createContext<HeaderThemeContextType | undefined>(undefined)

interface HeaderThemeProviderProps {
  children: ReactNode
  defaultTheme?: HeaderTheme
}

export const HeaderThemeProvider: React.FC<HeaderThemeProviderProps> = ({
  children,
  defaultTheme = 'light'
}) => {
  const [theme, setTheme] = useState<HeaderTheme>(defaultTheme)
  const [hasBackgroundImage, setHasBackgroundImage] = useState<boolean>(false)

  const value: HeaderThemeContextType = {
    theme,
    setTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    hasBackgroundImage,
    setHasBackgroundImage,
  }

  return (
    <HeaderThemeContext.Provider value={value}>
      {children}
    </HeaderThemeContext.Provider>
  )
}

export const useHeaderTheme = (): HeaderThemeContextType => {
  const context = useContext(HeaderThemeContext)
  if (context === undefined) {
    throw new Error('useHeaderTheme must be used within a HeaderThemeProvider')
  }
  return context
}