import { Howl, HowlOptions } from 'howler';

class AudioPlayerClass {
	tracks;
	currentTrackIndex;
	sound;
	volume;
	progressAnimationFrame = null;
	targetSeekPosition = null; // Position cible en cas de clic rapide

	constructor({ tracks, setAudioPlayerIsInit, progressBarRef }) {
		this.tracks = tracks;
		this.setAudioPlayerIsInit = setAudioPlayerIsInit;
		this.progressBarRef = progressBarRef;
		this.currentTrackIndex = 0;
		this.sound = null;
		this.volume = 0.7;
		this.isLoaded = false;

		this.initTrack(this.currentTrackIndex);
	}

	initTrack(index) {
		if (this.sound) {
			this.sound.unload();
			this.resetProgressBar();
			this.setAudioPlayerIsInit(false);
		}
		this.sound = new Howl({
			src: [this.tracks[index].src],
			volume: this.volume,
			html5: true,
			onload: () => {
				this.isLoaded = true;
				if (this.setAudioPlayerIsInit) {
					this.setAudioPlayerIsInit(true);
				}
				// Si une position cible a été définie, effectuer le seek après le chargement
				if (this.targetSeekPosition !== null) {
					this.seekTo(this.targetSeekPosition);
					this.targetSeekPosition = null;
				}
			},
			onend: () => {
				this.isLoaded = false;
				this.nextTrack();
			},
		});
		this.sound.load();
	}

	play() {
		if (this.sound) {
			this.sound.play();
			this.trackProgress();
		}
	}

	onProgressUpdate() {
		this.trackProgress();
	}

	trackProgress() {
		const updateProgress = () => {
			if (this.sound) {
				const progress = this.sound.seek() / this.sound.duration();
				if (this.progressBarRef.current) {
					this.progressBarRef.current.style.width = `${progress * 100}%`;
				}
				this.progressAnimationFrame = requestAnimationFrame(updateProgress);
			}
		};
		this.progressAnimationFrame = requestAnimationFrame(updateProgress);
	}

	resetProgressBar() {
		if (this.progressBarRef.current) {
			this.progressBarRef.current.style.width = '0%';
		}
	}

	pause() {
		if (this.sound) {
			this.sound.pause();
		}
		this.stopProgressTracking();
	}

	stopProgressTracking() {
		if (this.progressAnimationFrame) {
			cancelAnimationFrame(this.progressAnimationFrame);
			this.progressAnimationFrame = null;
		}
	}

	nextTrack() {
		this.stopProgressTracking();
		this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
		this.initTrack(this.currentTrackIndex);
		this.play();
	}

	restartOrPreviousTrack() {
		if (this.sound) {
			const currentTime = this.sound.seek();
			if (currentTime > 3) {
				this.sound.seek(0);
				this.resetProgressBar();
			} else {
				this.previousTrack();
			}
		}
	}

	previousTrack() {
		this.stopProgressTracking();
		this.currentTrackIndex =
			(this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
		this.initTrack(this.currentTrackIndex);
		this.play();
	}

	setVolume(volume) {
		this.volume = volume;
		if (this.sound) {
			this.sound.volume(volume);
		}
	}

	seekTo(position) {
		if (this.sound) {
			if (this.isLoaded) {
				// Si chargé, effectue le seek immédiatement
				const clampedPosition = Math.max(0, Math.min(position, this.sound.duration()));
				this.sound.seek(clampedPosition);
				this.updateProgressBar(clampedPosition);
			} else {
				// Si non chargé, enregistre la position pour plus tard
				console.warn('Sound not loaded yet. Will seek once loaded.');
				this.targetSeekPosition = position;
			}
		}
	}

	updateProgressBar(position) {
		if (this.progressBarRef.current && this.sound) {
			const progress = position / this.sound.duration();
			this.progressBarRef.current.style.width = `${progress * 100}%`;
		}
	}

	selectTrack(index) {
		this.stopProgressTracking();
		this.currentTrackIndex = index;
		this.initTrack(index);
		this.play();
	}

	getDuration() {
		return this.sound ? this.sound.duration() : 0;
	}
}

export default AudioPlayerClass;



