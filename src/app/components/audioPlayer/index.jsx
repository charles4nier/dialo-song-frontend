import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import AudioPlayerClass from './audioPlayerClass';
import SvgPlay from '../svg/svgPlay';
import SvgPause from '../svg/svgPause';
import SvgPrevious from '../svg/svgPrevious';
import SvgNext from '../svg/svgNext';
import SvgSound from '../svg/svgSound';
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
		// Get duration of the current track once
		setDuration(audioPlayer.current.getDuration());
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
		// Si la chanson a commencé depuis plus de 3 secondes, revient au début
		audioPlayer.current.sound.seek(0);
		audioPlayer.current.resetProgressBar();
	  } else {
		// Sinon, passe à la chanson précédente
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
  
	  // Position du clic sur la barre de progression
	  const rect = progressBarContainerRef.current.getBoundingClientRect();
	  const clickX = event.clientX - rect.left;
	  const newProgress = clickX / rect.width;
  
	  // Durée calculée
	  const newTime = newProgress * duration;
  
	  // Mise à jour du son et de la barre de progression
	  audioPlayer.current.seekTo(newTime);
	  if (progressBarRef.current) {
		progressBarRef.current.style.width = `${newProgress * 100}%`;
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
		  className={classNames(`${BASE_CLASSNAME}__seek-bar-container`)}
		  ref={progressBarContainerRef}
		  onClick={handleSeekClick}
		>
		  <div
			className={classNames(`${BASE_CLASSNAME}__seek-bar`)}
			ref={progressBarRef}
		  ></div>
		</div>
		<div className={`${BASE_CLASSNAME}__controls`}>
		  <button
			type="button"
			onClick={handlePrevious}
			className={classNames(
			  `${BASE_CLASSNAME}__button ${BASE_CLASSNAME}__button__previous`
			)}
		  >
			<SvgPrevious />
		  </button>
		  <button
			type="button"
			onClick={handlePlayPause}
			className={classNames(
			  `${BASE_CLASSNAME}__button ${BASE_CLASSNAME}__button__toggle-play`,
			  {
				[`${BASE_CLASSNAME}__button--playing`]: isPlaying,
			  }
			)}
		  >
			{isPlaying ? <SvgPause /> : <SvgPlay />}
		  </button>
		  <button
			type="button"
			onClick={handleNext}
			className={classNames(
			  `${BASE_CLASSNAME}__button ${BASE_CLASSNAME}__button__next`
			)}
		  >
			<SvgNext />
		  </button>
		</div>
		<ul className={classNames(`${BASE_CLASSNAME}__playlist`)}>
		  {tracks.map((track, index) => (
			<li
			  key={index}
			  className={classNames(`${BASE_CLASSNAME}__list-item`, {
				[`${BASE_CLASSNAME}__list-item--active`]:
				  index === currentTrackIndex,
			  })}
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
  

