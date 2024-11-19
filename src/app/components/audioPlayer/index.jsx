"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
// import { getStrapiUrl }from '@/services/api';

import "./style.scss";

// import SvgPlay from '@/app/components/svg/svgPlay';
// import SvgPause from '@/app/components/svg/svgPause';
// import SvgPrevious from '@/app/components/svg/svgPrevious';
// import SvgNext from '@/app/components/svg/svgNext';



// interface AudioPlayerProps {
//   playlist: TrackType[];
// }

const AudioPlayer  = () => {
// const AudioPlayer: React.FC<AudioPlayerProps> = ({ playlist }) => {
  // const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  // const [isPlaying, setIsPlaying] = useState<boolean>(false);
  // const audioContextRef = useRef<AudioContext | null>();
  // const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  // const audioBufferRef = useRef<AudioBuffer | null>(null);
  // const progressBarRef = useRef<HTMLDivElement>(null);
  // const progressRef = useRef<HTMLDivElement>(null);
  // const animationFrameRef = useRef<number | null>(null);
  // const currentTimeRef = useRef<number>(0);
  // const startTimeRef = useRef<number>(0);
  // const tickerTimeRef = useRef<number>(Date.now());
  // const clickNextRef = useRef<boolean>(false);
  // const isPlayingRef = useRef<boolean>(false);
  // const timeStampRef = useRef<number | null>(null);
  // const tickerRef = useRef<number>(0);

  // const updateTimeStampRef = () => {
  //   tickerRef.current = tickerRef.current + 1;

  //   if (tickerRef.current >= 179) {
  //     cancelAnimationFrame(timeStampRef.current);
  //     timeStampRef.current = null;
  //     tickerRef.current = 0;
  //     return;
  //   }

  //   timeStampRef.current = requestAnimationFrame(updateTimeStampRef);
  // };

  // const loadTrack = useCallback(
  //   async (index: number) => {
  //     let srcTmp = playlist[index].src;

  //     if (srcTmp.startsWith('/')) {
  //       srcTmp = srcTmp.substring(1);
  //     }
  
  //     const trackUrl = getStrapiUrl(srcTmp);
  //     console.log('trackUrl :::: ', trackUrl);
  //     if (!trackUrl) {
  //       console.error("Invalid URL:", trackUrl);
  //       return;
  //     }

  //     try {
  //       const response = await fetch(trackUrl);
  //       const arrayBuffer = await response.arrayBuffer();

  //       const audioBuffer =
  //         await audioContextRef.current.decodeAudioData(arrayBuffer);
  //       audioBufferRef.current = audioBuffer;

  //       if (isPlayingRef.current) {
  //         setTrack(0);
  //       }
  //     } catch (error) {
  //       console.error("Erreur lors du chargement du fichier audio", error);
  //     }
  //   },
  //   [isPlaying, playlist]
  // );

  // const setProgressBar = (reset = false) => {
  //   if (progressRef.current) {
  //     const updatedTime =
  //       (Date.now() - tickerTimeRef.current) / 1000 + startTimeRef.current;
  //     const progress = reset
  //       ? 0
  //       : (updatedTime / (audioBufferRef.current?.duration || 1)) * 100;
  //     progressRef.current.style.width = `${progress}%`;
	//   currentTimeRef.current = updatedTime;
  //   }
  // };


  // const updateProgress = () => {
  //   setProgressBar();
  //   animationFrameRef.current = requestAnimationFrame(updateProgress);
  // };
  
  // // Play track
  // const setTrack = useCallback((startTime: number) => {
  //   if (sourceNodeRef.current) {
  //     sourceNodeRef.current.stop();
  //   }
  
  //   if (!audioBufferRef.current || !audioContextRef.current) return;

  //   const newSourceNode = audioContextRef.current.createBufferSource();
  //   newSourceNode.buffer = audioBufferRef.current;
  //   newSourceNode.connect(audioContextRef.current.destination);
  //   newSourceNode.start(0, startTime);
  //   newSourceNode.onended = handleOnEnd;
  //   sourceNodeRef.current = newSourceNode;
  //   startTimeRef.current = startTime;
  //   tickerTimeRef.current = Date.now();

  //   if (animationFrameRef.current !== null) {
  //     cancelAnimationFrame(animationFrameRef.current);
  //   }

  //   if (isPlayingRef.current) {
  //     updateProgress();
  //   } else {
  //     newSourceNode.stop();
  //     setProgressBar();
  //   }
  
  // }, [isPlaying]);

  // // Previous track
  // const handlePrev = () => {
  //   const prevIndex =
  //     (currentTrackIndex - 1 + playlist.length) % playlist.length;
  //     setCurrentTrackIndex(prevIndex);
  //     loadTrack(prevIndex);
  // };

  // const handleClickPrev = () => {
  //   const currentTime =  Math.round(currentTimeRef.current);

  //   if (animationFrameRef.current !== null) {
  //     cancelAnimationFrame(animationFrameRef.current);
  //   }

  //   setProgressBar(true);

  //   sourceNodeRef?.current?.stop();

  //   if (timeStampRef.current && tickerRef.current < 179 && currentTime < 3) {
  //     tickerRef.current = 0;
  //     isPlayingRef.current = true
  //     handlePrev();
  //   } else {
  //     if (currentTime < 3) {
  //       isPlayingRef.current = true
  //       handlePrev();
  //     } else {
  //       setTrack(0);
  //     }

  //     if (!timeStampRef.current) {
  //       updateTimeStampRef()
  //     }
  //   }

  // };

  // // Handle Play/Pause track
  // const handlePlayPause = () => {
  //   if (isPlayingRef.current) {
	//     setIsPlaying(false);
	//     isPlayingRef.current = false;
  //     if (sourceNodeRef.current) {
  //       sourceNodeRef.current.stop();
  //     }
     
  //     if (animationFrameRef.current !== null) {
  //       cancelAnimationFrame(animationFrameRef.current);
  //     }
  //   } else {
  //     isPlayingRef.current = true;
  //     setIsPlaying(true);
  //     if (audioBufferRef.current) {
  //       setTrack(startTimeRef.current);
  //     }
  //   }
  // };

  // // Next track
  // const handleNext = useCallback(() => {
  //   if (isPlayingRef.current) {
  //     if (sourceNodeRef.current) {
  //       sourceNodeRef.current.stop();
  //     }
  //   } else {
  //     isPlayingRef.current = true;
  //   }
  //     const nextIndex = (currentTrackIndex + 1) % playlist.length;
  //     setCurrentTrackIndex(nextIndex);
  //     loadTrack(nextIndex);
  //   }, [isPlaying, currentTrackIndex, playlist]);

  //   const handleClickNext = () => {
  //   clickNextRef.current = true;
  //   handleNext();
  // };

  // // Progress bar click
  // const handleProgressBarClick = (
  //   e: React.MouseEvent<HTMLDivElement, MouseEvent>
  // ) => {
  //   if (audioBufferRef.current) {
  //     const rect = progressBarRef.current?.getBoundingClientRect();
  //     if (rect) {
  //       const clickX = e.clientX - rect.left;
  //       const newTime = (clickX / rect.width) * audioBufferRef.current.duration;

  //       setTrack(newTime);
  //     }
  //   }
  // };

  // // End track
  // const handleOnEnd = () => {
  //   const duration =  Math.round(audioBufferRef?.current?.duration || 0);
  //   const currentTime =  Math.round(currentTimeRef.current);

  //   if (clickNextRef.current || currentTime === duration) {
  //     clickNextRef.current = false
  //     handleNext();
  //   }
  // };

  // useEffect(() => {
  //   audioContextRef.current = new (window.AudioContext ||
  //     window.webkitAudioContext)();
  //   setProgressBar(true);
  //   loadTrack(0);
  //   return () => {
  //     if (sourceNodeRef.current) {
  //       sourceNodeRef.current.stop();
  //     }
  //     if (audioContextRef.current) {
  //       audioContextRef.current.close();
  //     }
  //     if (animationFrameRef.current !== null) {
  //       cancelAnimationFrame(animationFrameRef.current);
  //     }
  //   };
  // }, []);

  // return (
  //   <div id="player">
  //     <div id="tracklist">
  //       {playlist.map((track, index) => (
  //         <button
  //           className={currentTrackIndex === index ? "active" : ""}
  //           key={index}
  //           onClick={() => {
  //             setCurrentTrackIndex(index);
  //             loadTrack(index);
  //           }}
  //         >
  //           {track.title}
  //         </button>
  //       ))}
  //     </div>
  //     <div id="controls">
  //       <button onClick={handleClickPrev}><SvgPrevious/></button>
  //       <button onClick={handlePlayPause} className="playPause">
  //         {isPlaying ? <SvgPause/> : <SvgPlay />}
  //       </button>
  //       <button onClick={handleClickNext}><SvgNext/></button>
  //     </div>
  //     <div
  //       id="progress-bar"
  //       ref={progressBarRef}
  //       className="progress-bar"
  //       onClick={handleProgressBarClick}
  //     >
  //       <div id="progress" className="progress" ref={progressRef}></div>
  //     </div>
  //   </div>
  // );
  <div></div>
};

export default AudioPlayer;
