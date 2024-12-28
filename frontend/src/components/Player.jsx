import React, { useEffect, useRef, useState } from "react";
import { SongData } from "../context/Song";
import { FaStepBackward, FaStepForward, FaRandom } from "react-icons/fa";
import { FaRepeat } from "react-icons/fa6";
import { FaPause, FaPlay } from "react-icons/fa";
import {
  FaMicrophone,
  FaListAlt,
  FaVolumeUp,
  FaExpandAlt,
} from "react-icons/fa";

const Player = () => {
  const {
    song,
    fetchSingleSong,
    selectedSong,
    isPlaying,
    setIsPlaying,
    nextMusic,
    prevMusic,
  } = SongData();

  useEffect(() => {
    fetchSingleSong();
  }, [selectedSong]);

  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const [volume, setVolume] = useState(1);

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isRepeating, setIsRepeating] = useState(false); // Trạng thái lặp
  const [isRandom, setIsRandom] = useState(false); // Trạng thái trộn

  const toggleRepeat = () => {
    setIsRepeating(!isRepeating);
  };

  const toggleRandom = () => {
    setIsRandom(!isRandom);
  };

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleLoadedMetaData = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetaData);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetaData);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [song]);

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0">
      {song && (
        <div className="h-[90px] bg-black flex justify-between items-center text-white px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="w-[60px] sm:w-[100px] lg:w-[150px] flex items-center gap-4">
            <img
              src={
                song.thumbnail
                  ? song.thumbnail.url
                  : "https://via.placeholder.com/50"
              }
              className="w-12 h-12 object-cover"
              alt=""
            />
            <div className="hidden sm:block overflow-hidden">
              <p className="text-xs text-gray-400 truncate">{song.title}</p>
              <p className="truncate">
                {song.description && song.description.slice(0, 30)}...
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1 m-auto">
            {song && song.audio && (
              <>
                {isPlaying ? (
                  <audio ref={audioRef} src={song.audio.url} autoPlay />
                ) : (
                  <audio ref={audioRef} src={song.audio.url} />
                )}
              </>
            )}

            <div className="w-full flex items-center font-thin text-green-400 hidden lg:flex">
              <input
                type="range"
                min={"0"}
                max={"100"}
                className="progress-bar w-[120px] sm:w-[200px] md:w-[300px]"
                value={(progress / duration) * 100}
                onChange={handleProgressChange}
              />
            </div>

            <div className="flex justify-center items-center gap-4">
              <span
                className={`cursor-pointer ${
                  isRandom ? "text-blue-500" : "text-white"
                }`}
                onClick={toggleRandom}
              >
                <FaRandom />
              </span>
              <span className="cursor-pointer" onClick={prevMusic}>
                <FaStepBackward />
              </span>
              <button
                className="bg-white text-black rounded-full p-2"
                onClick={handlePlayPause}
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <span className="cursor-pointer" onClick={nextMusic}>
                <FaStepForward />
              </span>
              <span
                className={`cursor-pointer ${
                  isRepeating ? "text-blue-500" : "text-white"
                }`}
                onClick={toggleRepeat}
              >
                <FaRepeat />
              </span>
            </div>
          </div>

          {/* Ẩn FaVolumeUp và thanh trượt âm lượng khi màn hình dưới 779px */}
          <div className="flex items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
          <FaMicrophone className="text-xl sm:text-2xl hidden sm:block" />
            <FaListAlt className="text-xl sm:text-2xl" />
            <div className="hidden lg:block">
              <FaVolumeUp className="text-xl sm:text-2xl" />
            </div>
            {/* Ẩn thanh trượt âm lượng khi màn hình dưới 779px */}
            <input
              type="range"
              className="w-16 sm:w-24 md:w-32 hidden lg:block"
              min={"0"}
              max={"1"}
              step={"0.01"}
              value={volume}
              onChange={handleVolumeChange}
            />
            <FaExpandAlt className="text-xl sm:text-2xl" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;
