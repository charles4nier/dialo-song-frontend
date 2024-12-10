'use client';

import React from 'react';
import Link from 'next/link';
import SvgSearch from '../../components/svg/svgSearch';

import './style.scss'

// Components
import AudioPlayer from '../../components/audioPlayer';

const BASE_CLASSNAME = 'template-playlist';

export default function PlayList({data}){
    const { title, tracksName, basePlayListUrl, coverUrl, game } = data,
    // extractTracks =  playlist.map((track) => {
    //     const {music = {}, starting_time: startingTime = 0} = track || {},
    //     cleanTile = music.title?.replace(`${slug.toUpperCase()}_`, '') || '';
    //     return {
    //         title: cleanTile,
    //         src: music?.url || '',
    //         size: music?.size || 0,
    //         startingTime
    //     }});
    extractTracks = tracksName.map((track, index) =>  {
        return {
            name: track,
            src: `${basePlayListUrl}${index + 1}.mp3`
        };
    });


    return (
       <div className={BASE_CLASSNAME}>
            <div className={`${BASE_CLASSNAME}__link--container`}>
                <Link className={`${BASE_CLASSNAME}__link`} href="/fr/search">
                    <SvgSearch/>
                </Link>
            </div>
            <div  className={`${BASE_CLASSNAME}__cover__wrapper`}>
                <img className={`${BASE_CLASSNAME}__cover`} src={coverUrl}/>
            </div>
        	<div  className={`${BASE_CLASSNAME}__content__wrapper`}>
            	<h1 className={`${BASE_CLASSNAME}__title`}>{title}</h1>
                <p className={`${BASE_CLASSNAME}__subtitle`}>Une playlist pour le jeu {game}</p>
                <AudioPlayer tracks={extractTracks} />
            </div>
       </div>
    )
};