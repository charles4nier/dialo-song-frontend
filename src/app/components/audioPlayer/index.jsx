import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import AudioPlayerClass from './audioPlayerClass';

const BASE_CLASSNAME = 'fs-audio-player';

const AudioPlayer = ({ tracks }) => {
  console.log('allooooooo', tracks);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [audioPlayerInit, setAudioPlayerIsInit] = useState(false);
  const audioPlayer = useRef(new AudioPlayerClass({tracks, setAudioPlayerIsInit}));

	// Ref for the seek bar to update its width without triggering re-renders
	const progressBarRef = useRef(null);

	useEffect(() => {
		if (audioPlayerInit) {
			// Get duration of the current track once
			setDuration(audioPlayer.current.getDuration());

			// Use onProgressUpdate to update the width of the seek bar
			audioPlayer.current.onProgressUpdate((progress) => {
				if (progressBarRef.current) {
					progressBarRef.current.style.width = `${progress * 100}%`;
				}
			});
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
		audioPlayer.current.previousTrack();
		setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length);
		setIsPlaying(true);
	};

	const handleVolumeChange = (event) => {
		const newVolume = parseFloat(event.target.value);
		setVolume(newVolume);
		audioPlayer.current.setVolume(newVolume);
	};

	const handleSeekChange = (event) => {
		const newPosition = parseFloat(event.target.value);
		audioPlayer.current.seekTo(newPosition);
		if (progressBarRef.current) {
			progressBarRef.current.style.width = `${(newPosition / duration) * 100}%`;
		}
	};

	const handleTrackSelect = (index) => {
		setCurrentTrackIndex(index);
		audioPlayer.current.selectTrack(index);
		setIsPlaying(true);
	};

	return (
		<div className={BASE_CLASSNAME}>
			<div className={`${BASE_CLASSNAME}__controls`}>
				<button
					type="button"
					onClick={handlePrevious}
					className={classNames(`${BASE_CLASSNAME}__button`)}
				>
					Previous
				</button>
				<button
					type="button"
					onClick={handlePlayPause}
					className={classNames(`${BASE_CLASSNAME}__button`, {
						[`${BASE_CLASSNAME}__button--playing`]: isPlaying,
					})}
				>
					{isPlaying ? 'Pause' : 'Play'}
				</button>
				<button
					type="button"
					onClick={handleNext}
					className={classNames(`${BASE_CLASSNAME}__button`)}
				>
					Next
				</button>
			</div>
			<div className={classNames(`${BASE_CLASSNAME}__volume-control`)}>
				<label>Volume:</label>
				<input
					type="range"
					min="0"
					max="1"
					step="0.01"
					value={volume}
					onChange={handleVolumeChange}
					className={classNames(`${BASE_CLASSNAME}__volume-slider`)}
				/>
			</div>
			<div className={classNames(`${BASE_CLASSNAME}__seek-bar-container`)}>
				<div
					className={classNames(`${BASE_CLASSNAME}__seek-bar`)}
					ref={progressBarRef}
				></div>
				<input
					type="range"
					min="0"
					max={duration}
					step="0.1"
					onChange={handleSeekChange}
					className={classNames(`${BASE_CLASSNAME}__seek-slider`)}
				/>
				<span className={classNames(`${BASE_CLASSNAME}__time`)}>
					{Math.floor((progressBarRef.current?.style.width || '0').replace('%', ''))} /{' '}
					{Math.floor(duration)}
				</span>
			</div>
			<div className={classNames(`${BASE_CLASSNAME}__playlist`)}>
				{tracks.map((track, index) => (
					<button
						type="button"
						key={index}
						onClick={() => handleTrackSelect(index)}
						className={classNames(`${BASE_CLASSNAME}__track`, {
							[`${BASE_CLASSNAME}__track--active`]: index === currentTrackIndex,
						})}
						style={{
							cursor: 'pointer',
							color: index === currentTrackIndex ? 'blue' : 'black',
						}}
					>
						{track}
					</button>
				))}
			</div>
		</div>
	);
};

export default AudioPlayer;

