import { Howl, HowlOptions } from 'howler';

class AudioPlayerClass {
	 tracks;

	 currentTrackIndex;

	 sound;

	 volume;

	 progressAnimationFrame = null;

	constructor({tracks, setAudioPlayerIsInit}) {
		this.tracks = tracks;
		this.setAudioPlayerIsInit = setAudioPlayerIsInit;
		this.currentTrackIndex = 0;
		this.sound = null;
		this.volume = 0.7;

		this.initTrack(this.currentTrackIndex);
	}

	initTrack(index) {
		if (this.sound) {
			this.sound.unload();
		}
		this.sound = new Howl({
			src: [this.tracks[index]],
			volume: this.volume,
			html5: true,
			onload: () => {
				if (this.setAudioPlayerIsInit) {
					this.setAudioPlayerIsInit(true);
				}
			},
			onend: () => this.nextTrack(),
		});
		this.sound.load();
	}

	play(onProgress) {
		if (this.sound) {
			this.sound.play();
			this.trackProgress(onProgress); 
		}
	}

	onProgressUpdate(onProgress) {
		this.trackProgress(onProgress);
	}

	trackProgress(onProgress) {
		const updateProgress = () => {
			if (this.sound && this.sound.playing()) {
				const progress = (this.sound.seek()) / this.sound.duration();
				onProgress(progress);
				this.progressAnimationFrame = requestAnimationFrame(updateProgress);
			}
		};
		this.progressAnimationFrame = requestAnimationFrame(updateProgress);
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
		this.play(() => {});
	}

	previousTrack() {
		this.stopProgressTracking();
		this.currentTrackIndex =
			(this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
		this.initTrack(this.currentTrackIndex);
		this.play(() => {});
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
		this.play(() => {});
	}

	getDuration() {
		return this.sound ? this.sound.duration() : 0;
	}
}

export default AudioPlayerClass;
