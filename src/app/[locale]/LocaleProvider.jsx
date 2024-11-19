'use client'

// import { AvailableLocales } from '@/i18n/useContrib'
import React, { createContext } from 'react'

export const LocaleContext = createContext({})

export default function LocaleProvider({
	locale,
	children,
}) {
	console.log('locale', locale)
	return (
		<LocaleContext.Provider value={locale}>
			{children}
		</LocaleContext.Provider>
	)
}
