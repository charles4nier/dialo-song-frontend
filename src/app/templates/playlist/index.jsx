'use client';

import React from 'react';


// Components
import AudioPlayer from '../../components/audioPlayer';

export default function PlayList({data}){
    const { id, title, slug, playlist, background_fx: backgroundFx } = data,
    extractTracks =  playlist.map((track) => {
        const {music = {}, starting_time: startingTime = 0} = track || {},
        cleanTile = music.title?.replace(`${slug.toUpperCase()}_`, '') || '';
        return {
            title: cleanTile,
            src: music?.url || '',
            size: music?.size || 0,
            startingTime
        }});

    return (
       <div>
        <h1>{title}</h1>
            <AudioPlayer playlist={extractTracks} />
       </div>
    )
};