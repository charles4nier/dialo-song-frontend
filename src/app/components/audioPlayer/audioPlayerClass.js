import { Howl, HowlOptions } from 'howler';

class AudioPlayerClass {
	tracks;
	currentTrackIndex;
	sound;
	volume;
	progressAnimationFrame = null;

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
			if (this.sound && this.sound.playing()) {
				// Empêche les mises à jour pendant que l'utilisateur manipule la position
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
		this.progressBarRef.current.style.width = `${0 * 100}%`;
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

	// Nouvelle méthode : redémarre ou passe à la chanson précédente
	restartOrPreviousTrack() {
		if (this.sound) {
			const currentTime = this.sound.seek();
			if (currentTime > 3) {
				// Si la chanson a commencé depuis plus de 3 secondes, revient au début
				this.sound.seek(0);
				this.resetProgressBar();
			} else {
				// Sinon, passe à la chanson précédente
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
			this.sound.seek(position);
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


