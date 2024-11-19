import React, { useState } from 'react';
import './style.scss';
import levenshtein from 'js-levenshtein';



export default function GameTagSearch({ tags, onSuggestionSelected }) {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

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
            if (activeSuggestionIndex >= 0) {
                const selectedSuggestion = suggestions[activeSuggestionIndex];
                setQuery(selectedSuggestion);
                setSuggestions([]);
                onSuggestionSelected(selectedSuggestion);
            } else {
                onSuggestionSelected(query);
            }
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion);
        setSuggestions([]);
        onSuggestionSelected(suggestion);
    };

    const handleInputClick = () => {
        if (suggestions.length > 0) {
            setSuggestions([]);
        }
    };

    return (
        <div className="tag-search-container">
            <input
                type="text"
                placeholder="Search for a tag..."
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
