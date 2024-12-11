import { Howl } from 'howler';

class AudioPlayerClass {
    constructor({ tracks, setAudioPlayerIsInit, progressBarRef }) {
        this.tracks = tracks;
        this.setAudioPlayerIsInit = setAudioPlayerIsInit;
        this.progressBarRef = progressBarRef;
        this.currentTrackIndex = 0;
        this.sound = null;
        this.volume = 0.7;
        this.isLoaded = false;
        this.isDragging = false;

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
    }

    play() {
        if (this.sound) {
            this.sound.play();
            this.trackProgress();
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

    trackProgress() {
        const updateProgress = () => {
            if (this.sound && !this.isDragging) {
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

    setVolume(volume) {
        this.volume = volume;
        if (this.sound) {
            this.sound.volume(volume);
        }
    }

    seekTo(position) {
        if (this.sound) {
            const clampedPosition = Math.max(0, Math.min(position, this.sound.duration()));
            this.sound.seek(clampedPosition);
            this.updateProgressBar(clampedPosition);
        }
    }

    updateProgressBar(position) {
        if (this.progressBarRef.current && this.sound) {
            const progress = position / this.sound.duration();
            this.progressBarRef.current.style.width = `${progress * 100}%`;
        }
    }

    handleSeekStart() {
        this.isDragging = true;
        this.stopProgressTracking();
    }

    handleSeekMove(newProgress) {
        if (this.isDragging) {
            const newPosition = newProgress * this.sound.duration();
            this.updateProgressBar(newPosition);
        }
    }

    handleSeekEnd(newProgress) {
        if (this.isDragging) {
            this.isDragging = false;
            const newPosition = newProgress * this.sound.duration();
            this.seekTo(newPosition);
            this.trackProgress();
        }
    }

    nextTrack() {
        this.stopProgressTracking();
        this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
        this.initTrack(this.currentTrackIndex);
        this.play();
    }

    previousTrack() {
        this.stopProgressTracking();
        this.currentTrackIndex = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
        this.initTrack(this.currentTrackIndex);
        this.play();
    }

    getDuration() {
        return this.sound ? this.sound.duration() : 0;
    }
}

export default AudioPlayerClass;
