'use client';

import React, { useState, useEffect } from 'react';
import { getData } from '../../../services/api';
import GameTagSearch from '../../components/search/gameTagSearch';
import PlaylistCard from '../../components/search/playlistCard';
import GameSettingButton from '../../components/search/gameSettingButton';
import SvgBoldArrowLeft from '../../components/svg/svgArrowLeft';
import classnames from 'classnames';

import './style.scss';

const BASE_CLASSNAME = 'template-search'

export default function Search({ gameTags }){
  const [playlists, setPlaylists] = useState(null);
  const [showPlaylists, setShowPlaylists] = useState(false);
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
  
          const coverUrl = `/emulate-datas/playlists/${playlistKey}/cover.png`;
          data.cover = coverUrl;
  
          return data;
        });

        const playlists = await Promise.all(playlistPromises);
 
        setPlaylists(playlists);
        setErrorMessage('');
  
      } catch (error) {
        console.error('Error fetching playlists by tag:', error);
        setErrorMessage(`Nous n'avons pas trouvé de jeu correspondant au titre "${tag}". Pas de panique, nous pouvons quand même trouver la playlist adéquate.`);
      } finally {
        setIsLoading(false);
      }
    } else {
      setGameSettingMessage(`Nous n'avons pas trouvé de jeu correspondant au titre "${tag}". Pas de panique, nous pouvons quand même trouver la playlist adéquate.`);
      setIsLoading(false);
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

        const coverUrl = `/emulate-datas/playlists/${playlistKey}/cover.png`;
        data.cover = coverUrl;

        return data;
      });

      const playlists = await Promise.all(playlistPromises);

      setPlaylists(playlists);
      setErrorMessage('');

    } catch (error) {
      console.error('Error fetching playlists by tag:', error);
      setErrorMessage(`Nous n'avons pas trouvé de jeu correspondant au titre "${tag}". Pas de panique, nous pouvons quand même trouver la playlist adéquate.`);
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

  const resetSearch = () => {
    setPlaylists(null);
    setShowPlaylists(false);
    setShowGameSettingTags(false);
    setGameSettingMessage('');
    setIsLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchGameSettingTags();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (gameSettingMessage) {
      setTimeout(() => setShowGameSettingTags(true), 200)
    }
  }, [gameSettingMessage])

  useEffect(() => {
    if (playlists?.length > 0) {
      setTimeout(() => setShowPlaylists(true), 200)
    }
  }, [playlists])

  const handleSuggestionSelected = (suggestion) => {
    fetchPlaylistsByGameTag(suggestion);
  };

  return (
    <div className={BASE_CLASSNAME}>
      <h1 className={`${BASE_CLASSNAME}__title`}>Rechercher</h1>
      {!gameSettingMessage && (!playlists || playlists.length === 0) && <GameTagSearch tags={Object.keys(gameTags)} onSuggestionSelected={handleSuggestionSelected} />}


      {playlists?.length > 0 && (
        <div className={classnames(`${BASE_CLASSNAME}__playlists-wrapper`, {
          [`${BASE_CLASSNAME}__playlists-wrapper--show`]: showPlaylists
        })}>
          <h2 className={`${BASE_CLASSNAME}__playlists-title`}>Résultats</h2>
          <ul className={`${BASE_CLASSNAME}__playlists-list`}>
            {playlists.map((playlist, index) => (
              <li key={index}>
                <PlaylistCard  playlist={playlist} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {gameSettingMessage && !playlists && gameSettingTags && (
        <div>
         <p className={`${BASE_CLASSNAME}__game-setting-message`}>{gameSettingMessage}</p>
          <div className={classnames(`${BASE_CLASSNAME}__game-setting-tag`, {
          [`${BASE_CLASSNAME}__game-setting-tag--show`]: showGameSettingTags
        })} >
            <p className={`${BASE_CLASSNAME}__game-setting-title`}>Choisissez le genre qui colle le mieux à votre jeu : </p>
            <ul className={`${BASE_CLASSNAME}__game-setting-list`}>
            {Object.keys(gameSettingTags).map((tag) => (
              <li className={`${BASE_CLASSNAME}__game-setting-list-item`} key={tag}>
                <GameSettingButton  onClick={fetchPlaylistsBySettingTag} tag={tag}/>
              </li>
            ))}
            </ul>
          </div>
        </div>
      )}
      {(!!gameSettingMessage || playlists?.length > 0) && (
        <div className={`${BASE_CLASSNAME}__reset`}>
          <button className={`${BASE_CLASSNAME}__reset-button`} onClick={resetSearch}><SvgBoldArrowLeft/></button>
        </div>
      )}
    </div>
  );
}
