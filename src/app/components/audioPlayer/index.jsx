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

    const handleNext = () => {
        audioPlayer.current.nextTrack();
        setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
        setIsPlaying(true);
    };

    const handlePrevious = () => {
        const currentTime = audioPlayer.current.sound.seek();
        if (currentTime > 3) {
            audioPlayer.current.sound.seek(0);
            audioPlayer.current.resetProgressBar();
        } else {
            audioPlayer.current.previousTrack();
            setCurrentTrackIndex(
                (prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length
            );
        }
        setIsPlaying(true);
    };

    const handleVolumeChange = (event) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        audioPlayer.current.setVolume(newVolume);
    };

    const handleSeekClick = (event) => {
        if (!progressBarContainerRef.current || !audioPlayerInit) return;

        const rect = progressBarContainerRef.current.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const newProgress = clickX / rect.width;

        const newTime = newProgress * duration;

        if (audioPlayer.current.sound && audioPlayer.current.sound.state() === 'loaded') {
            audioPlayer.current.seekTo(newTime);
            if (progressBarRef.current) {
                progressBarRef.current.style.width = `${newProgress * 100}%`;
            }
        } else {
            console.warn('Sound not loaded yet. Seek will be applied once loaded.');
        }
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
                onClick={handleSeekClick}
            >
                <div
                    className={`${BASE_CLASSNAME}__seek-bar`}
                    ref={progressBarRef}
                ></div>
            </div>
            <div className={`${BASE_CLASSNAME}__controls`}>
                <button
                    type="button"
                    onClick={handlePrevious}
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
                    onClick={handleNext}
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
