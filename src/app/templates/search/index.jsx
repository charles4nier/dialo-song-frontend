'use client';

import React, { useState, useEffect } from 'react';
import { getData } from '../../../services/api';
import GameTagSearch from '../../components/search/gameTagSearch';
import PlaylistCard from '../../components/search/playlistCard';
import GameSettingButton from '../../components/search/gameSettingButton'; // Import du nouveau composant


export default function Search({ gameTags }){
  const [playlists, setPlaylists] = useState(null);
  const [gameSettingTags, setGameSettingTags] = useState(null);
  const [showGameSettingTags, setShowGameSettingTags] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGameSettingTags, setIsLoadingGameSettingTags] = useState(false);

  // Fonction pour faire le fetch des playlists en fonction du tag sélectionné
  const fetchPlaylistsByTag = async (tag) => {
    if (!tag) {
      setErrorMessage('Please enter a tag');
      return;
    }

    setIsLoading(true);
    try {
      const response = await getData(`/playlists/by-game-tag/${tag}`);

      const playLists = [...response.mainTheme || [], ...response.secondaryTheme || []];
      if (playLists.length === 0) {
        setErrorMessage(
          "Désolé, nous n'avons pas trouvé de playlist spécialement conçue pour votre jeu. Mais pas de panique, on va vous aider à trouver quelque chose ! Choisissez l'univers dans lequel se passe votre jeu."
        );
        setShowGameSettingTags(true);
      } else {
        setPlaylists(playLists);
        setErrorMessage('');
      }
    } catch (error) {
      console.error('Error fetching playlists:', error);
      setErrorMessage(
        "Désolé, nous n'avons pas trouvé de playlist spécialement conçue pour votre jeu. Mais pas de panique, on va vous aider à trouver quelque chose ! Choisissez l'univers dans lequel se passe votre jeu."
      );
    } finally {
      setIsLoading(false);
    }
  };

    // Fonction pour faire le fetch des playlists en fonction du tag sélectionné
    const fetchPlaylistsBySettingTag = async (tag) => {
      if (!tag) {
        setErrorMessage('Please enter a tag');
        return;
      }
  
      setIsLoading(true);
      try {
        const response = await getData(`/playlists/by-game-setting-tag/${tag}`);
        const {playlists} = response;
        console.log('playlists :::: ', playlists);
        setPlaylists(playlists);
        setErrorMessage('');
      } catch (error) {
        console.error('Error fetching playlists:', error);
        setErrorMessage(
          "Désolé, nous n'avons pas trouvé de playlist spécialement conçue pour votre jeu. Mais pas de panique, on va vous aider à trouver quelque chose ! Choisissez l'univers dans lequel se passe votre jeu."
        );
      } finally {
        setIsLoading(false);
      }
    };

  // Fonction pour faire le fetch des game-setting-tags après un délai
  const fetchGameSettingTags = async () => {
    setIsLoadingGameSettingTags(true);
    try {
      const response = await getData('/game-setting-tags/all');

      if (!response.length) {
        throw new Error('Failed to fetch game setting tags');
      }
      console.log('response setting alors :::: ', [...response]);
      setGameSettingTags([...response]);
    } catch (error) {
      console.error('Error fetching game setting tags:', error);
      setErrorMessage('Failed to fetch game setting tags.');
    } finally {
      setIsLoadingGameSettingTags(false);
    }
  };

  // useEffect pour déclencher la requête après un délai
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchGameSettingTags();
    }, 500); // Délai ajusté

    return () => clearTimeout(timer); // Nettoyage du timer en cas de démontage du composant
  }, []);

  const handleSuggestionSelected = (suggestion) => {
    fetchPlaylistsByTag(suggestion);
  };

  console.log('dzadzaz', playlists);

  return (
    <div>
      <h1>Search for Playlists by Game Tag</h1>
      <GameTagSearch tags={gameTags} onSuggestionSelected={handleSuggestionSelected} />

      {isLoading && <p>Loading playlists...</p>}

      {errorMessage && (
        <p>{errorMessage}</p> // Paragraphe conditionnel pour afficher les messages d'erreur
      )}

      {playlists && playlists.length > 0 && (
        <div>
          <h2>Playlists Found</h2>
          <div className="playlist-list">
            {playlists.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </div>
      )}

      {!isLoading && playlists && playlists.length === 0 && (
        <p>No playlists found for the selected tag.</p>
      )}

      {/* Gestion de l'affichage des game-setting-tags */}
      {isLoadingGameSettingTags && <p>Loading game setting tags...</p>}

      {!playlists && showGameSettingTags && gameSettingTags && gameSettingTags.length > 0 && (
        <div>
          <h2>Choisissez l'univers de votre jeu</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {gameSettingTags.map((tag) => (
              <GameSettingButton key={tag.id} onClick={fetchPlaylistsBySettingTag} tag={tag.toString()}/>
            ))}
          </div>
        </div>
      )}

      {!isLoadingGameSettingTags && gameSettingTags && gameSettingTags.length === 0 && (
        <p>No game setting tags found.</p>
      )}
    </div>
  );
}
