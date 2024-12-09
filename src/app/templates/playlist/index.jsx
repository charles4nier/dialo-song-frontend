'use client';

import React from 'react';


// Components
import AudioPlayer from '../../components/audioPlayer';

export default function PlayList({data}){
    const { title, tracksName, basePlayListUrl } = data,
    // extractTracks =  playlist.map((track) => {
    //     const {music = {}, starting_time: startingTime = 0} = track || {},
    //     cleanTile = music.title?.replace(`${slug.toUpperCase()}_`, '') || '';
    //     return {
    //         title: cleanTile,
    //         src: music?.url || '',
    //         size: music?.size || 0,
    //         startingTime
    //     }});
    extractTracks = tracksName.map((track, index) => `${basePlayListUrl}${index + 1}.mp3`);

    console.log('extrack', extractTracks);
    return (
       <div>
        <h1>{title}</h1>
            <AudioPlayer tracks={extractTracks} />
       </div>
    )
};