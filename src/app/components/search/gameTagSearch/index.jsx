import React, { useState } from 'react';
import './style.scss';
import levenshtein from 'js-levenshtein';

const BASE_CLASSNAME = 'game-tag-search';

export default function GameTagSearch({ tags, onSuggestionSelected }) {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

    // Fonction pour capitaliser chaque mot
    const capitalizeWords = (input) => {
        return input
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        setQuery(value);
        setActiveSuggestionIndex(-1);
        updateSuggestions(value);
    };

    const updateSuggestions = (value) => {
        if (value) {
            const filteredSuggestions = tags.filter(tag => {
                const distance = levenshtein(value.toLowerCase(), tag.toLowerCase());
                const maxAllowedDistance = Math.floor(tag.length * 0.6);
                return distance <= maxAllowedDistance;
            });
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowDown') {
            setActiveSuggestionIndex(prevIndex =>
                prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
            );
        } else if (event.key === 'ArrowUp') {
            setActiveSuggestionIndex(prevIndex =>
                prevIndex > 0 ? prevIndex - 1 : prevIndex
            );
        } else if (event.key === 'Enter') {
            event.preventDefault();
            setSuggestions([]);
            let selectedWord = query;
            if (activeSuggestionIndex >= 0) {
                selectedWord = suggestions[activeSuggestionIndex];
            }

            const formattedWord = capitalizeWords(selectedWord);
            setQuery(formattedWord);
            onSuggestionSelected(formattedWord);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        const formattedWord = capitalizeWords(suggestion);
        setQuery(formattedWord);
        setSuggestions([]);
        onSuggestionSelected(formattedWord);
    };

    const handleInputClick = () => {
        if (suggestions.length > 0) {
            setSuggestions([]);
        }
    };

    return (
        <div className={BASE_CLASSNAME}>
            <input
                type="text"
                placeholder="Tapez le nom d'un jeu..."
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onClick={handleInputClick}
                className="tag-search-input"
                aria-autocomplete="list"
                aria-controls="suggestions-list"
                aria-activedescendant={
                    activeSuggestionIndex >= 0 ? `suggestion-${activeSuggestionIndex}` : undefined
                }
            />
            {suggestions.length > 0 && (
                <ul className="suggestions-list" id="suggestions-list">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            id={`suggestion-${index}`}
                            className={index === activeSuggestionIndex ? 'active-suggestion' : ''}
                            onMouseDown={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
