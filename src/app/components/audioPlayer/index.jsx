import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import AudioPlayerClass from './audioPlayerClass';
import SvgPlay from '../svg/svgPlay';
import SvgPause from '../svg/svgPause';
import SvgPrevious from '../svg/svgPrevious';
import SvgNext from '../svg/svgNext';
import './style.scss';

const BASE_CLASSNAME = 'audio-player';

const AudioPlayer = ({ tracks }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [audioPlayerInit, setAudioPlayerIsInit] = useState(false);
    const progressBarContainerRef = useRef(null);
    const progressBarRef = useRef(null);
    const audioPlayer = useRef(
        new AudioPlayerClass({
            tracks,
            setAudioPlayerIsInit,
            progressBarRef,
        })
    );

    useEffect(() => {
        if (audioPlayerInit) {
            const duration = audioPlayer.current.getDuration();
            if (duration > 0) {
                setDuration(duration);
            } else {
                const interval = setInterval(() => {
                    const updatedDuration = audioPlayer.current.getDuration();
                    if (updatedDuration > 0) {
                        setDuration(updatedDuration);
                        clearInterval(interval);
                    }
                }, 100);
                return () => clearInterval(interval);
            }
        }
    }, [audioPlayerInit]);

    const handlePlayPause = () => {
        if (isPlaying) {
            audioPlayer.current.pause();
        } else {
            audioPlayer.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleVolumeChange = (event) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        audioPlayer.current.setVolume(newVolume);
    };

    const handleSeekStart = () => {
        audioPlayer.current.handleSeekStart();
    };

    const handleSeekMove = (event) => {
        if (!progressBarContainerRef.current) return;

        const rect = progressBarContainerRef.current.getBoundingClientRect();
        const clientX = event.touches ? event.touches[0].clientX : event.clientX;
        const clickX = clientX - rect.left;
        const newProgress = Math.max(0, Math.min(clickX / rect.width, 1));

        audioPlayer.current.handleSeekMove(newProgress);
    };

    const handleSeekEnd = (event) => {
        if (!progressBarContainerRef.current) return;

        const rect = progressBarContainerRef.current.getBoundingClientRect();
        const clientX = event.changedTouches ? event.changedTouches[0].clientX : event.clientX;
        const clickX = clientX - rect.left;
        const newProgress = Math.max(0, Math.min(clickX / rect.width, 1));

        audioPlayer.current.handleSeekEnd(newProgress);
    };

    const handleTrackSelect = (index) => {
        setCurrentTrackIndex(index);
        audioPlayer.current.selectTrack(index);
        setIsPlaying(true);
    };

    return (
        <div className={BASE_CLASSNAME}>
            <div
                className={`${BASE_CLASSNAME}__seek-bar-container`}
                ref={progressBarContainerRef}
                onMouseDown={handleSeekStart}
                onTouchStart={handleSeekStart}
                onMouseMove={handleSeekMove}
                onTouchMove={handleSeekMove}
                onMouseUp={handleSeekEnd}
                onTouchEnd={handleSeekEnd}
                onMouseLeave={handleSeekEnd} // Handle when mouse leaves seek-bar
            >
                <div
                    className={`${BASE_CLASSNAME}__seek-bar`}
                    ref={progressBarRef}
                ></div>
            </div>
            <div className={`${BASE_CLASSNAME}__controls`}>
                <button
                    type="button"
                    onClick={() => audioPlayer.current.previousTrack()}
                    className={`${BASE_CLASSNAME}__button ${BASE_CLASSNAME}__button__previous`}
                >
                    <SvgPrevious />
                </button>
                <button
                    type="button"
                    onClick={handlePlayPause}
                    className={`${BASE_CLASSNAME}__button ${BASE_CLASSNAME}__button__toggle-play ${
                        isPlaying ? `${BASE_CLASSNAME}__button--playing` : ''
                    }`}
                >
                    {isPlaying ? <SvgPause /> : <SvgPlay />}
                </button>
                <button
                    type="button"
                    onClick={() => audioPlayer.current.nextTrack()}
                    className={`${BASE_CLASSNAME}__button ${BASE_CLASSNAME}__button__next`}
                >
                    <SvgNext />
                </button>
            </div>
            <ul className={`${BASE_CLASSNAME}__playlist`}>
                {tracks.map((track, index) => (
                    <li
                        key={index}
                        className={`${BASE_CLASSNAME}__list-item ${
                            index === currentTrackIndex ? `${BASE_CLASSNAME}__list-item--active` : ''
                        }`}
                    >
                        <span>{index + 1}.</span>
                        <button
                            type="button"
                            onClick={() => handleTrackSelect(index)}
                            className={`${BASE_CLASSNAME}__track`}
                        >
                            {track.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AudioPlayer;
