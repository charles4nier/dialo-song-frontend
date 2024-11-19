import './style.scss';
import React from 'react';

const BASE_CASSNAME = 'loopsie-header';

export default function Header() {
    return (
        <header className={BASE_CASSNAME}>
            <div className={`${BASE_CASSNAME}__container`}>
                <h1>Loopsie</h1>
            </div>
        </header>
    )
};