import React from 'react';
import { redirect } from 'next/navigation'
// Components
import Header from '../components/header'
import Nav from '../components/nav';
import LocaleProvider from './LocaleProvider'
// import { AvailableLocales } from '@/i18n/useContrib'

export const metadata = {
	title: 'Playlistia',
	description: '',
    viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
}

export default function RootLayout({ children, params }) {
	const { locale } = params
    
    if (locale !== 'en' && locale !== 'fr') {
        redirect('/fr/search')
    }

	return (    
        <LocaleProvider locale={locale}>
            <html lang={locale}>
            <body>
                {/* <Header /> */}
                {/* <Nav /> */}
                <main>{children}</main>
            </body>
            </html>
        </LocaleProvider>
	)
}
