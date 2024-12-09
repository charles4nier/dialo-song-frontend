'use client';

import React, { useState, useEffect } from 'react';
import { getData } from '../../../services/api';
import GameTagSearch from '../../components/search/gameTagSearch';
import PlaylistCard from '../../components/search/playlistCard';
import GameSettingButton from '../../components/search/gameSettingButton';


export default function Search({ gameTags }){
  const [playlists, setPlaylists] = useState(null);
  const [gameSettingTags, setGameSettingTags] = useState(null);
  const [showGameSettingTags, setShowGameSettingTags] = useState(false);
  const [gameSettingMessage, setGameSettingMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGameSettingTags, setIsLoadingGameSettingTags] = useState(false);

  const fetchPlaylistsByGameTag = async (tag) => {
    if (!tag) {
      setErrorMessage('Please enter a tag');
      return;
    }
  
    setIsLoading(true);
    if (gameTags[tag]) {
      const playlistKeys = gameTags[tag];
      try {
        const playlistPromises = playlistKeys.map(async (playlistKey) => {
          const response = await fetch(`/emulate-datas/playlists/${playlistKey}/index.json`);
          if (!response.ok) {
            throw new Error(`Playlist "${playlistKey}" for tag "${tag}" not found`);
          }
          const data = await response.json();
  
          const coverUrl = `/emulate-datas/playlists/${playlistKey}/cover.webp`;
          data.cover = coverUrl;
  
          return data;
        });

        const playlists = await Promise.all(playlistPromises);
 
        setPlaylists(playlists);
        setErrorMessage('');
  
      } catch (error) {
        console.error('Error fetching playlists by tag:', error);
        setErrorMessage(`Nous n'avons pas trouvé jeu correspondant au titre "${tag}". Pas de panique, nous pouvons quand même trouver une playlist pour votre jeu. Choisissez l'ambiance qui colle le mieux à votre jeu`);
      } finally {
        setIsLoading(false);
      }
    } else {
      setGameSettingMessage(`Nous n'avons pas trouvé jeu correspondant au titre "${tag}". Pas de panique, nous pouvons quand même trouver une playlist pour votre jeu. Choisissez l'ambiance qui colle le mieux à votre jeu`);
      setIsLoading(false);
      setShowGameSettingTags(true);
    }
  };
  
  const fetchPlaylistsBySettingTag = async (tag) => {
    if (!tag) {
      setErrorMessage('Please enter a tag');
      return;
    }

    setIsLoading(true);
    const playlistKeys = gameSettingTags[tag];
    try {
      const playlistPromises = playlistKeys.map(async (playlistKey) => {
        const response = await fetch(`/emulate-datas/playlists/${playlistKey}/index.json`);
        if (!response.ok) {
          throw new Error(`Playlist "${playlistKey}" for tag "${tag}" not found`);
        }
        const data = await response.json();

        const coverUrl = `/emulate-datas/playlists/${playlistKey}/cover.webp`;
        data.cover = coverUrl;

        return data;
      });

      const playlists = await Promise.all(playlistPromises);

      setPlaylists(playlists);
      setErrorMessage('');

    } catch (error) {
      console.error('Error fetching playlists by tag:', error);
      setErrorMessage(`Nous n'avons pas trouvé jeu correspondant au titre "${tag}". Pas de panique, nous pouvons quand même trouver une playlist pour votre jeu. Choisissez son univers :`);
    } finally {
      setIsLoading(false);
    }  
  };

  const fetchGameSettingTags = async () => {
    setIsLoadingGameSettingTags(true);
    try {
      const response = await fetch(`/emulate-datas/game-setting/index.json`);

      if (!response.ok) {
        throw new Error('Failed to fetch game setting tags');
      }
      const data = await response.json();
      setGameSettingTags({...data});
    } catch (error) {
      console.error('Error fetching game setting tags:', error);
      setErrorMessage('Failed to fetch game setting tags.');
    } finally {
      setIsLoadingGameSettingTags(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchGameSettingTags();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleSuggestionSelected = (suggestion) => {
    fetchPlaylistsByGameTag(suggestion);
  };

  return (
    <div>
      <h1>Search for Playlists by Game Tag</h1>
      <GameTagSearch tags={Object.keys(gameTags)} onSuggestionSelected={handleSuggestionSelected} />

      {isLoading && <p>Loading playlists...</p>}

      {errorMessage && (
        <p>{errorMessage}</p>
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

      {isLoadingGameSettingTags && <p>Loading game setting tags...</p>}

      {gameSettingMessage && !playlists && showGameSettingTags && gameSettingTags && (
        <div>
         <p>{gameSettingMessage}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {Object.keys(gameSettingTags).map((tag) => (
              <GameSettingButton key={tag} onClick={fetchPlaylistsBySettingTag} tag={tag}/>
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
