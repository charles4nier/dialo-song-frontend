'use client';

import './style.scss';
import React, {  useContext } from 'react';
import { usePathname } from 'next/navigation';
import { LocaleContext } from '../../[locale]/LocaleProvider';
import classNames from 'classnames';

// Components
import Link from 'next/link';
import SvgHome from '../svg/svgHome';
import SvgSearch from '../svg/svgSearch';

const BASE_CASSNAME = 'loopsie-nav';

export default function Nav() {
    const locale = useContext(LocaleContext),
    pathname = usePathname();

    const linkCollection = [
        {
            slug: 'home',
            svg: <SvgHome />,
        },
        {
            slug: 'games',
            svg: <SvgHome />,
        },
        {
            slug: 'search',
            svg: <SvgSearch />,
        }
    ];

    return (
        <nav className={BASE_CASSNAME}>
            <ul>
                {
                   linkCollection.map((link, index) => {
                        const { slug, svg } = link;
                    
                        return (
                            <li key={`${slug}-${index}`} className={classNames(pathname.includes(slug) && 'active-link')}>
                                <Link href={`/${locale}/${slug}`}>{svg}</Link>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
};